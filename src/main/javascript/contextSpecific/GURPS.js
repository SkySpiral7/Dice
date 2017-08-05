'use strict';
/**This was made to focus on 3rd edition although the functions also work for 4th edition.*/
var GURPS = {};
/**A "reaction roll" is a roll made by the GM to determine how his NPCs react to the PCs.
@param {?number} reactionModifier an integer which is the total modifier to the dice sum. defaults to 0.
@param {?function} randomSource optional. Will be passed to DicePool.sumRoll
@returns {string} one of: Disastrous, Very Bad, Bad, Poor, Neutral, Good, Very Good, Excellent
*/
GURPS.ReactionRoll = function(reactionModifier, randomSource)
{
   if(undefined === reactionModifier) reactionModifier = 0;
   Validation.requireInteger(reactionModifier);
   var resultNumber = new DicePool('3d6').sumRoll(randomSource) + reactionModifier;
   if(resultNumber <= 0) return 'Disastrous';
   if(resultNumber <= 3) return 'Very Bad';
   if(resultNumber <= 6) return 'Bad';
   if(resultNumber <= 9) return 'Poor';
   if(resultNumber <= 12) return 'Neutral';
   if(resultNumber <= 15) return 'Good';
   if(resultNumber <= 18) return 'Very Good';
   return 'Excellent';
};
/**A "success roll" is a die roll made when you need to "test" one of your skills or abilities.
You may not attempt a success roll if your effective skill is less than 3 unless you are attempting a defense roll.
This function assumes that you are allowed to make a success roll.

@param {number} effectiveSkill an integer which is the sum of your base skill (including defense) and all modifiers.
@param {?function} randomSource optional. Will be passed to DicePool.sumRoll
@returns {object} with {boolean} success, {boolean} critical, and {number} margin the absolute value of the difference between
your effectiveSkill and the dice sum. Used by 4e (margin of success and margin of failure) and internally for quick contests (3e and 4e).
margin is undefined for criticals since they ignore the difference between the sum and effectiveSkill.
margin is undefined for a sum of 17 which always fails.
*/
GURPS.SuccessRoll = function(effectiveSkill, randomSource)
{
   Validation.requireInteger(effectiveSkill);
   var sumRolled = new DicePool('3d6').sumRoll(randomSource);

   //TODO: ask Tim: are all non-attack, non-contest rolls a success roll (eg: negative HT and rolling to stay awake)?
      //If no do crits exist for these? Do crits always exist for success rolls?
   //TODO: ask 4e: is the margin defined for crits? If so it can be negative? Eg skill 2 sum 3 margin: -1
   if (sumRolled <= 4
      || (5 === sumRolled && effectiveSkill >= 15)
      || (6 === sumRolled && effectiveSkill >= 16)) return {success: true, critical: true};

   if(18 === sumRolled) return {success: false, critical: true};
   //TODO: ask 4e: what is the margin of failure for sum 17 skill 17+? I heard that there is a "rule of 16" which caps effectiveSkill at 16, is that always true?
   else if(17 === sumRolled) return {success: false, critical: (effectiveSkill < 16)};  //sum 17 is the reason I don't or them together
   else if(sumRolled >= (effectiveSkill + 10)) return {success: false, critical: true};

   return {success: (sumRolled <= effectiveSkill), critical: false, margin: Math.abs(sumRolled - effectiveSkill)};
};
GURPS.beta = {};
GURPS.beta.QuickContestedSuccessRoll = function(effectiveSkill1, effectiveSkill2, randomSource)
{
   throw new Error('Not finished');  //TODO: finishing this is blocked by contest questions below
   //3e page 2. 4e page 3
   var characterResult1 = GURPS.SuccessRoll(effectiveSkill1, randomSource);
   var characterResult2 = GURPS.SuccessRoll(effectiveSkill2, randomSource);
   if(characterResult1.success && !characterResult2.success) return 'Character 1';
   if(!characterResult1.success && characterResult2.success) return 'Character 2';
   //"the winner is the one who succeeded by the most, or failed by the least." that doesn't work for crit or sum 17
   //TODO: ask Tim: do contests (quick or regular) care about criticals? If so Alice with 5 Success vs Bob with 6 Criticial Success, who won?
   //TODO: ask Tim: in contests (quick or regular) does it matter if the tie was "both succeeded" or "both failed"?
   var diff = character1 - character2;
   if(diff < 0) return 'Character 1';
   if(diff > 0) return 'Character 2';
   //4e adds a "margin of victory" which is the diff between
   return 'Tie';
};
GURPS.beta.RegularContestedSuccessRoll = function(effectiveSkill1, effectiveSkill2, randomSource)
{
   throw new Error('Not finished');  //TODO: finishing this is blocked by contest questions above
   //3e page 2. 4e page 3
   Validation.requireInteger(effectiveSkill1);
   Validation.requireInteger(effectiveSkill2);
   //4e doesn't look like it uses the reduction
   //TODO: ask Tim: does 3e always reduce like this or is it a GM judgement call? The answer will prompt a boolean passed in or a GURPS version passed in
   if (effectiveSkill1 > 14 && effectiveSkill2 > 14)
   {
      var max = Math.max(effectiveSkill1, effectiveSkill2);
      var diff = max - 14;
      effectiveSkill1 -= diff;
      effectiveSkill2 -= diff;
   }
   var characterResult1 = GURPS.SuccessRoll(effectiveSkill1, randomSource);
   var characterResult2 = GURPS.SuccessRoll(effectiveSkill2, randomSource);
   if(characterResult1.success && !characterResult2.success) return 'Character 1';
   if(!characterResult1.success && characterResult2.success) return 'Character 2';
   //note that neither edition needs to know the margin of victory and I doubt there's any difference between "both succeeded" and "both failed"
   return 'Tie';
};
/**Not compatable with 4e if Tim says that min basic damage is different. Otherwise it can do both. Could still do both if given gurps version*/
GURPS.beta.Attack3e = function(attackEffectiveSkill, defenseEffectiveSkill, damageString, damageReduction, randomSource)
{
   throw new Error('Not even close to finished');  //TODO: finishing this is blocked by a huge number of questions below
   //3e pages 25, 26. 4e pages 26, 27
   var attackResult = GURPS.SuccessRoll(attackEffectiveSkill, randomSource);
   //TODO: ask Tim: is there any difference between crit fail and fail for attack?
   if(!attackResult.success) return 'Miss';
   if (!attackResult.critical)  //crit hit ignores defense
   {
      var defenseResult = GURPS.SuccessRoll(defenseEffectiveSkill, randomSource);  //note that crit success is a success even if skill is 1 or 2 (consistent with SuccessRoll)
      //TODO: ask Tim: is there any difference between crit success and success for defense?
      //TODO: ask Tim: is there any difference between crit failure and failure for defense?
      //TODO: ask Tim: each active defense says "per turn" is that a Pathfinder round?
      if(defenseResult.success) return 'Dodge';
      //TODO: All-Out Defense gets 2 defense rolls
      //TODO: if there's 2 defense they need to know whether parry succeeded because it has an auto counter attack
      //TODO: failing to parry bare-handed lets them attack your arms instead of torso. 4e doesn't have this
      //TODO: ask Tim: does All-Out Defense have an exception for crit failure?
      //TODO: ask Tim: All-Out Defense with fencing weapon and fencing skill says defend any number of times. Is it still only twice per attack?
      //TODO: All-Out Attack and others have no defense roll (if there's no passive defense)
      //TODO: ask Tim: if you have passive defense do you get to roll defense against a critical hit?
   }
   if(3 === attackResult) return 'Max damage';
   //TODO: ask Tim: "Add the 50% damage bonus for a cutting weapon" (after DR). Is this the only damage percent boost? If not are they all +50%? Is there any damage percent reduction?
   //TODO: in 4e "wounding modifier." apply after DR. Small piercing is x0.5 (min of 1), Cutting and large piercing is x1.5, Impaling is x2. Notice cutting is the same in 3e
   //TODO: some weapons half a half damage range (divide before DR)
   //TODO: ask Tim: Does non-lethal damage exist? If so how does it work?
   //TODO: explosion roll damage as-is (no attack or defense) and have damage precent reduction
   //TODO: in 4e crushing has a min damage of 0 (before DR) and everything else has a min damage of 1 (before DR)
   //TODO: ask Tim: in 3e does damage has a min of 1 or 0 before DR? Does type (eg crushing) make a difference?
   var damageAmount = (GURPS._parseDamageString(damageString)(randomSource) - damageReduction);
   if(damageAmount <= 0) return 'No damage';
   return damageAmount + ' Damage';
};
GURPS._parseDamageString = function(debugString)
{
   //TODO: consider moving min basic damage etc into here when working on Attack
   //TODO: ask Tim: are there any damage that has -1.5 or x1.5 or anything non-whole number? Well explosives deal 1/4 damage by yard away
   debugString = '' + debugString;  //enforces string type and is null safe
   var workingString = debugString.trim().toLowerCase();

   if(!(/^\d+d6?(?:[-+*x]\d+)?$/).test(workingString)) throw new Error('Expected #d (and optional +# etc). Found: ' + debugString);
   workingString = workingString.replace('x', '*');
   var dieCount = Number.parseInt(workingString);  //only parses leading integer
   workingString = workingString.replace(/^\d+d6?/, '');
   var dicePool = new DicePool([{die: new Die(), dieCount: dieCount}]);
   return function(randomSource)
   {
      var sum = dicePool.sumRoll(randomSource);
      return eval(''+sum+workingString);  //workingString may be the empty string
   }
};
