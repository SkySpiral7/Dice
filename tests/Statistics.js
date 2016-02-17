'use strict';
Tester.Statistics = {};
Tester.Statistics.analyze = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], dicePool, actual, expected;

   try{
   dicePool = new DicePool('2d6');
   actual = Statistics.analyze(dicePool);
   expected = Statistics.usePolynomial(dicePool, 0);
   testResults.push({Expected: expected, Actual: actual, Description: '2d6'});
   } catch(e){testResults.push({Error: e, Description: '2d6'});}

   try{
   //1d2! is the smallest output for explode
   //also being a power of 2 means better accuracy (perfect until converting to base 10 string)
   actual = Statistics.analyze(new DicePool('1d2!'));
   expected = [
      {result: 1, probability: (1/2)},
      {result: 3, probability: Math.pow((1/2), 2)},
      {result: 5, probability: Math.pow((1/2), 3)},
      {result: 7, probability: Math.pow((1/2), 4)},
      {result: 9, probability: Math.pow((1/2), 5)},
      {result: 11, probability: Math.pow((1/2), 6)},
      {result: 13, probability: Math.pow((1/2), 7)},
      {result: 15, probability: Math.pow((1/2), 8)},
      {result: 17, probability: Math.pow((1/2), 9)},
      {result: 19, probability: Math.pow((1/2), 10)},
      {result: 21, probability: Math.pow((1/2), 11)},
      {result: 23, probability: Math.pow((1/2), 12)},
      {result: 25, probability: Math.pow((1/2), 13)},
      {result: 27, probability: Math.pow((1/2), 14)},
      {result: 29, probability: Math.pow((1/2), 15)},
      {result: 31, probability: Math.pow((1/2), 16)},  //0.0000152587890625
      {result: 33, probability: Math.pow((1/2), 17)},  //toFixed rounds 0.00000762939453125 up to 0.00001
      {result: 35, probability: Math.pow((1/2), 18)},  //this can't be the last one because it isn't divisible by 2
      {result: 36, probability: Math.pow((1/2), 18)}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '1d2!'});
   } catch(e){testResults.push({Error: e, Description: '1d2!'});}

   TesterUtility.displayResults('Statistics Statistics.analyze', testResults, isFirst);
};
Tester.Statistics.calculateAggregates = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   Statistics.calculateAggregates({});
   TesterUtility.failedToThrow(testResults, 'Wrong type arg');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('stats must be an array but was: object'),
         Actual: e, Description: 'Wrong type arg'});
   }

   try{
   Statistics.calculateAggregates([]);
   TesterUtility.failedToThrow(testResults, 'Empty array arg');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('stats must not be an empty array'),
         Actual: e, Description: 'Empty array arg'});
   }

   try{
   actual = Statistics.calculateAggregates(Statistics.usePolynomial(new DicePool('2d6')));
   expected = {minimum: 2, maximum: 12, mean: 7, standardDeviation: Math.sqrt(210 / 36)};  //reduced: 35/6
   testResults.push({Expected: expected, Actual: actual, Description: '2d6'});
   } catch(e){testResults.push({Error: e, Description: '2d6'});}
   //TODO: re: test: probability

   TesterUtility.displayResults('Statistics Statistics.calculateAggregates', testResults, isFirst);
};
Tester.Statistics.determineProbability = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = Statistics.usePolynomial(new DicePool('2d6'));
   Statistics.determineProbability(actual);
   expected = [
      {result: 2, frequency: 1, probability: (1/36)},
      {result: 3, frequency: 2, probability: (2/36)},
      {result: 4, frequency: 3, probability: (3/36)},
      {result: 5, frequency: 4, probability: (4/36)},
      {result: 6, frequency: 5, probability: (5/36)},
      {result: 7, frequency: 6, probability: (6/36)},
      {result: 8, frequency: 5, probability: (5/36)},
      {result: 9, frequency: 4, probability: (4/36)},
      {result: 10, frequency: 3, probability: (3/36)},
      {result: 11, frequency: 2, probability: (2/36)},
      {result: 12, frequency: 1, probability: (1/36)}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '2d6'});
   } catch(e){testResults.push({Error: e, Description: '2d6'});}

   TesterUtility.displayResults('Statistics Statistics.determineProbability', testResults, isFirst);
};
Tester.Statistics.usePolynomial = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = Statistics.usePolynomial(new DicePool('2d6'));
   expected = [
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
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '2d6'});
   } catch(e){testResults.push({Error: e, Description: '2d6'});}

   try{
   actual = Statistics.usePolynomial(new DicePool('1d3!'), 1);
   expected = [
      {result: 1, probability: (1/3)},
      {result: 2, probability: (1/3)},
      {result: (3+1), probability: ((1/3) * (1/3))},
      {result: (3+2), probability: ((1/3) * (1/3))},
      {result: (3+3), probability: ((1/3) * (1/3))}  //doesn't explode again
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '1d3! explode: 1'});
   } catch(e){testResults.push({Error: e, Description: '1d3! explode: 1'});}

   try{
   actual = Statistics.usePolynomial(new DicePool('-d3'));
   expected = [
      {result: -3, frequency: 1},
      {result: -2, frequency: 1},
      {result: -1, frequency: 1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '-d3'});
   } catch(e){testResults.push({Error: e, Description: '-d3'});}

   TesterUtility.displayResults('Statistics Statistics.usePolynomial', testResults, isFirst);
};
