'use strict';
TestSuite.Statistics = {};
TestSuite.Statistics.calculateAggregates = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], actual, expected;

   try{
   Statistics.calculateAggregates(5);
   TestRunner.failedToThrow(assertions, 'Wrong type arg');
   }
   catch(e)
   {
      assertions.push({Expected: getError(Validation.requireInstanceOf, [Array, 5]),
         Actual: e, Description: 'Wrong type arg'});
   }

   try{
   Statistics.calculateAggregates([]);
   TestRunner.failedToThrow(assertions, 'Empty array arg');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('stats must not be an empty array'),
         Actual: e, Description: 'Empty array arg'});
   }

   try{
   actual = Statistics.calculateAggregates(Statistics.calculateDiceSums(new DicePool('2d6')));
   expected = {minimum: 2, maximum: 12, mean: 7, standardDeviation: Math.sqrt(210 / 36)};  //reduced: 35/6
   assertions.push({Expected: expected, Actual: actual, Description: '2d6'});
   } catch(e){assertions.push({Error: e, Description: '2d6'});}
   //TODO: test: probability

   return TestRunner.displayResults('Statistics Statistics.calculateAggregates', assertions, testState);
};
TestSuite.Statistics.calculateDiceSums = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], actual, expected, diceGroup;

   try{
   diceGroup = new DicePool('2d6').toJSON().pool[0];
   actual = Statistics.calculateDiceSums(new DicePool('2d6'));
   expected = Algorithm.nonDropping(diceGroup, DiceExpression.everyValue(diceGroup));
   assertions.push({Expected: expected, Actual: actual, Description: '2d6'});
   } catch(e){assertions.push({Error: e, Description: '2d6'});}

   try{
   diceGroup = new DicePool('2d2 drop 1').toJSON().pool[0];
   actual = Statistics.calculateDiceSums(new DicePool('2d2 drop 1'));
   expected = Algorithm.singleDrop(diceGroup, DiceExpression.everyValue(diceGroup));
   assertions.push({Expected: expected, Actual: actual, Description: '2d2 DropLowest 1'});
   } catch(e){assertions.push({Error: e, Description: '2d2 DropLowest 1'});}

   return TestRunner.displayResults('Statistics Statistics.calculateDiceSums', assertions, testState);
};
TestSuite.Statistics.combineResults = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], actual, expected, stats, input;

   try{
   stats = Statistics.calculateDiceSums(new DicePool('1d2'));
   //Statistics.determineProbability(stats);  //no need. see DiceExpression for more tests
   actual = Statistics.combineResults([stats, JSON.clone(stats)], false);
   expected = [
      {result: 2, frequency: 1},
      {result: 3, frequency: 2},
      {result: 4, frequency: 1}
   ];
   assertions.push({Expected: expected, Actual: actual, Description: 'Happy path: 2d2 false'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path: 2d2 false'});}

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
   assertions.push({Expected: expected, Actual: actual, Description: 'Custom results probability'});
   } catch(e){assertions.push({Error: e, Description: 'Custom results probability'});}

   try{
   input = [Statistics.calculateDiceSums(new DicePool('1d2')), Statistics.calculateDiceSums(new DicePool('1d2')), Statistics.calculateDiceSums(new DicePool('1d2'))];
   actual = Statistics.combineResults(input, false);
   expected = [
      {result: 3, frequency: 1},
      {result: 4, frequency: 3},  //1+1+2, 1+2+1, 2+1+1
      {result: 5, frequency: 3},  //1+2+2, 2+1+2, 2+2+1
      {result: 6, frequency: 1}
   ];
   assertions.push({Expected: expected, Actual: actual, Description: '3d2 false'});
   } catch(e){assertions.push({Error: e, Description: '3d2 false'});}

   return TestRunner.displayResults('Statistics Statistics.combineResults', assertions, testState);
};
TestSuite.Statistics.determineProbability = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], actual, expected;

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
   assertions.push({Expected: expected, Actual: actual, Description: '2d6'});
   } catch(e){assertions.push({Error: e, Description: '2d6'});}

   return TestRunner.displayResults('Statistics Statistics.determineProbability', assertions, testState);
};
TestSuite.Statistics.passFailBinomial = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], actual, expected;

   try{
   actual = Statistics.passFailBinomial(new Die(4), 1, '>=3', '===1');
   expected = [
      {result: -1, frequency: 1},
      {result: 0, frequency: 1},
      {result: 1, frequency: 2}
   ];
   assertions.push({Expected: expected, Actual: actual, Description: 'Happy path both'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path both'});}

   try{
   actual = Statistics.passFailBinomial(new Die(2), 2, '===2');
   expected = [
      {result: 0, frequency: 1},
      {result: 1, frequency: 2},
      {result: 2, frequency: 1}
   ];
   assertions.push({Expected: expected, Actual: actual, Description: 'Happy path passCriteria'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path passCriteria'});}

   try{
   actual = Statistics.passFailBinomial(new Die(4), 1, null, '===1');
   expected = [
      {result: -1, frequency: 1},
      {result: 0, frequency: 3}
   ];
   assertions.push({Expected: expected, Actual: actual, Description: 'Happy path failCriteria'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path failCriteria'});}

   try{
   Statistics.passFailBinomial(4, 1, '>=3', '===1');
   TestRunner.failedToThrow(assertions, 'Invalid die');
   }
   catch(e)
   {
      assertions.push({Expected: getError(Validation.requireInstanceOf, [Die, 4]),
         Actual: e, Description: 'Invalid die'});
   }

   try{
   Statistics.passFailBinomial(new Die(4), -1, '>=3', '===1');
   TestRunner.failedToThrow(assertions, 'Invalid diceCount');
   }
   catch(e)
   {
      assertions.push({Expected: getError(Validation.requireNaturalNumber, [-1]),
         Actual: e, Description: 'Invalid diceCount'});
   }

   try{
   Statistics.passFailBinomial(new Die(4), 1, 3, '===1');
   TestRunner.failedToThrow(assertions, 'Invalid passCriteria');
   }
   catch(e)
   {
      assertions.push({Expected: getError(Validation.requireTypeOf, ['string', 3]),
         Actual: e, Description: 'Invalid passCriteria'});
   }

   try{
   Statistics.passFailBinomial(new Die(4), 1, '>=3', 1);
   TestRunner.failedToThrow(assertions, 'Invalid failCriteria');
   }
   catch(e)
   {
      assertions.push({Expected: getError(Validation.requireTypeOf, ['string', 1]),
         Actual: e, Description: 'Invalid failCriteria'});
   }

   try{
   Statistics.passFailBinomial(new Die(4), 1);
   TestRunner.failedToThrow(assertions, 'Missing both criteria');
   }
   catch(e)
   {
      assertions.push({Expected: new Error('Required: passCriteria and/or failCriteria'),
         Actual: e, Description: 'Missing both criteria'});
   }

   try{
   Statistics.passFailBinomial(new Die('1d4!'), 1, '>=3', '===1');
   TestRunner.failedToThrow(assertions, 'Can\'t explode');
   }
   catch(e)
   {
      assertions.push({Expected: new Error('Exploding not supported: ' +
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
   assertions.push({Expected: expected, Actual: actual, Description: 'Reroll allowed'});
   } catch(e){assertions.push({Error: e, Description: 'Reroll allowed'});}

   return TestRunner.displayResults('Statistics Statistics.passFailBinomial', assertions, testState);
};
