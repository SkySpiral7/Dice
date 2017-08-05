'use strict';
TestSuite.GURPS = {};
TestSuite.GURPS.ReactionRoll = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], randomSource, actual;

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [2,3,4]}]);
   actual = GURPS.ReactionRoll(-30, randomSource);
   testResults.push({Expected: 'Disastrous', Actual: actual, Description: 'Low Disastrous'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,1,1]}]);
   actual = GURPS.ReactionRoll(-3, randomSource);
   testResults.push({Expected: 'Disastrous', Actual: actual, Description: 'Highest Disastrous'});
   } catch(e){testResults.push({Error: e, Description: 'Disastrous'});}

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,1,1]}]);
   actual = GURPS.ReactionRoll(undefined, randomSource);
   testResults.push({Expected: 'Very Bad', Actual: actual, Description: 'reactionModifier defaults to 0'});
   } catch(e){testResults.push({Error: e, Description: 'reactionModifier defaults to 0'});}

   try{
   GURPS.ReactionRoll('ham');
   TestRunner.failedToThrow(testResults, 'Invalid reactionModifier');
   }
   catch(e)
   {
      testResults.push({Expected: getError(Validation.requireInteger, ['ham']),
         Actual: e, Description: 'Invalid reactionModifier'});
   }

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,1,1]}]);
   actual = GURPS.ReactionRoll(-2, randomSource);
   testResults.push({Expected: 'Very Bad', Actual: actual, Description: 'Lowest Very Bad'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,1,1]}]);
   actual = GURPS.ReactionRoll(-1, randomSource);
   testResults.push({Expected: 'Very Bad', Actual: actual, Description: 'Mid Very Bad'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,1,1]}]);
   actual = GURPS.ReactionRoll(0, randomSource);
   testResults.push({Expected: 'Very Bad', Actual: actual, Description: 'Highest Very Bad'});
   } catch(e){testResults.push({Error: e, Description: 'Very Bad'});}

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,1,1]}]);
   actual = GURPS.ReactionRoll(1, randomSource);
   testResults.push({Expected: 'Bad', Actual: actual, Description: 'Lowest Bad'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,1,1]}]);
   actual = GURPS.ReactionRoll(2, randomSource);
   testResults.push({Expected: 'Bad', Actual: actual, Description: 'Mid Bad'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,1,1]}]);
   actual = GURPS.ReactionRoll(3, randomSource);
   testResults.push({Expected: 'Bad', Actual: actual, Description: 'Highest Bad'});
   } catch(e){testResults.push({Error: e, Description: 'Bad'});}

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,2,3]}]);
   actual = GURPS.ReactionRoll(1, randomSource);
   testResults.push({Expected: 'Poor', Actual: actual, Description: 'Lowest Poor'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,1,6]}]);
   actual = GURPS.ReactionRoll(0, randomSource);
   testResults.push({Expected: 'Poor', Actual: actual, Description: 'Mid Poor'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,2,6]}]);
   actual = GURPS.ReactionRoll(0, randomSource);
   testResults.push({Expected: 'Poor', Actual: actual, Description: 'Highest Poor'});
   } catch(e){testResults.push({Error: e, Description: 'Poor'});}

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,3,6]}]);
   actual = GURPS.ReactionRoll(0, randomSource);
   testResults.push({Expected: 'Neutral', Actual: actual, Description: 'Lowest Neutral'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,4,6]}]);
   actual = GURPS.ReactionRoll(0, randomSource);
   testResults.push({Expected: 'Neutral', Actual: actual, Description: 'Mid Neutral'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,5,6]}]);
   actual = GURPS.ReactionRoll(0, randomSource);
   testResults.push({Expected: 'Neutral', Actual: actual, Description: 'Highest Neutral'});
   } catch(e){testResults.push({Error: e, Description: 'Neutral'});}

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,6,6]}]);
   actual = GURPS.ReactionRoll(0, randomSource);
   testResults.push({Expected: 'Good', Actual: actual, Description: 'Lowest Good'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [2,6,6]}]);
   actual = GURPS.ReactionRoll(0, randomSource);
   testResults.push({Expected: 'Good', Actual: actual, Description: 'Mid Good'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [3,6,6]}]);
   actual = GURPS.ReactionRoll(0, randomSource);
   testResults.push({Expected: 'Good', Actual: actual, Description: 'Highest Good'});
   } catch(e){testResults.push({Error: e, Description: 'Good'});}

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [4,6,6]}]);
   actual = GURPS.ReactionRoll(0, randomSource);
   testResults.push({Expected: 'Very Good', Actual: actual, Description: 'Lowest Very Good'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [5,6,6]}]);
   actual = GURPS.ReactionRoll(0, randomSource);
   testResults.push({Expected: 'Very Good', Actual: actual, Description: 'Mid Very Good'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [6,6,6]}]);
   actual = GURPS.ReactionRoll(0, randomSource);
   testResults.push({Expected: 'Very Good', Actual: actual, Description: 'Highest Very Good'});
   } catch(e){testResults.push({Error: e, Description: 'Very Good'});}

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [6,6,6]}]);
   actual = GURPS.ReactionRoll(1, randomSource);
   testResults.push({Expected: 'Excellent', Actual: actual, Description: 'Lowest Excellent'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,2,3]}]);
   actual = GURPS.ReactionRoll(20, randomSource);
   testResults.push({Expected: 'Excellent', Actual: actual, Description: 'High Excellent'});
   } catch(e){testResults.push({Error: e, Description: 'Excellent'});}

   return TestRunner.displayResults('GURPS GURPS.ReactionRoll', testResults, isFirst);
};
