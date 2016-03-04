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
         //the if < 7 check prevents an unneeded roll but is really to make testing easier
         if (input.reanimateOrNoPainValue < 7 && d6.roll(input.randomSource)[0] < input.reanimateOrNoPainValue)
         {
            ++output.unsavedWounds;
            //lost knowledge: last value of i (might not be savesRolled.length)
            //the game doesn't care about excessive wounds
         }
      }
   }
   return output;
};
