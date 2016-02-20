'use strict';
Tester.Prebuilt = {};
Tester.Prebuilt.WarhammerAttackUnit = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], input, expected, actual;

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   input.randomSource = dieResultsToNonRandomGenerator(6, [6, 6, 1, 5]);
   actual = Prebuilt.WarhammerAttackUnit(input);
   expected = {hit: 1, wounded: 1, unsavedWounds: 1};
   testResults.push({Expected: expected, Actual: actual, Description: 'Happy path, all values, 1 die'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path, all values, 1 die'});}

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   input.randomSource = dieResultsToNonRandomGenerator(6, [1]);
   actual = Prebuilt.WarhammerAttackUnit(input);
   expected = {hit: 0};
   testResults.push({Expected: expected, Actual: actual, Description: 'No hits'});
   } catch(e){testResults.push({Error: e, Description: 'No hits'});}

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   input.randomSource = dieResultsToNonRandomGenerator(6, [3, 1]);
   actual = Prebuilt.WarhammerAttackUnit(input);
   expected = {hit: 1, wounded: 0};
   testResults.push({Expected: expected, Actual: actual, Description: 'No Wounds'});
   } catch(e){testResults.push({Error: e, Description: 'No Wounds'});}

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   input.randomSource = dieResultsToNonRandomGenerator(6, [3, 4, 6]);
   actual = Prebuilt.WarhammerAttackUnit(input);
   expected = {hit: 1, wounded: 1, unsavedWounds: 0};
   testResults.push({Expected: expected, Actual: actual, Description: 'All saved'});
   } catch(e){testResults.push({Error: e, Description: 'All saved'});}

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   input.randomSource = dieResultsToNonRandomGenerator(6, [3, 4, 1, 6]);
   actual = Prebuilt.WarhammerAttackUnit(input);
   expected = {hit: 1, wounded: 1, unsavedWounds: 0};
   testResults.push({Expected: expected, Actual: actual, Description: 'FNP/RP ignores wound'});
   } catch(e){testResults.push({Error: e, Description: 'FNP/RP ignores wound'});}

   try{
   input = {diceCount: 3, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 7};
   input.randomSource = dieResultsToNonRandomGenerator(6, [6, 1, 3].concat([4, 2]).concat([6]));
   actual = Prebuilt.WarhammerAttackUnit(input);
   expected = {hit: 2, wounded: 1, unsavedWounds: 0};
   testResults.push({Expected: expected, Actual: actual, Description: 'Dice decay'});
   } catch(e){testResults.push({Error: e, Description: 'Dice decay'});}

   try{
   input = {diceCount: 2, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   input.randomSource = dieResultsToNonRandomGenerator(6, [6, 3].concat([4, 6]).concat([1, 5, 6]));
   actual = Prebuilt.WarhammerAttackUnit(input);
   expected = {hit: 2, wounded: 2, unsavedWounds: 0};
   testResults.push({Expected: expected, Actual: actual, Description: 'Multiple saves with maxWounds 1'});
   } catch(e){testResults.push({Error: e, Description: 'Multiple saves with maxWounds 1'});}

   try{
   input = {diceCount: 5, maxWounds: 2, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 7};
   input.randomSource = dieResultsToNonRandomGenerator(6, [6, 6, 5, 6, 6].concat([6, 6, 5, 6, 6]).concat([6, 1, 1, 6, 6]));
   actual = Prebuilt.WarhammerAttackUnit(input);
   expected = {hit: 5, wounded: 5, unsavedWounds: 0};
   testResults.push({Expected: expected, Actual: actual, Description: 'Ignore excessive wounds'});
   } catch(e){testResults.push({Error: e, Description: 'Ignore excessive wounds'});}

   TesterUtility.displayResults('Prebuilt Prebuilt.WarhammerAttackUnit', testResults, isFirst);
};
