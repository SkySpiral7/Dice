'use strict';
TestSuite.DiceExpression = {};
TestSuite.DiceExpression.add = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], expression, actual, expected;

   try{
   new DiceExpression().add(2);
   TestRunner.failedToThrow(testResults, 'Illegal arg');
   }
   catch(e)
   {
       testResults.push({Expected: getError(Validation.requireInstanceOf, [DiceExpression, 2]),
         Actual: e, Description: 'Illegal arg'});
   }

   try{
   actual = new DiceExpression([{exponent: 1, coefficient: 6}, {exponent: 2, coefficient: 4}]);
   actual.add(new DiceExpression([{exponent: 1, coefficient: 2}, {exponent: 2, coefficient: 1}]));
   expected = new DiceExpression([{exponent: 1, coefficient: 8}, {exponent: 2, coefficient: 5}]);
   testResults.push({Expected: expected, Actual: actual, Description: '6x+4x^2 + (2x+x^2) = 8x+5x^2'});
   } catch(e){testResults.push({Error: e, Description: '6x+4x^2 + (2x+x^2) = 8x+5x^2'});}

   return TestRunner.displayResults('DiceExpression new DiceExpression().add()', testResults, isFirst);
};
TestSuite.DiceExpression.addTerm = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], expression, actual, expected;

   try{
   expression = new DiceExpression();
   expression.addTerm({coefficient: 'sd', exponent: 0});
   TestRunner.failedToThrow(testResults, 'Invalid coefficient');
   }
   catch(e)
   {
       testResults.push({Expected: getError(Validation.requireTypeOf, ['number', 'sd']),
         Actual: e, Description: 'Invalid coefficient'});
   }

   try{
   expression = new DiceExpression();
   expression.addTerm({coefficient: 2, exponent: 'sd2'});
   TestRunner.failedToThrow(testResults, 'Invalid exponent');
   }
   catch(e)
   {
       testResults.push({Expected: getError(Validation.requireTypeOf, ['number', 'sd2']),
         Actual: e, Description: 'Invalid exponent'});
   }

   try{
   expression = new DiceExpression(new Die('dF'));
   expression.addTerm({coefficient: 2, exponent: 0});
   actual = expression.toJSON();
   expected = [
      {coefficient: 1, exponent: 1},
      {coefficient: 3, exponent: 0},
      {coefficient: 1, exponent: -1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Existing term'});
   } catch(e){testResults.push({Error: e, Description: 'Existing term'});}

   try{
   expression = new DiceExpression(new Die('dF'));
   expression.addTerm({coefficient: 2, exponent: 5});
   actual = expression.toJSON();
   expected = [
      {coefficient: 2, exponent: 5},
      {coefficient: 1, exponent: 1},
      {coefficient: 1, exponent: 0},
      {coefficient: 1, exponent: -1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'New term'});
   } catch(e){testResults.push({Error: e, Description: 'New term'});}

   try{
   expression = new DiceExpression(new Die('dF'));
   expression.addTerm({coefficient: -1, exponent: 0});
   actual = expression.toJSON();
   expected = [
      {coefficient: 1, exponent: 1},
      {coefficient: 1, exponent: -1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Remove 0 coefficients'});
   } catch(e){testResults.push({Error: e, Description: 'Remove 0 coefficients'});}

   try{
   expression = new DiceExpression(new Die('dF'));
   expression.addTerm({coefficient: 0, exponent: 2});
   actual = expression.toJSON();
   expected = [
      {coefficient: 1, exponent: 1},
      {coefficient: 1, exponent: 0},
      {coefficient: 1, exponent: -1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Don\'t add 0 coefficients'});
   } catch(e){testResults.push({Error: e, Description: 'Don\'t add 0 coefficients'});}

   return TestRunner.displayResults('DiceExpression new DiceExpression().addTerm()', testResults, isFirst);
};
TestSuite.DiceExpression.clone = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], expression, actual, expected;

   try{
   expression = new DiceExpression(new Die(3));
   expected = expression.toJSON();
   actual = expression.clone();
   expression.addTerm({coefficient: 5, exponent: 1});
   testResults.push({Expected: expected, Actual: actual.toJSON(), Description: 'Clone returns a copy'});
   } catch(e){testResults.push({Error: e, Description: 'Clone returns a copy'});}

   try{
   expression = new DiceExpression();
   expected = expression.toJSON();
   actual = expression.clone();
   expression.addTerm({coefficient: 5, exponent: 1});
   testResults.push({Expected: expected, Actual: actual.toJSON(), Description: 'Can clone an empty one'});
   } catch(e){testResults.push({Error: e, Description: 'Can clone an empty one'});}

   return TestRunner.displayResults('DiceExpression new DiceExpression().clone()', testResults, isFirst);
};
TestSuite.DiceExpression.multiply = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], expression, actual, expected;

   try{
   expression = new DiceExpression(new Die('dF'));
   expression.multiply(new DiceExpression(new Die('dF')));
   actual = expression.toJSON();
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
   new DiceExpression().multiply(2);
   TestRunner.failedToThrow(testResults, 'Illegal arg');
   }
   catch(e)
   {
       testResults.push({Expected: getError(Validation.requireInstanceOf, [DiceExpression, 2]),
         Actual: e, Description: 'Illegal arg'});
   }

   return TestRunner.displayResults('DiceExpression new DiceExpression().multiply()', testResults, isFirst);
};
TestSuite.DiceExpression.negateExponents = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], expression, actual, expected;

   try{
   expression = new DiceExpression(new Die(3));
   expression.addTerm({coefficient: 1, exponent: 2});
   expression.negateExponents();
   actual = expression.toJSON();
   expected = [
      {coefficient: 1, exponent: -1},
      {coefficient: 2, exponent: -2},
      {coefficient: 1, exponent: -3}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Negate exponents of (d3 + x^2)'});
   } catch(e){testResults.push({Error: e, Description: 'Negate exponents of (d3 + x^2)'});}

   try{
   expression = new DiceExpression([
      {coefficient: 1, exponent: [1, 5]},
      {coefficient: 2, exponent: [2, 6]},
      {coefficient: 1, exponent: [3, 7]}
   ], false);
   expression.negateExponents();
   actual = expression.toJSON();
   expected = [
      {coefficient: 1, exponent: [-1, -5]},
      {coefficient: 2, exponent: [-2, -6]},
      {coefficient: 1, exponent: [-3, -7]}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Negate array exponents'});
   } catch(e){testResults.push({Error: e, Description: 'Negate array exponents'});}

   return TestRunner.displayResults('DiceExpression new DiceExpression().negateExponents()', testResults, isFirst);
};
TestSuite.DiceExpression.subtract = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], expression, actual, expected;

   try{
   new DiceExpression().subtract(2);
   TestRunner.failedToThrow(testResults, 'Illegal arg');
   }
   catch(e)
   {
       testResults.push({Expected: getError(Validation.requireInstanceOf, [DiceExpression, 2]),
         Actual: e, Description: 'Illegal arg'});
   }

   try{
   actual = new DiceExpression([{exponent: 1, coefficient: 6}, {exponent: 2, coefficient: 4}]);
   actual.subtract(new DiceExpression([{exponent: 1, coefficient: 2}, {exponent: 2, coefficient: 1}]));
   expected = new DiceExpression([{exponent: 1, coefficient: 4}, {exponent: 2, coefficient: 3}]);
   testResults.push({Expected: expected, Actual: actual, Description: '6x+4x^2 - (2x+x^2) = 4x+3x^2'});
   } catch(e){testResults.push({Error: e, Description: '6x+4x^2 - (2x+x^2) = 4x+3x^2'});}

   return TestRunner.displayResults('DiceExpression new DiceExpression().subtract()', testResults, isFirst);
};
TestSuite.DiceExpression.toDiceResults = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = new DiceExpression(new Die('dF')).toDiceResults();
   expected = [
      {result: -1, frequency: 1},
      {result: 0, frequency: 1},
      {result: 1, frequency: 1},
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'dF'});
   } catch(e){testResults.push({Error: e, Description: 'dF'});}

   try{
   actual = new DiceExpression(new Die('1d3!'), 1).toDiceResults();
   expected = [
      {result: 1, probability: (1/3)},
      {result: 2, probability: (1/3)},
      {result: (3+1), probability: ((1/3) * (1/3))},
      {result: (3+2), probability: ((1/3) * (1/3))},
      {result: (3+3), probability: ((1/3) * (1/3))}  //doesn't explode again
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '1d3! explode: 1'});
   } catch(e){testResults.push({Error: e, Description: '1d3! explode: 1'});}

   return TestRunner.displayResults('DiceExpression new DiceExpression().toDiceResults()', testResults, isFirst);
};
TestSuite.DiceExpression.toJSON = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   var diceExpression = new DiceExpression(new Die(2));
   diceExpression.toJSON()[0].coefficient = 5;
   expected = [
      {exponent: 2, coefficient: 1},
      {exponent: 1, coefficient: 1}
   ];
   testResults.push({Expected: expected, Actual: diceExpression.toJSON(), Description: 'Does a defensive copy'});
   } catch(e){testResults.push({Error: e, Description: 'Does a defensive copy'});}

   return TestRunner.displayResults('DiceExpression new DiceExpression().toJSON()', testResults, isFirst);
};
TestSuite.DiceExpression._constructor = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = new DiceExpression(new Die('dF')).toJSON();
   expected = [
      {coefficient: 1, exponent: 1},
      {coefficient: 1, exponent: 0},
      {coefficient: 1, exponent: -1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Happy fudge die'});
   } catch(e){testResults.push({Error: e, Description: 'Happy fudge die'});}

   try{
   new DiceExpression()._constructor();
   TestRunner.failedToThrow(testResults, 'Call _constructor');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('Illegal access'), Actual: e, Description: 'Call _constructor'});
   }

   try{
   actual = new DiceExpression().toJSON();
   testResults.push({Expected: [], Actual: actual, Description: 'Creates an empty expression'});
   } catch(e){testResults.push({Error: e, Description: 'Creates an empty expression'});}

   try{
   actual = new DiceExpression(new Die('dF')).toJSON();
   actual = new DiceExpression(actual).toJSON();
   expected = [
      {coefficient: 1, exponent: 1},
      {coefficient: 1, exponent: 0},
      {coefficient: 1, exponent: -1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Accepts json'});
   } catch(e){testResults.push({Error: e, Description: 'Accepts json'});}

   try{
   actual = new DiceExpression(new Die('dF')).toDiceResults();
   Statistics.determineProbability(actual);
   actual = new DiceExpression(actual, false).toJSON();
   expected = [
      {coefficient: 1, exponent: 1},
      {coefficient: 1, exponent: 0},
      {coefficient: 1, exponent: -1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Accepts frequency dice results'});
   } catch(e){testResults.push({Error: e, Description: 'Accepts frequency dice results'});}

   try{
   actual = new DiceExpression(new Die('dF')).toDiceResults();
   Statistics.determineProbability(actual);
   actual = new DiceExpression(actual, true).toJSON();
   expected = [
      {coefficient: (1/3), exponent: 1},
      {coefficient: (1/3), exponent: 0},
      {coefficient: (1/3), exponent: -1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Accepts probability dice results'});
   } catch(e){testResults.push({Error: e, Description: 'Accepts probability dice results'});}

   try{
   var input = new DiceExpression(new Die('dF')).toDiceResults();
   Statistics.determineProbability(input);
   var diceExpression = new DiceExpression(input, false);
   input[0].coefficient = 5;

   expected = [
      {coefficient: 1, exponent: 1},
      {coefficient: 1, exponent: 0},
      {coefficient: 1, exponent: -1}
   ];
   testResults.push({Expected: expected, Actual: diceExpression.toJSON(), Description: 'Does a defensive copy'});
   } catch(e){testResults.push({Error: e, Description: 'Does a defensive copy'});}

   try{
   actual = new DiceExpression(new Die('d6r3')).toJSON();
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

   try{
   actual = new DiceExpression(new Die('1d4!r3'), 0).toJSON();
   expected = [
      {exponent: 1, coefficient: 1},
      {exponent: 2, coefficient: 1},
      //no 3
      {exponent: 4, coefficient: 1}  //doesn't explode due to explode count 0
   ];
   expected.reverse();
   testResults.push({Expected: expected, Actual: actual, Description: '1d4!r3 explode: 0'});
   } catch(e){testResults.push({Error: e, Description: '1d4!r3 explode: 0'});}

   try{
   actual = new DiceExpression(new Die('1d4!pr3'), 1).toJSON();
   expected = [
      {exponent: 1, coefficient: (1/3)},
      {exponent: 2, coefficient: (1/3)},
      //no 3 (reroll) or 4 (explode)
      {exponent: (4+1-1), coefficient: ((1/3) * (1/3))},
      {exponent: (4+2-1), coefficient: ((1/3) * (1/3))},
      //no 4+3-1 due to reroll
      {exponent: (4+4-1), coefficient: ((1/3) * (1/3))}  //doesn't explode again
   ];
   expected.reverse();
   testResults.push({Expected: expected, Actual: actual, Description: '1d4!pr3 explode: 1'});
   } catch(e){testResults.push({Error: e, Description: '1d4!pr3 explode: 1'});}

   try{
   actual = new DiceExpression(new Die('1d4!!r3'), 1).toJSON();
   expected = [
      {exponent: 1, coefficient: (1/3)},
      {exponent: 2, coefficient: (1/3)},
      //no 3 (reroll) or 4 (explode)
      {exponent: (4+1), coefficient: ((1/3) * (1/4))},
      {exponent: (4+2), coefficient: ((1/3) * (1/4))},
      {exponent: (4+3), coefficient: ((1/3) * (1/4))},  //doesn't reroll due to compound
      {exponent: (4+4), coefficient: ((1/3) * (1/4))}  //doesn't explode again
   ];
   expected.reverse();
   testResults.push({Expected: expected, Actual: actual, Description: '1d4!!r3 explode: 1'});
   } catch(e){testResults.push({Error: e, Description: '1d4!!r3 explode: 1'});}

   try{
   actual = new DiceExpression(new Die('1d4!!r<=3'), 1).toJSON();
   expected = [
      //no 1-3 (reroll) or 4 (explode)
      {exponent: (4+1), coefficient: (1/4)},
      {exponent: (4+2), coefficient: (1/4)},
      {exponent: (4+3), coefficient: (1/4)},
      {exponent: (4+4), coefficient: (1/4)}  //doesn't explode again
   ];
   expected.reverse();
   testResults.push({Expected: expected, Actual: actual, Description: 'Edge case: minimum compound explodes'});
   } catch(e){testResults.push({Error: e, Description: 'Edge case: minimum compound explodes'});}

   return TestRunner.displayResults('DiceExpression new DiceExpression()._constructor()', testResults, isFirst);
};
