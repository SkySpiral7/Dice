'use strict';
TestSuite.StackExchange = {};
TestSuite.StackExchange.expressionForASingleDie = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = expressionForASingleDie(4, 2);
   expected = new DiceExpression([{exponent: 2, coefficient: 1}, {exponent: 3, coefficient: 1}, {exponent: 4, coefficient: 1}]);
   testResults.push({Expected: expected, Actual: actual, Description: 'x^2+x^3+x^4'});
   } catch(e){testResults.push({Error: e, Description: 'x^2+x^3+x^4'});}

   return TestRunner.displayResults('StackExchangeWhuber expressionForASingleDie', testResults, isFirst);
};
TestSuite.StackExchange.expressionForMultipleDice = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = expressionForMultipleDice(1, 6, 6);
   expected = new DiceExpression([{exponent: 6, coefficient: 1}]);
   testResults.push({Expected: expected.toJSON(), Actual: actual.toJSON(), Description: 'f(1,6,6)=x^6'});
   } catch(e){testResults.push({Error: e, Description: 'f(4,6,6)=x^6'});}

   try{
   actual = expressionForMultipleDice(4, 6, 6);
   expected = new DiceExpression([{exponent: 24, coefficient: 1}]);
   testResults.push({Expected: expected, Actual: actual, Description: 'f(4,6,6)=x^24'});
   } catch(e){testResults.push({Error: e, Description: 'f(4,6,6)=x^24'});}

   try{
   actual = expressionForMultipleDice(4, 6, 5);  //whuber did the math on this one rather than me
   expected = new DiceExpression([{exponent: 20, coefficient: 1}, {exponent: 21, coefficient: 4}, {exponent: 22, coefficient: 6}, {exponent: 23, coefficient: 4}, {exponent: 24, coefficient: 1}]);
   testResults.push({Expected: expected, Actual: actual, Description: 'f(4,6,5)=x^20+4x^21+6x^22+4x^23+x^24'});
   } catch(e){testResults.push({Error: e, Description: 'f(4,6,5)=x^20+4x^21+6x^22+4x^23+x^24'});}

   return TestRunner.displayResults('StackExchangeWhuber expressionForMultipleDice', testResults, isFirst);
};
TestSuite.StackExchange.expressionForDropLowestIsExactlyResult = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = expressionForDropLowestIsExactlyResult(4, 6, 6);
   expected = new DiceExpression([{exponent: 18, coefficient: 1}]);
   testResults.push({Expected: expected, Actual: actual, Description: 'f(4,6,6) = x^24/x^6 = x^18'});
   } catch(e){testResults.push({Error: e, Description: 'f(4,6,6) = x^24/x^6 = x^18'});}

   try{
   actual = expressionForDropLowestIsExactlyResult(4, 6, 5);  //whuber did the math on this one rather than me (I just divided by x^5)
   expected = new DiceExpression([{exponent: 15, coefficient: 1}, {exponent: 16, coefficient: 4}, {exponent: 17, coefficient: 6}, {exponent: 18, coefficient: 4}]);
   testResults.push({Expected: expected, Actual: actual, Description: 'f(4,6,5) = (x^20+4x^21+6x^22+4x^23)/x^5 = x^15+4x^16+6x^17+4x^18'});
   } catch(e){testResults.push({Error: e, Description: 'f(4,6,5) = (x^20+4x^21+6x^22+4x^23)/x^5 = x^15+4x^16+6x^17+4x^18'});}

   return TestRunner.displayResults('StackExchangeWhuber expressionForDropLowestIsExactlyResult', testResults, isFirst);
};
TestSuite.StackExchange.diceResultsForASingleDrop = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   expected = Statistics.calculateDiceSums(new DicePool('4d6 drop lowest'));
   actual = diceResultsForASingleDrop(4, 6);
   testResults.push({Expected: expected, Actual: actual, Description: '4d6 drop lowest'});
   } catch(e){testResults.push({Error: e, Description: '4d6 drop lowest'});}

   return TestRunner.displayResults('StackExchangeWhuber diceResultsForASingleDrop', testResults, isFirst);
};
