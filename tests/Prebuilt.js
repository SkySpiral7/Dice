'use strict';
TestSuite.Prebuilt = {};
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
   TestRunner.failedToThrow(testResults, 'Invalid numberOfRaises');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireNaturalNumber, [input.numberOfRaises]),
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
