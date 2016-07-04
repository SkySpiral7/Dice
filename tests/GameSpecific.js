'use strict';
TestSuite.GameSpecific = {};
TestSuite.GameSpecific.L5RDicePool = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual;

   try{
   actual = new L5RDicePool({diceRolled: 3, diceKept: 2, hasEmphasis: true});
   testResults.push({Expected: new DicePool('3d10!!kh2r1'), Actual: actual, Description: 'L5R object: hasEmphasis. also new'});

   actual = L5RDicePool({diceRolled: 3, diceKept: 2});
   testResults.push({Expected: new DicePool('3d10!!kh2'), Actual: actual, Description: 'L5R object: not hasEmphasis'});
   } catch(e){testResults.push({Error: e, Description: 'L5R object'});}

   try{
   actual = L5RDicePool(4, 3, true);
   testResults.push({Expected: new DicePool('4d10!!kh3r1'), Actual: actual, Description: 'Numbers: hasEmphasis'});

   actual = L5RDicePool(4, 3);
   testResults.push({Expected: new DicePool('4d10!!kh3'), Actual: actual, Description: 'Numbers: not hasEmphasis'});
   } catch(e){testResults.push({Error: e, Description: 'Numbers'});}

   try{
   actual = L5RDicePool('5k3', true);
   testResults.push({Expected: new DicePool('5d10!!kh3r1'), Actual: actual, Description: 'String: hasEmphasis'});

   actual = L5RDicePool('5k3');
   testResults.push({Expected: new DicePool('5d10!!kh3'), Actual: actual, Description: 'String: not hasEmphasis'});
   } catch(e){testResults.push({Error: e, Description: 'String'});}

   try{
   L5RDicePool();
   TestRunner.failedToThrow(testResults, 'No args');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('Illegal argument. input was: [null,null,null]'),
         Actual: e, Description: 'No args'});
   }

   try{
   L5RDicePool(true);
   TestRunner.failedToThrow(testResults, 'arg1 boolean');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('Illegal argument. input was: [true,null,null]'),
         Actual: e, Description: 'arg1 boolean'});
   }

   try{
   L5RDicePool('2k2 + 2d4');
   TestRunner.failedToThrow(testResults, '2 groups');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('Not a valid L5R DicePool: multiple dice groups. input was: ["2k2 + 2d4",null,null]'),
         Actual: e, Description: '2 groups'});
   }

   try{
   L5RDicePool('12k5');
   TestRunner.failedToThrow(testResults, '11+ dice');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('It\'s never possible to roll more than 10 dice. input was: ["12k5",null,null]'),
         Actual: e, Description: '11+ dice'});
   }

   return TestRunner.displayResults('GameSpecific L5RDicePool', testResults, isFirst);
};
TestSuite.GameSpecific.Parser_L5RShortHand = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = Parser.L5RShortHand('4k3', true);
   expected = Parser.dicePool('4d10!!kh3 reroll 1');
   testResults.push({Expected: expected, Actual: actual, Description: 'Happy path: hasEmphasis'});

   actual = Parser.L5RShortHand('4k3', false);
   expected = Parser.dicePool('4d10!!kh3');
   testResults.push({Expected: expected, Actual: actual, Description: 'Happy path: not hasEmphasis'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   Parser.L5RShortHand('4d10!!kh3', true);
   TestRunner.failedToThrow(testResults, 'Not XkY');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('Expected XkY. Found: 4d10!!kh3'),
         Actual: e, Description: 'Not XkY'});
   }

   try{
   Parser.L5RShortHand('-3k2');
   TestRunner.failedToThrow(testResults, 'Negative');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('Expected XkY. Found: -3k2'),
         Actual: e, Description: 'Negative'});
   }

   try{
   actual = Parser.L5RShortHand(' +4K3r1');
   expected = Parser.dicePool('4d10!!kh3 reroll 1');
   testResults.push({Expected: expected, Actual: actual, Description: 'Another reroll, leading  +'});
   } catch(e){testResults.push({Error: e, Description: 'Another reroll, leading  +'});}

   try{
   actual = Parser.L5RShortHand('4k3');
   expected = Parser.dicePool('4d10!!kh3');
   testResults.push({Expected: expected, Actual: actual, Description: 'default to not hasEmphasis'});
   } catch(e){testResults.push({Error: e, Description: 'default to not hasEmphasis'});}

   try{
   Parser.L5RShortHand('4k3r1', true);
   TestRunner.failedToThrow(testResults, '2 rerolls');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('4d10!!kh3r1 reroll 1\nmultiple reroll criteria found. Max is 1'),
         Actual: e, Description: '2 rerolls'});
   }

   try{
   Parser.L5RShortHand('4k3 drop lowest', true);
   TestRunner.failedToThrow(testResults, 'Includes drop');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('4d10!!kh3 drop lowest reroll 1\nmultiple drop/keep criteria found. Max is 1'),
         Actual: e, Description: 'Includes drop'});
   }

   return TestRunner.displayResults('GameSpecific Parser.L5RShortHand', testResults, isFirst);
};
