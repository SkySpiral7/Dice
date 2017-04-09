'use strict';
TestSuite.Prebuilt = {};
TestSuite.Prebuilt.MistbornChallenge = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], input, expected, actual;

   try{
   input = {diceCount: 7, difficulty: 1, nudges: 1};
   input.randomSource = dieResultsToNonRandomGenerator(6, [6, 3, 6, 3, 5, 2, 2]);
   actual = Prebuilt.MistbornChallenge(input);
   expected = {outcome: 2, nudges: 3, allResults: [3, 2], success: true};
   testResults.push({Expected: expected, Actual: actual, Description: 'Happy path, return value'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   input = {diceCount: 3};
   input.randomSource = dieResultsToNonRandomGenerator(6, [1, 1, 1]);
   actual = Prebuilt.MistbornChallenge(input);
   expected = {outcome: 0, nudges: 0, allResults: [1], success: true};
   testResults.push({Expected: expected, Actual: actual, Description: 'Nudge defaults to 0. difficulty defaults to 1. 3+ of a kind isn\'t special'});
   } catch(e){testResults.push({Error: e, Description: 'default values'});}

   try{
   input = {};
   Prebuilt.MistbornChallenge(input);
   TestRunner.failedToThrow(testResults, 'Non integer diceCount');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireInteger, [input.diceCount]),
         Actual: e, Description: 'Non integer diceCount'});
   }

   try{
   input = {diceCount: 4, difficulty: 'fish'};
   Prebuilt.MistbornChallenge(input);
   TestRunner.failedToThrow(testResults, 'Non integer difficulty');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireInteger, [input.difficulty]),
         Actual: e, Description: 'Non integer difficulty'});
   }

   try{
   input = {diceCount: 4, nudges: 'fish'};
   Prebuilt.MistbornChallenge(input);
   TestRunner.failedToThrow(testResults, 'Non integer nudges');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireInteger, [input.nudges]),
         Actual: e, Description: 'Non integer nudges'});
   }

   try{
   input = {diceCount: 11, difficulty: 2};
   input.randomSource = dieResultsToNonRandomGenerator(6, [6, 3, 6, 3, 5, 2, 2, 1, 2, 2]);
   actual = Prebuilt.MistbornChallenge(input);
   expected = {outcome: 1, nudges: 3, allResults: [3, 2], success: true};
   testResults.push({Expected: expected, Actual: actual, Description: '10+ become nudges'});
   } catch(e){testResults.push({Error: e, Description: '10+ become nudges'});}

   try{
   input = {diceCount: -1};
   input.randomSource = dieResultsToNonRandomGenerator(6, [2, 2]);
   actual = Prebuilt.MistbornChallenge(input);
   expected = {outcome: -2, nudges: 0, allResults: [2], success: false};
   testResults.push({Expected: expected, Actual: actual, Description: 'X < 2 lowers result and causes failure'});
   } catch(e){testResults.push({Error: e, Description: 'X < 2 lowers result'});}

   try{
   input = {diceCount: 2};
   input.randomSource = dieResultsToNonRandomGenerator(6, [1, 5]);
   actual = Prebuilt.MistbornChallenge(input);
   expected = {outcome: -1, nudges: 0, allResults: [], success: false};
   testResults.push({Expected: expected, Actual: actual, Description: 'No pairs means 0'});
   } catch(e){testResults.push({Error: e, Description: 'No pairs means 0'});}

   try{
   input = {diceCount: 0, difficulty: 5};
   input.randomSource = dieResultsToNonRandomGenerator(6, [1, 5]);
   actual = Prebuilt.MistbornChallenge(input);
   expected = {outcome: -7, nudges: 0, allResults: [], success: false};
   testResults.push({Expected: expected, Actual: actual, Description: 'Allows outcome to be < -6'});
   } catch(e){testResults.push({Error: e, Description: 'Allows outcome to be < -6'});}

   //there's no test for outcome > 6 because the function can't return that

   try{
   input = {diceCount: 2};
   input.randomSource = dieResultsToNonRandomGenerator(6, [6, 6]);
   actual = Prebuilt.MistbornChallenge(input);
   expected = {outcome: -1, nudges: 2, allResults: [], success: false};
   testResults.push({Expected: expected, Actual: actual, Description: 'Edge case: pair of 6 is result 0'});
   } catch(e){testResults.push({Error: e, Description: 'Edge case: pair of 6 is result 0'});}

   return TestRunner.displayResults('Prebuilt Prebuilt.MistbornChallenge', testResults, isFirst);
};
TestSuite.Prebuilt.MistbornContest = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], character1, character2, expected, actual;

   try{
   character1 = {diceCount: 3, difficulty: 1, nudges: 1};
   character2 = {diceCount: 3, difficulty: 1, nudges: 1};
   character1.randomSource = character2.randomSource = dieResultsToNonRandomGenerator(6, [6, 4, 4, 6, 3, 3]);
   actual = Prebuilt.MistbornContest(character1, character2);
   expected = {winner: 'Character 1', outcome: 1, character1: {result: 3, nudges: 2, success: true}, character2: {result: 2, nudges: 2, success: true}};
   testResults.push({Expected: expected, Actual: actual, Description: 'Happy path (character 1 wins by result), return value'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   character1 = {diceCount: 2};
   character2 = {diceCount: 2};
   character1.randomSource = character2.randomSource = dieResultsToNonRandomGenerator(6, [6, 3, 2, 2]);
   actual = Prebuilt.MistbornContest(character1, character2);
   expected = {winner: 'Character 2', outcome: 2, character1: {result: 0, nudges: 1}, character2: {result: 2, nudges: 0}};
   testResults.push({Expected: expected, Actual: actual, Description: 'Default difficulty to 0. success undefined. character 2 wins by result'});
   } catch(e){testResults.push({Error: e, Description: 'Default difficulty to 0. success undefined. character 2 wins by result'});}

   try{
   character1 = {diceCount: 2, difficulty: 5};
   character2 = {diceCount: 2, difficulty: 5};
   character1.randomSource = character2.randomSource = dieResultsToNonRandomGenerator(6, [3, 3, 2, 2]);
   actual = Prebuilt.MistbornContest(character1, character2);
   expected = {winner: 'Both failed', character1: {result: -2, nudges: 0, success: false}, character2: {result: -3, nudges: 0, success: false}};
   testResults.push({Expected: expected, Actual: actual, Description: 'Both failed'});
   } catch(e){testResults.push({Error: e, Description: 'Both failed'});}

   try{
   character1 = {diceCount: 2};
   character2 = {diceCount: 2};
   character1.randomSource = character2.randomSource = dieResultsToNonRandomGenerator(6, [6, 3, 1, 2]);
   actual = Prebuilt.MistbornContest(character1, character2);
   expected = {winner: 'Character 1', outcome: 0, character1: {result: 0, nudges: 1}, character2: {result: 0, nudges: 0}};
   testResults.push({Expected: expected, Actual: actual, Description: 'Character 1 wins by nudges'});
   } catch(e){testResults.push({Error: e, Description: 'Character 1 wins by nudges'});}

   try{
   character1 = {diceCount: 3};
   character2 = {diceCount: 3};
   character1.randomSource = character2.randomSource = dieResultsToNonRandomGenerator(6, [2, 2, 1, 6, 2, 2]);
   actual = Prebuilt.MistbornContest(character1, character2);
   expected = {winner: 'Character 2', outcome: 0, character1: {result: 2, nudges: 0}, character2: {result: 2, nudges: 1}};
   testResults.push({Expected: expected, Actual: actual, Description: 'Character 2 wins by nudges'});
   } catch(e){testResults.push({Error: e, Description: 'Character 2 wins by nudges'});}

   try{
   character1 = {diceCount: 3};
   character2 = {diceCount: 3};
   character1.randomSource = character2.randomSource = dieResultsToNonRandomGenerator(6, [2, 1, 6, 6, 3, 2]);
   actual = Prebuilt.MistbornContest(character1, character2);
   expected = {winner: 'Tie', character1: {result: 0, nudges: 1}, character2: {result: 0, nudges: 1}};
   testResults.push({Expected: expected, Actual: actual, Description: 'Tie'});
   } catch(e){testResults.push({Error: e, Description: 'Tie'});}

   try{
   character1 = {diceCount: 2};
   character2 = {diceCount: 0};
   character1.randomSource = character2.randomSource = dieResultsToNonRandomGenerator(6, [5, 5, 1, 3]);
   actual = Prebuilt.MistbornContest(character1, character2);
   expected = {winner: 'Character 1', outcome: 7, character1: {result: 5, nudges: 0}, character2: {result: -2, nudges: 0}};
   testResults.push({Expected: expected, Actual: actual, Description: 'Allows an outcome of more than 6'});
   } catch(e){testResults.push({Error: e, Description: 'Allows an outcome of more than 6'});}

   try{
   character1 = {diceCount: 2, difficulty: 3};
   character2 = {diceCount: 2, difficulty: 3};
   character1.randomSource = character2.randomSource = dieResultsToNonRandomGenerator(6, [4, 4, 2, 2]);
   actual = Prebuilt.MistbornContest(character1, character2);
   expected = {winner: 'Character 1', outcome: 2, character1: {result: 1, nudges: 0, success: true}, character2: {result: -1, nudges: 0, success: false}};
   testResults.push({Expected: expected, Actual: actual, Description: 'Only 1 succeeded'});
   } catch(e){testResults.push({Error: e, Description: 'Only 1 succeeded'});}

   try{
   character1 = {diceCount: 2, difficulty: 3};
   character2 = {diceCount: 2};
   character1.randomSource = character2.randomSource = dieResultsToNonRandomGenerator(6, [4, 4, 2, 2]);
   actual = Prebuilt.MistbornContest(character1, character2);
   expected = {winner: 'Character 2', outcome: 1, character1: {result: 1, nudges: 0, success: true}, character2: {result: 2, nudges: 0}};
   testResults.push({Expected: expected, Actual: actual, Description: 'difficulty:pass, other:positive'});
   } catch(e){testResults.push({Error: e, Description: 'difficulty:pass, other:positive'});}

   try{
   character1 = {diceCount: 2, difficulty: 3};
   character2 = {diceCount: 2};
   character1.randomSource = character2.randomSource = dieResultsToNonRandomGenerator(6, [2, 2, 2, 2]);
   actual = Prebuilt.MistbornContest(character1, character2);
   expected = {winner: 'Character 2', outcome: 3, character1: {result: -1, nudges: 0, success: false}, character2: {result: 2, nudges: 0}};
   testResults.push({Expected: expected, Actual: actual, Description: 'difficulty:fail, other:positive'});
   } catch(e){testResults.push({Error: e, Description: 'difficulty:fail, other:positive'});}

   try{
   character1 = {diceCount: 2, difficulty: 3};
   character2 = {diceCount: 1};
   character1.randomSource = character2.randomSource = dieResultsToNonRandomGenerator(6, [4, 4, 2, 1]);
   actual = Prebuilt.MistbornContest(character1, character2);
   expected = {winner: 'Character 1', outcome: 2, character1: {result: 1, nudges: 0, success: true}, character2: {result: -1, nudges: 0}};
   testResults.push({Expected: expected, Actual: actual, Description: 'difficulty:pass, other:negative'});
   } catch(e){testResults.push({Error: e, Description: 'difficulty:pass, other:negative'});}

   try{
   character1 = {diceCount: 2, difficulty: 3};
   character2 = {diceCount: 0};
   character1.randomSource = character2.randomSource = dieResultsToNonRandomGenerator(6, [2, 2, 2, 1]);
   actual = Prebuilt.MistbornContest(character1, character2);
   expected = {winner: 'Character 1', outcome: 1, character1: {result: -1, nudges: 0, success: false}, character2: {result: -2, nudges: 0}};
   testResults.push({Expected: expected, Actual: actual, Description: 'difficulty:fail, other:negative, winner:1'});
   } catch(e){testResults.push({Error: e, Description: 'difficulty:fail, other:negative, winner:1'});}

   try{
   character1 = {diceCount: 2, difficulty: 3};
   character2 = {diceCount: 1};
   character1.randomSource = character2.randomSource = dieResultsToNonRandomGenerator(6, [2, 1, 2, 1]);
   actual = Prebuilt.MistbornContest(character1, character2);
   expected = {winner: 'Character 2', outcome: 2, character1: {result: -3, nudges: 0, success: false}, character2: {result: -1, nudges: 0}};
   testResults.push({Expected: expected, Actual: actual, Description: 'difficulty:fail, other:negative, winner:2'});
   } catch(e){testResults.push({Error: e, Description: 'difficulty:fail, other:negative, winner:2'});}

   return TestRunner.displayResults('Prebuilt Prebuilt.MistbornContest', testResults, isFirst);
};
TestSuite.Prebuilt.PathfinderAttack = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], input, expected, actual, actualStringValue;

   try{
   input = {attackBonus: 4, weapon: {damageString: '1d8', flatDamageModifer: 3}, opposingAc: 12};
   input.randomSource = nonRandomNumberGenerator(dieResultsToNonRandomArray(20, [19]).concat(dieResultsToNonRandomArray(8, [5])));
   actual = Prebuilt.PathfinderAttack(input);
   actualStringValue = actual.toString();
   delete actual.toString;
   expected = {attack: 'Hit', damage: {nonLethal: 0, lethal: 8}};
   testResults.push({Expected: expected, Actual: actual, Description: 'Happy path, return value'});
   testResults.push({Expected: Stringifier.PathfinderAttack(expected), Actual: actualStringValue, Description: 'Happy path, string value'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   input = {attackBonus: -5, weapon: {minimumCritical: 1, criticalMultiplier: 1, damageString: '1d2', flatDamageModifer: -5, extraDamageDiceString: '1d2'}, opposingAc: 5, damageReduction: 0};
   Prebuilt.PathfinderAttack(input);
   testResults.push({Expected: true, Actual: true, Description: 'Minimum values don\'t throw'});
   } catch(e){testResults.push({Error: e, Description: 'Minimum values don\'t throw'});}

   try{
   input = {attackBonus: 1, opposingAc: 11};
   Prebuilt.PathfinderAttack(input);
   TestRunner.failedToThrow(testResults, 'Missing weapon');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('weapon object is required.'),
         Actual: e, Description: 'Missing weapon'});
   }

   try{
   input = {attackBonus: 1, weapon: {minimumCritical: -1}, opposingAc: 11};
   Prebuilt.PathfinderAttack(input);
   TestRunner.failedToThrow(testResults, 'Non natural minimumCritical');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireNaturalNumber, [input.weapon.minimumCritical]),
         Actual: e, Description: 'Non natural minimumCritical'});
   }

   try{
   input = {attackBonus: 1, weapon: {minimumCritical: 22}, opposingAc: 11};
   Prebuilt.PathfinderAttack(input);
   TestRunner.failedToThrow(testResults, 'Too large minimumCritical');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('Invalid weapon.minimumCritical. It was: 22'),
         Actual: e, Description: 'Too large minimumCritical'});
   }

   try{
   input = {attackBonus: 1, weapon: {criticalMultiplier: -1}, opposingAc: 11};
   Prebuilt.PathfinderAttack(input);
   TestRunner.failedToThrow(testResults, 'Non natural criticalMultiplier');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireNaturalNumber, [input.weapon.criticalMultiplier]),
         Actual: e, Description: 'Non natural criticalMultiplier'});
   }

   try{
   input = {attackBonus: 1, weapon: {damageString: -1}, opposingAc: 11};
   Prebuilt.PathfinderAttack(input);
   TestRunner.failedToThrow(testResults, 'Invalid damageString');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireTypeOf, ['string', input.weapon.damageString]),
         Actual: e, Description: 'Invalid damageString'});
   }

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d2', flatDamageModifer: 1.2}, opposingAc: 11};
   Prebuilt.PathfinderAttack(input);
   TestRunner.failedToThrow(testResults, 'Invalid flatDamageModifer');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireInteger, [input.weapon.flatDamageModifer]),
         Actual: e, Description: 'Invalid flatDamageModifer'});
   }

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d2', extraDamageDiceString: 1.2}, opposingAc: 11};
   Prebuilt.PathfinderAttack(input);
   TestRunner.failedToThrow(testResults, 'Invalid extraDamageDiceString');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireTypeOf, ['string', input.weapon.extraDamageDiceString]),
         Actual: e, Description: 'Invalid extraDamageDiceString'});
   }

   try{
   input = {attackBonus: 1.5, weapon: {damageString: '1d2'}, opposingAc: 11};
   Prebuilt.PathfinderAttack(input);
   TestRunner.failedToThrow(testResults, 'Invalid attackBonus');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireInteger, [input.attackBonus]),
         Actual: e, Description: 'Invalid attackBonus'});
   }

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d2'}, opposingAc: 'lp'};
   Prebuilt.PathfinderAttack(input);
   TestRunner.failedToThrow(testResults, 'Invalid opposingAc');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireNaturalNumber, [input.opposingAc]),
         Actual: e, Description: 'Invalid opposingAc'});
   }

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d2'}, opposingAc: 12, damageReduction: 1.5};
   Prebuilt.PathfinderAttack(input);
   TestRunner.failedToThrow(testResults, 'Invalid damageReduction');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('Must be a non-negative integer but was 1.5'),
         Actual: e, Description: 'Invalid damageReduction'});
   }

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d2'}, opposingAc: 12, damageReduction: -2};
   Prebuilt.PathfinderAttack(input);
   TestRunner.failedToThrow(testResults, 'Negative damageReduction');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('Must be a non-negative integer but was -2'),
         Actual: e, Description: 'Negative damageReduction'});
   }

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d8'}, opposingAc: 12};
   input.randomSource = dieResultsToNonRandomGenerator(20, [1]);
   actual = Prebuilt.PathfinderAttack(input);
   actualStringValue = actual.toString();
   delete actual.toString;
   expected = {attack: 'Critical Miss'};
   testResults.push({Expected: expected, Actual: actual, Description: 'Critical Miss, return value'});
   testResults.push({Expected: Stringifier.PathfinderAttack(expected), Actual: actualStringValue, Description: 'Critical Miss, string value'});
   } catch(e){testResults.push({Error: e, Description: 'Critical Miss'});}

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d8'}, opposingAc: 100};
   input.randomSource = nonRandomNumberGenerator(dieResultsToNonRandomArray(20, [20, 1]).concat(dieResultsToNonRandomArray(8, [5])));
   actual = Prebuilt.PathfinderAttack(input);
   delete actual.toString;
   expected = {attack: 'Hit', damage: {nonLethal: 0, lethal: 5}};
   testResults.push({Expected: expected, Actual: actual, Description: 'Natural 20 auto hits'});
   } catch(e){testResults.push({Error: e, Description: 'Natural 20 auto hits'});}

   try{
   input = {attackBonus: 1, weapon: {minimumCritical: 15, damageString: '1d8'}, opposingAc: 100};
   input.randomSource = dieResultsToNonRandomGenerator(20, [16]);
   actual = Prebuilt.PathfinderAttack(input);
   actualStringValue = actual.toString();
   delete actual.toString;
   expected = {attack: 'Miss'};
   testResults.push({Expected: expected, Actual: actual, Description: 'Increased threat range doesn\'t auto hit'});
   testResults.push({Expected: Stringifier.PathfinderAttack(expected), Actual: actualStringValue, Description: 'Miss, string value'});
   } catch(e){testResults.push({Error: e, Description: 'Increased threat range doesn\'t auto hit'});}

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d8'}, opposingAc: 100};
   input.randomSource = nonRandomNumberGenerator(dieResultsToNonRandomArray(20, [20, 20]).concat(dieResultsToNonRandomArray(8, [5])));
   actual = Prebuilt.PathfinderAttack(input);
   delete actual.toString;
   expected = {attack: 'Hit', damage: {nonLethal: 0, lethal: 5}};
   testResults.push({Expected: expected, Actual: actual, Description: 'Confirm with natural 20 isn\'t special'});
   } catch(e){testResults.push({Error: e, Description: 'Confirm with natural 20 isn\'t special'});}

   try{
   input = {attackBonus: 1, weapon: {minimumCritical: 18, damageString: '1d8'}, opposingAc: 11};
   input.randomSource = nonRandomNumberGenerator(dieResultsToNonRandomArray(20, [18, 11]).concat(dieResultsToNonRandomArray(8, [5, 3])));
   actual = Prebuilt.PathfinderAttack(input);
   delete actual.toString;
   expected = {attack: 'Critical Hit', damage: {nonLethal: 0, lethal: 8}};
   testResults.push({Expected: expected, Actual: actual, Description: 'Increased critical range. Damage rolled twice.'});
   } catch(e){testResults.push({Error: e, Description: 'Increased critical range. Damage rolled twice.'});}

   try{
   input = {attackBonus: 1, weapon: {criticalMultiplier: 3, damageString: '1d8', flatDamageModifer: 2, extraDamageDiceString: '1d6'}, opposingAc: 11};
   input.randomSource = nonRandomNumberGenerator(dieResultsToNonRandomArray(20, [20, 20]).concat(dieResultsToNonRandomArray(8, [5, 7, 6])).concat(dieResultsToNonRandomArray(6, [5])));
   actual = Prebuilt.PathfinderAttack(input);
   delete actual.toString;
   //29 === (5+2)+(7+2)+(6+2)+5
   expected = {attack: 'Critical Hit', damage: {nonLethal: 0, lethal: 29}};
   testResults.push({Expected: expected, Actual: actual, Description: 'x3 includes flat mod but not dice'});
   } catch(e){testResults.push({Error: e, Description: 'x3 includes flat mod but not dice'});}

   try{
   input = {attackBonus: 1, weapon: {criticalMultiplier: 3, damageString: '1d8', flatDamageModifer: -2}, opposingAc: 11};
   input.randomSource = nonRandomNumberGenerator(dieResultsToNonRandomArray(20, [20, 20]).concat(dieResultsToNonRandomArray(8, [1, 2, 3])));
   actual = Prebuilt.PathfinderAttack(input);
   delete actual.toString;
   expected = {attack: 'Critical Hit', damage: {nonLethal: 2, lethal: 1}};
   testResults.push({Expected: expected, Actual: actual, Description: 'Minimum damage is nonlethal and applies to each'});
   } catch(e){testResults.push({Error: e, Description: 'Minimum damage is nonlethal and applies to each'});}

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d8', flatDamageModifer: -1}, opposingAc: 11, damageReduction: 5};
   input.randomSource = nonRandomNumberGenerator(dieResultsToNonRandomArray(20, [20, 10]).concat(dieResultsToNonRandomArray(8, [8, 1])));
   actual = Prebuilt.PathfinderAttack(input);
   delete actual.toString;
   expected = {attack: 'Critical Hit', damage: {nonLethal: 1, lethal: 2}};
   testResults.push({Expected: expected, Actual: actual, Description: 'lethal damage > DR'});
   } catch(e){testResults.push({Error: e, Description: 'lethal damage > DR'});}

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d8'}, opposingAc: 11, damageReduction: 5};
   input.randomSource = nonRandomNumberGenerator(dieResultsToNonRandomArray(20, [10]).concat(dieResultsToNonRandomArray(8, [5])));
   actual = Prebuilt.PathfinderAttack(input);
   delete actual.toString;
   expected = {attack: 'Hit', damage: {nonLethal: 0, lethal: 0}};
   testResults.push({Expected: expected, Actual: actual, Description: 'lethal damage === DR'});
   } catch(e){testResults.push({Error: e, Description: 'lethal damage === DR'});}

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d8'}, opposingAc: 11, damageReduction: 5};
   input.randomSource = nonRandomNumberGenerator(dieResultsToNonRandomArray(20, [10]).concat(dieResultsToNonRandomArray(8, [3])));
   actual = Prebuilt.PathfinderAttack(input);
   delete actual.toString;
   expected = {attack: 'Hit', damage: {nonLethal: 0, lethal: 0}};
   testResults.push({Expected: expected, Actual: actual, Description: 'lethal damage < DR'});
   } catch(e){testResults.push({Error: e, Description: 'lethal damage < DR'});}

   try{
   input = {attackBonus: 1, weapon: {criticalMultiplier: 3, damageString: '1d8', flatDamageModifer: -1}, opposingAc: 11, damageReduction: 3};
   input.randomSource = nonRandomNumberGenerator(dieResultsToNonRandomArray(20, [20, 10]).concat(dieResultsToNonRandomArray(8, [1, 1, 3])));
   actual = Prebuilt.PathfinderAttack(input);
   delete actual.toString;
   expected = {attack: 'Critical Hit', damage: {nonLethal: 1, lethal: 0}};
   testResults.push({Expected: expected, Actual: actual, Description: 'DR for lethal then non'});
   } catch(e){testResults.push({Error: e, Description: 'DR for lethal then non'});}

   try{
   input = {attackBonus: 1, weapon: {criticalMultiplier: 3, damageString: '1d8', flatDamageModifer: -1}, opposingAc: 11, damageReduction: 5};
   input.randomSource = nonRandomNumberGenerator(dieResultsToNonRandomArray(20, [20, 10]).concat(dieResultsToNonRandomArray(8, [1, 1, 3])));
   actual = Prebuilt.PathfinderAttack(input);
   delete actual.toString;
   expected = {attack: 'Critical Hit', damage: {nonLethal: 0, lethal: 0}};
   testResults.push({Expected: expected, Actual: actual, Description: 'DR for both'});
   } catch(e){testResults.push({Error: e, Description: 'DR for both'});}

   return TestRunner.displayResults('Prebuilt Prebuilt.PathfinderAttack', testResults, isFirst);
};
TestSuite.Prebuilt.L5RGeneralRoll = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], input, expected, actual, stringValue;

   try{
   input = {circumstanceBonus: 1, numberOfRaises: 1, targetNumber: 5, diceRolled: 2, diceKept: 1, hasEmphasis: true};
   //the die can't be optimized to 9 sided because of compound exploding:
   input.randomSource = dieResultsToNonRandomGenerator(10, [1, 10, 2, 3, 5]);  //reroll, explosion, and 5 is ignored
   //so the results are 12 and 3 with 12 kept (TN=10)
   actual = Prebuilt.L5RGeneralRoll(input);
   stringValue = actual.toString();
   delete actual.toString;
   expected = {valuesKept: [12], totalValue: 13, voidPointsRecovered: 0, valuesDropped: [3], success: true};
   testResults.push({Expected: expected, Actual: actual, Description: 'Happy path, all values'});
   testResults.push({Expected: Stringifier.L5RGeneralRoll(expected), Actual: stringValue, Description: 'Happy path: String Value'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   input = {targetNumber: 5, diceRolled: 2, diceKept: 1};
   Prebuilt.L5RGeneralRoll(input);
   testResults.push({Expected: true, Actual: true, Description: 'Minimum doesn\'t throw'});
   } catch(e){testResults.push({Error: e, Description: 'Minimum doesn\'t throw'});}

   try{
   input = {circumstanceBonus: 2.5, targetNumber: 5, diceRolled: 2, diceKept: 1};
   Prebuilt.L5RGeneralRoll(input);
   TestRunner.failedToThrow(testResults, 'Invalid circumstanceBonus');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('Must be an integer but was 2.5'),
         Actual: e, Description: 'Invalid circumstanceBonus'});
   }

   try{
   input = {numberOfRaises: -2, targetNumber: 5, diceRolled: 2, diceKept: 1};
   Prebuilt.L5RGeneralRoll(input);
   TestRunner.failedToThrow(testResults, 'Negative numberOfRaises');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('Must be a non-negative integer but was -2'),
         Actual: e, Description: 'Negative numberOfRaises'});
   }

   try{
   input = {numberOfRaises: 2.5, targetNumber: 5, diceRolled: 2, diceKept: 1};
   Prebuilt.L5RGeneralRoll(input);
   TestRunner.failedToThrow(testResults, 'Invalid numberOfRaises');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('Must be a non-negative integer but was 2.5'),
         Actual: e, Description: 'Invalid numberOfRaises'});
   }

   try{
   input = {targetNumber: 'Fred', diceRolled: 2, diceKept: 1};
   Prebuilt.L5RGeneralRoll(input);
   TestRunner.failedToThrow(testResults, 'Invalid targetNumber');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireNaturalNumber, [input.targetNumber]),
         Actual: e, Description: 'Invalid targetNumber'});
   }

   try{
   input = {targetNumber: 5, diceRolled: 'Fred', diceKept: 1};
   Prebuilt.L5RGeneralRoll(input);
   TestRunner.failedToThrow(testResults, 'Invalid diceRolled');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireNaturalNumber, [input.diceRolled]),
         Actual: e, Description: 'Invalid diceRolled'});
   }

   try{
   input = {targetNumber: 5, diceRolled: 11, diceKept: 1};
   Prebuilt.L5RGeneralRoll(input);
   TestRunner.failedToThrow(testResults, 'Over max diceRolled');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('It\'s never possible to roll more than 10 dice. input was: 11'),
         Actual: e, Description: 'Over max diceRolled'});
   }

   try{
   input = {targetNumber: 5, diceRolled: 2, diceKept: 'Fred'};
   Prebuilt.L5RGeneralRoll(input);
   TestRunner.failedToThrow(testResults, 'Invalid diceKept');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireNaturalNumber, [input.diceKept]),
         Actual: e, Description: 'Invalid diceKept'});
   }

   try{
   input = {targetNumber: 5, diceRolled: 2, diceKept: 3};
   Prebuilt.L5RGeneralRoll(input);
   TestRunner.failedToThrow(testResults, 'Over max diceKept');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('diceKept (3) is more than diceRolled (2)'),
         Actual: e, Description: 'Over max diceKept'});
   }

   try{
   input = {targetNumber: 5, diceRolled: 2, diceKept: 2, hasEmphasis: 'Fred'};
   input.randomSource = dieResultsToNonRandomGenerator(10, [1, 6]);
   actual = Prebuilt.L5RGeneralRoll(input);
   delete actual.toString;
   expected = {valuesKept: [1, 6], totalValue: 7, voidPointsRecovered: 0, valuesDropped: [], success: true};
   testResults.push({Expected: expected, Actual: actual, Description: 'Invalid hasEmphasis becomes false'});
   } catch(e){testResults.push({Error: e, Description: 'Invalid hasEmphasis becomes false'});}

   try{
   input = {targetNumber: 5, diceRolled: 2, diceKept: 2};
   input.randomSource = dieResultsToNonRandomGenerator(10, [1, 6]);
   actual = Prebuilt.L5RGeneralRoll(input);
   delete actual.toString;
   expected = {valuesKept: [1, 6], totalValue: 7, voidPointsRecovered: 0, valuesDropped: [], success: true};
   testResults.push({Expected: expected, Actual: actual, Description: 'hasEmphasis defaults to false'});
   } catch(e){testResults.push({Error: e, Description: 'hasEmphasis defaults to false'});}

   try{
   input = {numberOfRaises: 1, targetNumber: 5, diceRolled: 2, diceKept: 2};
   input.randomSource = dieResultsToNonRandomGenerator(10, [3, 6]);
   actual = Prebuilt.L5RGeneralRoll(input);
   delete actual.toString;
   expected = {valuesKept: [3, 6], totalValue: 9, voidPointsRecovered: 0, valuesDropped: [], success: false};
   testResults.push({Expected: expected, Actual: actual, Description: 'numberOfRaises increases TN by 5: failure'});

   input = {numberOfRaises: 1, targetNumber: 5, diceRolled: 2, diceKept: 2};
   input.randomSource = dieResultsToNonRandomGenerator(10, [4, 6]);
   actual = Prebuilt.L5RGeneralRoll(input);
   delete actual.toString;
   expected = {valuesKept: [4, 6], totalValue: 10, voidPointsRecovered: 0, valuesDropped: [], success: true};
   testResults.push({Expected: expected, Actual: actual, Description: 'numberOfRaises increases TN by 5: success'});
   } catch(e){testResults.push({Error: e, Description: 'numberOfRaises increases TN by 5'});}

   //hasEmphasis=true was tested by Happy path. and =false tested by Invalid/default hasEmphasis
   //output.valuesKept.sort(Number.ascending); was tested by Happy path

   try{
   input = {targetNumber: 5, diceRolled: 1, diceKept: 1};
   input.randomSource = dieResultsToNonRandomGenerator(10, [10, 10, 2]);
   actual = Prebuilt.L5RGeneralRoll(input);
   delete actual.toString;
   expected = {valuesKept: [22], totalValue: 22, voidPointsRecovered: 1, valuesDropped: [], success: true};
   testResults.push({Expected: expected, Actual: actual, Description: 'voidPointsRecovered: single die'});
   } catch(e){testResults.push({Error: e, Description: 'voidPointsRecovered: single die'});}

   try{
   input = {targetNumber: 5, diceRolled: 2, diceKept: 2};
   input.randomSource = dieResultsToNonRandomGenerator(10, [10, 1, 10, 2]);
   actual = Prebuilt.L5RGeneralRoll(input).voidPointsRecovered;
   testResults.push({Expected: 1, Actual: actual, Description: 'voidPointsRecovered: 2 dice'});
   } catch(e){testResults.push({Error: e, Description: 'voidPointsRecovered: 2 dice'});}

   try{
   input = {targetNumber: 5, diceRolled: 1, diceKept: 1};
   input.randomSource = dieResultsToNonRandomGenerator(10, [10, 10, 10, 2]);
   actual = Prebuilt.L5RGeneralRoll(input).voidPointsRecovered;
   testResults.push({Expected: 1, Actual: actual, Description: 'voidPointsRecovered: every other explode, round down'});
   } catch(e){testResults.push({Error: e, Description: 'voidPointsRecovered: every other explode, round down'});}

   try{
   input = {targetNumber: 5, diceRolled: 2, diceKept: 1};
   input.randomSource = dieResultsToNonRandomGenerator(10, [10, 1, 10, 2]);
   actual = Prebuilt.L5RGeneralRoll(input).voidPointsRecovered;
   testResults.push({Expected: 1, Actual: actual, Description: 'voidPointsRecovered: counts dropped dice'});
   } catch(e){testResults.push({Error: e, Description: 'voidPointsRecovered: counts dropped dice'});}

   //positive circumstanceBonus was tested by Happy path
   try{
   input = {circumstanceBonus: -1, targetNumber: 5, diceRolled: 1, diceKept: 1};
   input.randomSource = dieResultsToNonRandomGenerator(10, [6]);
   actual = Prebuilt.L5RGeneralRoll(input);
   delete actual.toString;
   expected = {valuesKept: [6], totalValue: 5, voidPointsRecovered: 0, valuesDropped: [], success: true};
   testResults.push({Expected: expected, Actual: actual, Description: 'Negative circumstanceBonus'});
   } catch(e){testResults.push({Error: e, Description: 'Negative circumstanceBonus'});}

   //both success true/false was tested by numberOfRaises increases TN

   return TestRunner.displayResults('Prebuilt Prebuilt.L5RGeneralRoll', testResults, isFirst);
};
TestSuite.Prebuilt.WarhammerAttackUnit = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], input, expected, actual, stringValue;

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   input.randomSource = dieResultsToNonRandomGenerator(6, [6, 6, 1, 5]);  //the 5 is ignored
   actual = Prebuilt.WarhammerAttackUnit(input);
   stringValue = actual.toString();
   delete actual.toString;
   expected = {hit: 1, wounded: 1, unsavedWounds: 1};
   testResults.push({Expected: expected, Actual: actual, Description: 'Happy path, all values, 1 die'});
   testResults.push({Expected: Stringifier.WarhammerAttackUnit(expected), Actual: stringValue, Description: 'Happy path: String Value'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   input = {diceCount: -1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   Prebuilt.WarhammerAttackUnit(input);
   TestRunner.failedToThrow(testResults, 'Calls _validateInput');
   }
   catch(e)
   {
      testResults.push({Expected: true, Actual: true, Description: 'Calls _validateInput'});
   }

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   input.randomSource = dieResultsToNonRandomGenerator(6, [1]);
   actual = Prebuilt.WarhammerAttackUnit(input);
   stringValue = actual.toString();
   delete actual.toString;
   expected = {hit: 0};
   testResults.push({Expected: expected, Actual: actual, Description: 'No hits'});
   testResults.push({Expected: Stringifier.WarhammerAttackUnit(expected), Actual: stringValue, Description: 'No hits: String Value'});
   } catch(e){testResults.push({Error: e, Description: 'No hits'});}

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   input.randomSource = dieResultsToNonRandomGenerator(6, [3, 1]);
   actual = Prebuilt.WarhammerAttackUnit(input);
   stringValue = actual.toString();
   delete actual.toString;
   expected = {hit: 1, wounded: 0};
   testResults.push({Expected: expected, Actual: actual, Description: 'No Wounds'});
   testResults.push({Expected: Stringifier.WarhammerAttackUnit(expected), Actual: stringValue, Description: 'No Wounds: String Value'});
   } catch(e){testResults.push({Error: e, Description: 'No Wounds'});}

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   input.randomSource = dieResultsToNonRandomGenerator(6, [3, 4, 6]);
   actual = Prebuilt.WarhammerAttackUnit(input);
   stringValue = actual.toString();
   delete actual.toString;
   expected = {hit: 1, wounded: 1, unsavedWounds: 0};
   testResults.push({Expected: expected, Actual: actual, Description: 'All saved'});
   testResults.push({Expected: Stringifier.WarhammerAttackUnit(expected), Actual: stringValue, Description: 'All saved: String Value'});
   } catch(e){testResults.push({Error: e, Description: 'All saved'});}

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   input.randomSource = dieResultsToNonRandomGenerator(6, [3, 4, 1, 6]);
   actual = Prebuilt.WarhammerAttackUnit(input);
   delete actual.toString;
   expected = {hit: 1, wounded: 1, unsavedWounds: 0};
   testResults.push({Expected: expected, Actual: actual, Description: 'FNP/RP ignores wound'});
   } catch(e){testResults.push({Error: e, Description: 'FNP/RP ignores wound'});}

   try{
   input = {diceCount: 3, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 7};
   input.randomSource = dieResultsToNonRandomGenerator(6, [6, 1, 3].concat([4, 2]).concat([6]));
   actual = Prebuilt.WarhammerAttackUnit(input);
   delete actual.toString;
   expected = {hit: 2, wounded: 1, unsavedWounds: 0};
   testResults.push({Expected: expected, Actual: actual, Description: 'Dice decay'});
   } catch(e){testResults.push({Error: e, Description: 'Dice decay'});}

   try{
   input = {diceCount: 2, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   input.randomSource = dieResultsToNonRandomGenerator(6, [6, 3].concat([4, 6]).concat([1, 5, 6]));
   actual = Prebuilt.WarhammerAttackUnit(input);
   delete actual.toString;
   expected = {hit: 2, wounded: 2, unsavedWounds: 0};
   testResults.push({Expected: expected, Actual: actual, Description: 'Multiple saves with maxWounds 1'});
   } catch(e){testResults.push({Error: e, Description: 'Multiple saves with maxWounds 1'});}

   try{
   input = {diceCount: 5, maxWounds: 2, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 7};
   input.randomSource = dieResultsToNonRandomGenerator(6, [6, 6, 5, 6, 6].concat([6, 6, 5, 6, 6]).concat([1, 2, 1, 1, 1]));
   actual = Prebuilt.WarhammerAttackUnit(input);
   delete actual.toString;
   expected = {hit: 5, wounded: 5, unsavedWounds: 2};
   testResults.push({Expected: expected, Actual: actual, Description: 'Ignore excessive wounds'});
   } catch(e){testResults.push({Error: e, Description: 'Ignore excessive wounds'});}

   return TestRunner.displayResults('Prebuilt Prebuilt.WarhammerAttackUnit', testResults, isFirst);
};
TestSuite.Prebuilt.WarhammerAttackUnit_Statistics = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], input, actual, expected;

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   actual = Prebuilt.WarhammerAttackUnit.Statistics(input);
   var hitProb = (4*4*3*5)/(6*6*6*6);  //which is (4/6 * 4/6 * 3/6 * 5/6) but with better accuracy
   expected = [
      {result: 0, probability: (1 - hitProb)},
      {result: 1, probability: hitProb}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Small happy math'});
   } catch(e){testResults.push({Error: e, Description: 'Small happy math'});}

   try{
   input = {diceCount: -1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   Prebuilt.WarhammerAttackUnit.Statistics(input);
   TestRunner.failedToThrow(testResults, 'Calls _validateInput');
   }
   catch(e)
   {
      testResults.push({Expected: true, Actual: true, Description: 'Calls _validateInput'});
   }

   try{
   input = {diceCount: 2, maxWounds: 2, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   actual = Prebuilt.WarhammerAttackUnit.Statistics(input);
   var hitProb = (4*4*3*5)/(6*6*6*6);  //which is (4/6 * 4/6 * 3/6 * 5/6) but with better accuracy
   var missProb = (1 - hitProb);
   expected = [
      {result: 0, probability: (missProb * missProb)},
      {result: 1, probability: (hitProb * missProb * 2)},  //which is ((hitProb * missProb) + (missProb * hitProb))
      {result: 2, probability: (hitProb * hitProb)}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '2 happy attackers'});
   } catch(e){testResults.push({Error: e, Description: '2 happy attackers'});}

   try{
   input = {diceCount: 2, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   actual = Prebuilt.WarhammerAttackUnit.Statistics(input);
   var hitProb = (4*4*3*5)/(6*6*6*6);  //which is (4/6 * 4/6 * 3/6 * 5/6) but with better accuracy
   var missProb = (1 - hitProb);
   expected = [
      {result: 0, probability: (missProb * missProb)},
      {result: 1, probability: (hitProb * missProb * 2)}  //which is ((hitProb * missProb) + (missProb * hitProb))
   ];
   expected[1].probability += (hitProb * hitProb);  //or the chance of 2 wounds
   testResults.push({Expected: expected, Actual: actual, Description: '2 attackers, maxWounds'});
   } catch(e){testResults.push({Error: e, Description: '2 attackers, maxWounds'});}

   try{
   input = {diceCount: 15, maxWounds: 10, toHitValue: 3, toWoundValue: 3, saveValue: 4};
   actual = Prebuilt.WarhammerAttackUnit.Statistics(input);

   //Warning: the expected of this test was copied from the output of running it
   //therefore the math hasn't been confirmed. This test exists to ensure that the value doesn't change.
   expected = [
      {result:  0, probability: 0.02305860122115666},
      {result:  1, probability: 0.09882257666209995},
      {result:  2, probability: 0.19764515332419993},
      {result:  3, probability: 0.24470352316329513},
      {result:  4, probability: 0.2097458769971101},
      {result:  5, probability: 0.13184026554104064},
      {result:  6, probability: 0.06278107882906697},
      {result:  7, probability: 0.02306243712088174},
      {result:  8, probability: 0.006589267748823354},
      {result:  9, probability: 0.0014642817219607457},
      {result: 10, probability: 0.00028693767036475196}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Giant output unchanged'});
   } catch(e){testResults.push({Error: e, Description: 'Giant output unchanged'});}

   return TestRunner.displayResults('Prebuilt Prebuilt.WarhammerAttackUnit.Statistics', testResults, isFirst);
};
TestSuite.Prebuilt.WarhammerAttackUnit_validateInput = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], input, actual, expected;

   try{
   input = {diceCount: -1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   Prebuilt.WarhammerAttackUnit._validateInput(input);
   TestRunner.failedToThrow(testResults, 'Invalid diceCount');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireNaturalNumber, [input.diceCount]),
         Actual: e, Description: 'Invalid diceCount'});
   }

   try{
   input = {diceCount: 1, maxWounds: -1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   Prebuilt.WarhammerAttackUnit._validateInput(input);
   TestRunner.failedToThrow(testResults, 'Invalid maxWounds');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireNaturalNumber, [input.maxWounds]),
         Actual: e, Description: 'Invalid maxWounds'});
   }

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: -3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   Prebuilt.WarhammerAttackUnit._validateInput(input);
   TestRunner.failedToThrow(testResults, 'Invalid toHitValue');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireNaturalNumber, [input.toHitValue]),
         Actual: e, Description: 'Invalid toHitValue'});
   }

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: -3, saveValue: 4, reanimateOrNoPainValue: 6};
   Prebuilt.WarhammerAttackUnit._validateInput(input);
   TestRunner.failedToThrow(testResults, 'Invalid toWoundValue');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireNaturalNumber, [input.toWoundValue]),
         Actual: e, Description: 'Invalid toWoundValue'});
   }

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3};
   Prebuilt.WarhammerAttackUnit._validateInput(input);
   testResults.push({Expected: 7, Actual: input.saveValue, Description: 'saveValue is optional: undefined'});

   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 8};
   Prebuilt.WarhammerAttackUnit._validateInput(input);
   testResults.push({Expected: true, Actual: true, Description: 'saveValue is optional: too large'});
   } catch(e){testResults.push({Error: e, Description: 'saveValue is optional'});}

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: -4, reanimateOrNoPainValue: 6};
   Prebuilt.WarhammerAttackUnit._validateInput(input);
   TestRunner.failedToThrow(testResults, 'Invalid saveValue');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireNaturalNumber, [input.saveValue]),
         Actual: e, Description: 'Invalid saveValue'});
   }

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4};
   Prebuilt.WarhammerAttackUnit._validateInput(input);
   testResults.push({Expected: 7, Actual: input.reanimateOrNoPainValue, Description: 'FNP/RP is optional: undefined'});

   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 8};
   Prebuilt.WarhammerAttackUnit._validateInput(input);
   testResults.push({Expected: true, Actual: true, Description: 'FNP/RP is optional: too large'});
   } catch(e){testResults.push({Error: e, Description: 'FNP/RP is optional'});}

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: -6};
   Prebuilt.WarhammerAttackUnit._validateInput(input);
   TestRunner.failedToThrow(testResults, 'Invalid reanimateOrNoPainValue');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireNaturalNumber, [input.reanimateOrNoPainValue]),
         Actual: e, Description: 'Invalid reanimateOrNoPainValue'});
   }

   return TestRunner.displayResults('Prebuilt Prebuilt.WarhammerAttackUnit._validateInput', testResults, isFirst);
};
