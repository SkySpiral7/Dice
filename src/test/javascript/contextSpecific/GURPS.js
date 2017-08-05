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
TestSuite.GURPS.SuccessRoll = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], randomSource, actual, expected;

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,4,5]}]);
   actual = GURPS.SuccessRoll(11, randomSource);
   expected = {success: true, critical: false, margin: 1};
   testResults.push({Expected: expected, Actual: actual, Description: 'Happy path'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   GURPS.SuccessRoll('ham');
   TestRunner.failedToThrow(testResults, 'Invalid effectiveSkill');
   }
   catch(e)
   {
      testResults.push({Expected: getError(Validation.requireInteger, ['ham']),
         Actual: e, Description: 'Invalid effectiveSkill'});
   }

   try{
   GURPS.SuccessRoll(-2);
   testResults.push({Expected: 'Didn\'t throw', Actual: 'Didn\'t throw', Description: 'Allows negative effectiveSkill'});
   } catch(e){testResults.push({Error: e, Description: 'Allows negative effectiveSkill'});}

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,4,5]}]);
   actual = GURPS.SuccessRoll(10, randomSource);
   expected = {success: true, critical: false, margin: 0};
   testResults.push({Expected: expected, Actual: actual, Description: 'Margin 0 is a success'});
   } catch(e){testResults.push({Error: e, Description: 'Margin 0 is a success'});}

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,4,5]}]);
   actual = GURPS.SuccessRoll(9, randomSource);
   expected = {success: false, critical: false, margin: 1};
   testResults.push({Expected: expected, Actual: actual, Description: 'Margin is absolute value'});
   } catch(e){testResults.push({Error: e, Description: 'Margin is absolute value'});}

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,1,1]}]);
   actual = GURPS.SuccessRoll(-10, randomSource);
   expected = {success: true, critical: true};
   testResults.push({Expected: expected, Actual: actual, Description: 'Crit success sum 3 trumps low effectiveSkill'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,1,2]}]);
   actual = GURPS.SuccessRoll(2, randomSource);
   expected = {success: true, critical: true};
   testResults.push({Expected: expected, Actual: actual, Description: 'Crit success sum 4 trumps low effectiveSkill'});
   } catch(e){testResults.push({Error: e, Description: 'Crit success sum 3-4 trumps low effectiveSkill'});}

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,1,3]}]);
   actual = GURPS.SuccessRoll(4, randomSource);
   expected = {success: false, critical: false, margin: 1};
   testResults.push({Expected: expected, Actual: actual, Description: 'Sum 5 failure'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,1,3]}]);
   actual = GURPS.SuccessRoll(5, randomSource);
   expected = {success: true, critical: false, margin: 0};
   testResults.push({Expected: expected, Actual: actual, Description: 'Sum 5 success'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,1,3]}]);
   actual = GURPS.SuccessRoll(15, randomSource);
   expected = {success: true, critical: true};
   testResults.push({Expected: expected, Actual: actual, Description: 'Sum 5 critical success with 15'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,1,3]}]);
   actual = GURPS.SuccessRoll(17, randomSource);
   expected = {success: true, critical: true};
   testResults.push({Expected: expected, Actual: actual, Description: 'Sum 5 critical success with 15+'});
   } catch(e){testResults.push({Error: e, Description: 'Rolled sum 5'});}

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,1,4]}]);
   actual = GURPS.SuccessRoll(4, randomSource);
   expected = {success: false, critical: false, margin: 2};
   testResults.push({Expected: expected, Actual: actual, Description: 'Sum 6 failure'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,1,4]}]);
   actual = GURPS.SuccessRoll(7, randomSource);
   expected = {success: true, critical: false, margin: 1};
   testResults.push({Expected: expected, Actual: actual, Description: 'Sum 6 success'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,1,4]}]);
   actual = GURPS.SuccessRoll(16, randomSource);
   expected = {success: true, critical: true};
   testResults.push({Expected: expected, Actual: actual, Description: 'Sum 6 critical success with 16'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1,1,4]}]);
   actual = GURPS.SuccessRoll(17, randomSource);
   expected = {success: true, critical: true};
   testResults.push({Expected: expected, Actual: actual, Description: 'Sum 6 critical success with 16+'});
   } catch(e){testResults.push({Error: e, Description: 'Rolled Sum 6'});}

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [6,6,6]}]);
   actual = GURPS.SuccessRoll(20, randomSource);
   expected = {success: false, critical: true};
   testResults.push({Expected: expected, Actual: actual, Description: 'Sum 18 Crit failure trumps high effectiveSkill'});
   } catch(e){testResults.push({Error: e, Description: 'Sum 18 Crit failure trumps high effectiveSkill'});}

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [6,6,5]}]);
   actual = GURPS.SuccessRoll(10, randomSource);
   expected = {success: false, critical: true};
   testResults.push({Expected: expected, Actual: actual, Description: 'Sum 17 critical failure with 15-'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [6,6,5]}]);
   actual = GURPS.SuccessRoll(15, randomSource);
   expected = {success: false, critical: true};
   testResults.push({Expected: expected, Actual: actual, Description: 'Sum 17 critical failure with 15'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [6,6,5]}]);
   actual = GURPS.SuccessRoll(16, randomSource);
   expected = {success: false, critical: false};
   testResults.push({Expected: expected, Actual: actual, Description: 'Sum 17 failure normal'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [6,6,5]}]);
   actual = GURPS.SuccessRoll(17, randomSource);
   expected = {success: false, critical: false};
   testResults.push({Expected: expected, Actual: actual, Description: 'Sum 17 always a failure'});
   } catch(e){testResults.push({Error: e, Description: 'Rolled Sum 17'});}

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [6,6,4]}]);
   actual = GURPS.SuccessRoll(6, randomSource);
   expected = {success: false, critical: true};
   testResults.push({Expected: expected, Actual: actual, Description: '10 more than effectiveSkill is critical failure: effectiveSkill 6'});

   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [4,6,4]}]);
   actual = GURPS.SuccessRoll(3, randomSource);
   expected = {success: false, critical: true};
   testResults.push({Expected: expected, Actual: actual, Description: '10 more than effectiveSkill is critical failure: effectiveSkill 3'});
   } catch(e){testResults.push({Error: e, Description: '10 more than skill is critical failure'});}

   return TestRunner.displayResults('GURPS GURPS.SuccessRoll', testResults, isFirst);
};
TestSuite.GURPS._parseDamageString = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], randomSource, actual;

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [3]}]);
   actual = GURPS._parseDamageString('1d+2')(randomSource);
   testResults.push({Expected: 5, Actual: actual, Description: 'Happy path'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   GURPS._parseDamageString('2d10');
   TestRunner.failedToThrow(testResults, 'Invalid damageString');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('Expected #d (and optional +# etc). Found: 2d10'),
         Actual: e, Description: 'Invalid damageString'});
   }

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [4,6]}]);
   actual = GURPS._parseDamageString('2d6-1')(randomSource);
   testResults.push({Expected: 9, Actual: actual, Description: '2d6-1'});
   } catch(e){testResults.push({Error: e, Description: '2d6-1'});}

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [4]}]);
   actual = GURPS._parseDamageString('1d')(randomSource);
   testResults.push({Expected: 4, Actual: actual, Description: '1d'});
   } catch(e){testResults.push({Error: e, Description: '1d'});}

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1]}]);
   actual = GURPS._parseDamageString('1DX3')(randomSource);
   testResults.push({Expected: 3, Actual: actual, Description: 'Ignores case'});
   } catch(e){testResults.push({Error: e, Description: 'Ignores case'});}

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [1]}]);
   actual = GURPS._parseDamageString('1dx2')(randomSource);
   testResults.push({Expected: 2, Actual: actual, Description: 'Lowercase x'});
   } catch(e){testResults.push({Error: e, Description: 'Lowercase x'});}

   try{
   randomSource = betterNonRandomNumberGenerator([{dieSides: 6, values: [6,4]}]);
   actual = GURPS._parseDamageString('2d*4')(randomSource);
   testResults.push({Expected: 40, Actual: actual, Description: 'Allows *'});
   } catch(e){testResults.push({Error: e, Description: 'Allows *'});}

   return TestRunner.displayResults('GURPS GURPS._parseDamageString', testResults, isFirst);
};
