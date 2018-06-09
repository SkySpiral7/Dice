'use strict';
/**This was made to focus on 3rd edition although some of the functions also work for 4th edition.*/
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
This function assumes that you are allowed to make a success roll and that you have already accounted for "the rule
of 16" (which exists in 3e and 4e but only applies to magic and other supernatural attacks).
Note that if you somehow get an effective defense skill of -13 or less then rolling a sum of 3 counts as a critical success
rather than a critical failure even though your roll was 10 more than your skill.

This function doesn't support 3e disadvantage checks which fail when the sum is 14+ (I don't know if 4e has this).

@param {number} effectiveSkill an integer which is the sum of your base skill (including defense) and all modifiers.
@param {?function} randomSource optional. Will be passed to DicePool.sumRoll
@returns {object} with {boolean} success, {boolean} critical, and {number} margin the absolute value of the difference between
your effectiveSkill and the dice sum. Used by 4e (margin of success and margin of failure).
margin is undefined for criticals since they ignore the difference between the sum and effectiveSkill (and would sometimes be negative).
margin is undefined for a sum of 17 which always fails even when it isn't a critical failure and even when "the rule of 16" doesn't apply.
*/
GURPS.SuccessRoll = function(effectiveSkill, randomSource)
{
   Validation.requireInteger(effectiveSkill);
   var sumRolled = new DicePool('3d6').sumRoll(randomSource);

   //TODO: page 30: disadvantages fail at 14+
   if (sumRolled <= 4
      || (5 === sumRolled && effectiveSkill >= 15)
      || (6 === sumRolled && effectiveSkill >= 16)) return {success: true, critical: true};

   if(18 === sumRolled) return {success: false, critical: true};
   else if(17 === sumRolled) return {success: false, critical: (effectiveSkill < 16)};  //sum 17 is the reason I don't || them together
   else if(sumRolled >= (effectiveSkill + 10)) return {success: false, critical: true};

   return {success: (sumRolled <= effectiveSkill), critical: false, margin: Math.abs(sumRolled - effectiveSkill)};
};
/**
 * Used internally by GURPS.QuickContestedSuccessRoll and GURPS.RegularContestedSuccessRoll.
 * It does not validate and does not have criticals call GURPS.SuccessRoll instead for such things.
 * @returns {object} with {boolean} success and {number} margin which is negative for failures
 */
GURPS._noCritSuccessRoll = function(effectiveSkill, randomSource)
{
   var sumRolled = new DicePool('3d6').sumRoll(randomSource);
   return {success: (sumRolled <= effectiveSkill), margin: (effectiveSkill - sumRolled)};
};
/**A "Quick Contest" is a competition that is over in very little time -- often in one second, perhaps even instantly.

This does not support the 4e special quick contest used for some resistance rolls.

@param {number} effectiveSkill1 an integer which is the sum of character 1's base skill (including defense) and all modifiers.
@param {number} effectiveSkill2 an integer which is the sum of character 2's base skill (including defense) and all modifiers.
@param {?function} randomSource optional. Will be passed to DicePool.sumRoll
@returns {object} with:
{string} winner either 'Character 1', 'Character 2', or 'Tie'
{boolean} winnerSucceeded true if the character who won or tied also succeeded
{boolean} loserSucceeded true if the character who lost or tied also succeeded
{number} margin the absolute value of the difference between your effectiveSkill and the dice sum. Used by 4e (margin of success and margin of failure).
{function} toString = GURPS.QuickContestedSuccessRoll.Stringifier
*/
GURPS.QuickContestedSuccessRoll = function(effectiveSkill1, effectiveSkill2, randomSource)
{
   Validation.requireInteger(effectiveSkill1);
   Validation.requireInteger(effectiveSkill2);
   var characterResult1 = GURPS._noCritSuccessRoll(effectiveSkill1, randomSource);
   var characterResult2 = GURPS._noCritSuccessRoll(effectiveSkill2, randomSource);

   var result = {};
   result.toString = function(){return GURPS.QuickContestedSuccessRoll.Stringifier(this);};
   result.winnerSucceeded = true;
   result.loserSucceeded = false;
   //4e adds a "margin of victory" which is the diff between
   result.margin = Math.abs(characterResult1.margin - characterResult2.margin);

   //"the winner is the one who succeeded by the most, or failed by the least."
   if(characterResult1.success && !characterResult2.success){result.winner = 'Character 1'; return result;}
   if(!characterResult1.success && characterResult2.success){result.winner = 'Character 2'; return result;}

   result.winnerSucceeded = result.loserSucceeded = characterResult1.success;  //they don't have to match who won since they are the same value

   if(characterResult1.margin > characterResult2.margin) result.winner = 'Character 1';
   else if(characterResult1.margin < characterResult2.margin) result.winner = 'Character 2';
   else result.winner = 'Tie';

   return result;
};
/**
Used by GURPS.QuickContestedSuccessRoll but can also be called directly.

@param {!object} contestResults the results of GURPS.QuickContestedSuccessRoll
@returns {!string} a human readable description of those results
*/
GURPS.QuickContestedSuccessRoll.Stringifier = function(contestResults)
{
   if('Tie' !== contestResults.winner && contestResults.winnerSucceeded) return contestResults.winner + ' succeeded by ' + contestResults.margin + '.';
   if('Tie' !== contestResults.winner && !contestResults.winnerSucceeded) return contestResults.winner + ' was ' + contestResults.margin + ' points closer.';
   if(contestResults.winnerSucceeded) return 'Tie: both succeeded by the same amount.';
   return 'Tie: both failed by the same amount.';
};
/**
A "Regular Contest" is a slow competition with much give and take.

This function does not support the Extreme scores rules of 4e but does reduce high scores according to the 3e rules.
Note that they are not compatible.

@param {number} effectiveSkill1 an integer which is the sum of character 1's base skill (including defense) and all modifiers.
@param {number} effectiveSkill2 an integer which is the sum of character 2's base skill (including defense) and all modifiers.
@param {?function} randomSource optional. Will be passed to DicePool.sumRoll
@returns {object} with:
{string} winner of either Character 1, Character 2, or Tie
{boolean} success true if the winner of the contest succeeded at the roll (always true if it was not a tie)
*/
GURPS.RegularContestedSuccessRoll = function(effectiveSkill1, effectiveSkill2, randomSource)
{
   Validation.requireInteger(effectiveSkill1);
   Validation.requireInteger(effectiveSkill2);
   if (effectiveSkill1 > 14 && effectiveSkill2 > 14)
   {
      var max = Math.max(effectiveSkill1, effectiveSkill2);
      var diff = max - 14;
      effectiveSkill1 -= diff;
      effectiveSkill2 -= diff;
   }
   var characterResult1 = GURPS._noCritSuccessRoll(effectiveSkill1, randomSource);
   var characterResult2 = GURPS._noCritSuccessRoll(effectiveSkill2, randomSource);
   if(characterResult1.success && !characterResult2.success) return {winner: 'Character 1', success: true};
   if(!characterResult1.success && characterResult2.success) return {winner: 'Character 2', success: true};
   //note that neither edition needs to know the margin of victory
   return {winner: 'Tie', success: characterResult1.success};
};
GURPS.beta = {};
/**Compatible with 4e... Failing to parry barehanded doesn't make sense if there's another defense... Not sure if that exists in 3e*/
//the rules are unclear but it seems like passive defense is not rolled vs crit hit
GURPS.beta.Attack3e = function(attackEffectiveSkill, defenseEffectiveSkill, damageString, damageReduction, randomSource)
{
   throw new Error('Not even close to finished');  //TODO: finishing this is blocked by a huge number of questions below
   //3e lite pages 25, 26. 4e lite pages 26, 27
   var attackResult = GURPS.SuccessRoll(attackEffectiveSkill, randomSource);
   if(!attackResult.success) return 'Miss';  //TODO: crit miss matters
   if (!attackResult.critical)  //crit hit ignores defense
   {
      var defenseResult = GURPS.SuccessRoll(defenseEffectiveSkill, randomSource);  //note that crit success is a success even if skill is 1 or 2 (consistent with SuccessRoll)
      if(defenseResult.success) return 'Dodge';  //TODO: crit success matters
      //TODO: All-Out Defense gets 2+ defense rolls
      //TODO: if there's 2+ defense they need to know whether parry succeeded because it has an auto counter attack
      //TODO: failing to parry bare-handed lets them attack your arms instead of torso
      //TODO: All-Out Attack and others have no defense roll
   }
   if(3 === attackResult) return 'Max damage';  //TODO: return the damage amount. TODO: this or a crit table
   //TODO: ask Tim: "Add the 50% damage bonus for a cutting weapon" (after DR). Is this the only damage percent boost? If not are they all +50%? Is there any damage percent reduction?
   //TODO: in 4e "wounding modifier." apply after DR. Small piercing is x0.5 (min of 1), Cutting and large piercing is x1.5, Impaling is x2. Notice cutting is the same in 3e
   //TODO: some weapons have a half damage range (divide before DR)
   //TODO: ask Tim: Does non-lethal damage exist? If so how does it work?
   //TODO: explosion roll damage as-is (no attack or defense) and have damage percent reduction
   //TODO: crushing has a min damage of 0 (before DR) and everything else has a min damage of 1 (before DR)
   var damageAmount = (GURPS._parseDamageString(damageString)(randomSource) - damageReduction);
   if(damageAmount <= 0) return 'No damage';
   return damageAmount + ' Damage';
};
GURPS._parseDamageString = function(debugString)
{
   //TODO: make public, move min damage in here, return an object which has sumRoll and maxDamage
   debugString = '' + debugString;  //enforces string type and is null safe
   var workingString = debugString.trim().toLowerCase();

   //TODO: allow decimal multiplier
   //relaxed floating point: /^\d+d6?(?:[-+*x](?:\d+\.?\d*|\.\d+))?$/
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
/*GURPS tables: www.sjgames.com/gameaids/gurps/Combat_Table.doc
Critical Hit Table (B202)
     All doublings or triplings of normal damage refer to the basic die roll, not including modifiers
3 If the blow hit the torso, it does normal damage and the foe is knocked unconscious for 30 minutes. Roll vs. HT every 30 minutes to recover. Otherwise it does triple damage
4          The blow bypasses all armor and does normal damage
5          The blow does triple normal damage
6          The blow does double normal damage
7          Normal damage, and foe is stunned until he makes his HT roll
8 If blow hit an arm, leg, hand, or foot it does normal damage and that 
            body part is crippled regardless of the damage done. However, this 
            is only a "funny-bone" injury, and will wear off in six turns (unless 
            enough damage was done to cripple the body part anyway). 
            Otherwise, the blow does normal damage
9-11     Normal damage only
12        If blow hit an arm, leg, hand, or foot it does normal damage and that 
            body part is crippled regardless of the damage done. However, this 
            is only a "funny-bone" injury, and will wear off in six turns (unless 
            enough damage was done to cripple the body part anyway). 
            Otherwise, the blow does normal damage
13        The blow bypasses all armor and does normal damage
14         If the blow hit an arm, leg, hand, or foot it does normal damage and  
             that body part is crippled regardless of damage done. Otherwise,  
             double normal damage
15        Enemy's weapon is dropped, and he takes normal damage
16        The blow does double normal damage
17        The blow does triple normal damage
18 If the blow hit the torso, it does normal damage and the foe is   
             knocked unconscious. Roll vs. HT every 30 minutes to recover.   
             Otherwise it does triple damage

Critical Miss Table (B202)
3.4 Your weapon breaks and is useless. Exception: certain weapons are   resistant to breakage. These include maces, flails, mauls, metal bars, and other solid crushing weapons; magic weapons; and finely made weapons. If you have a weapon like that, roll again. Only if you get a broken weapon result a second time does the weapon really break. Any other result, you drop the weapon instead (B113)
5          You managed to hit yourself in the arm or leg (50% each way). 
            Exception: if this was an impaling or ranged attack, roll again. If 
            you get a "hit yourself" result a second time, count that result- half 
            or full damage, as the case may be. If you get something other than 
            "hit yourself", count that result
6          As above (#5), but half damage only
7 You lost your balance. You can do nothing else until your next turn.    
             All active defenses are at -2 until your next turn
8 The weapon turns in your hand. Spend one extra turn to ready it  
             before you use it again
9-11     You drop the weapon. Exception: a cheap weapons breaks (B113)
12 The weapon turns in your hand. Spend one extra turn to ready it  
              before you use it again
13 You lost your balance. You can do nothing else until your next  
             turn. All active defenses are at -2 until next turn
14 Your weapon flies 1d yards from your hand, straight forward or    
              straight back (50% each way). Anyone on the target spot must 
              make a DX roll or take half damage from the weapon. Exception: 
              if this was an impaling or ranged attack, see #9
15 You strained your shoulder. Your weapon arm is "crippled" for the  
             rest of the encounter. You do not have to drop your weapon, but  
             you can not use it at all for 30 minutes
16         You fall down (Ranged weapon users see #7 instead)
17, 18   Your weapon breaks (see #3)

Unarmed fighters: any "weapon breaks", "weapon drops", or "weapon turns in hand" should be ignored; take 1d-3 damage to the hand or foot you were striking with instead

Critical Head Blow Table (B202)
Use this table only when a critical hit is rolled on a head blow.
3          Foe is killed instantly!
4, 5      Foe knocked unconscious. Roll vs. HT every 30 minutes to recover
6 Foe is hit across both eyes and blinded. Use "crippling" rules to         
            determine whether eyes can heal (roll separately for each).  Foe is  
            stunned and fights at -10 DX for the rest of the battle
7 Foe is blinded in one eye. Use "crippling" rules to determine if it 
            heals. Target is stunned; will fight at -2 DX for rest of the battle
8 Foe is knocked off balance; he may defend normally next turn but
            may do nothing else. Attack also does normal head blow damage
9-11     Normal head-blow damage only
12        If the attack was a crushing blow, it does normal head-blow damage 
            and the foe will be deaf for 24 hours. If it was a cutting or impaling  
            blow, it does only 1 hit damage, but the foe’s face is scarred
13 If the attack was a crushing blow, it does normal head-blow damage  
            and foe may be permanently deafened (use "crippling" rules). If it  
            was a cutting or impaling blow, it does only 2 hits damage, but the  
            foe’s face is badly scarred
14        Normal head-blow damage. Foe flinches and drops one weapon
15-18   Normal head-blow damage and foe is stunned

Firearm Critical Miss Table (B202)
3.4 The firearm breaks. It can be repaired with the proper tools in 1d6  
            hours with a successful Armoury roll. A grenade simply fails
5          You managed to shoot yourself in the leg (random left or right)   
            doing normal damage
6          As above, but you shot yourself in the foot
7 The weapon recoil knocks you off balance. You can do nothing  
            until next turn, and all active defenses are at -2 until then (ignore for 
            grenades or recoilless weapons)
8          A dud. This shot simply doesn't go off, but the weapon is unharmed
9.11 The weapon jams. It will require a successful Guns-4 or Armoury 
             roll to unjam it. If the weapon is cheap the roll is at -3. For  
             grenades ignore this result and reroll
12         A dud. This shot simply doesn't go off, but the weapon is unharmed
13, 14   You drop the weapon. A cheap weapon breaks (to fix see #3-4). 
             Otherwise you must pick it up and ready it again. For grenades, put   
             the activated grenade in an adjacent hex (and hope you set it for  a 
             long delay)
15  The weapon recoil knocks you down. You are on the ground, 
             sitting or lying (your choice). Make a DX roll to hold on to the  
             weapon. If your ST is at least 5 more than the minimum ST for the  
             weapon (or 12 for weapons with no listed minimum), ignore this  
             result and use #7. For a recoilless weapon, nothing happens
16, 17   The firearm breaks. It can be repaired with the proper tools in 1d6  
hours with a successful Armoury roll. A grenade simply fails to go  off
18 The weapon explodes. You take the damage amount of the weapon  
             in crushing damage, plus: If you were aiming, you're also blind for  
             five minutes. For grenades, it explodes in your hand, doing  
             maximum damage to that hand plus normal damage. If the weapon  
             was a laser, blaster, or flamethrower, you are also on fire
*/
/**
 * A roll table for random hit locations as defined in 3e B203/CII53.
 */
GURPS.RandomHitLocation = new CustomDice.RollTable(new DicePool('3d6'), [
   'Brain',
   {min: 5, value: 'Head'},
   {min: 6, value: 'Shield (far) Arm'},
   {min: 7, table: new CustomDice.CustomDie(['Left Hand', 'Right Hand'])},
   {min: 8, value: 'Weapon (near) Arm'},
   {min: 9, value: 'Body (i.e., Torso)'},
   {min: 12, value: 'Far Leg'},
   {min: 13, value: 'Near Leg'},
   {min: 15, table: new CustomDice.CustomDie(['Left Foot', 'Right Foot'])},
   {min: 17, value: 'Vital Organs'}
]);
