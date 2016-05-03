'use strict';
Tester.Prebuilt = {};
Tester.Prebuilt.WarhammerAttackUnit = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

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
   TesterUtility.failedToThrow(testResults, 'Invalid diceCount');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireNaturalNumber, [input.diceCount]),
         Actual: e, Description: 'Invalid diceCount'});
   }

   try{
   input = {diceCount: 1, maxWounds: -1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   Prebuilt.WarhammerAttackUnit(input);
   TesterUtility.failedToThrow(testResults, 'Invalid maxWounds');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireNaturalNumber, [input.maxWounds]),
         Actual: e, Description: 'Invalid maxWounds'});
   }

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: -3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   Prebuilt.WarhammerAttackUnit(input);
   TesterUtility.failedToThrow(testResults, 'Invalid toHitValue');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireNaturalNumber, [input.toHitValue]),
         Actual: e, Description: 'Invalid toHitValue'});
   }

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: -3, saveValue: 4, reanimateOrNoPainValue: 6};
   Prebuilt.WarhammerAttackUnit(input);
   TesterUtility.failedToThrow(testResults, 'Invalid toWoundValue');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireNaturalNumber, [input.toWoundValue]),
         Actual: e, Description: 'Invalid toWoundValue'});
   }

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: -4, reanimateOrNoPainValue: 6};
   Prebuilt.WarhammerAttackUnit(input);
   TesterUtility.failedToThrow(testResults, 'Invalid saveValue');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireNaturalNumber, [input.saveValue]),
         Actual: e, Description: 'Invalid saveValue'});
   }

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: -6};
   Prebuilt.WarhammerAttackUnit(input);
   TesterUtility.failedToThrow(testResults, 'Invalid reanimateOrNoPainValue');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireNaturalNumber, [input.reanimateOrNoPainValue]),
         Actual: e, Description: 'Invalid reanimateOrNoPainValue'});
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
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 7};
   input.randomSource = dieResultsToNonRandomGenerator(6, [3, 4, 1]);
   actual = Prebuilt.WarhammerAttackUnit(input);
   delete actual.toString;
   expected = {hit: 1, wounded: 1, unsavedWounds: 1};
   testResults.push({Expected: expected, Actual: actual, Description: 'FNP/RP is optional'});
   } catch(e){testResults.push({Error: e, Description: 'FNP/RP is optional'});}

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

   TesterUtility.displayResults('Prebuilt Prebuilt.WarhammerAttackUnit', testResults, isFirst);
};
