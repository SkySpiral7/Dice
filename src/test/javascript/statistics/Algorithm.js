'use strict';
TestSuite.Algorithm = {};
TestSuite.Algorithm.analyze = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], diceGroup, actual, expected;

   try{
   diceGroup = new DicePool('2d6').toJSON().pool[0];
   actual = Algorithm.analyze(diceGroup);
   expected = Algorithm.useNonDroppingAlgorithm(diceGroup, 0);
   testResults.push({Expected: expected, Actual: actual, Description: '2d6'});
   } catch(e){testResults.push({Error: e, Description: '2d6'});}

   try{
   diceGroup = new DicePool('2d2 drop 1').toJSON().pool[0];
   actual = Algorithm.analyze(diceGroup, 0);
   expected = Algorithm.useBruteForce(diceGroup, 0);
   testResults.push({Expected: expected, Actual: actual, Description: '2d2 DropLowest 1'});
   } catch(e){testResults.push({Error: e, Description: '2d2 DropLowest 1'});}

   try{
   //1d2! is the smallest output for explode
   //also being a power of 2 means better accuracy (perfect until converting to base 10 string)
   actual = Algorithm.analyze(new DicePool('1d2!').toJSON().pool[0]);
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

   return TestRunner.displayResults('Algorithm Algorithm.analyze', testResults, isFirst);
};
TestSuite.Algorithm.useBruteForce = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = Algorithm.useBruteForce(new DicePool('2d2').toJSON().pool[0]);
   expected = [
      {result: 2, frequency: 1},
      {result: 3, frequency: 2},
      {result: 4, frequency: 1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '2d2'});
   } catch(e){testResults.push({Error: e, Description: '2d2'});}

   try{
   actual = Algorithm.useBruteForce(new DicePool('-d3').toJSON().pool[0]);
   expected = [
      {result: -3, frequency: 1},
      {result: -2, frequency: 1},
      {result: -1, frequency: 1}
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '-d3'});
   } catch(e){testResults.push({Error: e, Description: '-d3'});}

   try{
   actual = Algorithm.useBruteForce(new DicePool('3d2').toJSON().pool[0]);
   expected = [
      {result: 3, frequency: 1},  //1+1+1
      {result: 4, frequency: 3},  //1+1+2, 1+2+1, 2+1+1
      {result: 5, frequency: 3},  //2+2+1, 2+1+2, 1+2+2
      {result: 6, frequency: 1}  //2+2+2
   ];
   //need to test more than 2 dice for useBruteForce
   testResults.push({Expected: expected, Actual: actual, Description: '3d2'});
   } catch(e){testResults.push({Error: e, Description: '3d2'});}

   try{
   actual = Algorithm.useBruteForce(new DicePool('2d6').toJSON().pool[0]);
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
   actual = Algorithm.useBruteForce(new DicePool('2d2!').toJSON().pool[0], 0);
   expected = [
      {result: 2, frequency: 1},  //1+1
      {result: 3, frequency: 2},  //1+2, 2+1
      {result: 4, frequency: 1}  //2+2
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '2d2! explodeCount 0'});
   } catch(e){testResults.push({Error: e, Description: '2d2! explodeCount 0'});}

   try{
   actual = Algorithm.useBruteForce(new DicePool('2d2!').toJSON().pool[0], 1);
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
   actual = Algorithm.useBruteForce(new DicePool('1d3!').toJSON().pool[0], 1);
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
   actual = Algorithm.useBruteForce(new DicePool('2d2 drop 1').toJSON().pool[0], 0);
   expected = [
      {result: 1, frequency: 1},  //1+1
      {result: 2, frequency: 3}  //1+2 or 2+1 or 2+2
   ];
   testResults.push({Expected: expected, Actual: actual, Description: '2d2 DropLowest 1'});
   } catch(e){testResults.push({Error: e, Description: '2d2 DropLowest 1'});}

   try{
   actual = Algorithm.useBruteForce(new DicePool('2d2!! drop 1').toJSON().pool[0], 1);
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
   actual = Algorithm.useBruteForce(new DicePool('2d2! drop 1').toJSON().pool[0], 1);
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
   actual = Algorithm.useBruteForce(new DicePool('2d2!p drop 1').toJSON().pool[0], 1);
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
   actual = Algorithm.useBruteForce(new DicePool('2d2! keep 1').toJSON().pool[0], 1);
   expected = [
      //all: 1+1, 1+(2+1), 1+(2+2), (2+1)+1, (2+1)+(2+1), (2+1)+(2+2), (2+2)+1, (2+2)+(2+1), (2+2)+(2+2)
      {result: 1, probability: ((1/2)*(1/2))},  //1+1
      {result: 2, probability: ((1/2)*(1/4)*4 + (1/4)*(1/4)*4)},  //the rest
   ];
   //this is the same as 2d2 KeepHighest 1 determineProbability
   testResults.push({Expected: expected, Actual: actual, Description: '2d2! KeepHighest 1 explodeCount 1'});
   } catch(e){testResults.push({Error: e, Description: '2d2! KeepHighest 1 explodeCount 1'});}

   return TestRunner.displayResults('Statistics Algorithm.useBruteForce', testResults, isFirst);
};
TestSuite.Algorithm.useNonDroppingAlgorithm = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = Algorithm.useNonDroppingAlgorithm(new DicePool('2d6').toJSON().pool[0]);
   expected = Algorithm.useBruteForce(new DicePool('2d6').toJSON().pool[0]);
   testResults.push({Expected: expected, Actual: actual, Description: '2d6'});
   } catch(e){testResults.push({Error: e, Description: '2d6'});}

   try{
   actual = Algorithm.useNonDroppingAlgorithm(new DicePool('1d3!').toJSON().pool[0], 1);
   expected = Algorithm.useBruteForce(new DicePool('1d3!').toJSON().pool[0], 1);
   testResults.push({Expected: expected, Actual: actual, Description: '1d3! explode: 1'});
   } catch(e){testResults.push({Error: e, Description: '1d3! explode: 1'});}

   try{
   actual = Algorithm.useNonDroppingAlgorithm(new DicePool('-d3').toJSON().pool[0]);
   expected = Algorithm.useBruteForce(new DicePool('-d3').toJSON().pool[0]);
   testResults.push({Expected: expected, Actual: actual, Description: '-d3'});
   } catch(e){testResults.push({Error: e, Description: '-d3'});}

   return TestRunner.displayResults('Statistics Algorithm.useNonDroppingAlgorithm', testResults, isFirst);
};