'use strict';
Tester.GenerateHtml = {};
Tester.GenerateHtml.aggregates = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], input, actual, expected;

   try{
   input = {minimum: 2, maximum: 12, mean: 7.001563, standardDeviation: 2.415123465};
   actual = GenerateHtml.aggregates(input);
   expected = '<b>Statistics</b>';
   expected += '<br />\nMin: 2';
   expected += '<br />\nMax: 12';
   expected += '<br />\nMean: 7.00';
   expected += '<br />\nStandard Deviation: 2.415';
   testResults.push({Expected: expected, Actual: actual, Description: 'Aggregates'});
   } catch(e){testResults.push({Error: e, Description: 'Aggregates'});}

   TesterUtility.displayResults('GenerateHtml GenerateHtml.aggregates', testResults, isFirst);
};
