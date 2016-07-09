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
TestSuite.StackExchange.probabilityThat_ZofNIsA = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = probabilityThat_ZofNIsA(1, new Die(2), 2);
   //actual is currently: 3/8
   testResults.push({Expected: (1/4), Actual: actual, Description: 'chance of 1 from 2d2 drop lowest'});
   } catch(e){testResults.push({Error: e, Description: 'chance of 1 from 2d2 drop lowest'});}

   try{
   actual = probabilityThat_ZofNIsA(4, new Die(4), 4);
   expected = Statistics.calculateDiceSums(new DicePool('4d4dl'));
   Statistics.determineProbability(expected);
   console.assert(4 === expected[4-1-2].result);  //probability 0 is excluded so results 1-2 aren't here.
   //currently fails
   testResults.push({Expected: expected[1].probability, Actual: actual, Description: 'chance of 4 from 445 drop lowest'});
   } catch(e){testResults.push({Error: e, Description: 'chance of 4 from 4d4 drop lowest'});}

   return TestRunner.displayResults('StackExchange probabilityThat_ZofNIsA', testResults, isFirst);
};
TestSuite.StackExchange.probabilityThat_theSmallestIsA = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = probabilityThat_theSmallestIsA(1, new Die(2), 2);
   //11, 12, 21, 22
   testResults.push({Expected: (3/4), Actual: actual, Description: '1 using 2d2'});
   } catch(e){testResults.push({Error: e, Description: '1 using 2d2'});}

   try{
   actual = probabilityThat_theSmallestIsA(2, new Die(2), 2);
   //11, 12, 21, 22
   testResults.push({Expected: (1/4), Actual: actual, Description: '2 using 2d2'});
   } catch(e){testResults.push({Error: e, Description: '2 using 2d2'});}

   return TestRunner.displayResults('StackExchange probabilityThat_theSmallestIsA', testResults, isFirst);
};
TestSuite.StackExchange.probabilityThat_XofNisSmallest = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = probabilityThat_XofNisSmallest(new Die(2), 2);
   //11, 12, 21, 22
   //maybe something like:
   //(I roll 1)(you roll 1) + (I roll 1)(you roll 2) + (I roll 2)(you roll 2)
   //(1/2)*(1/2) * 3 = 3/4
   testResults.push({Expected: (3/4), Actual: actual, Description: '2d2'});
   } catch(e){testResults.push({Error: e, Description: '2d2'});}

   try{
   actual = probabilityThat_XofNisSmallest(new Die(3), 2);
   //all: 11, 12, 13, 21, 22, 23, 31, 32, 33
   //(I roll 1)(you roll any) + (me 2)(you 2 or 3) + (me 3)(you 3)
   //(1/3) + (1/3)(2/3) + (1/3)(1/3) = 3/9 + 2/9 + 1/9 = 6/9
   testResults.push({Expected: (2/3), Actual: actual, Description: '2d3'});
   } catch(e){testResults.push({Error: e, Description: '2d3'});}

   try{
   actual = probabilityThat_XofNisSmallest(new Die(2), 3);
   //all: 111, 112, 121, 122, 211, 212, 221, 222
   //(me 1) + (me 2)(not 1)(not 1)
   //(1/2) + (1/2)^3 = 4/8 + 1/8
   testResults.push({Expected: (5/8), Actual: actual, Description: '3d2'});
   } catch(e){testResults.push({Error: e, Description: '3d2'});}

   return TestRunner.displayResults('StackExchange probabilityThat_XofNisSmallest', testResults, isFirst);
};
