'use strict';
TestSuite.StackExchange = {};
TestSuite.StackExchange.function1 = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = function1(4, 2);
   expected = new DiceExpression([{exponent: 2, coefficient: 1}, {exponent: 3, coefficient: 1}, {exponent: 4, coefficient: 1}]);
   testResults.push({Expected: expected, Actual: actual, Description: 'x^2+x^3+x^4'});
   } catch(e){testResults.push({Error: e, Description: 'x^2+x^3+x^4'});}

   return TestRunner.displayResults('StackExchangeWhuber function1', testResults, isFirst);
};
TestSuite.StackExchange.function2 = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = function2(1, 6, 6);
   expected = new DiceExpression([{exponent: 6, coefficient: 1}]);
   testResults.push({Expected: expected.toJSON(), Actual: actual.toJSON(), Description: 'f(1,6,6)=x^6'});
   } catch(e){testResults.push({Error: e, Description: 'f(4,6,6)=x^6'});}

   try{
   actual = function2(4, 6, 6);
   expected = new DiceExpression([{exponent: 24, coefficient: 1}]);
   testResults.push({Expected: expected, Actual: actual, Description: 'f(4,6,6)=x^24'});
   } catch(e){testResults.push({Error: e, Description: 'f(4,6,6)=x^24'});}

   try{
   actual = function2(4, 6, 5);  //whuber did the math on this one rather than me
   expected = new DiceExpression([{exponent: 20, coefficient: 1}, {exponent: 21, coefficient: 4}, {exponent: 22, coefficient: 6}, {exponent: 23, coefficient: 4}, {exponent: 24, coefficient: 1}]);
   testResults.push({Expected: expected, Actual: actual, Description: 'f(4,6,5)=x^20+4x^21+6x^22+4x^23+x^24'});
   } catch(e){testResults.push({Error: e, Description: 'f(4,6,5)=x^20+4x^21+6x^22+4x^23+x^24'});}

   return TestRunner.displayResults('StackExchangeWhuber function2', testResults, isFirst);
};
TestSuite.StackExchange.function3 = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = function3(4, 6, 6);
   expected = new DiceExpression([{exponent: 24, coefficient: 1}]);
   testResults.push({Expected: expected, Actual: actual, Description: 'f(4,6,6)=x^24'});
   } catch(e){testResults.push({Error: e, Description: 'f(4,6,6)=x^24'});}

   try{
   actual = function3(4, 6, 5);  //whuber did the math on this one rather than me
   expected = new DiceExpression([{exponent: 20, coefficient: 1}, {exponent: 21, coefficient: 4}, {exponent: 22, coefficient: 6}, {exponent: 23, coefficient: 4}]);
   testResults.push({Expected: expected, Actual: actual, Description: 'f(4,6,5)=x^20+4x^21+6x^22+4x^23'});
   } catch(e){testResults.push({Error: e, Description: 'f(4,6,5)=x^20+4x^21+6x^22+4x^23'});}

   return TestRunner.displayResults('StackExchangeWhuber function3', testResults, isFirst);
};
TestSuite.StackExchange.function4 = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   expected = Statistics.calculateDiceSums(new DicePool('4d6 drop lowest'));
   actual = function4(4, 6);
   testResults.push({Expected: expected, Actual: actual, Description: '4d6 drop lowest'});
   } catch(e){testResults.push({Error: e, Description: '4d6 drop lowest'});}

   return TestRunner.displayResults('StackExchangeWhuber function4', testResults, isFirst);
};
