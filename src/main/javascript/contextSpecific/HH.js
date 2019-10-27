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
HH.Damage = function(input, randomSource)
{
   var diceSum = 0, criticalHit = false;
   var fudgePool = new DicePool('3dF');
   if (undefined !== input.attack)  //Perception range
   {
      diceSum = fudgePool.sumRoll(randomSource);
      if(-3 === diceSum) return {attack: 'Critical Miss', toString: function(){return 'Critical Miss';}};  //Critical Failure is an Automatic failure
      var attackThreat = (3 === diceSum);
      var attackResult = diceSum + input.attack;
      var activeDefenseResult = 0;  //defenseless uses 0
      //TODO: also support vulnerable (half the result)
      if (undefined !== input.activeDefense)
      {
         diceSum = fudgePool.sumRoll(randomSource);
         if(-3 === diceSum) activeDefenseResult = -Infinity;  //Critical Failure is an Automatic failure
         else if(3 === diceSum) activeDefenseResult = 4;  //Critical Success is +1
         else activeDefenseResult = diceSum + input.activeDefense;
      }
      var normalHit = (attackResult >= activeDefenseResult);
      if(!attackThreat && !normalHit) return {attack: 'Miss', toString: function(){return 'Miss';}};
      criticalHit = (attackThreat && normalHit);  //critical hit confirmed
   }
   diceSum = fudgePool.sumRoll(randomSource);
   if(3 === diceSum) ++diceSum;
   else if(-3 === diceSum) --diceSum;
   var damageRolled = diceSum + input.damageRank;
   var attackString = criticalHit ? 'Critical Hit' : 'Hit';
   if(criticalHit) ++damageRolled;  //can also be used for Added Effect but uses Increased Effect by default.
   // Caller will have to check attack and -1 if they don't want the +1
   //TODO: what about crit vs minion?
   //"Against a minion, this bypasses the defense check entirely; the minion automatically receives the highest degree of the attack's effect."
   //what does that mean?

   diceSum = fudgePool.sumRoll(randomSource);
   if(3 === diceSum) ++diceSum;
   else if(-3 === diceSum) --diceSum;
   var toughnessRolled = diceSum + input.toughness;

   var damageDealt = damageRolled - toughnessRolled;
   if(damageDealt < 0) return {attack: attackString, toString: function(){return 'Damage failed';}};  //damage: undefined

   return {attack: attackString, damage: damageDealt, toString: function(){return damageDealt + ' Damage';}};  //0 is ok
};
