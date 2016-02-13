'use strict';
Tester.Statistics = {};
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

   TesterUtility.displayResults('Statistics Statistics.usePolynomial', testResults, isFirst);
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
