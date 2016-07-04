'use strict';
var Prebuilt = {};
/**
This is prebuilt function for rolling dice in the game Legend of the Five Rings (L5R).
Input's circumstanceBonus, numberOfRaises, and randomSource are optional.
Input's circumstanceBonus can also be negative to represent a penalty.
Note that the numberOfRaises will raise the targetNumber so don't pass in any free raises.
Likewise if a free raise was used to increase the result then instead add 5 to circumstanceBonus.

Simplified contract, given:
{?circumstanceBonus, ?numberOfRaises, targetNumber, diceRolled, diceKept, ?hasEmphasis, ?randomSource}
returns:
{valuesKept[], totalValue, voidPointsRecovered, valuesDropped[], success}

@param {object} input with: {?number: integer}circumstanceBonus, {?number: natural}numberOfRaises,
   {number: natural}targetNumber, {number: natural}diceRolled, {number: natural}diceKept,
   {?boolean}hasEmphasis, {?function}randomSource (see Die.roll)
@returns {object} with: {number[]: natural}valuesKept, {number: integer}totalValue, {number: integer}voidPointsRecovered,
   {number[]: natural}valuesDropped, {boolean}success
*/
//TODO: consider how to improve doc (for all functions)
Prebuilt.L5RGeneralRoll = function(input)
{
   if(undefined === input.circumstanceBonus) input.circumstanceBonus = 0;
   else if(!Number.isInteger(input.circumstanceBonus)) throw new Error('Must be an integer but was ' + input.circumstanceBonus);
   if(undefined === input.numberOfRaises) input.numberOfRaises = 0;
   else requireNaturalNumber(input.numberOfRaises);
   requireNaturalNumber(input.targetNumber);
   requireNaturalNumber(input.diceRolled);
   if(input.diceRolled > 10) throw new Error('It\'s never possible to roll more than 10 dice. input was: ' + input.diceRolled);
   requireNaturalNumber(input.diceKept);
   if(input.diceKept > input.diceRolled) throw new Error('diceKept (' + input.diceKept + ') is more than diceRolled (' + input.diceRolled + ')');
      //below doesn't use DicePool's KeepHighest therefore I must validate diceKept myself
   if(true !== input.hasEmphasis) input.hasEmphasis = false;

   input.targetNumber += (input.numberOfRaises * 5);  //increase difficulty

   var output = {valuesKept: [], totalValue: 0, voidPointsRecovered: 0, valuesDropped: []};
   var dicePool = new DicePool(input.diceRolled + 'd10!!' + (input.hasEmphasis ? 'r1' : ''));

   var allValues = dicePool.roll(input.randomSource);
   allValues.sort(Number.ascending);

   //start with the highest number and count down until there's no explosion
   for (var i = allValues.length - 1; i >= 0 && allValues[i] >= 10; --i)
   {
      output.voidPointsRecovered += Math.floor(allValues[i] / 10);  //for each explode. most dice don't recover void
      //void points are recovered even for dice that are dropped
   }
   output.voidPointsRecovered = Math.floor(output.voidPointsRecovered / 2);  //every other explode

   var dropCount = (allValues.length - input.diceKept);
   output.valuesDropped = allValues.splice(0, dropCount);
   output.valuesKept = allValues;  //rename allValues since it has been mutated
   output.totalValue = Math.summation(output.valuesKept) + input.circumstanceBonus;  //circumstanceBonus may be negative

   output.success = (output.totalValue >= input.targetNumber);

   return output;
};
/**
This is prebuilt function for Warhammer for when a unit attacks a unit.
This doesn't account for things like Helfrost or instant death.
Input's saveValue, reanimateOrNoPainValue, and randomSource are optional.
Output's wounded and unsavedWounds might not be present.

@param {object} with: diceCount, maxWounds, toHitValue, toWoundValue, ?saveValue, ?reanimateOrNoPainValue, ?randomSource
@returns {object} with: hit, ?wounded, ?unsavedWounds
*/
Prebuilt.WarhammerAttackUnit = function(input)
{
   Prebuilt.WarhammerAttackUnit._validateInput(input);
   //randomSource not validated because die will validate it

   var d6 = new Die();
   function rollD6Pool(name, count){return new DicePool(name, [{die: d6, dieCount: count}]).roll(input.randomSource);}
   var output = {};
   output.toString = function(){return Stringifier.WarhammerAttackUnit(this);};

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
/**Given valid input for Prebuilt.WarhammerAttackUnit, this function calculates the
chances of the number of wounds.
@param {object} with: diceCount, maxWounds, toHitValue, toWoundValue, ?saveValue, ?reanimateOrNoPainValue
@returns {object[]} a statistics object where the result is the number of wounds
*/
Prebuilt.WarhammerAttackUnit.Statistics = function(input)
{
   Prebuilt.WarhammerAttackUnit._validateInput(input);
   //randomSource isn't used in this function so ignore it

   var d6 = new Die();
   var workingStats = [{result: input.diceCount, probability: 1, frequency: 1}];

   //the if statements are to avoid unnecessary calculations (that will ultimately multiply by 1)
   //TODO: validate doesn't allow toHitValue of 0 etc
   if(input.toHitValue > 1) workingStats = nextPhase(workingStats, '>=' + input.toHitValue);
   if(input.toWoundValue > 1) workingStats = nextPhase(workingStats, '>=' + input.toWoundValue);
   if(input.saveValue < 7) workingStats = nextPhase(workingStats, '<' + input.saveValue);
   if(input.reanimateOrNoPainValue < 7) workingStats = nextPhase(workingStats, '<' + input.reanimateOrNoPainValue);

   processWoundMax(input.maxWounds, workingStats);

   return workingStats;

   function nextPhase(workingStats, passCriteria)
   {
      var workingExpression = new DiceExpression([{coefficient: 1, exponent: 1}], true);
      workingExpression.addTerm({coefficient: -1, exponent: 1});  //it is now empty
      for (var i = 0; i < workingStats.length; ++i)
      {
         if (0 === workingStats[i].result)  //i = 0 is the only one that might have a result of 0
         {
            workingExpression.addTerm({coefficient: workingStats[i].probability, exponent: workingStats[i].result});
            continue;  //all dice failed
         }
         var newStats = Statistics.passFailBinomial(d6, workingStats[i].result, passCriteria);
         Statistics.determineProbability(newStats);
         //TODO: explain with a comment:
         combinePhase(workingExpression, newStats, workingStats[i].probability);
      }
      return workingExpression.toDiceResults();
   }
   function combinePhase(workingExpression, newStats, multiplier, frequencyMultiplier)
   {
      for (var i = 0; i < newStats.length; ++i)
      {
         newStats[i].probability *= multiplier;
         //TODO: I think I could actually multiply the frequency instead of using probability:
         //newStats[i].frequency *= frequencyMultiplier;
         workingExpression.addTerm({coefficient: newStats[i].probability, exponent: newStats[i].result});
      }
   }
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
Prebuilt.WarhammerAttackUnit._validateInput = function(input)
{
   requireNaturalNumber(input.diceCount);
   requireNaturalNumber(input.maxWounds);
   //TODO: toHitValue and toWoundValue must be 1-6... I think?
   requireNaturalNumber(input.toHitValue);
   requireNaturalNumber(input.toWoundValue);

   //saveValue is optional because some attacks ignore saves
   if(undefined === input.saveValue) input.saveValue = 7;  //an impossible number
   requireNaturalNumber(input.saveValue);

   //Reanimation Protocol states that if the unit also has Feel No Pain then you must choose only 1 of them
   //but most units have neither
   if(undefined === input.reanimateOrNoPainValue) input.reanimateOrNoPainValue = 7;
   requireNaturalNumber(input.reanimateOrNoPainValue);

   //randomSource is not validated because die will validate it
};
