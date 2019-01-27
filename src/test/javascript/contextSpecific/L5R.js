'use strict';
TestSuite.L5R = {};
TestSuite.L5R.DicePool = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], actual;

   try{
   actual = new L5R.DicePool({diceRolled: 3, diceKept: 2, hasEmphasis: true});
   assertions.push({Expected: new DicePool('3d10!!kh2r1'), Actual: actual, Description: 'L5R object: hasEmphasis. also new'});

   actual = L5R.DicePool({diceRolled: 3, diceKept: 2});
   assertions.push({Expected: new DicePool('3d10!!kh2'), Actual: actual, Description: 'L5R object: not hasEmphasis'});
   } catch(e){assertions.push({Error: e, Description: 'L5R object'});}

   try{
   actual = L5R.DicePool(4, 3, true);
   assertions.push({Expected: new DicePool('4d10!!kh3r1'), Actual: actual, Description: 'Numbers: hasEmphasis'});

   actual = L5R.DicePool(4, 3);
   assertions.push({Expected: new DicePool('4d10!!kh3'), Actual: actual, Description: 'Numbers: not hasEmphasis'});
   } catch(e){assertions.push({Error: e, Description: 'Numbers'});}

   try{
   actual = L5R.DicePool('5k3', true);
   assertions.push({Expected: new DicePool('5d10!!kh3r1'), Actual: actual, Description: 'String: hasEmphasis'});

   actual = L5R.DicePool('5k3');
   assertions.push({Expected: new DicePool('5d10!!kh3'), Actual: actual, Description: 'String: not hasEmphasis'});
   } catch(e){assertions.push({Error: e, Description: 'String'});}

   try{
   L5R.DicePool();
   TestRunner.failedToThrow(assertions, 'No args');
   }
   catch(e)
   {
      assertions.push({Expected: new Error('Illegal argument. input was: [null,null,null]'),
         Actual: e, Description: 'No args'});
   }

   try{
   L5R.DicePool(true);
   TestRunner.failedToThrow(assertions, 'arg1 boolean');
   }
   catch(e)
   {
      assertions.push({Expected: new Error('Illegal argument. input was: [true,null,null]'),
         Actual: e, Description: 'arg1 boolean'});
   }

   try{
   actual = L5R.DicePool(5, 3);
   assertions.push({Expected: '5k3', Actual: actual.toJSON().name, Description: 'DicePool name'});

   actual = L5R.DicePool('+5k5r1');
   assertions.push({Expected: '5k5 emphasis', Actual: actual.toJSON().name, Description: 'DicePool name with emphasis!'});
   } catch(e){assertions.push({Error: e, Description: 'DicePool name'});}

   try{
   L5R.DicePool('2k2 + 2d4');
   TestRunner.failedToThrow(assertions, '2 groups');
   }
   catch(e)
   {
      assertions.push({Expected: new Error('Not a valid L5R DicePool: multiple dice groups. input was: ["2k2 + 2d4",null,null]'),
         Actual: e, Description: '2 groups'});
   }

   try{
   L5R.DicePool('12k5');
   TestRunner.failedToThrow(assertions, '11+ dice');
   }
   catch(e)
   {
      assertions.push({Expected: new Error('It\'s never possible to roll more than 10 dice. input was: ["12k5",null,null]'),
         Actual: e, Description: '11+ dice'});
   }

   return TestRunner.displayResults('L5R L5R.DicePool', assertions, testState);
};
TestSuite.L5R.Parser = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], actual, expected;

   try{
   actual = L5R.Parser('4k3', true);
   expected = Parser.dicePool('4d10!!kh3 reroll 1');
   assertions.push({Expected: expected, Actual: actual, Description: 'Happy path: hasEmphasis'});

   actual = L5R.Parser('4k3', false);
   expected = Parser.dicePool('4d10!!kh3');
   assertions.push({Expected: expected, Actual: actual, Description: 'Happy path: not hasEmphasis'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path'});}

   try{
   L5R.Parser('4d10!!kh3', true);
   TestRunner.failedToThrow(assertions, 'Not XkY');
   }
   catch(e)
   {
      assertions.push({Expected: new Error('Expected XkY. Found: 4d10!!kh3'),
         Actual: e, Description: 'Not XkY'});
   }

   try{
   L5R.Parser('-3k2');
   TestRunner.failedToThrow(assertions, 'Negative');
   }
   catch(e)
   {
      assertions.push({Expected: new Error('Expected XkY. Found: -3k2'),
         Actual: e, Description: 'Negative'});
   }

   try{
   actual = L5R.Parser(' +4K3r1');
   expected = Parser.dicePool('4d10!!kh3 reroll 1');
   assertions.push({Expected: expected, Actual: actual, Description: 'Another reroll, leading  +'});
   } catch(e){assertions.push({Error: e, Description: 'Another reroll, leading  +'});}

   try{
   actual = L5R.Parser('4k3');
   expected = Parser.dicePool('4d10!!kh3');
   assertions.push({Expected: expected, Actual: actual, Description: 'default to not hasEmphasis'});
   } catch(e){assertions.push({Error: e, Description: 'default to not hasEmphasis'});}

   try{
   L5R.Parser('4k3r1', true);
   TestRunner.failedToThrow(assertions, '2 rerolls');
   }
   catch(e)
   {
      assertions.push({Expected: new Error('4d10!!kh3r1 reroll 1\nmultiple reroll criteria found. Max is 1'),
         Actual: e, Description: '2 rerolls'});
   }

   try{
   L5R.Parser('4k3 drop lowest', true);
   TestRunner.failedToThrow(assertions, 'Includes drop');
   }
   catch(e)
   {
      assertions.push({Expected: new Error('4d10!!kh3 drop lowest reroll 1\nmultiple drop/keep criteria found. Max is 1'),
         Actual: e, Description: 'Includes drop'});
   }

   return TestRunner.displayResults('L5R L5R.Parser', assertions, testState);
};
TestSuite.L5R.GeneralRoll_Stringifier = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], actual, expected;

   try{
   actual = L5R.GeneralRoll.Stringifier({valuesKept: [11,14], totalValue: 26, voidPointsRecovered: 1, valuesDropped: [2,3], success: true});
   expected  = 'Values kept: 11+14 = 25+1 = 26\n';
   expected += 'Void points recovered: 1. Result: Success\n';
   expected += 'Values dropped: 2,3\n';
   assertions.push({Expected: expected, Actual: actual, Description: '2 values each, success'});
   } catch(e){assertions.push({Error: e, Description: '2 values each, success'});}

   try{
   actual = L5R.GeneralRoll.Stringifier({valuesKept: [11], totalValue: 10, voidPointsRecovered: 0, valuesDropped: [2], success: false});
   expected  = 'Values kept: 11 = 11-1 = 10\n';
   expected += 'Void points recovered: 0. Result: Failure\n';
   expected += 'Values dropped: 2\n';
   assertions.push({Expected: expected, Actual: actual, Description: 'Single failure'});
   } catch(e){assertions.push({Error: e, Description: 'Single failure'});}

   try{
   actual = L5R.GeneralRoll.Stringifier({valuesKept: [11], totalValue: 11, voidPointsRecovered: 0, valuesDropped: [], success: true});
   expected  = 'Values: 11 = 11\n';
   expected += 'Void points recovered: 0. Result: Success\n';
   assertions.push({Expected: expected, Actual: actual, Description: 'None dropped'});
   } catch(e){assertions.push({Error: e, Description: 'None dropped'});}

   return TestRunner.displayResults('L5R L5R.GeneralRoll.Stringifier', assertions, testState);
};
TestSuite.L5R.GeneralRoll = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], input, expected, actual, stringValue;

   try{
   input = {circumstanceBonus: 1, numberOfRaises: 1, targetNumber: 5, diceRolled: 2, diceKept: 1, hasEmphasis: true};
   //the die can't be optimized to 9 sided because of compound exploding:
   input.randomSource = numberGenerator.dice(10, [1, 10, 2, 3, 5]);  //reroll, explosion, and 5 is ignored
   //so the results are 12 and 3 with 12 kept (TN=10)
   actual = L5R.GeneralRoll(input);
   stringValue = actual.toString();
   delete actual.toString;
   expected = {valuesKept: [12], totalValue: 13, voidPointsRecovered: 0, valuesDropped: [3], success: true};
   assertions.push({Expected: expected, Actual: actual, Description: 'Happy path, all values'});
   assertions.push({Expected: L5R.GeneralRoll.Stringifier(expected), Actual: stringValue, Description: 'Happy path: String Value'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path'});}

   try{
   input = {targetNumber: 5, diceRolled: 2, diceKept: 1};
   L5R.GeneralRoll(input);
   assertions.push({Expected: true, Actual: true, Description: 'Minimum doesn\'t throw'});
   } catch(e){assertions.push({Error: e, Description: 'Minimum doesn\'t throw'});}

   try{
   input = {circumstanceBonus: 2.5, targetNumber: 5, diceRolled: 2, diceKept: 1};
   L5R.GeneralRoll(input);
   TestRunner.failedToThrow(assertions, 'Invalid circumstanceBonus');
   }
   catch(e)
   {
      assertions.push({Expected: new Error('Must be an integer but was 2.5'),
         Actual: e, Description: 'Invalid circumstanceBonus'});
   }

   try{
   input = {numberOfRaises: -2, targetNumber: 5, diceRolled: 2, diceKept: 1};
   L5R.GeneralRoll(input);
   TestRunner.failedToThrow(assertions, 'Negative numberOfRaises');
   }
   catch(e)
   {
      assertions.push({Expected: new Error('Must be a non-negative integer but was -2'),
         Actual: e, Description: 'Negative numberOfRaises'});
   }

   try{
   input = {numberOfRaises: 2.5, targetNumber: 5, diceRolled: 2, diceKept: 1};
   L5R.GeneralRoll(input);
   TestRunner.failedToThrow(assertions, 'Invalid numberOfRaises');
   }
   catch(e)
   {
      assertions.push({Expected: new Error('Must be a non-negative integer but was 2.5'),
         Actual: e, Description: 'Invalid numberOfRaises'});
   }

   try{
   input = {targetNumber: 'Fred', diceRolled: 2, diceKept: 1};
   L5R.GeneralRoll(input);
   TestRunner.failedToThrow(assertions, 'Invalid targetNumber');
   }
   catch(e)
   {
      assertions.push({Expected: getError(Validation.requireNaturalNumber, [input.targetNumber]),
         Actual: e, Description: 'Invalid targetNumber'});
   }

   try{
   input = {targetNumber: 5, diceRolled: 'Fred', diceKept: 1};
   L5R.GeneralRoll(input);
   TestRunner.failedToThrow(assertions, 'Invalid diceRolled');
   }
   catch(e)
   {
      assertions.push({Expected: getError(Validation.requireNaturalNumber, [input.diceRolled]),
         Actual: e, Description: 'Invalid diceRolled'});
   }

   try{
   input = {targetNumber: 5, diceRolled: 11, diceKept: 1};
   L5R.GeneralRoll(input);
   TestRunner.failedToThrow(assertions, 'Over max diceRolled');
   }
   catch(e)
   {
      assertions.push({Expected: new Error('It\'s never possible to roll more than 10 dice. input was: 11'),
         Actual: e, Description: 'Over max diceRolled'});
   }

   try{
   input = {targetNumber: 5, diceRolled: 2, diceKept: 'Fred'};
   L5R.GeneralRoll(input);
   TestRunner.failedToThrow(assertions, 'Invalid diceKept');
   }
   catch(e)
   {
      assertions.push({Expected: getError(Validation.requireNaturalNumber, [input.diceKept]),
         Actual: e, Description: 'Invalid diceKept'});
   }

   try{
   input = {targetNumber: 5, diceRolled: 2, diceKept: 3};
   L5R.GeneralRoll(input);
   TestRunner.failedToThrow(assertions, 'Over max diceKept');
   }
   catch(e)
   {
      assertions.push({Expected: new Error('diceKept (3) is more than diceRolled (2)'),
         Actual: e, Description: 'Over max diceKept'});
   }

   try{
   input = {targetNumber: 5, diceRolled: 2, diceKept: 2, hasEmphasis: 'Fred'};
   input.randomSource = numberGenerator.dice(10, [1, 6]);
   actual = L5R.GeneralRoll(input);
   delete actual.toString;
   expected = {valuesKept: [1, 6], totalValue: 7, voidPointsRecovered: 0, valuesDropped: [], success: true};
   assertions.push({Expected: expected, Actual: actual, Description: 'Invalid hasEmphasis becomes false'});
   } catch(e){assertions.push({Error: e, Description: 'Invalid hasEmphasis becomes false'});}

   try{
   input = {targetNumber: 5, diceRolled: 2, diceKept: 2};
   input.randomSource = numberGenerator.dice(10, [1, 6]);
   actual = L5R.GeneralRoll(input);
   delete actual.toString;
   expected = {valuesKept: [1, 6], totalValue: 7, voidPointsRecovered: 0, valuesDropped: [], success: true};
   assertions.push({Expected: expected, Actual: actual, Description: 'hasEmphasis defaults to false'});
   } catch(e){assertions.push({Error: e, Description: 'hasEmphasis defaults to false'});}

   try{
   input = {numberOfRaises: 1, targetNumber: 5, diceRolled: 2, diceKept: 2};
   input.randomSource = numberGenerator.dice(10, [3, 6]);
   actual = L5R.GeneralRoll(input);
   delete actual.toString;
   expected = {valuesKept: [3, 6], totalValue: 9, voidPointsRecovered: 0, valuesDropped: [], success: false};
   assertions.push({Expected: expected, Actual: actual, Description: 'numberOfRaises increases TN by 5: failure'});

   input = {numberOfRaises: 1, targetNumber: 5, diceRolled: 2, diceKept: 2};
   input.randomSource = numberGenerator.dice(10, [4, 6]);
   actual = L5R.GeneralRoll(input);
   delete actual.toString;
   expected = {valuesKept: [4, 6], totalValue: 10, voidPointsRecovered: 0, valuesDropped: [], success: true};
   assertions.push({Expected: expected, Actual: actual, Description: 'numberOfRaises increases TN by 5: success'});
   } catch(e){assertions.push({Error: e, Description: 'numberOfRaises increases TN by 5'});}

   //hasEmphasis=true was tested by Happy path. and =false tested by Invalid/default hasEmphasis
   //output.valuesKept.sort(Number.ascending); was tested by Happy path

   try{
   input = {targetNumber: 5, diceRolled: 1, diceKept: 1};
   input.randomSource = numberGenerator.dice(10, [10, 10, 2]);
   actual = L5R.GeneralRoll(input);
   delete actual.toString;
   expected = {valuesKept: [22], totalValue: 22, voidPointsRecovered: 1, valuesDropped: [], success: true};
   assertions.push({Expected: expected, Actual: actual, Description: 'voidPointsRecovered: single die'});
   } catch(e){assertions.push({Error: e, Description: 'voidPointsRecovered: single die'});}

   try{
   input = {targetNumber: 5, diceRolled: 2, diceKept: 2};
   input.randomSource = numberGenerator.dice(10, [10, 1, 10, 2]);
   actual = L5R.GeneralRoll(input).voidPointsRecovered;
   assertions.push({Expected: 1, Actual: actual, Description: 'voidPointsRecovered: 2 dice'});
   } catch(e){assertions.push({Error: e, Description: 'voidPointsRecovered: 2 dice'});}

   try{
   input = {targetNumber: 5, diceRolled: 1, diceKept: 1};
   input.randomSource = numberGenerator.dice(10, [10, 10, 10, 2]);
   actual = L5R.GeneralRoll(input).voidPointsRecovered;
   assertions.push({Expected: 1, Actual: actual, Description: 'voidPointsRecovered: every other explode, round down'});
   } catch(e){assertions.push({Error: e, Description: 'voidPointsRecovered: every other explode, round down'});}

   try{
   input = {targetNumber: 5, diceRolled: 2, diceKept: 1};
   input.randomSource = numberGenerator.dice(10, [10, 1, 10, 2]);
   actual = L5R.GeneralRoll(input).voidPointsRecovered;
   assertions.push({Expected: 1, Actual: actual, Description: 'voidPointsRecovered: counts dropped dice'});
   } catch(e){assertions.push({Error: e, Description: 'voidPointsRecovered: counts dropped dice'});}

   //positive circumstanceBonus was tested by Happy path
   try{
   input = {circumstanceBonus: -1, targetNumber: 5, diceRolled: 1, diceKept: 1};
   input.randomSource = numberGenerator.dice(10, [6]);
   actual = L5R.GeneralRoll(input);
   delete actual.toString;
   expected = {valuesKept: [6], totalValue: 5, voidPointsRecovered: 0, valuesDropped: [], success: true};
   assertions.push({Expected: expected, Actual: actual, Description: 'Negative circumstanceBonus'});
   } catch(e){assertions.push({Error: e, Description: 'Negative circumstanceBonus'});}

   //both success true/false was tested by numberOfRaises increases TN

   return TestRunner.displayResults('L5R L5R.GeneralRoll', assertions, testState);
};
