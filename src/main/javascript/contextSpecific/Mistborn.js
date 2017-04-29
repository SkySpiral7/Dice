'use strict';
var Mistborn = {};
/**
 * This is prebuilt function for the Mistborn system, it rolls dice for a challenge roll type.
 * input (which may be mutated) is an object that contains:
 * diceCount: should be the raw number before the minium of 2 (or maximum of 10) is enforced because fewer dice is not the same as negative nudges
 * difficulty: optional, defaults to 1. must be 0 to 5. While a difficulty of 0 isn't possible for a challenge it is allowed so that this function can be used by a contest without difficulty.
 * nudges: optional, defaults to 0, must not be negative.
 * randomSource: optional, passed to DicePool.roll, see that for more info.
 *
 * output is an object that contains:
 * outcome: (using the highest result) will not be > 6 because no nudges are spent. Might be < -6 because rules are unclear what should happen in such cases (ditto for > 6)
 * nudges: 0+ none are spent
 * allResults: an array containing all results from highest to lowest (may be empty). returned because the rules allow choosing which one is used
 * {boolean} success: true if outcome isn't negative (nudges can't change a failure to a success)
 */
Mistborn.Challenge = function(input)
{
   Validation.requireInteger(input.diceCount);
   //TODO: difficulty must be 0..5
   if(undefined === input.difficulty) input.difficulty = 1;
   Validation.requireInteger(input.difficulty);
   if(undefined === input.nudges) input.nudges = 0;
   //TODO: nudges must be 0+
   Validation.requireInteger(input.nudges);

   var outcomePenalty = 0;
   if (input.diceCount > 10)
   {
      input.nudges += (input.diceCount - 10);
      input.diceCount = 10;
   }
   else if (input.diceCount < 2)
   {
      outcomePenalty = (2 - input.diceCount);
      input.diceCount = 2;
   }

   var diceRolled = new DicePool(input.diceCount + 'd6').roll(input.randomSource);
   diceRolled.sort();
   diceRolled.reverse();

   //count nudges
   while (6 === diceRolled[0])
   {
      ++input.nudges;
      diceRolled.shift();
   }

   //remove first occurrence of each number
   for (var i = 1; i < 6; ++i)
   {
      if(diceRolled.contains(i)) diceRolled.removeElement(i);
   }
   var highestResult = 0;  //0 is used if there are no pairs
   if(0 !== diceRolled.length) highestResult = diceRolled[0];

   var output = {};
   output.allResults = [];
   for (var i = highestResult; i > 0; --i)  //No need to check for ones higher than highestResult. Counting down puts them in the right order too
   {
      if(diceRolled.contains(i)) output.allResults.push(i);  //3+ of a kind is the same as a pair so no need to count the occurrences
   }

   output.outcome = highestResult - input.difficulty - outcomePenalty;
   output.success = (output.outcome >= 0);

   output.nudges = input.nudges;
   return output;
};
/**
 * This is prebuilt function for the Mistborn system, it rolls dice for a contest roll type.
 * character1 and character2 are 2 objects that will each be passed to Mistborn.Challenge (see function for details) however the difficulty (for each) defaults to 0.
 *
 * output is an object that contains:
 * winner which is either "Character 1", "Character 2", "Both failed", or "Tie". Note that the winner might not have succeeded at the task (for that check success)
 * outcome never negative. undefined for "Both failed" or "Tie". might be more than 6 if there's a big difference (eg character1=5 vs character2=-2)
 * character1 which is an object with result, nudges, success. success is undefined if there was no difficulty
 * character2 which is an object with result, nudges, success. success is undefined if there was no difficulty
 */
Mistborn.Contest = function(character1, character2)
{
   if(undefined === character1.difficulty) character1.difficulty = 0;
   var result1 = Mistborn.Challenge(character1);
   if(undefined === character2.difficulty) character2.difficulty = 0;
   var result2 = Mistborn.Challenge(character2);

   var output = {};
   output.character1 = {result: result1.outcome, nudges: result1.nudges, success: result1.success};
   output.character2 = {result: result2.outcome, nudges: result2.nudges, success: result2.success};
   if(0 === character1.difficulty) delete output.character1.success;
   if(0 === character2.difficulty) delete output.character2.success;

   //if both pass then subtract results like normal
   //if both fail then that's a special kind of tie (it doesn't subtract results and has a different meaning than a normal tie)
   if (false === output.character1.success && false === output.character2.success)
   {
      output.winner = 'Both failed';
      //outcome is undefined
      return output;
   }
   //if they both have difficulty and only 1 passes then he wins (subtract like normal)

   //if char1 has difficulty and passes (>= 0) and char2 has result >= 0 then subtract like normal (either could win)
   //if char1 has difficulty and fails (< 0) and char2 has result >= 0 then subtract like normal (char2 wins)
   //if char1 has difficulty and passes (>= 0) and char2 has result < 0 then subtract like normal (char1 wins)
   //if char1 has difficulty and fails (< 0) and char2 has result < 0. as per an example in the rules char2 can fail which must mean that the numbers are subtracted as normal

   if (result1.outcome > result2.outcome)
   {
      output.winner = 'Character 1';
      output.outcome = result1.outcome - result2.outcome;
   }
   else if (result1.outcome < result2.outcome)
   {
      output.winner = 'Character 2';
      output.outcome = result2.outcome - result1.outcome;
   }
   else if (result1.nudges > result2.nudges)
   {
      output.winner = 'Character 1';
      output.outcome = 0;
   }
   else if (result1.nudges < result2.nudges)
   {
      output.winner = 'Character 2';
      output.outcome = 0;
   }
   else output.winner = 'Tie';  //outcome is undefined

   return output;
};
/*
No more Mistborn:
Extended contests just uses contest rules multiple times 2..5 (first one to X successes wins tie: nudges, tie: continue)
   tie can occur since they both act 1 per beat. output needs to say beats
   extended contest shouldn't be automated since there's supposed to be narrative each beat therefore just call contest multiple times manually
a contest of more than 2 people requires player input but uses contest rules
conflicts require player input
*/
