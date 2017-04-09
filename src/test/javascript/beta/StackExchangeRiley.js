'use strict';
TestSuite.StackExchange = {};
TestSuite.StackExchange.probabilityThat_ZofNIsA_meetsRequirements = function(isFirst)
{
   return {tableName: 'unmade', testResults: []};  //remove this when actual tests exist. ADD TESTS
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   expected = Statistics.calculateDiceSums(new DicePool('4d6 drop lowest'));
   Statistics.determineProbability(expected);

   for (var i = 3; i <= 18; ++i)
   {
      actual = beta.probabilityThat_ZofNIsA(i, new Die(6), 4);
      //currently fails for all except sum of 3
      testResults.push({Expected: expected[i-3].probability, Actual: actual, Description: 'chance of ' + i + ' from 4d6 drop lowest'});
   }

   return TestRunner.displayResults('StackExchange beta.probabilityThat_ZofNIsA meets requirements', testResults, isFirst);
};
