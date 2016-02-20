'use strict';
var Prebuilt = {};
/**
This is prebuilt helper for Warhammer for when a unit attacks a unit.
This doesn't account for things like Helfrost, instant death, or attacks that ignore saves.
Input's saveValue, reanimateOrNoPainValue, and randomSource are optional.
Output's wounded and unsavedWounds might not be present.

@param {object} with: diceCount, maxWounds, toHitValue, toWoundValue, ?saveValue, ?reanimateOrNoPainValue, ?randomSource
@returns {object} with: hit, ?wounded, ?unsavedWounds
*/
Prebuilt.WarhammerAttackUnit = function(input)
{
   //TODO: re: make helpers assertTypeOf(obj, type) and assertInstanceOf(obj, instance)
   if(typeof(input.diceCount)!=="number" || isNaN(input.diceCount)) throw new Error("WarhammerAttackUnit, input.diceCount ("+input.diceCount+") the must be a number type.");
   if(typeof(input.toHitValue)!=="number" || isNaN(input.toHitValue)) throw new Error("WarhammerAttackUnit, input.toHitValue ("+input.toHitValue+") the must be a number type.");
   if(typeof(input.toWoundValue)!=="number" || isNaN(input.toWoundValue)) throw new Error("WarhammerAttackUnit, input.toWoundValue ("+input.toWoundValue+") the must be a number type.");
   if(undefined === input.saveValue) input.saveValue = 7;  //an impossible number
   if(typeof(input.saveValue)!=="number" || isNaN(input.saveValue)) throw new Error("WarhammerAttackUnit, input.saveValue ("+input.saveValue+") the must be a number type.");
   if(undefined === input.reanimateOrNoPainValue) input.reanimateOrNoPainValue = 7;
   if(typeof(input.reanimateOrNoPainValue)!=="number" || isNaN(input.reanimateOrNoPainValue)) throw new Error("WarhammerAttackUnit, input.reanimateOrNoPainValue ("+input.reanimateOrNoPainValue+") the must be a number type.");
   //TODO: re: more validation and test them:
   //also: all must be natural numbers. and validate maxWounds (but not randomSource)

   var attackRolled = new DicePool(input.diceCount + 'd6').roll(input.randomSource);
   var output = {hit: 0};
   for (var i = 0; i < attackRolled.length; ++i)
   {
      if(attackRolled[i] >= input.toHitValue) ++output.hit;
   }
   if(0 === output.hit) return output;

   attackRolled = new DicePool(output.hit + 'd6').roll(input.randomSource);
   //attackRolled = new DicePool('hits', [{die: new Die(), dieCount: output.hit}]).roll(input.randomSource);
      //nah the first is easier to read
   output.wounded = 0;
   for (var i = 0; i < attackRolled.length; ++i)
   {
      if(attackRolled[i] >= input.toWoundValue) ++output.wounded;
   }
   if(0 === output.wounded) return output;

   var savesRolled = new DicePool(output.wounded + 'd6').roll(input.randomSource);
   //all saves are rolled now then reanimateOrNoPainValue might be rolled. only a test would care about this order
   output.unsavedWounds = 0;
   for (var i = 0; i < savesRolled.length && input.maxWounds > output.unsavedWounds; ++i)
   {
      if (savesRolled[i] < input.saveValue)  //save failed
      {
         if (input.reanimateOrNoPainValue < 7 && new Die().roll(input.randomSource)[0] < input.reanimateOrNoPainValue)
         {
            ++output.unsavedWounds;
            //lost knowledge: last value of i (might not be savesRolled.length)
            //the game doesn't care about excessive wounds
         }
      }
   }
   //output.toString = function(){return Stringifier.WarhammerAttackUnit(this);};
   return output;
};
//TODO: re: Stringifier.WarhammerAttackUnit
