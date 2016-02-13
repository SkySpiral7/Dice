'use strict';
Tester.Polynomial = {};
Tester.Polynomial._constructor = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = new Polynomial(new Die('dF')).toJSON().terms;
   expected = [
      {coefficient: 1, exponent: -1},
      {coefficient: 1, exponent: 0},
      {coefficient: 1, exponent: 1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Happy fudge die'});
   } catch(e){testResults.push({Error: e, Description: 'Happy fudge die'});}

   try{
   new Polynomial(new Die())._constructor();
   TesterUtility.failedToThrow(testResults, 'Call _constructor');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('Illegal access'), Actual: e, Description: 'Call _constructor'});
   }

   try{
   actual = new Polynomial(new Die('d6r3')).toJSON().terms;
   expected = [
      {coefficient: 1, exponent: 1},
      {coefficient: 1, exponent: 2},
      //no 3
      {coefficient: 1, exponent: 4},
      {coefficient: 1, exponent: 5},
      {coefficient: 1, exponent: 6}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'd6r3'});
   } catch(e){testResults.push({Error: e, Description: 'd6r3'});}

   TesterUtility.displayResults('Polynomial new Polynomial()._constructor()', testResults, isFirst);
};
