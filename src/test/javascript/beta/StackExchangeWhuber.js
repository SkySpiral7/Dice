'use strict';
TestSuite.StackExchange = {};
TestSuite.StackExchange.diceResultsForASingleDrop = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected, diceGroup, everyDieValue;
   var testStrings = ['3d6', '-2d3', /*'2d3!r2', '2d3!pr1',*/ '2d2!!r1'];

   for (var i = 0; i < testStrings.length; ++i)
   {
      try{
      diceGroup = new DicePool(testStrings[i] + ' drop lowest').toJSON().pool[0];
      everyDieValue = DiceExpression.everyValue(diceGroup);
      actual = diceResultsForASingleDrop(diceGroup, JSON.clone(everyDieValue));
      expected = Algorithm.useBruteForce(diceGroup, JSON.clone(everyDieValue));
      testResults.push({Expected: expected, Actual: actual, Description: testStrings[i]});
      } catch(e){testResults.push({Error: e, Description: testStrings[i]});}
   }

   return TestRunner.displayResults('StackExchangeWhuber diceResultsForASingleDrop', testResults, isFirst);
};
