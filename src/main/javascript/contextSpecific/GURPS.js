'use strict';
var GURPS = {};
//TODO: include in tabletop dice when at least 1 is finished
GURPS.ReactionRoll = function(reactionModifier, randomSource)
{
   //TODO: prod is finished. only needs tests (test include) and doc
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
GURPS.SuccessRoll = function(basicSkill, modifier, randomSource)
{
   //3e page 2. 4e pages 2, 3
   //TODO: could finish if I assume crits always exist. only needs validation, tests, and doc.
   //validation "You may not attempt a success roll if your effective skill is less than 3 unless you are attempting a defense roll"
   var effectiveSkill = basicSkill + modifier;
   var sumRolled = new DicePool('3d6').sumRoll(randomSource);

   //TODO: ask Tim: When Unconsciousness and rolling to live do crits still function? Ie for non-attack, non-contest rolls do crits always exist?
   if(sumRolled <= 4) return 'Critical success';
   if(5 === sumRolled && effectiveSkill >= 15) return 'Critical success';
   if(6 === sumRolled && effectiveSkill >= 16) return 'Critical success';

   if(18 === sumRolled) return 'Critical failure';
   if(17 === sumRolled && effectiveSkill < 16) return 'Critical failure';
   if(sumRolled >= (effectiveSkill + 10)) return 'Critical failure';

   //4e added "DEGREE OF SUCCESS OR FAILURE" if not a crit. 3e also needs this for QuickContestedSuccessRoll
   if(sumRolled <= effectiveSkill) return 'Success';
   return 'Failure';
};
GURPS.QuickContestedSuccessRoll = function(input)
{
   throw new Error('Not finished');  //TODO: finishing this is blocked by contest questions below
   //3e page 2. 4e page 3
   //validation
   var character1 = GURPS.SuccessRoll();
   //TODO: ask Tim: do contests (quick or regular) care about criticals? If so Alice with 5 Success vs Bob with 6 Criticial Success, who won?
   //TODO: ask Tim: in contests (quick or regular) does it matter if the tie was "both succeed" or "both failed"?
   var character1Passed = ('Critical success' === character1 || 'Success' === character1);
   var character2 = GURPS.SuccessRoll();
   var character2Passed = ('Critical success' === character2 || 'Success' === character2);
   if(character1Passed && !character2Passed) return 'Character 1';
   if(!character1Passed && character2Passed) return 'Character 2';
   var diff = character1 - character2;
   if(diff < 0) return 'Character 1';
   if(diff > 0) return 'Character 2';
   //4e adds a "margin of victory" which is the diff between
   return 'Tie';
};
GURPS.RegularContestedSuccessRoll = function(input)
{
   throw new Error('Not finished');  //TODO: finishing this is blocked by contest questions above
   //3e page 2. 4e page 3
   //validation
   //4e doesn't look like it uses the reduction
   //TODO: ask Tim: does 3e always reduce like this or is it a GM judgement call? The answer will prompt a boolean passed in or a GURPS version passed in
   if (input.character1.skill > 14 && input.character2.skill > 14)
   {
      var max = Math.max(input.character1.skill, input.character2.skill);
      var diff = max - 14;
      input.character1.skill -= diff;
      input.character2.skill -= diff;
   }
   var character1 = GURPS.SuccessRoll();
   var character1Passed = ('Critical success' === character1 || 'Success' === character1);
   var character2 = GURPS.SuccessRoll();
   var character2Passed = ('Critical success' === character2 || 'Success' === character2);
   if(character1Passed && !character2Passed) return 'Character 1';
   if(!character1Passed && character2Passed) return 'Character 2';
   //note that neither edition needs to know the margin of victory
   return 'Tie';
};
/**Not compatable with 4e if Tim says that min basic damage is different. Otherwise it can do both. Could still do both if given gurps version*/
GURPS.Attack3e = function(input)
{
   throw new Error('Not even close to finished');  //TODO: finishing this is blocked by a huge number of questions below
   //3e pages 25, 26. 4e pages 26, 27
   var attackResult = GURPS.SuccessRoll();
   //17 fails no matter the effective skill (this differes from SuccessRoll)
   //TODO: ask Tim: is there any difference between crit fail and fail for attack?
   //TODO: confirm with Tim: I hope the lite rules are wrong in this: they say that 17 is auto fail ignoring skill
   if(17 === attackResult || 'Critical failure' === attackResult || 'Failure' === attackResult) return 'Miss';
   if ('Critical success' !== attackResult)  //crit hit ignores defense
   {
      var defenseResult = GURPS.SuccessRoll();  //note that crit success is a success even if skill is 1 or 2 (consistent with SuccessRoll)
      //17 fails no matter the effective skill (this differes from SuccessRoll)
      //TODO: ask Tim: is there any difference between crit success and success for defense?
      //TODO: ask Tim: is there any difference between crit failure and failure for defense?
      //TODO: ask Tim: each active defense says "per turn" is that a Pathfinder round?
      if(17 !== defenseResult && ('Critical success' === defenseResult || 'Success' === defenseResult)) return 'Dodge';
      //TODO: All-Out Defense gets 2 defense rolls
      //TODO: if there's 2 defense they need to know whether parry succeeded because it has an auto counter attack
      //TODO: failing to parry bare-handed lets them attack your arms instead of torso. 4e doesn't have this
      //TODO: ask Tim: does All-Out Defense have an exception for crit failure?
      //TODO: ask Tim: All-Out Defense with fencing weapon and fencing skill says defend any number of times. Is it still only twice per attack?
      //TODO: All-Out Attack and others have no defense roll (if there's no passive defense)
      //TODO: ask Tim: if you only have passive defense does a roll of 17 always fail?
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
   //TODO: ask Tim: are there any weapons that have -1.5 or x1.5 or anything non-whole number?
   var damageAmount = (GURPS._parseDamageString(damageString)(randomSource) - damageReduction);
   if(damageAmount <= 0) return 'No damage';
   return damageAmount + ' Damage';
};
GURPS._parseDamageString = function(damageString)
{
   throw new Error('Not finished');  //TODO: could finish if I decide if it should enforce the min basic damage etc
   var dicePool = new DicePool(/\d+d6?(?:[-+*xX]\d+)?/);
   if(notMultiplied) return dicePool.sumRoll;
   return function(randomSource)
   {
      var sum = dicePool.sumRoll(randomSource);
      return (sum * multiplier);
   }
};
