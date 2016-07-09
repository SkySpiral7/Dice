'use strict';
TestSuite.StackExchange = {};
TestSuite.StackExchange.probabilityThatSumOfDiceIsA = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = beta.StackExchange.probabilityThatSumOfDiceIsA(2, new Die(2), 2);
   testResults.push({Expected: (1/4), Actual: actual, Description: '2d2 rolled 2'});
   } catch(e){testResults.push({Error: e, Description: '2d2 rolled 2'});}

   try{
   actual = beta.StackExchange.probabilityThatSumOfDiceIsA(20, new Die(10), 10);
   expected = Statistics.calculateDiceSums(new DicePool('10d10'));
   Statistics.determineProbability(expected);
   console.assert(20 === expected[20-1-9].result);  //probability 0 is excluded so results 1-9 aren't here.
   testResults.push({Expected: expected[10].probability, Actual: actual, Description: '10d10 rolled 20'});
   } catch(e){testResults.push({Error: e, Description: '10d10 rolled 20'});}

   try{
   actual = beta.StackExchange.probabilityThatSumOfDiceIsA(1, new Die(2), 2);
   testResults.push({Expected: 0, Actual: actual, Description: 'A too low'});
   } catch(e){testResults.push({Error: e, Description: 'A too low'});}

   try{
   actual = beta.StackExchange.probabilityThatSumOfDiceIsA(5, new Die(2), 2);
   testResults.push({Expected: 0, Actual: actual, Description: 'A too high'});
   } catch(e){testResults.push({Error: e, Description: 'A too high'});}

   return TestRunner.displayResults('StackExchange beta.StackExchange.probabilityThatSumOfDiceIsA', testResults, isFirst);
};
