'use strict';
TestSuite.client = {Pathfinder: {}};
TestSuite.client.Pathfinder.createCharacterOptions = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual;
   characters = [];
   randomSource = Math.rand;

   /*try{
   actual = new L5RDicePool({diceRolled: 3, diceKept: 2, hasEmphasis: true});
   testResults.push({Expected: new DicePool('3d10!!kh2r1'), Actual: actual, Description: 'L5R object: hasEmphasis. also new'});

   actual = L5RDicePool({diceRolled: 3, diceKept: 2});
   testResults.push({Expected: new DicePool('3d10!!kh2'), Actual: actual, Description: 'L5R object: not hasEmphasis'});
   } catch(e){testResults.push({Error: e, Description: 'L5R object'});}

   try{
   L5RDicePool();
   TestRunner.failedToThrow(testResults, 'No args');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('Illegal argument. input was: [null,null,null]'),
         Actual: e, Description: 'No args'});
   }*/

   return TestRunner.displayResults('Pathfinder createCharacterOptions', testResults, isFirst);
};
