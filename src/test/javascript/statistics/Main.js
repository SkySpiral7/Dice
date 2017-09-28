'use strict';
TestSuite.Statistics = {};
TestSuite.Statistics.calculateAggregates = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   Statistics.calculateAggregates(5);
   TestRunner.failedToThrow(testResults, 'Wrong type arg');
   }
   catch(e)
   {
      testResults.push({Expected: getError(Validation.requireInstanceOf, [Array, 5]),
         Actual: e, Description: 'Wrong type arg'});
   }

   try{
   Statistics.calculateAggregates([]);
   TestRunner.failedToThrow(testResults, 'Empty array arg');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('stats must not be an empty array'),
         Actual: e, Description: 'Empty array arg'});
   }

   try{
   actual = Statistics.calculateAggregates(Statistics.calculateDiceSums(new DicePool('2d6')));
   expected = {minimum: 2, maximum: 12, mean: 7, standardDeviation: Math.sqrt(210 / 36)};  //reduced: 35/6
   testResults.push({Expected: expected, Actual: actual, Description: '2d6'});
   } catch(e){testResults.push({Error: e, Description: '2d6'});}
   //TODO: test: probability

   return TestRunner.displayResults('Statistics Statistics.calculateAggregates', testResults, isFirst);
};
TestSuite.Statistics.calculateDiceSums = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected, diceGroup;

   try{
   diceGroup = new DicePool('2d6').toJSON().pool[0];
   actual = Statistics.calculateDiceSums(new DicePool('2d6'));
   expected = Algorithm.nonDropping(diceGroup, DiceExpression.everyValue(diceGroup));
   testResults.push({Expected: expected, Actual: actual, Description: '2d6'});
   } catch(e){testResults.push({Error: e, Description: '2d6'});}

   try{
   diceGroup = new DicePool('2d2 drop 1').toJSON().pool[0];
   actual = Statistics.calculateDiceSums(new DicePool('2d2 drop 1'));
   expected = Algorithm.singleDrop(diceGroup, DiceExpression.everyValue(diceGroup));
   testResults.push({Expected: expected, Actual: actual, Description: '2d2 DropLowest 1'});
   } catch(e){testResults.push({Error: e, Description: '2d2 DropLowest 1'});}

   return TestRunner.displayResults('Statistics Statistics.calculateDiceSums', testResults, isFirst);
};
TestSuite.Statistics.combineResults = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected, stats, input;

   try{
   stats = Statistics.calculateDiceSums(new DicePool('1d2'));
   //Statistics.determineProbability(stats);  //no need. see DiceExpression for more tests
   actual = Statistics.combineResults([stats, JSON.clone(stats)], false);
   expected = [
      {result: 2, frequency: 1},
      {result: 3, frequency: 2},
      {result: 4, frequency: 1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Happy path: 2d2 false'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path: 2d2 false'});}

   try{
   stats = [
      {result: 1, probability: (1/4)},  //unfair die
      {result: 2, probability: (3/4)}
   ];
   input = [stats];
   stats = [
      {result: 1, probability: (1/2)},  //fair die
      {result: 2, probability: (1/2)}
   ];
   input.push(stats);
   actual = Statistics.combineResults(input, true);
   expected = [
      {result: 2, probability: ((1/4)*(1/2))},
      {result: 3, probability: ((1/4)*(1/2) + (3/4)*(1/2))},  //1+2 or 2+1
      {result: 4, probability: ((3/4)*(1/2))}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Custom results probability'});
   } catch(e){testResults.push({Error: e, Description: 'Custom results probability'});}

   try{
   input = [Statistics.calculateDiceSums(new DicePool('1d2')), Statistics.calculateDiceSums(new DicePool('1d2')), Statistics.calculateDiceSums(new DicePool('1d2'))];
   actual = Statistics.combineResults(input, false);
   expected = [
      {result: 3, frequency: 1},
      {result: 4, frequency: 3},  //1+1+2, 1+2+1, 2+1+1
      {result: 5, frequency: 3},  //1+2+2, 2+1+2, 2+2+1
      {result: 6, frequency: 1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '3d2 false'});
   } catch(e){testResults.push({Error: e, Description: '3d2 false'});}

   return TestRunner.displayResults('Statistics Statistics.combineResults', testResults, isFirst);
};
TestSuite.Statistics.determineProbability = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = Statistics.calculateDiceSums(new DicePool('2d6'));
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

   return TestRunner.displayResults('Statistics Statistics.determineProbability', testResults, isFirst);
};
TestSuite.Statistics.passFailBinomial = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = Statistics.passFailBinomial(new Die(4), 1, '>=3', '===1');
   expected = [
      {result: -1, frequency: 1},
      {result: 0, frequency: 1},
      {result: 1, frequency: 2}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Happy path both'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path both'});}

   try{
   actual = Statistics.passFailBinomial(new Die(2), 2, '===2');
   expected = [
      {result: 0, frequency: 1},
      {result: 1, frequency: 2},
      {result: 2, frequency: 1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Happy path passCriteria'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path passCriteria'});}

   try{
   actual = Statistics.passFailBinomial(new Die(4), 1, null, '===1');
   expected = [
      {result: -1, frequency: 1},
      {result: 0, frequency: 3}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: 'Happy path failCriteria'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path failCriteria'});}

   try{
   Statistics.passFailBinomial(4, 1, '>=3', '===1');
   TestRunner.failedToThrow(testResults, 'Invalid die');
   }
   catch(e)
   {
      testResults.push({Expected: getError(Validation.requireInstanceOf, [Die, 4]),
         Actual: e, Description: 'Invalid die'});
   }

   try{
   Statistics.passFailBinomial(new Die(4), -1, '>=3', '===1');
   TestRunner.failedToThrow(testResults, 'Invalid diceCount');
   }
   catch(e)
   {
      testResults.push({Expected: getError(Validation.requireNaturalNumber, [-1]),
         Actual: e, Description: 'Invalid diceCount'});
   }

   try{
   Statistics.passFailBinomial(new Die(4), 1, 3, '===1');
   TestRunner.failedToThrow(testResults, 'Invalid passCriteria');
   }
   catch(e)
   {
      testResults.push({Expected: getError(Validation.requireTypeOf, ['string', 3]),
         Actual: e, Description: 'Invalid passCriteria'});
   }

   try{
   Statistics.passFailBinomial(new Die(4), 1, '>=3', 1);
   TestRunner.failedToThrow(testResults, 'Invalid failCriteria');
   }
   catch(e)
   {
      testResults.push({Expected: getError(Validation.requireTypeOf, ['string', 1]),
         Actual: e, Description: 'Invalid failCriteria'});
   }

   try{
   Statistics.passFailBinomial(new Die(4), 1);
   TestRunner.failedToThrow(testResults, 'Missing both criteria');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('Required: passCriteria and/or failCriteria'),
         Actual: e, Description: 'Missing both criteria'});
   }

   try{
   Statistics.passFailBinomial(new Die('1d4!'), 1, '>=3', '===1');
   TestRunner.failedToThrow(testResults, 'Can\'t explode');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('Exploding not supported: ' +
         '{"sideCount":4,"constantModifier":0,"isFudgeDie":false,"explodeType":"{Normal}"}'),
         Actual: e, Description: 'Can\'t explode'});
   }

   try{
   actual = Statistics.passFailBinomial(new Die('1d3r1'), 1, '===3');
   expected = [
      {result: 0, frequency: 1},
      {result: 1, frequency: 1}
   ];
   //more of a side effect than a requirement
   testResults.push({Expected: expected, Actual: actual, Description: 'Reroll allowed'});
   } catch(e){testResults.push({Error: e, Description: 'Reroll allowed'});}

   return TestRunner.displayResults('Statistics Statistics.passFailBinomial', testResults, isFirst);
};
