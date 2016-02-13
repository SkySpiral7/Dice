'use strict';
Tester.Polynomial = {};
Tester.Polynomial._constructor = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = new Polynomial(new Die('dF')).toJSON().terms;
   expected = [
      {coefficient: 1, exponent: 1},
      {coefficient: 1, exponent: 0},
      {coefficient: 1, exponent: -1}
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
      {coefficient: 1, exponent: 6},
      {coefficient: 1, exponent: 5},
      {coefficient: 1, exponent: 4},
      //no 3
      {coefficient: 1, exponent: 2},
      {coefficient: 1, exponent: 1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'd6r3'});
   } catch(e){testResults.push({Error: e, Description: 'd6r3'});}

   TesterUtility.displayResults('Polynomial new Polynomial()._constructor()', testResults, isFirst);
};
Tester.Polynomial.addTerm = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], polynomial, actual, expected;

   try{
   polynomial = new Polynomial(new Die('dF'));
   polynomial.addTerm({coefficient: 'sd', exponent: 0});
   TesterUtility.failedToThrow(testResults, 'Invalid coefficient');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('term.coefficient must be a number but was: string'),
         Actual: e, Description: 'Invalid coefficient'});
   }

   try{
   polynomial = new Polynomial(new Die('dF'));
   polynomial.addTerm({coefficient: 2, exponent: 'sd'});
   TesterUtility.failedToThrow(testResults, 'Invalid exponent');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('term.exponent must be a number but was: string'),
         Actual: e, Description: 'Invalid exponent'});
   }

   try{
   polynomial = new Polynomial(new Die('dF'));
   polynomial.addTerm({coefficient: new Number(2), exponent: new Number(0)});
   actual = polynomial.toJSON().terms;
   expected = [
      {coefficient: 1, exponent: 1},
      {coefficient: 3, exponent: 0},
      {coefficient: 1, exponent: -1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Existing term'});
   } catch(e){testResults.push({Error: e, Description: 'Existing term'});}

   try{
   polynomial = new Polynomial(new Die('dF'));
   polynomial.addTerm({coefficient: 2, exponent: 5});
   actual = polynomial.toJSON().terms;
   expected = [
      {coefficient: 2, exponent: 5},
      {coefficient: 1, exponent: 1},
      {coefficient: 1, exponent: 0},
      {coefficient: 1, exponent: -1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'New term'});
   } catch(e){testResults.push({Error: e, Description: 'New term'});}

   try{
   polynomial = new Polynomial(new Die('dF'));
   polynomial.addTerm({coefficient: -1, exponent: 0});
   actual = polynomial.toJSON().terms;
   expected = [
      {coefficient: 1, exponent: 1},
      {coefficient: 1, exponent: -1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Remove 0 coefficients'});
   } catch(e){testResults.push({Error: e, Description: 'Remove 0 coefficients'});}

   try{
   polynomial = new Polynomial(new Die('dF'));
   polynomial.addTerm({coefficient: 0, exponent: 2});
   actual = polynomial.toJSON().terms;
   expected = [
      {coefficient: 1, exponent: 1},
      {coefficient: 1, exponent: 0},
      {coefficient: 1, exponent: -1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Don\'t add 0 coefficients'});
   } catch(e){testResults.push({Error: e, Description: 'Don\'t add 0 coefficients'});}

   TesterUtility.displayResults('Polynomial new Polynomial().addTerm()', testResults, isFirst);
};
Tester.Polynomial.multiply = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], polynomial, actual, expected;

   try{
   polynomial = new Polynomial(new Die('dF'));
   polynomial.multiply(new Polynomial(new Die('dF')));
   actual = polynomial.toJSON().terms;
   expected = [
      {coefficient: 1, exponent: 2},
      {coefficient: 2, exponent: 1},
      {coefficient: 3, exponent: 0},
      {coefficient: 2, exponent: -1},
      {coefficient: 1, exponent: -2}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '2dF'});
   } catch(e){testResults.push({Error: e, Description: '2dF'});}

   try{
   new Polynomial(new Die()).multiply(2);
   TesterUtility.failedToThrow(testResults, 'Illegal arg');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('Expected: Polynomial. Got: Number'),
         Actual: e, Description: 'Illegal arg'});
   }

   TesterUtility.displayResults('Polynomial new Polynomial().multiply()', testResults, isFirst);
};
