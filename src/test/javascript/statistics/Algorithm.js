'use strict';
TestSuite.Algorithm = {};
TestSuite.Algorithm.analyze = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = Algorithm.analyze(new DicePool('2d6').toJSON().pool[0]);
   expected = Algorithm.useNonDroppingAlgorithm;
   testResults.push({Expected: expected, Actual: actual, Description: '2d6'});
   } catch(e){testResults.push({Error: e, Description: '2d6'});}

   try{
   actual = Algorithm.analyze(new DicePool('2d2 drop 1').toJSON().pool[0]);
   expected = Algorithm.dropLowest;
   testResults.push({Expected: expected, Actual: actual, Description: '2d2 DropLowest 1'});
   } catch(e){testResults.push({Error: e, Description: '2d2 DropLowest 1'});}

   try{
   actual = Algorithm.analyze(new DicePool('2d2!p drop 1').toJSON().pool[0]);
   expected = Algorithm.useBruteForce;
   testResults.push({Expected: expected, Actual: actual, Description: '2d2!p DropLowest 1'});
   } catch(e){testResults.push({Error: e, Description: '2d2!p DropLowest 1'});}

   try{
   actual = Algorithm.analyze(new DicePool('4d2 keep 3').toJSON().pool[0]);
   expected = Algorithm.dropLowest;
   testResults.push({Expected: expected, Actual: actual, Description: '4d2 keep 3'});
   } catch(e){testResults.push({Error: e, Description: '4d2 keep 3'});}

   try{
   actual = Algorithm.analyze(new DicePool('4d2!! keep 3').toJSON().pool[0]);
   expected = Algorithm.dropLowest;
   testResults.push({Expected: expected, Actual: actual, Description: '4d2!! keep 3'});
   } catch(e){testResults.push({Error: e, Description: '4d2!! keep 3'});}

   try{
   actual = Algorithm.analyze(new DicePool('4d2! keep 3').toJSON().pool[0]);
   expected = Algorithm.useBruteForce;
   testResults.push({Expected: expected, Actual: actual, Description: '4d2! keep 3'});
   } catch(e){testResults.push({Error: e, Description: '4d2! keep 3'});}

   return TestRunner.displayResults('Algorithm Algorithm.analyze', testResults, isFirst);
};
TestSuite.Algorithm.useBruteForce = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected, diceGroup, everyDieValue;

   try{
   diceGroup = new DicePool('2d2').toJSON().pool[0];
   actual = Algorithm.useBruteForce(diceGroup, DiceExpression.everyValue(diceGroup));
   expected = [
      {result: 2, frequency: 1},  //1+1
      {result: 3, frequency: 2},  //1+2, 2+1
      {result: 4, frequency: 1}   //2+2
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '2d2'});
   } catch(e){testResults.push({Error: e, Description: '2d2'});}

   try{
   diceGroup = new DicePool('-d3').toJSON().pool[0];
   actual = Algorithm.useBruteForce(diceGroup, DiceExpression.everyValue(diceGroup));
   expected = [
      {result: -3, frequency: 1},
      {result: -2, frequency: 1},
      {result: -1, frequency: 1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '-d3'});
   } catch(e){testResults.push({Error: e, Description: '-d3'});}

   try{
   diceGroup = new DicePool('3d2').toJSON().pool[0];
   actual = Algorithm.useBruteForce(diceGroup, DiceExpression.everyValue(diceGroup));
   expected = [
      {result: 3, frequency: 1},  //1+1+1
      {result: 4, frequency: 3},  //1+1+2, 1+2+1, 2+1+1
      {result: 5, frequency: 3},  //2+2+1, 2+1+2, 1+2+2
      {result: 6, frequency: 1}   //2+2+2
   ];
   //need to test more than 2 dice for useBruteForce
   testResults.push({Expected: expected, Actual: actual, Description: '3d2'});
   } catch(e){testResults.push({Error: e, Description: '3d2'});}

   try{
   diceGroup = new DicePool('2d6').toJSON().pool[0];
   actual = Algorithm.useBruteForce(diceGroup, DiceExpression.everyValue(diceGroup));
   expected = [  //I used 2d6 because the results are well known
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
   diceGroup = new DicePool('2d2!').toJSON().pool[0];
   everyDieValue = [
      {exponent: [1], coefficient: (1/2)},
      {exponent: [1,2], coefficient: Math.pow((1/2), 2)},
      {exponent: [2,2], coefficient: Math.pow((1/2), 2)}  //only let it explode once
   ];
   actual = Algorithm.useBruteForce(diceGroup, everyDieValue);
   expected = [
      {result: 2, probability: ((1/2)*(1/2))},  //1+1
      {result: 4, probability: ((1/2)*(1/4)*2)},  //1+(2+1), (2+1)+1
      {result: 5, probability: ((1/2)*(1/4)*2)},  //1+(2+2), (2+2)+1
      {result: 6, probability: ((1/4)*(1/4))},  //(2+1)+(2+1)
      {result: 7, probability: ((1/4)*(1/4)*2)},  //(2+2)+(2+1), (2+1)+(2+2)
      {result: 8, probability: ((1/4)*(1/4))}  //(2+2)+(2+2)
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '2d2! explodeCount 1'});
   } catch(e){testResults.push({Error: e, Description: '2d2! explodeCount 1'});}

   try{
   diceGroup = new DicePool('1d3!').toJSON().pool[0];
   everyDieValue = [
      {exponent: [1], coefficient: (1/3)},
      {exponent: [2], coefficient: (1/3)},
      {exponent: [1,3], coefficient: ((1/3) * (1/3))},
      {exponent: [2,3], coefficient: ((1/3) * (1/3))},
      {exponent: [3,3], coefficient: ((1/3) * (1/3))}  //only let it explode once
   ];
   actual = Algorithm.useBruteForce(diceGroup, everyDieValue);
   expected = [
      {result: 1, probability: (1/3)},
      {result: 2, probability: (1/3)},
      {result: (3+1), probability: ((1/3) * (1/3))},
      {result: (3+2), probability: ((1/3) * (1/3))},
      {result: (3+3), probability: ((1/3) * (1/3))}  //only let it explode once
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '1d3! explode: 1'});
   } catch(e){testResults.push({Error: e, Description: '1d3! explode: 1'});}

   try{
   diceGroup = new DicePool('2d2 drop 1').toJSON().pool[0];
   actual = Algorithm.useBruteForce(diceGroup, DiceExpression.everyValue(diceGroup));
   expected = [
      {result: 1, frequency: 1},  //1+1
      {result: 2, frequency: 3}  //1+2, 2+1, 2+2
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '2d2 DropLowest 1'});
   } catch(e){testResults.push({Error: e, Description: '2d2 DropLowest 1'});}

   try{
   diceGroup = new DicePool('2d2!! drop 1').toJSON().pool[0];
   everyDieValue = [
      {exponent: [1], coefficient: (1/2)},
      {exponent: [1+2], coefficient: Math.pow((1/2), 2)},
      {exponent: [2+2], coefficient: Math.pow((1/2), 2)}  //only let it explode once
   ];
   actual = Algorithm.useBruteForce(diceGroup, everyDieValue);
   expected = [
      //all: 1+1, 1+3, 1+4, 3+1, 3+3, 3+4, 4+1, 4+3, 4+4
      //note that 1 is 1/2 and 3 and 4 are (1/2)*(1/2)=(1/4)
      {result: 1, probability: ((1/2)*(1/2))},  //1+1
      {result: 3, probability: ((1/2)*(1/4)*2 + (1/4)*(1/4))},  //1+3, 3+1, 3+3
      {result: 4, probability: ((1/2)*(1/4)*2 + (1/4)*(1/4)*3)}  //1+4, 3+4, 4+1, 4+3, 4+4
   ];
   //this is the same as 2d2!! KeepHighest 1 explodeCount 1
   testResults.push({Expected: expected, Actual: actual, Description: '2d2!! DropLowest 1 explodeCount 1'});
   } catch(e){testResults.push({Error: e, Description: '2d2!! DropLowest 1 explodeCount 1'});}

   try{
   diceGroup = new DicePool('2d2! drop 1').toJSON().pool[0];
   everyDieValue = [
      {exponent: [1], coefficient: (1/2)},
      {exponent: [1,2], coefficient: Math.pow((1/2), 2)},
      {exponent: [2,2], coefficient: Math.pow((1/2), 2)}  //only let it explode once
   ];
   actual = Algorithm.useBruteForce(diceGroup, everyDieValue);
   expected = [
      //all: 1+1, 1+(2+1), 1+(2+2), (2+1)+1, (2+1)+(2+1), (2+1)+(2+2), (2+2)+1, (2+2)+(2+1), (2+2)+(2+2)
      {result: 1, probability: ((1/2)*(1/2))},  //1+1
      {result: 3, probability: ((1/2)*(1/4)*2)},  //1+(2+1), (2+1)+1
      {result: 4, probability: ((1/2)*(1/4)*2)},  //1+(2+2), (2+2)+1
      {result: 5, probability: ((1/4)*(1/4))},  //(2+1)+(2+1)
      {result: 6, probability: ((1/4)*(1/4)*3)}  //(2+1)+(2+2), (2+2)+(2+1), (2+2)+(2+2)
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '2d2! DropLowest 1 explodeCount 1'});
   } catch(e){testResults.push({Error: e, Description: '2d2! DropLowest 1 explodeCount 1'});}

   try{
   diceGroup = new DicePool('2d2!p drop 1').toJSON().pool[0];
   everyDieValue = [
      {exponent: [1], coefficient: (1/2)},
      {exponent: [0,2], coefficient: Math.pow((1/2), 2)},
      {exponent: [1,2], coefficient: Math.pow((1/2), 2)}  //only let it explode once
   ];
   actual = Algorithm.useBruteForce(diceGroup, everyDieValue);
   expected = [
      //all: 1+1, 1+(2+0), 1+(2+1), (2+0)+1, (2+0)+(2+0), (2+0)+(2+1), (2+1)+1, (2+1)+(2+0), (2+1)+(2+1)
      {result: 1, probability: ((1/2)*(1/2))},  //1+1
      {result: 3, probability: ((1/2)*(1/4)*4)},  //1+(2+0), 1+(2+1), (2+0)+1, (2+1)+1
      {result: 4, probability: ((1/4)*(1/4))},  //(2+0)+(2+0)
      {result: 5, probability: ((1/4)*(1/4)*3)}  //(2+0)+(2+1), (2+1)+(2+0), (2+1)+(2+1)
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '2d2!p DropLowest 1 explodeCount 1'});
   } catch(e){testResults.push({Error: e, Description: '2d2!p DropLowest 1 explodeCount 1'});}

   try{
   diceGroup = new DicePool('2d2! keep 1').toJSON().pool[0];
   everyDieValue = [
      {exponent: [1], coefficient: (1/2)},
      {exponent: [1,2], coefficient: Math.pow((1/2), 2)},
      {exponent: [2,2], coefficient: Math.pow((1/2), 2)}  //only let it explode once
   ];
   actual = Algorithm.useBruteForce(diceGroup, everyDieValue);
   expected = [
      //all: 1+1, 1+(2+1), 1+(2+2), (2+1)+1, (2+1)+(2+1), (2+1)+(2+2), (2+2)+1, (2+2)+(2+1), (2+2)+(2+2)
      {result: 1, probability: ((1/2)*(1/2))},  //1+1
      {result: 2, probability: ((1/2)*(1/4)*4 + (1/4)*(1/4)*4)}  //the rest
   ];
   //this is the same as 2d2 KeepHighest 1 determineProbability
   testResults.push({Expected: expected, Actual: actual, Description: '2d2! KeepHighest 1 explodeCount 1'});
   } catch(e){testResults.push({Error: e, Description: '2d2! KeepHighest 1 explodeCount 1'});}

   try{
   diceGroup = {die: new Die({sideCount: 2, constantModifier: 10}), dieCount: 2, areDiceNegative: false};
   everyDieValue = DiceExpression.everyValue(diceGroup);
   actual = Algorithm.useBruteForce(diceGroup, everyDieValue);
   expected = [
      {result: 22, frequency: 1},  //11+11
      {result: 23, frequency: 2},  //11+12, 12+11
      {result: 24, frequency: 1}   //12+12
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '2d2 + constantModifier 10'});
   } catch(e){testResults.push({Error: e, Description: '2d2 + constantModifier 10'});}

   return TestRunner.displayResults('Algorithm Algorithm.useBruteForce', testResults, isFirst);
};
TestSuite.Algorithm.useNonDroppingAlgorithm = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected, diceGroup, everyDieValue;
   var testStrings = ['2d6', '-d3', '1d3!r2', '1d3!pr1', '2d2!!r1'];

   for (var i = 0; i < testStrings.length; ++i)
   {
      try{
      diceGroup = new DicePool(testStrings[i]).toJSON().pool[0];
      everyDieValue = DiceExpression.everyValue(diceGroup);
      actual = Algorithm.useNonDroppingAlgorithm(diceGroup, JSON.clone(everyDieValue));
      expected = Algorithm.useBruteForce(diceGroup, JSON.clone(everyDieValue));
      testResults.push({Expected: expected, Actual: actual, Description: testStrings[i]});
      } catch(e){testResults.push({Error: e, Description: testStrings[i]});}
   }

   try{
   diceGroup = {die: new Die({sideCount: 2, constantModifier: 10}), dieCount: 2, areDiceNegative: false};
   everyDieValue = DiceExpression.everyValue(diceGroup);
   actual = Algorithm.useNonDroppingAlgorithm(diceGroup, JSON.clone(everyDieValue));
   expected = Algorithm.useBruteForce(diceGroup, JSON.clone(everyDieValue));
   testResults.push({Expected: expected, Actual: actual, Description: '2d2 + constantModifier 10'});
   } catch(e){testResults.push({Error: e, Description: '2d2 + constantModifier 10'});}

   return TestRunner.displayResults('Algorithm Algorithm.useNonDroppingAlgorithm', testResults, isFirst);
};
TestSuite.Algorithm.dropLowest = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected, diceGroup, everyDieValue;
   var testStrings = ['3d6', '-2d3', '2d3!r2', '2d2!!r1'];

   for (var i = 0; i < testStrings.length; ++i)
   {
      try{
         diceGroup = new DicePool(testStrings[i] + ' drop lowest').toJSON().pool[0];
         everyDieValue = DiceExpression.everyValue(diceGroup);
         actual = Algorithm.dropLowest(diceGroup, JSON.clone(everyDieValue));
         expected = Algorithm.useBruteForce(diceGroup, JSON.clone(everyDieValue));
         testResults.push({Expected: expected, Actual: actual, Description: testStrings[i]});
      } catch(e){testResults.push({Error: e, Description: testStrings[i]});}
   }

   try{
      diceGroup = {die: new Die({sideCount: 2, constantModifier: 10}), dieCount: 2,
         dropKeepType: DicePool.dropKeepTypes.DropLowest, dropKeepCount: 1,
         areDiceNegative: false};
      everyDieValue = DiceExpression.everyValue(diceGroup);
      actual = Algorithm.dropLowest(diceGroup, JSON.clone(everyDieValue));
      expected = Algorithm.useBruteForce(diceGroup, JSON.clone(everyDieValue));
      testResults.push({Expected: expected, Actual: actual, Description: '2d2 + constantModifier 10'});
   } catch(e){testResults.push({Error: e, Description: '2d2 + constantModifier 10'});}

   return TestRunner.displayResults('Algorithm Algorithm.dropLowest', testResults, isFirst);
};
/**
Stress tests:
the largest values of dieCount and sides that will complete in less than 30 seconds (because that's when Chrome kills it)
all algorithms must beat brute force which can do everything
last tested 2017-09-24

runStressTest(Algorithm.useNonDroppingAlgorithm, new DicePool('261d10'));
   vs runStressTest(Algorithm.useBruteForce, new DicePool('6d10'));
runStressTest(Algorithm.useNonDroppingAlgorithm, new DicePool('3d1574'));
   vs runStressTest(Algorithm.useBruteForce, new DicePool('3d199'));

runStressTest(Algorithm.dropLowest, new DicePool('180d10 drop lowest'));
   vs runStressTest(Algorithm.useBruteForce, new DicePool('6d10 drop lowest'));
runStressTest(Algorithm.dropLowest, new DicePool('3d265 drop lowest'));
   vs runStressTest(Algorithm.useBruteForce, new DicePool('3d198 drop lowest'));
*/
function runStressTest(algorithm, dicePool)
{
   var diceGroup = dicePool.toJSON().pool[0];
   var start = Date.now();
   algorithm(diceGroup, DiceExpression.everyValue(diceGroup));
   var end = Date.now();
   //The output will be obviously wrong if it takes a minute or more.
   return new Date(end - start).toISOString().replace('1970-01-01T00:00:', '').replace('Z', '') + ' seconds';
}
