'use strict';
TestSuite.GURPS = {};
TestSuite.GURPS.ReactionRoll = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], randomSource, actual;

   try{
   randomSource = numberGenerator.dice(6, [2,3,4]);
   actual = GURPS.ReactionRoll(-30, randomSource);
   assertions.push({Expected: 'Disastrous', Actual: actual, Description: 'Low Disastrous'});

   randomSource = numberGenerator.dice(6, [1,1,1]);
   actual = GURPS.ReactionRoll(-3, randomSource);
   assertions.push({Expected: 'Disastrous', Actual: actual, Description: 'Highest Disastrous'});
   } catch(e){assertions.push({Error: e, Description: 'Disastrous'});}

   try{
   randomSource = numberGenerator.dice(6, [1,1,1]);
   actual = GURPS.ReactionRoll(undefined, randomSource);
   assertions.push({Expected: 'Very Bad', Actual: actual, Description: 'reactionModifier defaults to 0'});
   } catch(e){assertions.push({Error: e, Description: 'reactionModifier defaults to 0'});}

   try{
   GURPS.ReactionRoll('ham');
   TestRunner.failedToThrow(assertions, 'Invalid reactionModifier');
   }
   catch(e)
   {
      assertions.push({Expected: getError(Validation.requireInteger, ['ham']),
         Actual: e, Description: 'Invalid reactionModifier'});
   }

   try{
   randomSource = numberGenerator.dice(6, [1,1,1]);
   actual = GURPS.ReactionRoll(-2, randomSource);
   assertions.push({Expected: 'Very Bad', Actual: actual, Description: 'Lowest Very Bad'});

   randomSource = numberGenerator.dice(6, [1,1,1]);
   actual = GURPS.ReactionRoll(-1, randomSource);
   assertions.push({Expected: 'Very Bad', Actual: actual, Description: 'Mid Very Bad'});

   randomSource = numberGenerator.dice(6, [1,1,1]);
   actual = GURPS.ReactionRoll(0, randomSource);
   assertions.push({Expected: 'Very Bad', Actual: actual, Description: 'Highest Very Bad'});
   } catch(e){assertions.push({Error: e, Description: 'Very Bad'});}

   try{
   randomSource = numberGenerator.dice(6, [1,1,1]);
   actual = GURPS.ReactionRoll(1, randomSource);
   assertions.push({Expected: 'Bad', Actual: actual, Description: 'Lowest Bad'});

   randomSource = numberGenerator.dice(6, [1,1,1]);
   actual = GURPS.ReactionRoll(2, randomSource);
   assertions.push({Expected: 'Bad', Actual: actual, Description: 'Mid Bad'});

   randomSource = numberGenerator.dice(6, [1,1,1]);
   actual = GURPS.ReactionRoll(3, randomSource);
   assertions.push({Expected: 'Bad', Actual: actual, Description: 'Highest Bad'});
   } catch(e){assertions.push({Error: e, Description: 'Bad'});}

   try{
   randomSource = numberGenerator.dice(6, [1,2,3]);
   actual = GURPS.ReactionRoll(1, randomSource);
   assertions.push({Expected: 'Poor', Actual: actual, Description: 'Lowest Poor'});

   randomSource = numberGenerator.dice(6, [1,1,6]);
   actual = GURPS.ReactionRoll(0, randomSource);
   assertions.push({Expected: 'Poor', Actual: actual, Description: 'Mid Poor'});

   randomSource = numberGenerator.dice(6, [1,2,6]);
   actual = GURPS.ReactionRoll(0, randomSource);
   assertions.push({Expected: 'Poor', Actual: actual, Description: 'Highest Poor'});
   } catch(e){assertions.push({Error: e, Description: 'Poor'});}

   try{
   randomSource = numberGenerator.dice(6, [1,3,6]);
   actual = GURPS.ReactionRoll(0, randomSource);
   assertions.push({Expected: 'Neutral', Actual: actual, Description: 'Lowest Neutral'});

   randomSource = numberGenerator.dice(6, [1,4,6]);
   actual = GURPS.ReactionRoll(0, randomSource);
   assertions.push({Expected: 'Neutral', Actual: actual, Description: 'Mid Neutral'});

   randomSource = numberGenerator.dice(6, [1,5,6]);
   actual = GURPS.ReactionRoll(0, randomSource);
   assertions.push({Expected: 'Neutral', Actual: actual, Description: 'Highest Neutral'});
   } catch(e){assertions.push({Error: e, Description: 'Neutral'});}

   try{
   randomSource = numberGenerator.dice(6, [1,6,6]);
   actual = GURPS.ReactionRoll(0, randomSource);
   assertions.push({Expected: 'Good', Actual: actual, Description: 'Lowest Good'});

   randomSource = numberGenerator.dice(6, [2,6,6]);
   actual = GURPS.ReactionRoll(0, randomSource);
   assertions.push({Expected: 'Good', Actual: actual, Description: 'Mid Good'});

   randomSource = numberGenerator.dice(6, [3,6,6]);
   actual = GURPS.ReactionRoll(0, randomSource);
   assertions.push({Expected: 'Good', Actual: actual, Description: 'Highest Good'});
   } catch(e){assertions.push({Error: e, Description: 'Good'});}

   try{
   randomSource = numberGenerator.dice(6, [4,6,6]);
   actual = GURPS.ReactionRoll(0, randomSource);
   assertions.push({Expected: 'Very Good', Actual: actual, Description: 'Lowest Very Good'});

   randomSource = numberGenerator.dice(6, [5,6,6]);
   actual = GURPS.ReactionRoll(0, randomSource);
   assertions.push({Expected: 'Very Good', Actual: actual, Description: 'Mid Very Good'});

   randomSource = numberGenerator.dice(6, [6,6,6]);
   actual = GURPS.ReactionRoll(0, randomSource);
   assertions.push({Expected: 'Very Good', Actual: actual, Description: 'Highest Very Good'});
   } catch(e){assertions.push({Error: e, Description: 'Very Good'});}

   try{
   randomSource = numberGenerator.dice(6, [6,6,6]);
   actual = GURPS.ReactionRoll(1, randomSource);
   assertions.push({Expected: 'Excellent', Actual: actual, Description: 'Lowest Excellent'});

   randomSource = numberGenerator.dice(6, [1,2,3]);
   actual = GURPS.ReactionRoll(20, randomSource);
   assertions.push({Expected: 'Excellent', Actual: actual, Description: 'High Excellent'});
   } catch(e){assertions.push({Error: e, Description: 'Excellent'});}

   return TestRunner.displayResults('GURPS GURPS.ReactionRoll', assertions, testState);
};
TestSuite.GURPS.SuccessRoll = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], randomSource, actual, expected;

   try{
   randomSource = numberGenerator.dice(6, [1,4,5]);
   actual = GURPS.SuccessRoll(11, randomSource);
   expected = {success: true, critical: false, margin: 1};
   assertions.push({Expected: expected, Actual: actual, Description: 'Happy path'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path'});}

   try{
   GURPS.SuccessRoll('ham');
   TestRunner.failedToThrow(assertions, 'Invalid effectiveSkill');
   }
   catch(e)
   {
      assertions.push({Expected: getError(Validation.requireInteger, ['ham']),
         Actual: e, Description: 'Invalid effectiveSkill'});
   }

   try{
   GURPS.SuccessRoll(-2);
   assertions.push({Expected: 'Didn\'t throw', Actual: 'Didn\'t throw', Description: 'Allows negative effectiveSkill'});
   } catch(e){assertions.push({Error: e, Description: 'Allows negative effectiveSkill'});}

   try{
   randomSource = numberGenerator.dice(6, [1,4,5]);
   actual = GURPS.SuccessRoll(10, randomSource);
   expected = {success: true, critical: false, margin: 0};
   assertions.push({Expected: expected, Actual: actual, Description: 'Margin 0 is a success'});
   } catch(e){assertions.push({Error: e, Description: 'Margin 0 is a success'});}

   try{
   randomSource = numberGenerator.dice(6, [1,4,5]);
   actual = GURPS.SuccessRoll(9, randomSource);
   expected = {success: false, critical: false, margin: 1};
   assertions.push({Expected: expected, Actual: actual, Description: 'Margin is absolute value'});
   } catch(e){assertions.push({Error: e, Description: 'Margin is absolute value'});}

   try{
   randomSource = numberGenerator.dice(6, [1,1,1]);
   actual = GURPS.SuccessRoll(-10, randomSource);
   expected = {success: true, critical: true};
   assertions.push({Expected: expected, Actual: actual, Description: 'Crit success sum 3 trumps low effectiveSkill'});

   randomSource = numberGenerator.dice(6, [1,1,2]);
   actual = GURPS.SuccessRoll(2, randomSource);
   expected = {success: true, critical: true};
   assertions.push({Expected: expected, Actual: actual, Description: 'Crit success sum 4 trumps low effectiveSkill'});
   } catch(e){assertions.push({Error: e, Description: 'Crit success sum 3-4 trumps low effectiveSkill'});}

   try{
   randomSource = numberGenerator.dice(6, [1,1,3]);
   actual = GURPS.SuccessRoll(4, randomSource);
   expected = {success: false, critical: false, margin: 1};
   assertions.push({Expected: expected, Actual: actual, Description: 'Sum 5 failure'});

   randomSource = numberGenerator.dice(6, [1,1,3]);
   actual = GURPS.SuccessRoll(5, randomSource);
   expected = {success: true, critical: false, margin: 0};
   assertions.push({Expected: expected, Actual: actual, Description: 'Sum 5 success'});

   randomSource = numberGenerator.dice(6, [1,1,3]);
   actual = GURPS.SuccessRoll(15, randomSource);
   expected = {success: true, critical: true};
   assertions.push({Expected: expected, Actual: actual, Description: 'Sum 5 critical success with 15'});

   randomSource = numberGenerator.dice(6, [1,1,3]);
   actual = GURPS.SuccessRoll(17, randomSource);
   expected = {success: true, critical: true};
   assertions.push({Expected: expected, Actual: actual, Description: 'Sum 5 critical success with 15+'});
   } catch(e){assertions.push({Error: e, Description: 'Rolled sum 5'});}

   try{
   randomSource = numberGenerator.dice(6, [1,1,4]);
   actual = GURPS.SuccessRoll(4, randomSource);
   expected = {success: false, critical: false, margin: 2};
   assertions.push({Expected: expected, Actual: actual, Description: 'Sum 6 failure'});

   randomSource = numberGenerator.dice(6, [1,1,4]);
   actual = GURPS.SuccessRoll(7, randomSource);
   expected = {success: true, critical: false, margin: 1};
   assertions.push({Expected: expected, Actual: actual, Description: 'Sum 6 success'});

   randomSource = numberGenerator.dice(6, [1,1,4]);
   actual = GURPS.SuccessRoll(16, randomSource);
   expected = {success: true, critical: true};
   assertions.push({Expected: expected, Actual: actual, Description: 'Sum 6 critical success with 16'});

   randomSource = numberGenerator.dice(6, [1,1,4]);
   actual = GURPS.SuccessRoll(17, randomSource);
   expected = {success: true, critical: true};
   assertions.push({Expected: expected, Actual: actual, Description: 'Sum 6 critical success with 16+'});
   } catch(e){assertions.push({Error: e, Description: 'Rolled Sum 6'});}

   try{
   randomSource = numberGenerator.dice(6, [6,6,6]);
   actual = GURPS.SuccessRoll(20, randomSource);
   expected = {success: false, critical: true};
   assertions.push({Expected: expected, Actual: actual, Description: 'Sum 18 Crit failure trumps high effectiveSkill'});
   } catch(e){assertions.push({Error: e, Description: 'Sum 18 Crit failure trumps high effectiveSkill'});}

   try{
   randomSource = numberGenerator.dice(6, [6,6,5]);
   actual = GURPS.SuccessRoll(10, randomSource);
   expected = {success: false, critical: true};
   assertions.push({Expected: expected, Actual: actual, Description: 'Sum 17 critical failure with 15-'});

   randomSource = numberGenerator.dice(6, [6,6,5]);
   actual = GURPS.SuccessRoll(15, randomSource);
   expected = {success: false, critical: true};
   assertions.push({Expected: expected, Actual: actual, Description: 'Sum 17 critical failure with 15'});

   randomSource = numberGenerator.dice(6, [6,6,5]);
   actual = GURPS.SuccessRoll(16, randomSource);
   expected = {success: false, critical: false};
   assertions.push({Expected: expected, Actual: actual, Description: 'Sum 17 failure normal'});

   randomSource = numberGenerator.dice(6, [6,6,5]);
   actual = GURPS.SuccessRoll(17, randomSource);
   expected = {success: false, critical: false};
   assertions.push({Expected: expected, Actual: actual, Description: 'Sum 17 always a failure'});
   } catch(e){assertions.push({Error: e, Description: 'Rolled Sum 17'});}

   try{
   randomSource = numberGenerator.dice(6, [6,6,4]);
   actual = GURPS.SuccessRoll(6, randomSource);
   expected = {success: false, critical: true};
   assertions.push({Expected: expected, Actual: actual, Description: '10 more than effectiveSkill is critical failure: effectiveSkill 6'});

   randomSource = numberGenerator.dice(6, [4,6,4]);
   actual = GURPS.SuccessRoll(3, randomSource);
   expected = {success: false, critical: true};
   assertions.push({Expected: expected, Actual: actual, Description: '10 more than effectiveSkill is critical failure: effectiveSkill 3'});
   } catch(e){assertions.push({Error: e, Description: '10 more than skill is critical failure'});}

   return TestRunner.displayResults('GURPS GURPS.SuccessRoll', assertions, testState);
};
TestSuite.GURPS._noCritSuccessRoll = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], randomSource, actual, expected;

   try{
   randomSource = numberGenerator.dice(6, [1,1,1]);
   actual = GURPS._noCritSuccessRoll(5, randomSource);
   expected = {success: true, margin: 2};
   assertions.push({Expected: expected, Actual: actual, Description: 'Happy path: success'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path'});}

   try{
   randomSource = numberGenerator.dice(6, [6,6,6]);
   actual = GURPS._noCritSuccessRoll(10, randomSource);
   expected = {success: false, margin: -8};
   assertions.push({Expected: expected, Actual: actual, Description: 'Happy path: failure'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path'});}

   try{
   randomSource = numberGenerator.dice(6, [1,4,5]);
   actual = GURPS._noCritSuccessRoll(10, randomSource);
   expected = {success: true, margin: 0};
   assertions.push({Expected: expected, Actual: actual, Description: 'Margin 0 is a success'});
   } catch(e){assertions.push({Error: e, Description: 'Margin 0 is a success'});}

   return TestRunner.displayResults('GURPS GURPS._noCritSuccessRoll', assertions, testState);
};
TestSuite.GURPS.QuickContestedSuccessRoll = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], randomSource, actual, actualStringValue, expected;

   try{
   randomSource = numberGenerator.dice(6, [4,1,1, 5,4,1]);  //sums 6, 10
   actual = GURPS.QuickContestedSuccessRoll(7, 9, randomSource);  //margins 1, -1
   actualStringValue = actual.toString();
   delete actual.toString;
   expected = {winner: 'Character 1', winnerSucceeded: true, loserSucceeded: false, margin: 2};
   assertions.push({Expected: expected, Actual: actual, Description: 'Happy path: return value. character 1 wins'});
   assertions.push({Expected: GURPS.QuickContestedSuccessRoll.Stringifier(expected), Actual: actualStringValue, Description: 'Happy path: string value. character 1 wins'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path'});}

   try{
   GURPS.QuickContestedSuccessRoll('ham');
   TestRunner.failedToThrow(assertions, 'Invalid effectiveSkill1');
   }
   catch(e)
   {
      assertions.push({Expected: getError(Validation.requireInteger, ['ham']),
         Actual: e, Description: 'Invalid effectiveSkill1'});
   }

   try{
   GURPS.QuickContestedSuccessRoll(2, 'pork');
   TestRunner.failedToThrow(assertions, 'Invalid effectiveSkill2');
   }
   catch(e)
   {
      assertions.push({Expected: getError(Validation.requireInteger, ['pork']),
         Actual: e, Description: 'Invalid effectiveSkill2'});
   }

   try{
   randomSource = numberGenerator.dice(6, [5,4,1, 4,1,1]);  //sums 10, 6
   actual = GURPS.QuickContestedSuccessRoll(8, 6, randomSource);  //margins -2, 0
   delete actual.toString;
   expected = {winner: 'Character 2', winnerSucceeded: true, loserSucceeded: false, margin: 2};
   assertions.push({Expected: expected, Actual: actual, Description: 'Character 2 wins'});
   } catch(e){assertions.push({Error: e, Description: 'Character 2 wins'});}

   try{
   randomSource = numberGenerator.dice(6, [1,1,1, 1,1,1]);  //sums 3, 3
   actual = GURPS.QuickContestedSuccessRoll(5, 4, randomSource);  //margins 2, 1
   delete actual.toString;
   expected = {winner: 'Character 1', winnerSucceeded: true, loserSucceeded: true, margin: 1};
   assertions.push({Expected: expected, Actual: actual, Description: 'Both succeed. Character 1 wins'});
   } catch(e){assertions.push({Error: e, Description: 'Both succeed. Character 1 wins'});}

   try{
   randomSource = numberGenerator.dice(6, [6,6,6, 6,6,6]);  //sums 18, 18
   actual = GURPS.QuickContestedSuccessRoll(10, 12, randomSource);  //margins -8, -6
   delete actual.toString;
   expected = {winner: 'Character 2', winnerSucceeded: false, loserSucceeded: false, margin: 2};
   assertions.push({Expected: expected, Actual: actual, Description: 'Both failed. Character 2 wins'});
   } catch(e){assertions.push({Error: e, Description: 'Both failed. Character 2 wins'});}

   try{
   randomSource = numberGenerator.dice(6, [1,1,1, 1,1,1]);  //sums 3, 3
   actual = GURPS.QuickContestedSuccessRoll(5, 5, randomSource);  //margins 2, 2
   actualStringValue = actual.toString();
   delete actual.toString;
   expected = {winner: 'Tie', winnerSucceeded: true, loserSucceeded: true, margin: 0};
   assertions.push({Expected: expected, Actual: actual, Description: 'Both succeed. Tie. return value'});
   assertions.push({Expected: GURPS.QuickContestedSuccessRoll.Stringifier(expected), Actual: actualStringValue, Description: 'Both succeed. Tie. string value'});
   } catch(e){assertions.push({Error: e, Description: 'Both succeed. Tie'});}

   try{
   randomSource = numberGenerator.dice(6, [5,4,1, 5,4,1]);  //sums 10, 10
   actual = GURPS.QuickContestedSuccessRoll(5, 5, randomSource);  //margins 5, 5
   delete actual.toString;
   expected = {winner: 'Tie', winnerSucceeded: false, loserSucceeded: false, margin: 0};
   assertions.push({Expected: expected, Actual: actual, Description: 'Both failed. Tie'});
   } catch(e){assertions.push({Error: e, Description: 'Both failed. Tie'});}

   return TestRunner.displayResults('GURPS GURPS.QuickContestedSuccessRoll', assertions, testState);
};
TestSuite.GURPS.QuickContestedSuccessRoll_Stringifier = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], input, actual, expected;

   try{
   input = {winner: 'Character 1', winnerSucceeded: true, loserSucceeded: false, margin: 10};
   actual = GURPS.QuickContestedSuccessRoll.Stringifier(input);
   expected = 'Character 1 succeeded by 10.';
   assertions.push({Expected: expected, Actual: actual, Description: 'Character 1 succeeded'});
   } catch(e){assertions.push({Error: e, Description: 'Character 1 succeeded'});}

   try{
   input = {winner: 'Character 2', winnerSucceeded: true, loserSucceeded: false, margin: 2};
   actual = GURPS.QuickContestedSuccessRoll.Stringifier(input);
   expected = 'Character 2 succeeded by 2.';
   assertions.push({Expected: expected, Actual: actual, Description: 'Character 2 succeeded'});
   } catch(e){assertions.push({Error: e, Description: 'Character 2 succeeded'});}

   try{
   input = {winner: 'Character 1', winnerSucceeded: false, loserSucceeded: false, margin: 4};
   actual = GURPS.QuickContestedSuccessRoll.Stringifier(input);
   expected = 'Character 1 was 4 points closer.';
   assertions.push({Expected: expected, Actual: actual, Description: 'Character 1 was closer'});
   } catch(e){assertions.push({Error: e, Description: 'Character 1 was closer'});}

   try{
   input = {winner: 'Character 2', winnerSucceeded: false, loserSucceeded: false, margin: 2};
   actual = GURPS.QuickContestedSuccessRoll.Stringifier(input);
   expected = 'Character 2 was 2 points closer.';
   assertions.push({Expected: expected, Actual: actual, Description: 'Character 2 was closer'});
   } catch(e){assertions.push({Error: e, Description: 'Character 2 was closer'});}

   try{
   input = {winner: 'Tie', winnerSucceeded: true, loserSucceeded: true, margin: 0};
   actual = GURPS.QuickContestedSuccessRoll.Stringifier(input);
   expected = 'Tie: both succeeded by the same amount.';
   assertions.push({Expected: expected, Actual: actual, Description: 'Tie: both succeeded.'});
   } catch(e){assertions.push({Error: e, Description: 'Tie: both succeeded'});}

   try{
   input = {winner: 'Tie', winnerSucceeded: false, loserSucceeded: false, margin: 0};
   actual = GURPS.QuickContestedSuccessRoll.Stringifier(input);
   expected = 'Tie: both failed by the same amount.';
   assertions.push({Expected: expected, Actual: actual, Description: 'Tie: both failed.'});
   } catch(e){assertions.push({Error: e, Description: 'Tie: both failed'});}

   return TestRunner.displayResults('GURPS GURPS.QuickContestedSuccessRoll.Stringifier', assertions, testState);
};
TestSuite.GURPS.RegularContestedSuccessRoll = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], randomSource, actual, expected;

   try{
   randomSource = numberGenerator.dice(6, [4,1,1, 5,4,1]);  //sums 6, 10
   actual = GURPS.RegularContestedSuccessRoll(7, 9, randomSource);  //pass, fail
   expected = {winner: 'Character 1', success: true};
   assertions.push({Expected: expected, Actual: actual, Description: 'Happy path: character 1 wins'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path'});}

   try{
   GURPS.RegularContestedSuccessRoll('ham');
   TestRunner.failedToThrow(assertions, 'Invalid effectiveSkill1');
   }
   catch(e)
   {
      assertions.push({Expected: getError(Validation.requireInteger, ['ham']),
         Actual: e, Description: 'Invalid effectiveSkill1'});
   }

   try{
   GURPS.RegularContestedSuccessRoll(2, 'pork');
   TestRunner.failedToThrow(assertions, 'Invalid effectiveSkill2');
   }
   catch(e)
   {
      assertions.push({Expected: getError(Validation.requireInteger, ['pork']),
         Actual: e, Description: 'Invalid effectiveSkill2'});
   }

   try{
   randomSource = numberGenerator.dice(6, [5,5,4, 5,5,3]);  //sums 14, 13
   actual = GURPS.RegularContestedSuccessRoll(18, 16, randomSource);  //reduced to 14, 12
   expected = {winner: 'Character 1', success: true};
   assertions.push({Expected: expected, Actual: actual, Description: 'Reduced character 1 wins'});
   } catch(e){assertions.push({Error: e, Description: 'Reduced character 1 wins'});}

   try{
   randomSource = numberGenerator.dice(6, [5,5,6, 5,5,4]);  //sums 16, 14
   actual = GURPS.RegularContestedSuccessRoll(15, 20, randomSource);  //reduced to 9, 14
   expected = {winner: 'Character 2', success: true};
   assertions.push({Expected: expected, Actual: actual, Description: 'Reduced character 2 wins'});
   } catch(e){assertions.push({Error: e, Description: 'Reduced character 2 wins'});}

   try{
   randomSource = numberGenerator.dice(6, [5,4,1, 4,1,1]);  //sums 10, 6
   actual = GURPS.RegularContestedSuccessRoll(8, 6, randomSource);  //fail, pass
   expected = {winner: 'Character 2', success: true};
   assertions.push({Expected: expected, Actual: actual, Description: 'Character 2 wins'});
   } catch(e){assertions.push({Error: e, Description: 'Character 2 wins'});}

   try{
   randomSource = numberGenerator.dice(6, [1,1,1, 1,1,1]);  //sums 3, 3
   actual = GURPS.RegularContestedSuccessRoll(5, 6, randomSource);
   expected = {winner: 'Tie', success: true};
   assertions.push({Expected: expected, Actual: actual, Description: 'Tie: passed'});
   } catch(e){assertions.push({Error: e, Description: 'Tie: passed'});}

   try{
   randomSource = numberGenerator.dice(6, [5,4,1, 5,4,1]);  //sums 10, 10
   actual = GURPS.RegularContestedSuccessRoll(5, 6, randomSource);
   expected = {winner: 'Tie', success: false};
   assertions.push({Expected: expected, Actual: actual, Description: 'Tie: failed'});
   } catch(e){assertions.push({Error: e, Description: 'Tie: failed'});}

   return TestRunner.displayResults('GURPS GURPS.RegularContestedSuccessRoll', assertions, testState);
};
TestSuite.GURPS._parseDamageString = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], randomSource, actual;

   try{
   randomSource = numberGenerator.dice(6, [3]);
   actual = GURPS._parseDamageString('1d+2')(randomSource);
   assertions.push({Expected: 5, Actual: actual, Description: 'Happy path'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path'});}

   try{
   GURPS._parseDamageString('2d10');
   TestRunner.failedToThrow(assertions, 'Invalid damageString');
   }
   catch(e)
   {
      assertions.push({Expected: new Error('Expected #d (and optional +# etc). Found: 2d10'),
         Actual: e, Description: 'Invalid damageString'});
   }

   try{
   randomSource = numberGenerator.dice(6, [4,6]);
   actual = GURPS._parseDamageString('2d6-1')(randomSource);
   assertions.push({Expected: 9, Actual: actual, Description: '2d6-1'});
   } catch(e){assertions.push({Error: e, Description: '2d6-1'});}

   try{
   randomSource = numberGenerator.dice(6, [4]);
   actual = GURPS._parseDamageString('1d')(randomSource);
   assertions.push({Expected: 4, Actual: actual, Description: '1d'});
   } catch(e){assertions.push({Error: e, Description: '1d'});}

   try{
   randomSource = numberGenerator.dice(6, [1]);
   actual = GURPS._parseDamageString('1DX3')(randomSource);
   assertions.push({Expected: 3, Actual: actual, Description: 'Ignores case'});
   } catch(e){assertions.push({Error: e, Description: 'Ignores case'});}

   try{
   randomSource = numberGenerator.dice(6, [1]);
   actual = GURPS._parseDamageString('1dx2')(randomSource);
   assertions.push({Expected: 2, Actual: actual, Description: 'Lowercase x'});
   } catch(e){assertions.push({Error: e, Description: 'Lowercase x'});}

   try{
   randomSource = numberGenerator.dice(6, [6,4]);
   actual = GURPS._parseDamageString('2d*4')(randomSource);
   assertions.push({Expected: 40, Actual: actual, Description: 'Allows *'});
   } catch(e){assertions.push({Error: e, Description: 'Allows *'});}

   return TestRunner.displayResults('GURPS GURPS._parseDamageString', assertions, testState);
};
TestSuite.GURPS.RandomHitLocation = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], randomSource;

   try{
   randomSource = numberGenerator.dice(6, [6,5,1, 6,6,6]);  //sums 12, 18
   assertions.push({Expected: 'Far Leg', Actual: GURPS.RandomHitLocation.roll(randomSource), Description: 'Happy path: exact'});
   assertions.push({Expected: 'Vital Organs', Actual: GURPS.RandomHitLocation.roll(randomSource), Description: 'Happy path: max'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path'});}

   try{
   randomSource = numberGenerator([{dieSides: 6, values: [1,1,5]}, {dieSides: 2, values: [1]}]);
   assertions.push({Expected: 'Left Hand', Actual: GURPS.RandomHitLocation.roll(randomSource), Description: '7 is nested'});

   randomSource = numberGenerator([{dieSides: 6, values: [6,6,3]}, {dieSides: 2, values: [2]}]);
   assertions.push({Expected: 'Right Foot', Actual: GURPS.RandomHitLocation.roll(randomSource), Description: '15 is nested'});
   } catch(e){assertions.push({Error: e, Description: 'nested'});}

   return TestRunner.displayResults('GURPS GURPS.RandomHitLocation', assertions, testState);
};
