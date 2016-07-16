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
   //all: 11, 12, 21, 22 which become: 1, 2, 2, 2
   testResults.push({Expected: (1/4), Actual: actual, Description: 'chance of 1 from 2d2 drop lowest'});
   } catch(e){testResults.push({Error: e, Description: 'chance of 1 from 2d2 drop lowest'});}

   try{
   actual = probabilityThat_ZofNIsA(4, new Die(4), 4);
   expected = Statistics.calculateDiceSums(new DicePool('4d4 drop lowest'));
   Statistics.determineProbability(expected);
   console.assert(4 === expected[4-1-2].result);  //probability 0 is excluded so results 1 and 2 aren't here.
   //currently fails
   testResults.push({Expected: expected[1].probability, Actual: actual, Description: 'chance of 4 from 4d4 drop lowest'});
   } catch(e){testResults.push({Error: e, Description: 'chance of 4 from 4d4 drop lowest'});}

   return TestRunner.displayResults('StackExchange probabilityThat_ZofNIsA', testResults, isFirst);
};
TestSuite.StackExchange.probabilityThat_XofNisSmallestOrEqual = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual;

   try{
   actual = beta.StackExchange.probabilityThat_XofNisSmallestOrEqual(new Die(2), 1);
   testResults.push({Expected: 1, Actual: actual, Description: '1d2'});
   } catch(e){testResults.push({Error: e, Description: '1d2'});}

   try{
   actual = beta.StackExchange.probabilityThat_XofNisSmallestOrEqual(new Die(2), 2);
   //all: 11, 12, 21, 22
   //maybe something like:
   //(I roll 1)(you roll 1) + (I roll 1)(you roll 2) + (I roll 2)(you roll 2)
   //(1/2)*(1/2) * 3 = 3/4
   testResults.push({Expected: (3/4), Actual: actual, Description: '2d2'});
   } catch(e){testResults.push({Error: e, Description: '2d2'});}

   try{
   actual = beta.StackExchange.probabilityThat_XofNisSmallestOrEqual(new Die(3), 2);
   //all: 11, 12, 13, 21, 22, 23, 31, 32, 33
   //(I roll 1)(you roll any) + (me 2)(you 2 or 3) + (me 3)(you 3)
   //(1/3) + (1/3)(2/3) + (1/3)(1/3) = 3/9 + 2/9 + 1/9 = 6/9
   testResults.push({Expected: (2/3), Actual: actual, Description: '2d3'});
   } catch(e){testResults.push({Error: e, Description: '2d3'});}

   try{
   actual = beta.StackExchange.probabilityThat_XofNisSmallestOrEqual(new Die(2), 3);
   //all: 111, 112, 121, 122, 211, 212, 221, 222
   //(me 1) + (me 2)(not 1)(not 1)
   //(1/2) + (1/2)^3 = 4/8 + 1/8
   testResults.push({Expected: (5/8), Actual: actual, Description: '3d2'});
   } catch(e){testResults.push({Error: e, Description: '3d2'});}

   return TestRunner.displayResults('StackExchange beta.StackExchange.probabilityThat_XofNisSmallestOrEqual', testResults, isFirst);
};
TestSuite.StackExchange.probabilityThat_XofNIsA_GivenThatXofNisLargest = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual;

   try{
   actual = probabilityThat_XofNIsA_GivenThatXofNisLargest(1, new Die(2), 1);
   testResults.push({Expected: (1/2), Actual: actual, Description: '1 from 1d2'});
   } catch(e){testResults.push({Error: e, Description: '1 from 1d2'});}

   try{
   actual = probabilityThat_XofNIsA_GivenThatXofNisLargest(1, new Die(2), 2);
   //all: 11, 12, 21, 22 so x is: -, 2, 2, -
   testResults.push({Expected: 0, Actual: actual, Description: '1 from 2d2'});
   } catch(e){testResults.push({Error: e, Description: '1 from 2d2'});}

   try{
   actual = probabilityThat_XofNIsA_GivenThatXofNisLargest(2, new Die(2), 2);
   //all: 11, 12, 21, 22 so the x is: -, 2, 2, -
   testResults.push({Expected: 1, Actual: actual, Description: '2 in 2d2'});
   } catch(e){testResults.push({Error: e, Description: '2 in 2d2'});}

   return TestRunner.displayResults('StackExchange probabilityThat_XofNIsA_GivenThatXofNisLargest', testResults, isFirst);
};
TestSuite.StackExchange.probabilityThat_XofNisLargest_GivenThatXofNIsA = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual;

   try{
   actual = probabilityThat_XofNisLargest_GivenThatXofNIsA(1, new Die(2), 1);
   testResults.push({Expected: 1, Actual: actual, Description: '1 in 1d2'});
   } catch(e){testResults.push({Error: e, Description: '1 in 1d2'});}

   try{
   actual = probabilityThat_XofNisLargest_GivenThatXofNIsA(1, new Die(2), 2);
   //because it can't be greater it can only be equal to
   testResults.push({Expected: 0, Actual: actual, Description: '1 in 2d2'});
   } catch(e){testResults.push({Error: e, Description: '1 in 2d2'});}

   try{
   actual = probabilityThat_XofNisLargest_GivenThatXofNIsA(2, new Die(2), 2);
   //all: 11, 12, 21, 22
   testResults.push({Expected: (2/4), Actual: actual, Description: '2 in 2d2'});
   } catch(e){testResults.push({Error: e, Description: '2 in 2d2'});}

   return TestRunner.displayResults('StackExchange probabilityThat_XofNisLargest_GivenThatXofNIsA', testResults, isFirst);
};
TestSuite.StackExchange.probabilityThat_XofNisSmallestOrEqual_GivenThatXofNIsA = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual;

   try{
   actual = probabilityThat_XofNisSmallestOrEqual_GivenThatXofNIsA(1, new Die(2), 1);
   testResults.push({Expected: 1, Actual: actual, Description: '1d2'});
   } catch(e){testResults.push({Error: e, Description: '1d2'});}

   try{
   actual = probabilityThat_XofNisSmallestOrEqual_GivenThatXofNIsA(1, new Die(2), 2);
   testResults.push({Expected: 1, Actual: actual, Description: '2d2 given 1'});
   } catch(e){testResults.push({Error: e, Description: '2d2 given 1'});}

   try{
   actual = probabilityThat_XofNisSmallestOrEqual_GivenThatXofNIsA(2, new Die(2), 2);
   testResults.push({Expected: (1/2), Actual: actual, Description: '2d2 given 2'});
   } catch(e){testResults.push({Error: e, Description: '2d2 given 2'});}

   try{
   actual = probabilityThat_XofNisSmallestOrEqual_GivenThatXofNIsA(2, new Die(3), 2);
   testResults.push({Expected: (2/3), Actual: actual, Description: '2d3 given 2'});
   } catch(e){testResults.push({Error: e, Description: '2d3 given 2'});}

   try{
   actual = probabilityThat_XofNisSmallestOrEqual_GivenThatXofNIsA(2, new Die(2), 3);
   //others: 11, 12, 21, 22
   testResults.push({Expected: (1/4), Actual: actual, Description: '3d2 given 2'});
   } catch(e){testResults.push({Error: e, Description: '3d2 given 2'});}

   return TestRunner.displayResults('StackExchange probabilityThat_XofNisSmallestOrEqual_GivenThatXofNIsA', testResults, isFirst);
};
TestSuite.StackExchange.probabilityThatSumOfDiceIsA_GivenThatXofNisSmallestOrEqual = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual;

   try{
   actual = probabilityThatSumOfDiceIsA_GivenThatXofNisSmallestOrEqual(1, new Die(2), 1);
   //all: 11, 12, 21, 22
   //given (first die is n): 11, 12, -, 22
   //becomes (other die used by sum): 1, 2, 2
   testResults.push({Expected: (1/3), Actual: actual, Description: '2d2 given 1'});
   } catch(e){testResults.push({Error: e, Description: '2d2 given 1'});}

   try{
   actual = probabilityThatSumOfDiceIsA_GivenThatXofNisSmallestOrEqual(2, new Die(2), 1);
   testResults.push({Expected: (2/3), Actual: actual, Description: '2d2 given 2'});
   } catch(e){testResults.push({Error: e, Description: '2d2 given 2'});}

   try{
   actual = probabilityThatSumOfDiceIsA_GivenThatXofNisSmallestOrEqual(3, new Die(2), 2);
   //all: 111, 112, 121, 122, 211, 212, 221, 222
   //given (first die is n): 111, 112, 121, 122, -, -, -, 222
   //becomes (other dice): 11, 12, 21, 22, 22
   //with sum of: 2, 3, 3, 4, 4
   testResults.push({Expected: (2/5), Actual: actual, Description: '3d2 given 3'});
   } catch(e){testResults.push({Error: e, Description: '3d2 given 3'});}

   try{
   actual = probabilityThatSumOfDiceIsA_GivenThatXofNisSmallestOrEqual(2, new Die(3), 1);
   //all: 11, 12, 13, 21, 22, 23, 31, 32, 33
   //given (first die is n): 11, 12, 13, -, 22, 23, -, -, 33
   //becomes (other dice): 1, 2, 3, 2, 3, 3
   //which is: 1*1, 2*2, 3*3 = 6 total
   testResults.push({Expected: (2/6), Actual: actual, Description: '2d3 given 2'});
   } catch(e){testResults.push({Error: e, Description: '2d3 given 2'});}

   try{
   actual = probabilityThatSumOfDiceIsA_GivenThatXofNisSmallestOrEqual(3, new Die(3), 1);
   testResults.push({Expected: (3/6), Actual: actual, Description: '2d3 given 3'});
   } catch(e){testResults.push({Error: e, Description: '2d3 given 3'});}

   try{
   actual = probabilityThatSumOfDiceIsA_GivenThatXofNisSmallestOrEqual(4, new Die(3), 2);
   //all: 111, 112, 113, 121, 122, 123, 131, 132, 133, 211, 212, 213, 221, 222, 223, 231, 232, 233, 311, 312, 313, 321, 322, 323, 331, 332, 333
   //given (first die is n): 111, 112, 113, 121, 122, 123, 131, 132, 133, -, -, -, -, 222, 223, -, 232, 233, -, -, -, -, -, -, -, -, 333
   //becomes (other dice): 11, 12, 13, 21, 22, 23, 31, 32, 33, 22, 23, 32, 33, 33
   //with sum of: 2, 3, 4, 3, 4, 5, 4, 5, 6, 4, 5, 5, 6, 6
   //which is: 2*1, 3*2, 4*4, 5*4, 6*3 = 14 total
   testResults.push({Expected: (4/14), Actual: actual, Description: '3d3 given 4'});
   } catch(e){testResults.push({Error: e, Description: '3d3 given 4'});}

   return TestRunner.displayResults('StackExchange probabilityThatSumOfDiceIsA_GivenThatXofNisSmallestOrEqual', testResults, isFirst);
};