'use strict';
TestSuite.Warhammer = {};
TestSuite.Warhammer.AttackUnit_Stringifier = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual;

   try{
   actual = Warhammer.AttackUnit.Stringifier({hit: 0});
   testResults.push({Expected: 'None hit.', Actual: actual, Description: 'None hit'});
   } catch(e){testResults.push({Error: e, Description: 'None hit'});}

   try{
   actual = Warhammer.AttackUnit.Stringifier({hit: 5, wounded: 0});
   testResults.push({Expected: 'Number hit: 5. None wounded.', Actual: actual, Description: 'None wounded'});
   } catch(e){testResults.push({Error: e, Description: 'None wounded'});}

   try{
   actual = Warhammer.AttackUnit.Stringifier({hit: 5, wounded: 3, unsavedWounds: 0});
   testResults.push({Expected: 'Number hit: 5. Number wounded: 3. All Saved.', Actual: actual, Description: 'All Saved'});
   } catch(e){testResults.push({Error: e, Description: 'All Saved'});}

   try{
   actual = Warhammer.AttackUnit.Stringifier({hit: 5, wounded: 3, unsavedWounds: 2});
   testResults.push({Expected: 'Number hit: 5. Number wounded: 3. Unsaved Wounds: 2.', Actual: actual, Description: 'Unsaved Wounds'});
   } catch(e){testResults.push({Error: e, Description: 'Unsaved Wounds'});}

   return TestRunner.displayResults('Warhammer Warhammer.AttackUnit.Stringifier', testResults, isFirst);
};
TestSuite.Warhammer.AttackUnit = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], input, expected, actual, stringValue;

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   input.randomSource = numberGenerator.dice(6, [6, 6, 1, 5]);  //the 5 is ignored
   actual = Warhammer.AttackUnit(input);
   stringValue = actual.toString();
   delete actual.toString;
   expected = {hit: 1, wounded: 1, unsavedWounds: 1};
   testResults.push({Expected: expected, Actual: actual, Description: 'Happy path, all values, 1 die'});
   testResults.push({Expected: Warhammer.AttackUnit.Stringifier(expected), Actual: stringValue, Description: 'Happy path: String Value'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   input = {diceCount: -1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   Warhammer.AttackUnit(input);
   TestRunner.failedToThrow(testResults, 'Calls _validateInput');
   }
   catch(e)
   {
      testResults.push({Expected: true, Actual: true, Description: 'Calls _validateInput'});
   }

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   input.randomSource = numberGenerator.dice(6, [1]);
   actual = Warhammer.AttackUnit(input);
   stringValue = actual.toString();
   delete actual.toString;
   expected = {hit: 0};
   testResults.push({Expected: expected, Actual: actual, Description: 'No hits'});
   testResults.push({Expected: Warhammer.AttackUnit.Stringifier(expected), Actual: stringValue, Description: 'No hits: String Value'});
   } catch(e){testResults.push({Error: e, Description: 'No hits'});}

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   input.randomSource = numberGenerator.dice(6, [3, 1]);
   actual = Warhammer.AttackUnit(input);
   stringValue = actual.toString();
   delete actual.toString;
   expected = {hit: 1, wounded: 0};
   testResults.push({Expected: expected, Actual: actual, Description: 'No Wounds'});
   testResults.push({Expected: Warhammer.AttackUnit.Stringifier(expected), Actual: stringValue, Description: 'No Wounds: String Value'});
   } catch(e){testResults.push({Error: e, Description: 'No Wounds'});}

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   input.randomSource = numberGenerator.dice(6, [3, 4, 6]);
   actual = Warhammer.AttackUnit(input);
   stringValue = actual.toString();
   delete actual.toString;
   expected = {hit: 1, wounded: 1, unsavedWounds: 0};
   testResults.push({Expected: expected, Actual: actual, Description: 'All saved'});
   testResults.push({Expected: Warhammer.AttackUnit.Stringifier(expected), Actual: stringValue, Description: 'All saved: String Value'});
   } catch(e){testResults.push({Error: e, Description: 'All saved'});}

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   input.randomSource = numberGenerator.dice(6, [3, 4, 1, 6]);
   actual = Warhammer.AttackUnit(input);
   delete actual.toString;
   expected = {hit: 1, wounded: 1, unsavedWounds: 0};
   testResults.push({Expected: expected, Actual: actual, Description: 'FNP/RP ignores wound'});
   } catch(e){testResults.push({Error: e, Description: 'FNP/RP ignores wound'});}

   try{
   input = {diceCount: 3, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 7};
   input.randomSource = numberGenerator.dice(6, [6, 1, 3].concat([4, 2]).concat([6]));
   actual = Warhammer.AttackUnit(input);
   delete actual.toString;
   expected = {hit: 2, wounded: 1, unsavedWounds: 0};
   testResults.push({Expected: expected, Actual: actual, Description: 'Dice decay'});
   } catch(e){testResults.push({Error: e, Description: 'Dice decay'});}

   try{
   input = {diceCount: 2, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   input.randomSource = numberGenerator.dice(6, [6, 3].concat([4, 6]).concat([1, 5, 6]));
   actual = Warhammer.AttackUnit(input);
   delete actual.toString;
   expected = {hit: 2, wounded: 2, unsavedWounds: 0};
   testResults.push({Expected: expected, Actual: actual, Description: 'Multiple saves with maxWounds 1'});
   } catch(e){testResults.push({Error: e, Description: 'Multiple saves with maxWounds 1'});}

   try{
   input = {diceCount: 5, maxWounds: 2, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 7};
   input.randomSource = numberGenerator.dice(6, [6, 6, 5, 6, 6].concat([6, 6, 5, 6, 6]).concat([1, 2, 1, 1, 1]));
   actual = Warhammer.AttackUnit(input);
   delete actual.toString;
   expected = {hit: 5, wounded: 5, unsavedWounds: 2};
   testResults.push({Expected: expected, Actual: actual, Description: 'Ignore excessive wounds'});
   } catch(e){testResults.push({Error: e, Description: 'Ignore excessive wounds'});}

   return TestRunner.displayResults('Warhammer Warhammer.AttackUnit', testResults, isFirst);
};
TestSuite.Warhammer.AttackUnit_Statistics = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], input, actual, expected;

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   actual = Warhammer.AttackUnit.Statistics(input);
   var hitProb = (4*4*3*5)/(6*6*6*6);  //which is (4/6 * 4/6 * 3/6 * 5/6) but with better accuracy
   expected = [
      {result: 0, probability: (1 - hitProb)},
      {result: 1, probability: hitProb}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Small happy math'});
   } catch(e){testResults.push({Error: e, Description: 'Small happy math'});}

   try{
   input = {diceCount: -1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   Warhammer.AttackUnit.Statistics(input);
   TestRunner.failedToThrow(testResults, 'Calls _validateInput');
   }
   catch(e)
   {
      testResults.push({Expected: true, Actual: true, Description: 'Calls _validateInput'});
   }

   try{
   input = {diceCount: 2, maxWounds: 2, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   actual = Warhammer.AttackUnit.Statistics(input);
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
   actual = Warhammer.AttackUnit.Statistics(input);
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
   actual = Warhammer.AttackUnit.Statistics(input);

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

   return TestRunner.displayResults('Warhammer Warhammer.AttackUnit.Statistics', testResults, isFirst);
};
TestSuite.Warhammer.AttackUnit_validateInput = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], input, actual, expected;

   try{
   input = {diceCount: -1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   Warhammer.AttackUnit._validateInput(input);
   TestRunner.failedToThrow(testResults, 'Invalid diceCount');
   }
   catch(e)
   {
      testResults.push({Expected: getError(Validation.requireNaturalNumber, [input.diceCount]),
         Actual: e, Description: 'Invalid diceCount'});
   }

   try{
   input = {diceCount: 1, maxWounds: -1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   Warhammer.AttackUnit._validateInput(input);
   TestRunner.failedToThrow(testResults, 'Invalid maxWounds');
   }
   catch(e)
   {
      testResults.push({Expected: getError(Validation.requireNaturalNumber, [input.maxWounds]),
         Actual: e, Description: 'Invalid maxWounds'});
   }

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: -3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 6};
   Warhammer.AttackUnit._validateInput(input);
   TestRunner.failedToThrow(testResults, 'Invalid toHitValue');
   }
   catch(e)
   {
      testResults.push({Expected: getError(Validation.requireNaturalNumber, [input.toHitValue]),
         Actual: e, Description: 'Invalid toHitValue'});
   }

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: -3, saveValue: 4, reanimateOrNoPainValue: 6};
   Warhammer.AttackUnit._validateInput(input);
   TestRunner.failedToThrow(testResults, 'Invalid toWoundValue');
   }
   catch(e)
   {
      testResults.push({Expected: getError(Validation.requireNaturalNumber, [input.toWoundValue]),
         Actual: e, Description: 'Invalid toWoundValue'});
   }

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3};
   Warhammer.AttackUnit._validateInput(input);
   testResults.push({Expected: 7, Actual: input.saveValue, Description: 'saveValue is optional: undefined'});

   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 8};
   Warhammer.AttackUnit._validateInput(input);
   testResults.push({Expected: true, Actual: true, Description: 'saveValue is optional: too large'});
   } catch(e){testResults.push({Error: e, Description: 'saveValue is optional'});}

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: -4, reanimateOrNoPainValue: 6};
   Warhammer.AttackUnit._validateInput(input);
   TestRunner.failedToThrow(testResults, 'Invalid saveValue');
   }
   catch(e)
   {
      testResults.push({Expected: getError(Validation.requireNaturalNumber, [input.saveValue]),
         Actual: e, Description: 'Invalid saveValue'});
   }

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4};
   Warhammer.AttackUnit._validateInput(input);
   testResults.push({Expected: 7, Actual: input.reanimateOrNoPainValue, Description: 'FNP/RP is optional: undefined'});

   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: 8};
   Warhammer.AttackUnit._validateInput(input);
   testResults.push({Expected: true, Actual: true, Description: 'FNP/RP is optional: too large'});
   } catch(e){testResults.push({Error: e, Description: 'FNP/RP is optional'});}

   try{
   input = {diceCount: 1, maxWounds: 1, toHitValue: 3, toWoundValue: 3, saveValue: 4, reanimateOrNoPainValue: -6};
   Warhammer.AttackUnit._validateInput(input);
   TestRunner.failedToThrow(testResults, 'Invalid reanimateOrNoPainValue');
   }
   catch(e)
   {
      testResults.push({Expected: getError(Validation.requireNaturalNumber, [input.reanimateOrNoPainValue]),
         Actual: e, Description: 'Invalid reanimateOrNoPainValue'});
   }

   return TestRunner.displayResults('Warhammer Warhammer.AttackUnit._validateInput', testResults, isFirst);
};
TestSuite.Warhammer.RollScatterDice = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], randomSource, expected, actual;

   try{
   randomSource = numberGenerator.dice(6, [6]);
   actual = Warhammer.RollScatterDice(false, randomSource);
   expected = {result: 'Misfire'};
   testResults.push({Expected: expected, Actual: actual, Description: 'Happy path, all values, misfire'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path, all values, misfire'});}

   try{
   randomSource = numberGenerator([{dieSides: 6, values: [2]}, {dieSides: 3, values: [3]}]);
   actual = Warhammer.RollScatterDice(undefined, randomSource);
   expected = {result: 'Direct Hit'};
   testResults.push({Expected: expected, Actual: actual, Description: 'alwaysScatter defaults to false'});
   } catch(e){testResults.push({Error: e, Description: 'alwaysScatter defaults to false'});}

   try{
   Warhammer.RollScatterDice();
   testResults.push({Expected: 'Didn\'t throw', Actual: 'Didn\'t throw', Description: 'randomSource defaults to Math.random'});
   } catch(e){testResults.push({Error: e, Description: 'randomSource defaults to Math.random'});}

   try{
   Warhammer.RollScatterDice(false, 5);
   TestRunner.failedToThrow(testResults, 'randomSource wrong type');
   }
   catch(e)
   {
      testResults.push({Expected: getError(Validation.requireTypeOf, ['function', 5]),
         Actual: e, Description: 'randomSource wrong type'});
   }

   try{
   randomSource = numberGenerator.dice(6, [6]);
   actual = Warhammer.RollScatterDice(true, randomSource);
   expected = {result: 'Misfire'};
   testResults.push({Expected: expected, Actual: actual, Description: 'Misfire ignores alwaysScatter'});
   } catch(e){testResults.push({Error: e, Description: 'Misfire ignores alwaysScatter'});}

   try{
   randomSource = numberGenerator([{dieSides: 6, values: [4]}, {dieSides: 3, values: [3]}]);
   actual = Warhammer.RollScatterDice(false, randomSource);
   expected = {result: 'Direct Hit'};
   testResults.push({Expected: expected, Actual: actual, Description: 'Direct Hit ignores distance'});
   } catch(e){testResults.push({Error: e, Description: 'Direct Hit'});}

   try{
   randomSource = numberGenerator([{dieSides: 6, values: [5]}, {dieSides: 3, values: [1]}, [125/360]]);
   actual = Warhammer.RollScatterDice(false, randomSource);
   expected = {result: 'Scatter', angleInDegrees: 125, distance: 10};
   testResults.push({Expected: expected, Actual: actual, Description: 'Decides to scatter'});
   } catch(e){testResults.push({Error: e, Description: 'Decides to scatter'});}

   try{
   randomSource = numberGenerator([{dieSides: 6, values: [2]}, [35.156752/360]]);
   actual = Warhammer.RollScatterDice(true, randomSource);
   expected = {result: 'Scatter', angleInDegrees: 35.156752, distance: 4};
   testResults.push({Expected: expected, Actual: actual, Description: 'Forced to scatter'});
   } catch(e){testResults.push({Error: e, Description: 'Forced to scatter'});}

   return TestRunner.displayResults('Warhammer Warhammer.RollScatterDice', testResults, isFirst);
};
