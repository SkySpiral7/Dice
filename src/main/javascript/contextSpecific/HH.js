'use strict';
//TODO: needs tests
var HH = {};
HH.SkillCheck = function(effectiveSkill, difficultyClass, randomSource)
{
   var diceSum = new DicePool('3dF').sumRoll(randomSource);
   if(3 === diceSum) ++diceSum;
   else if(-3 === diceSum) return false;  //Critical Failure is an Automatic failure
   var result = diceSum + effectiveSkill;
   return (result >= difficultyClass);
};
HH.PowerCheckVsDc = function(rank, difficultyClass, randomSource)
{
   var diceSum = new DicePool('3dF').sumRoll(randomSource);
   if(3 === diceSum) ++diceSum;
   else if(-3 === diceSum) --diceSum;
   var result = diceSum + rank;
   return (result >= difficultyClass);
};
//TODO: other attacks are possible
//TODO: input: {attacker: {attack: 0, damageRank: 0, lethal: true}, defender: {hp: 5, condition: null, activeDefense: 0, toughness: 0}}, randomSource
HH.Damage = function(attack, activeDefense, damageRank, toughness, randomSource)  //TODO: non-lethal is possible but requires HP
{
   var diceSum = 0, attackThreat = false, normalHit = true;
   var fudgePool = new DicePool('3dF');
   if (undefined !== attack)  //Perception range
   {
      diceSum = fudgePool.sumRoll(randomSource);
      if(-3 === diceSum) return {attack: 'Critical Miss', toString: function(){return 'Critical Miss';}};  //Critical Failure is an Automatic failure
      attackThreat = (3 === diceSum);
      var attackResult = diceSum + attack;
      var activeDefenseResult = 0;  //defenseless uses 0
      //TODO: also support vulnerable (half the result)
      if (undefined !== activeDefense)
      {
         diceSum = fudgePool.sumRoll(randomSource);
         if(-3 === diceSum) activeDefenseResult = -Infinity;  //Critical Failure is an Automatic failure
         else if(3 === diceSum) activeDefenseResult = 4;  //Critical Success is +1
         else activeDefenseResult = diceSum + activeDefense;
      }
      normalHit = (attackResult >= activeDefenseResult);
      if(!attackThreat && !normalHit) return {attack: 'Miss', toString: function(){return 'Miss';}};
   }
   diceSum = fudgePool.sumRoll(randomSource);
   if(3 === diceSum) ++diceSum;
   else if(-3 === diceSum) --diceSum;
   var damageRolled = diceSum + damageRank;
   if(attackThreat && normalHit) ++damageRolled;  //critical hit confirmed. TODO: can also be used for Added Effect

   diceSum = fudgePool.sumRoll(randomSource);
   if(3 === diceSum) ++diceSum;
   else if(-3 === diceSum) --diceSum;
   var toughnessRolled = diceSum + toughness;

   var damageDealt = damageRolled - toughnessRolled;
   //TODO: include critical hit
   if(damageDealt < 0) return {attack: 'Hit', toString: function(){return 'Damage failed';}};  //damage: undefined

   return {attack: 'Hit', damage: damageDealt, toString: function(){return damageDealt + ' Damage';}};  //0 is ok
};
