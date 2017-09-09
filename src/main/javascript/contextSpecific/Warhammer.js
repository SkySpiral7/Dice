'use strict';
/**This was made for 7th edition although the functions should also work for 8th edition.*/
var Warhammer = {};
/**
This is prebuilt function for Warhammer for when a unit attacks a unit.
This doesn't account for things like Helfrost or instant death.
Input's saveValue, reanimateOrNoPainValue, and randomSource are optional.
Output's wounded and unsavedWounds might not be present.

@param {object} (which may be mutated) with: diceCount, maxWounds, toHitValue, toWoundValue, ?saveValue, ?reanimateOrNoPainValue, ?randomSource
@returns {object} with: hit, ?wounded, ?unsavedWounds
*/
Warhammer.AttackUnit = function(input)
{
   Warhammer.AttackUnit._validateInput(input);
   //randomSource not validated because die will validate it

   var d6 = new Die();
   function rollD6Pool(name, count){return new DicePool(name, [{die: d6, dieCount: count}]).roll(input.randomSource);}
   var output = {};
   output.toString = function(){return Warhammer.AttackUnit.Stringifier(this);};

   var attackRolled = rollD6Pool('hits', input.diceCount);
   output.hit = 0;
   for (var i = 0; i < attackRolled.length; ++i)
   {
      if(attackRolled[i] >= input.toHitValue) ++output.hit;
   }
   if(0 === output.hit) return output;

   attackRolled = rollD6Pool('wounds', output.hit);
   output.wounded = 0;
   for (var i = 0; i < attackRolled.length; ++i)
   {
      if(attackRolled[i] >= input.toWoundValue) ++output.wounded;
   }
   if(0 === output.wounded) return output;

   var savesRolled = rollD6Pool('saves', output.wounded);
   //all saves are rolled now then reanimateOrNoPainValue might be rolled. only a test would care about this order
   output.unsavedWounds = 0;
   for (var i = 0; i < savesRolled.length && input.maxWounds > output.unsavedWounds; ++i)
   {
      if (savesRolled[i] < input.saveValue)  //save failed
      {
         //the if > 6 check prevents an unneeded roll but is really to make testing easier
         if (input.reanimateOrNoPainValue > 6 || d6.roll(input.randomSource)[0] < input.reanimateOrNoPainValue)
         {
            ++output.unsavedWounds;
            //lost knowledge: last value of i (might not be savesRolled.length)
            //the game doesn't care about excessive wounds
         }
      }
   }
   return output;
};
/**Given valid input for Warhammer.AttackUnit, this function calculates the
chances of the number of wounds.
@param {object} (which may be mutated) with: diceCount, maxWounds, toHitValue, toWoundValue, ?saveValue, ?reanimateOrNoPainValue
@returns {object[]} a statistics object where the result is the number of wounds
*/
Warhammer.AttackUnit.Statistics = function(input)
{
   Warhammer.AttackUnit._validateInput(input);
   //randomSource isn't used in this function so ignore it

   var d6 = new Die();
   var workingStats = [{result: input.diceCount, probability: 1}];

   //the if statements are to avoid unnecessary calculations (that will ultimately multiply by 1)
   //TODO: validate doesn't allow toHitValue of 0 etc
   if(input.toHitValue > 1) workingStats = nextPhase(workingStats, '>=' + input.toHitValue);
   if(input.toWoundValue > 1) workingStats = nextPhase(workingStats, '>=' + input.toWoundValue);
   if(input.saveValue < 7) workingStats = nextPhase(workingStats, '<' + input.saveValue);
   if(input.reanimateOrNoPainValue < 7) workingStats = nextPhase(workingStats, '<' + input.reanimateOrNoPainValue);

   processWoundMax(input.maxWounds, workingStats);

   return workingStats;

   /**Rolling to hit and rolling to wound are 2 phases that would each call this function.*/
   function nextPhase(previousStats, passCriteria)
   {
      var workingExpression = new DiceExpression(true);
      for (var i = 0; i < previousStats.length; ++i)
      {
         if (0 === previousStats[i].result)  //i = 0 is the only one that might have a result of 0
         {
            //all dice failed
            workingExpression.addTerm({coefficient: previousStats[i].probability, exponent: previousStats[i].result});
            continue;  //must continue because Statistics.passFailBinomial won't take 0 trials
         }
         var newStats = Statistics.passFailBinomial(d6, previousStats[i].result, passCriteria);
         Statistics.determineProbability(newStats);
         /*previousStats was the results of the previous phase.
         workingExpression will be the results of this phase.
         newStats is the results that came from a single result of the previous phase.
         newStats must be ANDed with the preconditions which is previousStats[i].probability.

         For example: if this phase is rolling to wound then previousStats are the results of rolling
         to hit. If i is 3 then newStats is the stats for all possible wounds if there are 3 hits.
         workingExpression is the running total of all ways to get each wound count.*/
         combinePhase(workingExpression, newStats, previousStats[i].probability);
      }
      return workingExpression.toDiceResults();
   }
   /**All of the newStats are combined into the workingExpression after being ANDed by multiplier.*/
   function combinePhase(workingExpression, newStats, multiplier)
   {
      for (var i = 0; i < newStats.length; ++i)
      {
         newStats[i].probability *= multiplier;
         workingExpression.addTerm({coefficient: newStats[i].probability, exponent: newStats[i].result});
      }
   }
   /**This function combines all results above the maximum wounds ORing together the probability.*/
   function processWoundMax(maxWounds, stats)
   {
      //already validated that maxWounds was a natural number so we don't need && stats.length > 1
      while (stats.last().result > maxWounds)  //too many wounds
      {
         stats[stats.length-2].probability += stats[stats.length-1].probability;
         stats.pop();  //then remove the last
      }
   }
};
/**This is an internal function called by Warhammer.AttackUnit and Warhammer.AttackUnit.Statistics
it isn't intended to be called directly. All it does is default values and throw.*/
Warhammer.AttackUnit._validateInput = function(input)
{
   Validation.requireNaturalNumber(input.diceCount);
   Validation.requireNaturalNumber(input.maxWounds);
   //TODO: toHitValue and toWoundValue must be 1-6... can an attack ever ignore these?
   Validation.requireNaturalNumber(input.toHitValue);
   Validation.requireNaturalNumber(input.toWoundValue);

   //saveValue is optional because some attacks ignore saves
   if(undefined === input.saveValue) input.saveValue = 7;  //an impossible number
   Validation.requireNaturalNumber(input.saveValue);

   //Reanimation Protocol states that if the unit also has Feel No Pain then you must choose only 1 of them to use.
   //most units have neither
   if(undefined === input.reanimateOrNoPainValue) input.reanimateOrNoPainValue = 7;
   Validation.requireNaturalNumber(input.reanimateOrNoPainValue);

   //randomSource is not validated because die will validate it
};
/**
@param {!object} attackResults the results of Warhammer.AttackUnit
@returns {!string} a human readable description of those results
*/
Warhammer.AttackUnit.Stringifier = function(attackResults)
{
   if(0 === attackResults.hit) return 'None hit.';
   var output = 'Number hit: ' + attackResults.hit + '. ';

   if(0 === attackResults.wounded) return output + 'None wounded.';
   output += 'Number wounded: ' + attackResults.wounded + '. ';

   if(0 === attackResults.unsavedWounds) return output + 'All Saved.';
   output += 'Unsaved Wounds: ' + attackResults.unsavedWounds + '.';

   return output;
};
/**
This is prebuilt function for Warhammer for when an attack is made with a template.
This function only rolls the scatter dice (both the arrow die and the numbered die) but doesn't roll anything else like damage.
Output's wounded and unsavedWounds might not be present.

@param {boolean} alwaysScatter defaults to false. If true the result will never be 'Direct Hit'.
@param {?function} randomSource optional. a function that returns a random number between 0 inclusive and 1 exclusive.
   If not provided Math.random will be used.
@returns {object} with: result (either 'Misfire', 'Direct Hit', or 'Scatter'), ?angleInDegrees, ?distance (in inches)
*/
Warhammer.RollScatterDice = function(alwaysScatter, randomSource)
{
   if(true !== alwaysScatter) alwaysScatter = false;
   if(undefined == randomSource) randomSource = Math.random;
   else Validation.requireTypeOf('function', randomSource);

   var distance = new Die().roll(randomSource)[0] * 2;  //a d6 numbered 2,4,6,8,10,Misfire
   if(12 === distance) return {result: 'Misfire'};  //misfire trumps direct hit
   if(!alwaysScatter && 3 === new Die(3).roll(randomSource)[0]) return {result: 'Direct Hit'};  //TODO: is bullseye a more standard term? http://www.librarium-online.com/forums/aos-rules-help/142214-scatter-dice.html
   var angle = randomSource()*360;  //don't use a Die because I don't want rounding (and using Die then adding randomSource would be pointless)
   return {result: 'Scatter', angleInDegrees: angle, distance: distance};
};
