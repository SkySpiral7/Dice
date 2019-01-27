'use strict';
TestSuite.DiceExpression = {};
TestSuite.DiceExpression.add = async function(testState={})
{
   TestRunner.clearResults(testState);

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

   return TestRunner.displayResults('DiceExpression new DiceExpression().add()', testResults, testState);
};
TestSuite.DiceExpression.addTerm = async function(testState={})
{
   TestRunner.clearResults(testState);

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

   return TestRunner.displayResults('DiceExpression new DiceExpression().addTerm()', testResults, testState);
};
TestSuite.DiceExpression.clone = async function(testState={})
{
   TestRunner.clearResults(testState);

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

   return TestRunner.displayResults('DiceExpression new DiceExpression().clone()', testResults, testState);
};
TestSuite.DiceExpression.multiply = async function(testState={})
{
   TestRunner.clearResults(testState);

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

   return TestRunner.displayResults('DiceExpression new DiceExpression().multiply()', testResults, testState);
};
TestSuite.DiceExpression.negateExponents = async function(testState={})
{
   TestRunner.clearResults(testState);

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

   return TestRunner.displayResults('DiceExpression new DiceExpression().negateExponents()', testResults, testState);
};
TestSuite.DiceExpression.power = async function(testState={})
{
   TestRunner.clearResults(testState);

   var testResults = [], expression, actual, expected;

   try{
   expression = new DiceExpression(new Die('dF'));
   expression.power(2);
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
   new DiceExpression().power('ham');
   TestRunner.failedToThrow(testResults, 'Illegal arg');
   }
   catch(e)
   {
       testResults.push({Expected: getError(Validation.requireNaturalNumber, ['ham']),
         Actual: e, Description: 'Illegal arg'});
   }

   return TestRunner.displayResults('DiceExpression new DiceExpression().power()', testResults, testState);
};
TestSuite.DiceExpression.subtract = async function(testState={})
{
   TestRunner.clearResults(testState);

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

   return TestRunner.displayResults('DiceExpression new DiceExpression().subtract()', testResults, testState);
};
TestSuite.DiceExpression.toDiceResults = async function(testState={})
{
   TestRunner.clearResults(testState);

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
   var input = [
      {exponent: 1, coefficient: (1/2)},
      {exponent: 2, coefficient: (1/2)},
      {exponent: 3, coefficient: ((1/2) * (1/2))},
      {exponent: 4, coefficient: ((1/2) * (1/2))}
   ];
   actual = new DiceExpression(input, true).toDiceResults();
   expected = [
      {result: 1, probability: (1/2)},
      {result: 2, probability: (1/2)},
      {result: 3, probability: ((1/2) * (1/2))},
      {result: 4, probability: ((1/2) * (1/2))}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Use probability'});
   } catch(e){testResults.push({Error: e, Description: 'Use probability'});}

   return TestRunner.displayResults('DiceExpression new DiceExpression().toDiceResults()', testResults, testState);
};
TestSuite.DiceExpression.toJSON = async function(testState={})
{
   TestRunner.clearResults(testState);

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

   return TestRunner.displayResults('DiceExpression new DiceExpression().toJSON()', testResults, testState);
};
TestSuite.DiceExpression._constructor = async function(testState={})
{
   TestRunner.clearResults(testState);

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

   return TestRunner.displayResults('DiceExpression new DiceExpression()._constructor()', testResults, testState);
};
TestSuite.DiceExpression.everyValue = async function(testState={})
{
   TestRunner.clearResults(testState);

   var testResults = [], expression, actual, expected;

   try{
   //1d2! is the smallest output for explode
   //also being a power of 2 means better accuracy (perfect until converting to base 10 string)
   actual = DiceExpression.everyValue(new DicePool('1d2!').toJSON().pool[0]);
   expected = [
      {exponent: [1], coefficient: (1/2)},
      {exponent: [1,2], coefficient: Math.pow((1/2), 2)},
      {exponent: [1,2,2], coefficient: Math.pow((1/2), 3)},
      {exponent: [1,2,2,2], coefficient: Math.pow((1/2), 4)},
      {exponent: [1,2,2,2,2], coefficient: Math.pow((1/2), 5)},
      {exponent: [1,2,2,2,2,2], coefficient: Math.pow((1/2), 6)},
      {exponent: [1,2,2,2,2,2,2], coefficient: Math.pow((1/2), 7)},
      {exponent: [1,2,2,2,2,2,2,2], coefficient: Math.pow((1/2), 8)},
      {exponent: [1,2,2,2,2,2,2,2,2], coefficient: Math.pow((1/2), 9)},
      {exponent: [1,2,2,2,2,2,2,2,2,2], coefficient: Math.pow((1/2), 10)},
      {exponent: [1,2,2,2,2,2,2,2,2,2,2], coefficient: Math.pow((1/2), 11)},
      {exponent: [1,2,2,2,2,2,2,2,2,2,2,2], coefficient: Math.pow((1/2), 12)},
      {exponent: [1,2,2,2,2,2,2,2,2,2,2,2,2], coefficient: Math.pow((1/2), 13)},
      {exponent: [1,2,2,2,2,2,2,2,2,2,2,2,2,2], coefficient: Math.pow((1/2), 14)},
      {exponent: [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2], coefficient: Math.pow((1/2), 15)},
      {exponent: [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2], coefficient: Math.pow((1/2), 16)},  //0.0000152587890625
      {exponent: [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2], coefficient: Math.pow((1/2), 17)},  //toFixed rounds 0.00000762939453125 up to 0.00001
      {exponent: [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2], coefficient: Math.pow((1/2), 18)}  //toFixed rounds 0.000003814697265625 down to 0.00000
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '1d2!'});
   } catch(e){testResults.push({Error: e, Description: '1d2!'});}

   try{
   actual = DiceExpression.everyValue(new DicePool('1d4!r3').toJSON().pool[0]);
   expected = [
      {exponent: [1], coefficient: (1/3)},
      {exponent: [2], coefficient: (1/3)},
      //no 3 (reroll)
      {exponent: [1,4], coefficient: Math.pow((1/3), 2)},
      {exponent: [2,4], coefficient: Math.pow((1/3), 2)},
      {exponent: [1,4,4], coefficient: Math.pow((1/3), 3)},
      {exponent: [2,4,4], coefficient: Math.pow((1/3), 3)},
      {exponent: [1,4,4,4], coefficient: Math.pow((1/3), 4)},
      {exponent: [2,4,4,4], coefficient: Math.pow((1/3), 4)},
      {exponent: [1,4,4,4,4], coefficient: Math.pow((1/3), 5)},
      {exponent: [2,4,4,4,4], coefficient: Math.pow((1/3), 5)},
      {exponent: [1,4,4,4,4,4], coefficient: Math.pow((1/3), 6)},
      {exponent: [2,4,4,4,4,4], coefficient: Math.pow((1/3), 6)},
      {exponent: [1,4,4,4,4,4,4], coefficient: Math.pow((1/3), 7)},
      {exponent: [2,4,4,4,4,4,4], coefficient: Math.pow((1/3), 7)},
      {exponent: [1,4,4,4,4,4,4,4], coefficient: Math.pow((1/3), 8)},
      {exponent: [2,4,4,4,4,4,4,4], coefficient: Math.pow((1/3), 8)},
      {exponent: [1,4,4,4,4,4,4,4,4], coefficient: Math.pow((1/3), 9)},
      {exponent: [2,4,4,4,4,4,4,4,4], coefficient: Math.pow((1/3), 9)},
      {exponent: [1,4,4,4,4,4,4,4,4,4], coefficient: Math.pow((1/3), 10)},
      {exponent: [2,4,4,4,4,4,4,4,4,4], coefficient: Math.pow((1/3), 10)},
      {exponent: [1,4,4,4,4,4,4,4,4,4,4], coefficient: Math.pow((1/3), 11)},
      {exponent: [2,4,4,4,4,4,4,4,4,4,4], coefficient: Math.pow((1/3), 11)},  //toFixed rounds 0.000005645029269476762 to 0.00001
      {exponent: [1,4,4,4,4,4,4,4,4,4,4,4], coefficient: Math.pow((1/3), 12)},  //it can't stop here
      {exponent: [2,4,4,4,4,4,4,4,4,4,4,4], coefficient: Math.pow((1/3), 12)}  //toFixed rounds 0.0000018816764231589208 to 0.00000
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '1d4!r3'});
   } catch(e){testResults.push({Error: e, Description: '1d4!r3'});}

   try{
   actual = DiceExpression.everyValue(new DicePool('1d4!pr3').toJSON().pool[0]);
   expected = [
      {exponent: [1], coefficient: (1/3)},
      {exponent: [2], coefficient: (1/3)},
      //no 3 (reroll)
      {exponent: [4,0], coefficient: Math.pow((1/3), 2)},
      {exponent: [4,1], coefficient: Math.pow((1/3), 2)},
      //no 2 because reroll is before subtraction
      {exponent: [4,3,0], coefficient: Math.pow((1/3), 3)},
      {exponent: [4,3,1], coefficient: Math.pow((1/3), 3)},
      {exponent: [4,3,3,0], coefficient: Math.pow((1/3), 4)},
      {exponent: [4,3,3,1], coefficient: Math.pow((1/3), 4)},
      {exponent: [4,3,3,3,0], coefficient: Math.pow((1/3), 5)},
      {exponent: [4,3,3,3,1], coefficient: Math.pow((1/3), 5)},
      {exponent: [4,3,3,3,3,0], coefficient: Math.pow((1/3), 6)},
      {exponent: [4,3,3,3,3,1], coefficient: Math.pow((1/3), 6)},
      {exponent: [4,3,3,3,3,3,0], coefficient: Math.pow((1/3), 7)},
      {exponent: [4,3,3,3,3,3,1], coefficient: Math.pow((1/3), 7)},
      {exponent: [4,3,3,3,3,3,3,0], coefficient: Math.pow((1/3), 8)},
      {exponent: [4,3,3,3,3,3,3,1], coefficient: Math.pow((1/3), 8)},
      {exponent: [4,3,3,3,3,3,3,3,0], coefficient: Math.pow((1/3), 9)},
      {exponent: [4,3,3,3,3,3,3,3,1], coefficient: Math.pow((1/3), 9)},
      {exponent: [4,3,3,3,3,3,3,3,3,0], coefficient: Math.pow((1/3), 10)},
      {exponent: [4,3,3,3,3,3,3,3,3,1], coefficient: Math.pow((1/3), 10)},
      {exponent: [4,3,3,3,3,3,3,3,3,3,0], coefficient: Math.pow((1/3), 11)},
      {exponent: [4,3,3,3,3,3,3,3,3,3,1], coefficient: Math.pow((1/3), 11)},  //toFixed rounds 0.000005645029269476762 to 0.00001
      {exponent: [4,3,3,3,3,3,3,3,3,3,3,0], coefficient: Math.pow((1/3), 12)},  //it can't stop here
      {exponent: [4,3,3,3,3,3,3,3,3,3,3,1], coefficient: Math.pow((1/3), 12)}  //toFixed rounds 0.0000018816764231589208 to 0.00000
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '1d4!pr3'});
   } catch(e){testResults.push({Error: e, Description: '1d4!pr3'});}

   try{
   actual = DiceExpression.everyValue(new DicePool('1d4!!r3').toJSON().pool[0]);
   expected = [
      {exponent: [1], coefficient: (1/3)},
      {exponent: [2], coefficient: (1/3)},
      //no 3 (reroll)
      {exponent: [4+1], coefficient: ((1/3) * (1/4))},
      {exponent: [4+2], coefficient: ((1/3) * (1/4))},
      //3 is not rerolled because the explode is compound
      {exponent: [4+3], coefficient: ((1/3) * (1/4))},
      {exponent: [4*2+1], coefficient: ((1/3) * Math.pow((1/4), 2))},
      {exponent: [4*2+2], coefficient: ((1/3) * Math.pow((1/4), 2))},
      {exponent: [4*2+3], coefficient: ((1/3) * Math.pow((1/4), 2))},
      {exponent: [4*3+1], coefficient: ((1/3) * Math.pow((1/4), 3))},
      {exponent: [4*3+2], coefficient: ((1/3) * Math.pow((1/4), 3))},
      {exponent: [4*3+3], coefficient: ((1/3) * Math.pow((1/4), 3))},
      {exponent: [4*4+1], coefficient: ((1/3) * Math.pow((1/4), 4))},
      {exponent: [4*4+2], coefficient: ((1/3) * Math.pow((1/4), 4))},
      {exponent: [4*4+3], coefficient: ((1/3) * Math.pow((1/4), 4))},
      {exponent: [4*5+1], coefficient: ((1/3) * Math.pow((1/4), 5))},
      {exponent: [4*5+2], coefficient: ((1/3) * Math.pow((1/4), 5))},
      {exponent: [4*5+3], coefficient: ((1/3) * Math.pow((1/4), 5))},
      {exponent: [4*6+1], coefficient: ((1/3) * Math.pow((1/4), 6))},
      {exponent: [4*6+2], coefficient: ((1/3) * Math.pow((1/4), 6))},
      {exponent: [4*6+3], coefficient: ((1/3) * Math.pow((1/4), 6))},
      {exponent: [4*7+1], coefficient: ((1/3) * Math.pow((1/4), 7))},
      {exponent: [4*7+2], coefficient: ((1/3) * Math.pow((1/4), 7))},
      {exponent: [4*7+3], coefficient: ((1/3) * Math.pow((1/4), 7))},
      {exponent: [4*8+1], coefficient: ((1/3) * Math.pow((1/4), 8))},
      {exponent: [4*8+2], coefficient: ((1/3) * Math.pow((1/4), 8))},
      {exponent: [4*8+3], coefficient: ((1/3) * Math.pow((1/4), 8))},  //toFixed rounds 0.000005086263020833333 to 0.00001
      {exponent: [4*9+1], coefficient: ((1/3) * Math.pow((1/4), 9))},  //can't stop here
      {exponent: [4*9+2], coefficient: ((1/3) * Math.pow((1/4), 9))},
      {exponent: [4*9+3], coefficient: ((1/3) * Math.pow((1/4), 9))}  //toFixed rounds 0.0000012715657552083333 to 0.00000
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '1d4!!r3'});
   } catch(e){testResults.push({Error: e, Description: '1d4!!r3'});}

   try{
   actual = DiceExpression.everyValue(new DicePool('1d4!!r<=3').toJSON().pool[0]);
   expected = [
      //no 1-3 (reroll)
      {exponent: [4+1], coefficient: (1/4)},
      {exponent: [4+2], coefficient: (1/4)},
      //3 is not rerolled because the explode is compound
      {exponent: [4+3], coefficient: (1/4)},
      {exponent: [4*2+1], coefficient: Math.pow((1/4), 2)},
      {exponent: [4*2+2], coefficient: Math.pow((1/4), 2)},
      {exponent: [4*2+3], coefficient: Math.pow((1/4), 2)},
      {exponent: [4*3+1], coefficient: Math.pow((1/4), 3)},
      {exponent: [4*3+2], coefficient: Math.pow((1/4), 3)},
      {exponent: [4*3+3], coefficient: Math.pow((1/4), 3)},
      {exponent: [4*4+1], coefficient: Math.pow((1/4), 4)},
      {exponent: [4*4+2], coefficient: Math.pow((1/4), 4)},
      {exponent: [4*4+3], coefficient: Math.pow((1/4), 4)},
      {exponent: [4*5+1], coefficient: Math.pow((1/4), 5)},
      {exponent: [4*5+2], coefficient: Math.pow((1/4), 5)},
      {exponent: [4*5+3], coefficient: Math.pow((1/4), 5)},
      {exponent: [4*6+1], coefficient: Math.pow((1/4), 6)},
      {exponent: [4*6+2], coefficient: Math.pow((1/4), 6)},
      {exponent: [4*6+3], coefficient: Math.pow((1/4), 6)},
      {exponent: [4*7+1], coefficient: Math.pow((1/4), 7)},
      {exponent: [4*7+2], coefficient: Math.pow((1/4), 7)},
      {exponent: [4*7+3], coefficient: Math.pow((1/4), 7)},
      {exponent: [4*8+1], coefficient: Math.pow((1/4), 8)},
      {exponent: [4*8+2], coefficient: Math.pow((1/4), 8)},
      {exponent: [4*8+3], coefficient: Math.pow((1/4), 8)},  //toFixed rounds 0.0000152587890625 to 0.00002
      {exponent: [4*9+1], coefficient: Math.pow((1/4), 9)},  //can't stop here
      {exponent: [4*9+2], coefficient: Math.pow((1/4), 9)},
      {exponent: [4*9+3], coefficient: Math.pow((1/4), 9)}  //toFixed rounds 0.000003814697265625 to 0.00000
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Edge case: minimum compound explodes'});
   } catch(e){testResults.push({Error: e, Description: 'Edge case: minimum compound explodes'});}

   return TestRunner.displayResults('DiceExpression DiceExpression.everyValue()', testResults, testState);
};
