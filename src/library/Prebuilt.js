'use strict';
var Prebuilt = {};
/**
This is prebuilt function for Warhammer for when a unit attacks a unit.
This doesn't account for things like Helfrost, instant death, or attacks that ignore saves.
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
//TODO: doc
//TODO: see old/stats util.js@generate_Binomials
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
   //TODO: each required one must be 1-6
   requireNaturalNumber(input.diceCount);
   requireNaturalNumber(input.maxWounds);
   requireNaturalNumber(input.toHitValue);
   requireNaturalNumber(input.toWoundValue);

   //saveValue is optional because some attacks ignore saves
   if(undefined === input.saveValue) input.saveValue = 7;  //an impossible number
   requireNaturalNumber(input.saveValue);

   //Reanimation Protocol states that if the unit also has Feel No Pain then you must choose only 1 of them
   //but most units have neither
   if(undefined === input.reanimateOrNoPainValue) input.reanimateOrNoPainValue = 7;
   requireNaturalNumber(input.reanimateOrNoPainValue);
   //randomSource not validated because die will validate it
};
