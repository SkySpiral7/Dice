'use strict';
TestSuite.Algorithm = {};
TestSuite.Algorithm.analyze = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = Algorithm.analyze(new DicePool('2d6').toJSON().pool[0]);
   expected = Algorithm.nonDropping;
   testResults.push({Expected: expected, Actual: actual, Description: '2d6'});
   } catch(e){testResults.push({Error: e, Description: '2d6'});}

   try{
   actual = Algorithm.analyze(new DicePool('2d2 drop Lowest 1').toJSON().pool[0]);
   expected = Algorithm.singleDrop;
   testResults.push({Expected: expected, Actual: actual, Description: '2d2 Drop Lowest 1'});
   } catch(e){testResults.push({Error: e, Description: '2d2 Drop Lowest 1'});}

   try{
   actual = Algorithm.analyze(new DicePool('2d2 drop highest 1').toJSON().pool[0]);
   expected = Algorithm.singleDrop;
   testResults.push({Expected: expected, Actual: actual, Description: '2d2 Drop highest 1'});
   } catch(e){testResults.push({Error: e, Description: '2d2 Drop highest 1'});}

   try{
   actual = Algorithm.analyze(new DicePool('2d2!p drop Lowest 1').toJSON().pool[0]);
   expected = Algorithm.bruteForce;
   testResults.push({Expected: expected, Actual: actual, Description: '2d2!p Drop Lowest 1'});
   } catch(e){testResults.push({Error: e, Description: '2d2!p Drop Lowest 1'});}

   try{
   actual = Algorithm.analyze(new DicePool('4d2 keep highest 3').toJSON().pool[0]);
   expected = Algorithm.singleDrop;
   testResults.push({Expected: expected, Actual: actual, Description: '4d2 keep highest 3'});
   } catch(e){testResults.push({Error: e, Description: '4d2 keep highest 3'});}

   try{
   actual = Algorithm.analyze(new DicePool('4d2 keep lowest 3').toJSON().pool[0]);
   expected = Algorithm.singleDrop;
   testResults.push({Expected: expected, Actual: actual, Description: '4d2 keep lowest 3'});
   } catch(e){testResults.push({Error: e, Description: '4d2 keep lowest 3'});}

   try{
   actual = Algorithm.analyze(new DicePool('4d2!! keep highest 3').toJSON().pool[0]);
   expected = Algorithm.singleDrop;
   testResults.push({Expected: expected, Actual: actual, Description: '4d2!! keep highest 3'});
   } catch(e){testResults.push({Error: e, Description: '4d2!! keep highest 3'});}

   try{
   actual = Algorithm.analyze(new DicePool('4d2!! keep lowest 3').toJSON().pool[0]);
   expected = Algorithm.singleDrop;
   testResults.push({Expected: expected, Actual: actual, Description: '4d2!! keep lowest 3'});
   } catch(e){testResults.push({Error: e, Description: '4d2!! keep lowest 3'});}

   try{
   actual = Algorithm.analyze(new DicePool('4d2! keep highest 3').toJSON().pool[0]);
   expected = Algorithm.bruteForce;
   testResults.push({Expected: expected, Actual: actual, Description: '4d2! keep highest 3'});
   } catch(e){testResults.push({Error: e, Description: '4d2! keep highest 3'});}

   try{
   actual = Algorithm.analyze(new DicePool('4d2! keep lowest 3').toJSON().pool[0]);
   expected = Algorithm.bruteForce;
   testResults.push({Expected: expected, Actual: actual, Description: '4d2! keep lowest 3'});
   } catch(e){testResults.push({Error: e, Description: '4d2! keep lowest 3'});}

   return TestRunner.displayResults('Algorithm Algorithm.analyze', testResults, isFirst);
};
TestSuite.Algorithm.bruteForce = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected, diceGroup, everyDieValue;

   try{
   diceGroup = new DicePool('2d2').toJSON().pool[0];
   actual = Algorithm.bruteForce(diceGroup, DiceExpression.everyValue(diceGroup));
   expected = [
      {result: 2, frequency: 1},  //1+1
      {result: 3, frequency: 2},  //1+2, 2+1
      {result: 4, frequency: 1}   //2+2
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '2d2'});
   } catch(e){testResults.push({Error: e, Description: '2d2'});}

   try{
   diceGroup = new DicePool('-d3').toJSON().pool[0];
   actual = Algorithm.bruteForce(diceGroup, DiceExpression.everyValue(diceGroup));
   expected = [
      {result: -3, frequency: 1},
      {result: -2, frequency: 1},
      {result: -1, frequency: 1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '-d3'});
   } catch(e){testResults.push({Error: e, Description: '-d3'});}

   try{
   diceGroup = new DicePool('3d2').toJSON().pool[0];
   actual = Algorithm.bruteForce(diceGroup, DiceExpression.everyValue(diceGroup));
   expected = [
      {result: 3, frequency: 1},  //1+1+1
      {result: 4, frequency: 3},  //1+1+2, 1+2+1, 2+1+1
      {result: 5, frequency: 3},  //2+2+1, 2+1+2, 1+2+2
      {result: 6, frequency: 1}   //2+2+2
   ];
   //Handling more than 2 dice is an edge case for bruteForce
   testResults.push({Expected: expected, Actual: actual, Description: '3d2'});
   } catch(e){testResults.push({Error: e, Description: '3d2'});}

   try{
   diceGroup = new DicePool('2d6').toJSON().pool[0];
   actual = Algorithm.bruteForce(diceGroup, DiceExpression.everyValue(diceGroup));
/*
    1  2  3  4  5  6
  +-----------------
1 | 2  3  4  5  6  7
2 | 3  4  5  6  7  8
3 | 4  5  6  7  8  9
4 | 5  6  7  8  9 10
5 | 6  7  8  9 10 11
6 | 7  8  9 10 11 12
*/
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
   actual = Algorithm.bruteForce(diceGroup, everyDieValue);
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
   actual = Algorithm.bruteForce(diceGroup, everyDieValue);
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
   actual = Algorithm.bruteForce(diceGroup, DiceExpression.everyValue(diceGroup));
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
   actual = Algorithm.bruteForce(diceGroup, everyDieValue);
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
   actual = Algorithm.bruteForce(diceGroup, everyDieValue);
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
   actual = Algorithm.bruteForce(diceGroup, everyDieValue);
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
   actual = Algorithm.bruteForce(diceGroup, everyDieValue);
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
   actual = Algorithm.bruteForce(diceGroup, everyDieValue);
   expected = [
      {result: 22, frequency: 1},  //11+11
      {result: 23, frequency: 2},  //11+12, 12+11
      {result: 24, frequency: 1}   //12+12
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '2d2 + constantModifier 10'});
   } catch(e){testResults.push({Error: e, Description: '2d2 + constantModifier 10'});}

   return TestRunner.displayResults('Algorithm Algorithm.bruteForce', testResults, isFirst);
};
TestSuite.Algorithm.nonDropping = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected, diceGroup, everyDieValue;
   var testStrings = ['2d6', '-d3', '1d3!r2', '1d3!pr1', '2d2!!r1'];

   for (var i = 0; i < testStrings.length; ++i)
   {
      try{
      diceGroup = new DicePool(testStrings[i]).toJSON().pool[0];
      everyDieValue = DiceExpression.everyValue(diceGroup);
      actual = Algorithm.nonDropping(diceGroup, JSON.clone(everyDieValue));
      expected = Algorithm.bruteForce(diceGroup, JSON.clone(everyDieValue));
      testResults.push({Expected: expected, Actual: actual, Description: testStrings[i]});
      } catch(e){testResults.push({Error: e, Description: testStrings[i]});}
   }

   try{
   diceGroup = {die: new Die({sideCount: 2, constantModifier: 10}), dieCount: 2, areDiceNegative: false};
   everyDieValue = DiceExpression.everyValue(diceGroup);
   actual = Algorithm.nonDropping(diceGroup, JSON.clone(everyDieValue));
   expected = Algorithm.bruteForce(diceGroup, JSON.clone(everyDieValue));
   testResults.push({Expected: expected, Actual: actual, Description: '2d2 + constantModifier 10'});
   } catch(e){testResults.push({Error: e, Description: '2d2 + constantModifier 10'});}

   return TestRunner.displayResults('Algorithm Algorithm.nonDropping', testResults, isFirst);
};
TestSuite.Algorithm.singleDrop = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected, diceGroup, everyDieValue;
   var testStrings = ['3d6', '-2d3', '2d3!r2', '2d2!!r1'];

   for (var i = 0; i < testStrings.length; ++i)
   {
      try{
      diceGroup = new DicePool(testStrings[i] + ' drop lowest').toJSON().pool[0];
      everyDieValue = DiceExpression.everyValue(diceGroup);
      actual = Algorithm.singleDrop(diceGroup, JSON.clone(everyDieValue));
      expected = Algorithm.bruteForce(diceGroup, JSON.clone(everyDieValue));
      testResults.push({Expected: expected, Actual: actual, Description: testStrings[i] + ' drop lowest'});
      } catch(e){testResults.push({Error: e, Description: testStrings[i] + ' drop lowest'});}

      try{
      diceGroup = new DicePool(testStrings[i] + ' drop highest').toJSON().pool[0];
      everyDieValue = DiceExpression.everyValue(diceGroup);
      actual = Algorithm.singleDrop(diceGroup, JSON.clone(everyDieValue));
      expected = Algorithm.bruteForce(diceGroup, JSON.clone(everyDieValue));
      testResults.push({Expected: expected, Actual: actual, Description: testStrings[i] + ' drop highest'});
      } catch(e){testResults.push({Error: e, Description: testStrings[i] + ' drop highest'});}
   }

   try{
   diceGroup = {die: new Die({sideCount: 2, constantModifier: 10}), dieCount: 2,
      dropKeepType: DicePool.dropKeepTypes.DropLowest, dropKeepCount: 1,
      areDiceNegative: false};
   everyDieValue = DiceExpression.everyValue(diceGroup);
   actual = Algorithm.singleDrop(diceGroup, JSON.clone(everyDieValue));
   expected = Algorithm.bruteForce(diceGroup, JSON.clone(everyDieValue));
   testResults.push({Expected: expected, Actual: actual, Description: '2d2 drop lowest + constantModifier 10'});
   } catch(e){testResults.push({Error: e, Description: '2d2 drop lowest + constantModifier 10'});}

   try{
   diceGroup = {die: new Die({sideCount: 2, constantModifier: 10}), dieCount: 2,
      dropKeepType: DicePool.dropKeepTypes.DropHighest, dropKeepCount: 1,
      areDiceNegative: false};
   everyDieValue = DiceExpression.everyValue(diceGroup);
   actual = Algorithm.singleDrop(diceGroup, JSON.clone(everyDieValue));
   expected = Algorithm.bruteForce(diceGroup, JSON.clone(everyDieValue));
   testResults.push({Expected: expected, Actual: actual, Description: '2d2 drop highest + constantModifier 10'});
   } catch(e){testResults.push({Error: e, Description: '2d2 drop highest + constantModifier 10'});}

   return TestRunner.displayResults('Algorithm Algorithm.singleDrop', testResults, isFirst);
};
/**
Stress tests:
the largest values of dieCount and sides that will complete in less than 30 seconds (because that's when Chrome kills it)
all algorithms must beat brute force which can do everything
last tested 2017-09-24

runStressTest(Algorithm.nonDropping, new DicePool('261d10'));
   vs runStressTest(Algorithm.bruteForce, new DicePool('6d10'));
runStressTest(Algorithm.nonDropping, new DicePool('3d1574'));
   vs runStressTest(Algorithm.bruteForce, new DicePool('3d199'));

runStressTest(Algorithm.singleDrop, new DicePool('180d10 drop lowest'));
   vs runStressTest(Algorithm.bruteForce, new DicePool('6d10 drop lowest'));
runStressTest(Algorithm.singleDrop, new DicePool('3d265 drop lowest'));
   vs runStressTest(Algorithm.bruteForce, new DicePool('3d198 drop lowest'));
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
