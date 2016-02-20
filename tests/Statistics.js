'use strict';
Tester.Statistics = {};
Tester.Statistics.analyze = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], dicePool, actual, expected;

   try{
   dicePool = new DicePool('2d6');
   actual = Statistics.analyze(dicePool);
   expected = Statistics.useNonDroppingAlgorithm(dicePool, 0);
   testResults.push({Expected: expected, Actual: actual, Description: '2d6'});
   } catch(e){testResults.push({Error: e, Description: '2d6'});}

   try{
   //1d2! is the smallest output for explode
   //also being a power of 2 means better accuracy (perfect until converting to base 10 string)
   actual = Statistics.analyze(new DicePool('1d2!'));
   expected = [
      {result: 1, probability: (1/2)},
      {result: (2+1), probability: Math.pow((1/2), 2)},
      {result: (2*2+1), probability: Math.pow((1/2), 3)},
      {result: (2*3+1), probability: Math.pow((1/2), 4)},
      {result: (2*4+1), probability: Math.pow((1/2), 5)},
      {result: (2*5+1), probability: Math.pow((1/2), 6)},
      {result: (2*6+1), probability: Math.pow((1/2), 7)},
      {result: (2*7+1), probability: Math.pow((1/2), 8)},
      {result: (2*8+1), probability: Math.pow((1/2), 9)},
      {result: (2*9+1), probability: Math.pow((1/2), 10)},
      {result: (2*10+1), probability: Math.pow((1/2), 11)},
      {result: (2*11+1), probability: Math.pow((1/2), 12)},
      {result: (2*12+1), probability: Math.pow((1/2), 13)},
      {result: (2*13+1), probability: Math.pow((1/2), 14)},
      {result: (2*14+1), probability: Math.pow((1/2), 15)},
      {result: (2*15+1), probability: Math.pow((1/2), 16)},  //0.0000152587890625
      {result: (2*16+1), probability: Math.pow((1/2), 17)},  //toFixed rounds 0.00000762939453125 up to 0.00001
      {result: (2*17+1), probability: Math.pow((1/2), 18)},  //this can't be the last one because it isn't divisible by 2
      {result: (2*18), probability: Math.pow((1/2), 18)}  //toFixed rounds 0.000003814697265625 down to 0.00000
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
   actual = Statistics.calculateAggregates(Statistics.useNonDroppingAlgorithm(new DicePool('2d6')));
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
   actual = Statistics.useNonDroppingAlgorithm(new DicePool('2d6'));
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
Tester.Statistics.useBruteForce = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = Statistics.useBruteForce(new DicePool('2d6'));
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
   actual = Statistics.useBruteForce(new DicePool('-d3'));
   expected = [
      {result: -3, frequency: 1},
      {result: -2, frequency: 1},
      {result: -1, frequency: 1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '-d3'});
   } catch(e){testResults.push({Error: e, Description: '-d3'});}

   try{
   actual = Statistics.useBruteForce(new DicePool('2d2+d3'));
   expected = Statistics.useNonDroppingAlgorithm(new DicePool('2d2+d3'));
   //need to test more than 2 dice for useBruteForce. trust useNonDroppingAlgorithm for this because 2+ isn't special to it
   testResults.push({Expected: expected, Actual: actual, Description: '2d2+d3'});
   } catch(e){testResults.push({Error: e, Description: '2d2+d3'});}

   try{
   actual = Statistics.useBruteForce(new DicePool('3d2!+1d4!'), 0);
   expected = Statistics.useNonDroppingAlgorithm(new DicePool('3d2!+1d4!'), 0);
   //useBruteForce is complicated. useNonDroppingAlgorithm is easy to prove correct for all cases
   testResults.push({Expected: expected, Actual: actual, Description: '3d2!+1d4! explodeCount 0'});
   } catch(e){testResults.push({Error: e, Description: '3d2!+1d4! explodeCount 0'});}

   try{
   actual = Statistics.useBruteForce(new DicePool('3d2!+1d4!'), 1);
   expected = Statistics.useNonDroppingAlgorithm(new DicePool('3d2!+1d4!'), 1);
   testResults.push({Expected: expected, Actual: actual, Description: '3d2!+1d4! explodeCount 1'});
   } catch(e){testResults.push({Error: e, Description: '3d2!+1d4! explodeCount 1'});}

   TesterUtility.displayResults('Statistics Statistics.useBruteForce', testResults, isFirst);
};
Tester.Statistics.useNonDroppingAlgorithm = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = Statistics.useNonDroppingAlgorithm(new DicePool('2d6'));
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
   actual = Statistics.useNonDroppingAlgorithm(new DicePool('1d3!'), 1);
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
   actual = Statistics.useNonDroppingAlgorithm(new DicePool('-d3'));
   expected = [
      {result: -3, frequency: 1},
      {result: -2, frequency: 1},
      {result: -1, frequency: 1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '-d3'});
   } catch(e){testResults.push({Error: e, Description: '-d3'});}

   TesterUtility.displayResults('Statistics Statistics.useNonDroppingAlgorithm', testResults, isFirst);
};
