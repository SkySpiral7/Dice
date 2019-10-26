'use strict';
var HH = {};
//TODO: needs tests
HH.SkillCheck = function(effectiveSkill, difficultyClass, randomSource)
{
   var diceSum = new DicePool('3dF').sumRoll(randomSource);
   if(3 === diceSum) ++diceSum;
   else if(-3 === diceSum) return false;  //Critical Failure is an Automatic failure
   var result = diceSum + effectiveSkill;
   return (result >= difficultyClass);
};
HH.PowerCheck = function(rank, difficultyClass, randomSource)
{
   var diceSum = new DicePool('3dF').sumRoll(randomSource);
   if(3 === diceSum) ++diceSum;
   else if(-3 === diceSum) --diceSum;
   var result = diceSum + rank;
   return (result >= difficultyClass);
};
//TODO: other attacks are possible
HH.Damage = function(attack, activeDefense, damageRank, toughness, randomSource)  //TODO: non-lethal is possible but requires HP
{
   var diceSum = 0, attackThreat = false, normalHit = true;
   var fudgePool = new DicePool('3dF');
   if (undefined !== attack)
   {
      diceSum = fudgePool.sumRoll(randomSource);
      if(-3 === diceSum) return 'Critical Miss';  //Critical Failure is an Automatic failure
      attackThreat = (3 === diceSum);
      var attackResult = diceSum + attack;
      var activeDefenseResult = 0;  //defenseless uses 0
      if (undefined !== activeDefense)  //TODO: why undefined instead of 0?
      {
         diceSum = fudgePool.sumRoll(randomSource);
         if(-3 === diceSum) activeDefenseResult = -Infinity;  //Critical Failure is an Automatic failure
         else if(3 === diceSum) activeDefenseResult = 4;  //Critical Success is +1
         else activeDefenseResult = diceSum + activeDefense;
      }
      normalHit = (attackResult >= activeDefenseResult);
      if(!attackThreat && !normalHit) return 'Miss';
   }
   diceSum = fudgePool.sumRoll(randomSource);
   if(3 === diceSum) ++diceSum;
   else if(-3 === diceSum) --diceSum;
   var damageRolled = diceSum + damageRank;
   if(attackThreat && normalHit) ++damageRolled;  //critical hit confirmed. TODO: can also be used for Added Effect
   //TODO: return JSON instead: {attack, damage, toString}

   diceSum = fudgePool.sumRoll(randomSource);
   if(3 === diceSum) ++diceSum;
   else if(-3 === diceSum) --diceSum;
   var toughnessRolled = diceSum + toughness;

   var damageDealt = damageRolled - toughnessRolled;
   if(damageDealt < 0) return 'Damage failed';

   return damageDealt + ' Damage';  //0 is ok
};
