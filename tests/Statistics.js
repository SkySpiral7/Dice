'use strict';
Tester.Statistics = {};
Tester.Statistics.calculateAggregates = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = Statistics.calculateAggregates([
      {result: 2, frequency: 1},
      {result: 3, frequency: 2},
      {result: 4, frequency: 3},
      {result: 5, frequency: 4},
      {result: 6, frequency: 5},
      {result: 7, frequency: 6},
      {result: 8, frequency: 5},
      {result: 9, frequency: 4},
      {result: 10, frequency: 3},
      {result: 11, frequency: 2},
      {result: 12, frequency: 1}
   ]);
   expected = {minimum: 2, maximum: 12, mean: 7, standardDeviation: Math.sqrt(210 / 36)};  //reduced: 35/6
   testResults.push({Expected: expected, Actual: actual, Description: '2d6'});
   } catch(e){testResults.push({Error: e, Description: '2d6'});}

   TesterUtility.displayResults('Statistics Statistics.calculateAggregates', testResults, isFirst);
};
/*
   try{
   new Die().roll(5);
   TesterUtility.failedToThrow(testResults, 'randomSource wrong type');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('1d6\nrandomSource must be a function but was a number with toString: 5'),
         Actual: e, Description: 'randomSource wrong type'});
   }
*/
