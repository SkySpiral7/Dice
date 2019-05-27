'use strict';
TestSuite.Mistborn = {};
TestSuite.Mistborn.Challenge = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], input, expected, actual;

   try{
   input = {diceCount: 7, difficulty: 1, nudges: 1};
   input.randomSource = numberGenerator.dice(6, [6, 3, 6, 3, 5, 2, 2]);
   actual = Mistborn.Challenge(input);
   expected = {outcome: 2, nudges: 3, allResults: [3, 2], success: true};
   assertions.push({Expected: expected, Actual: actual, Description: 'Happy path, return value'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path'});}

   try{
   input = {diceCount: 3};
   input.randomSource = numberGenerator.dice(6, [1, 1, 1]);
   actual = Mistborn.Challenge(input);
   expected = {outcome: 0, nudges: 0, allResults: [1], success: true};
   assertions.push({Expected: expected, Actual: actual, Description: 'Nudge defaults to 0. difficulty defaults to 1. 3+ of a kind isn\'t special'});
   } catch(e){assertions.push({Error: e, Description: 'default values'});}

   try{
   input = {};
   Mistborn.Challenge(input);
   TestRunner.failedToThrow(assertions, 'Non integer diceCount');
   }
   catch(e)
   {
      assertions.push({Expected: getError(Validation.requireInteger, [input.diceCount]),
         Actual: e, Description: 'Non integer diceCount'});
   }

   try{
   input = {diceCount: 4, difficulty: 'fish'};
   Mistborn.Challenge(input);
   TestRunner.failedToThrow(assertions, 'Non integer difficulty');
   }
   catch(e)
   {
      assertions.push({Expected: getError(Validation.requireInteger, [input.difficulty]),
         Actual: e, Description: 'Non integer difficulty'});
   }

   try{
   input = {diceCount: 4, nudges: 'fish'};
   Mistborn.Challenge(input);
   TestRunner.failedToThrow(assertions, 'Non integer nudges');
   }
   catch(e)
   {
      assertions.push({Expected: getError(Validation.requireInteger, [input.nudges]),
         Actual: e, Description: 'Non integer nudges'});
   }

   try{
   input = {diceCount: 11, difficulty: 2};
   input.randomSource = numberGenerator.dice(6, [6, 3, 6, 3, 5, 2, 2, 1, 2, 2]);
   actual = Mistborn.Challenge(input);
   expected = {outcome: 1, nudges: 3, allResults: [3, 2], success: true};
   assertions.push({Expected: expected, Actual: actual, Description: '10+ become nudges'});
   } catch(e){assertions.push({Error: e, Description: '10+ become nudges'});}

   try{
   input = {diceCount: -1};
   input.randomSource = numberGenerator.dice(6, [2, 2]);
   actual = Mistborn.Challenge(input);
   expected = {outcome: -2, nudges: 0, allResults: [2], success: false};
   assertions.push({Expected: expected, Actual: actual, Description: 'X < 2 lowers result and causes failure'});
   } catch(e){assertions.push({Error: e, Description: 'X < 2 lowers result'});}

   try{
   input = {diceCount: 2};
   input.randomSource = numberGenerator.dice(6, [1, 5]);
   actual = Mistborn.Challenge(input);
   expected = {outcome: -1, nudges: 0, allResults: [], success: false};
   assertions.push({Expected: expected, Actual: actual, Description: 'No pairs means 0'});
   } catch(e){assertions.push({Error: e, Description: 'No pairs means 0'});}

   try{
   input = {diceCount: 0, difficulty: 5};
   input.randomSource = numberGenerator.dice(6, [1, 5]);
   actual = Mistborn.Challenge(input);
   expected = {outcome: -7, nudges: 0, allResults: [], success: false};
   assertions.push({Expected: expected, Actual: actual, Description: 'Allows outcome to be < -6'});
   } catch(e){assertions.push({Error: e, Description: 'Allows outcome to be < -6'});}

   //there's no test for outcome > 6 because the function can't return that

   try{
   input = {diceCount: 2};
   input.randomSource = numberGenerator.dice(6, [6, 6]);
   actual = Mistborn.Challenge(input);
   expected = {outcome: -1, nudges: 2, allResults: [], success: false};
   assertions.push({Expected: expected, Actual: actual, Description: 'Edge case: pair of 6 is result 0'});
   } catch(e){assertions.push({Error: e, Description: 'Edge case: pair of 6 is result 0'});}

   return TestRunner.displayResults('Mistborn Mistborn.Challenge', assertions, testState);
};
TestSuite.Mistborn.Contest = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], character1, character2, expected, actual;

   try{
   character1 = {diceCount: 3, difficulty: 1, nudges: 1};
   character2 = {diceCount: 3, difficulty: 1, nudges: 1};
   character1.randomSource = character2.randomSource = numberGenerator.dice(6, [6, 4, 4, 6, 3, 3]);
   actual = Mistborn.Contest(character1, character2);
   expected = {winner: 'Character 1', outcome: 1, character1: {result: 3, nudges: 2, success: true}, character2: {result: 2, nudges: 2, success: true}};
   assertions.push({Expected: expected, Actual: actual, Description: 'Happy path (character 1 wins by result), return value'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path'});}

   try{
   character1 = {diceCount: 2};
   character2 = {diceCount: 2};
   character1.randomSource = character2.randomSource = numberGenerator.dice(6, [6, 3, 2, 2]);
   actual = Mistborn.Contest(character1, character2);
   expected = {winner: 'Character 2', outcome: 2, character1: {result: 0, nudges: 1}, character2: {result: 2, nudges: 0}};
   assertions.push({Expected: expected, Actual: actual, Description: 'Default difficulty to 0. success undefined. character 2 wins by result'});
   } catch(e){assertions.push({Error: e, Description: 'Default difficulty to 0. success undefined. character 2 wins by result'});}

   try{
   character1 = {diceCount: 2, difficulty: 5};
   character2 = {diceCount: 2, difficulty: 5};
   character1.randomSource = character2.randomSource = numberGenerator.dice(6, [3, 3, 2, 2]);
   actual = Mistborn.Contest(character1, character2);
   expected = {winner: 'Both failed', character1: {result: -2, nudges: 0, success: false}, character2: {result: -3, nudges: 0, success: false}};
   assertions.push({Expected: expected, Actual: actual, Description: 'Both failed'});
   } catch(e){assertions.push({Error: e, Description: 'Both failed'});}

   try{
   character1 = {diceCount: 2};
   character2 = {diceCount: 2};
   character1.randomSource = character2.randomSource = numberGenerator.dice(6, [6, 3, 1, 2]);
   actual = Mistborn.Contest(character1, character2);
   expected = {winner: 'Character 1', outcome: 0, character1: {result: 0, nudges: 1}, character2: {result: 0, nudges: 0}};
   assertions.push({Expected: expected, Actual: actual, Description: 'Character 1 wins by nudges'});
   } catch(e){assertions.push({Error: e, Description: 'Character 1 wins by nudges'});}

   try{
   character1 = {diceCount: 3};
   character2 = {diceCount: 3};
   character1.randomSource = character2.randomSource = numberGenerator.dice(6, [2, 2, 1, 6, 2, 2]);
   actual = Mistborn.Contest(character1, character2);
   expected = {winner: 'Character 2', outcome: 0, character1: {result: 2, nudges: 0}, character2: {result: 2, nudges: 1}};
   assertions.push({Expected: expected, Actual: actual, Description: 'Character 2 wins by nudges'});
   } catch(e){assertions.push({Error: e, Description: 'Character 2 wins by nudges'});}

   try{
   character1 = {diceCount: 3};
   character2 = {diceCount: 3};
   character1.randomSource = character2.randomSource = numberGenerator.dice(6, [2, 1, 6, 6, 3, 2]);
   actual = Mistborn.Contest(character1, character2);
   expected = {winner: 'Tie', character1: {result: 0, nudges: 1}, character2: {result: 0, nudges: 1}};
   assertions.push({Expected: expected, Actual: actual, Description: 'Tie'});
   } catch(e){assertions.push({Error: e, Description: 'Tie'});}

   try{
   character1 = {diceCount: 2};
   character2 = {diceCount: 0};
   character1.randomSource = character2.randomSource = numberGenerator.dice(6, [5, 5, 1, 3]);
   actual = Mistborn.Contest(character1, character2);
   expected = {winner: 'Character 1', outcome: 7, character1: {result: 5, nudges: 0}, character2: {result: -2, nudges: 0}};
   assertions.push({Expected: expected, Actual: actual, Description: 'Allows an outcome of more than 6'});
   } catch(e){assertions.push({Error: e, Description: 'Allows an outcome of more than 6'});}

   try{
   character1 = {diceCount: 2, difficulty: 3};
   character2 = {diceCount: 2, difficulty: 3};
   character1.randomSource = character2.randomSource = numberGenerator.dice(6, [4, 4, 2, 2]);
   actual = Mistborn.Contest(character1, character2);
   expected = {winner: 'Character 1', outcome: 2, character1: {result: 1, nudges: 0, success: true}, character2: {result: -1, nudges: 0, success: false}};
   assertions.push({Expected: expected, Actual: actual, Description: 'Only 1 succeeded'});
   } catch(e){assertions.push({Error: e, Description: 'Only 1 succeeded'});}

   try{
   character1 = {diceCount: 2, difficulty: 3};
   character2 = {diceCount: 2};
   character1.randomSource = character2.randomSource = numberGenerator.dice(6, [4, 4, 2, 2]);
   actual = Mistborn.Contest(character1, character2);
   expected = {winner: 'Character 2', outcome: 1, character1: {result: 1, nudges: 0, success: true}, character2: {result: 2, nudges: 0}};
   assertions.push({Expected: expected, Actual: actual, Description: 'difficulty:pass, other:positive'});
   } catch(e){assertions.push({Error: e, Description: 'difficulty:pass, other:positive'});}

   try{
   character1 = {diceCount: 2, difficulty: 3};
   character2 = {diceCount: 2};
   character1.randomSource = character2.randomSource = numberGenerator.dice(6, [2, 2, 2, 2]);
   actual = Mistborn.Contest(character1, character2);
   expected = {winner: 'Character 2', outcome: 3, character1: {result: -1, nudges: 0, success: false}, character2: {result: 2, nudges: 0}};
   assertions.push({Expected: expected, Actual: actual, Description: 'difficulty:fail, other:positive'});
   } catch(e){assertions.push({Error: e, Description: 'difficulty:fail, other:positive'});}

   try{
   character1 = {diceCount: 2, difficulty: 3};
   character2 = {diceCount: 1};
   character1.randomSource = character2.randomSource = numberGenerator.dice(6, [4, 4, 2, 1]);
   actual = Mistborn.Contest(character1, character2);
   expected = {winner: 'Character 1', outcome: 2, character1: {result: 1, nudges: 0, success: true}, character2: {result: -1, nudges: 0}};
   assertions.push({Expected: expected, Actual: actual, Description: 'difficulty:pass, other:negative'});
   } catch(e){assertions.push({Error: e, Description: 'difficulty:pass, other:negative'});}

   try{
   character1 = {diceCount: 2, difficulty: 3};
   character2 = {diceCount: 0};
   character1.randomSource = character2.randomSource = numberGenerator.dice(6, [2, 2, 2, 1]);
   actual = Mistborn.Contest(character1, character2);
   expected = {winner: 'Character 1', outcome: 1, character1: {result: -1, nudges: 0, success: false}, character2: {result: -2, nudges: 0}};
   assertions.push({Expected: expected, Actual: actual, Description: 'difficulty:fail, other:negative, winner:1'});
   } catch(e){assertions.push({Error: e, Description: 'difficulty:fail, other:negative, winner:1'});}

   try{
   character1 = {diceCount: 2, difficulty: 3};
   character2 = {diceCount: 1};
   character1.randomSource = character2.randomSource = numberGenerator.dice(6, [2, 1, 2, 1]);
   actual = Mistborn.Contest(character1, character2);
   expected = {winner: 'Character 2', outcome: 2, character1: {result: -3, nudges: 0, success: false}, character2: {result: -1, nudges: 0}};
   assertions.push({Expected: expected, Actual: actual, Description: 'difficulty:fail, other:negative, winner:2'});
   } catch(e){assertions.push({Error: e, Description: 'difficulty:fail, other:negative, winner:2'});}

   return TestRunner.displayResults('Mistborn Mistborn.Contest', assertions, testState);
};
