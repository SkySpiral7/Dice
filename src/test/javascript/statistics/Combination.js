'use strict';
TestSuite.Combination = {};
TestSuite.Combination.cartesianProduct = async function(testState = {})
{
   TestRunner.clearResults(testState);

   const assertions = [];
   let actual, expected;

   actual = Combination.cartesianProduct([[1, 2], [3, 4]]);
   expected = [[1, 3], [1, 4], [2, 3], [2, 4]];
   assertions.push({Expected: expected, Actual: actual, Description: 'Example 1 cartesianProduct'});

   actual = Combination.cartesianProduct([[1, 2], [3, 4], [5, 6], [7]]);
   expected = [[1, 3, 5, 7], [1, 3, 6, 7], [1, 4, 5, 7], [1, 4, 6, 7], [2, 3, 5, 7], [2, 3, 6, 7], [2, 4, 5, 7], [2, 4, 6, 7]];
   assertions.push({Expected: expected, Actual: actual, Description: 'Example 2 cartesianProduct'});

   actual = Combination.cartesianProduct([[1, 2]]);
   expected = [[1, 2]];
   assertions.push({Expected: expected, Actual: actual, Description: 'cartesianProduct of 1 input is itself'});

   actual = Combination.cartesianProduct([['A', 'B'], ['C', 'D']]);
   expected = [['A', 'C'], ['A', 'D'], ['B', 'C'], ['B', 'D']];
   assertions.push({Expected: expected, Actual: actual, Description: 'cartesianProduct for non number primitives'});

   return TestRunner.displayResults('Combination Combination.cartesianProduct', assertions, testState);
};
TestSuite.Combination.choose = async function(testState = {})
{
   TestRunner.clearResults(testState);

   const assertions = [];
   let actual;

   actual = Combination.choose(1, 0);
   assertions.push({Expected: 1, Actual: actual, Description: 'C(1,0) = 1'});

   actual = Combination.choose(1, 1);
   assertions.push({Expected: 1, Actual: actual, Description: 'C(1,1) = 1'});

   actual = Combination.choose(5, 0);
   assertions.push({Expected: 1, Actual: actual, Description: 'C(5,0) = 1'});

   actual = Combination.choose(5, 1);
   assertions.push({Expected: 5, Actual: actual, Description: 'C(5,1) = 5'});

   actual = Combination.choose(5, 2);
   assertions.push({Expected: 10, Actual: actual, Description: 'C(5,2) = 10'});

   actual = Combination.choose(5, 3);
   assertions.push({Expected: 10, Actual: actual, Description: 'C(5,3) = 10'});

   actual = Combination.choose(5, 4);
   assertions.push({Expected: 5, Actual: actual, Description: 'C(5,4) = 5'});

   actual = Combination.choose(5, 5);
   assertions.push({Expected: 1, Actual: actual, Description: 'C(5,5) = 1'});

   actual = Combination.choose(10, 6);
   assertions.push({Expected: 210, Actual: actual, Description: 'C(10,6) = 210'});

   actual = Combination.choose(12, 5);
   assertions.push({Expected: 792, Actual: actual, Description: 'C(12, 5) = 792'});

   return TestRunner.displayResults('Combination Combination.choose', assertions, testState);
};
TestSuite.Combination.permutation = async function(testState = {})
{
   TestRunner.clearResults(testState);

   const assertions = [];
   let actual;

   actual = Combination.permutation(10, 2);
   assertions.push({Expected: 90, Actual: actual, Description: 'P(10,2) = 90'});

   actual = Combination.permutation(16, 3);
   assertions.push({Expected: 3360, Actual: actual, Description: 'P(16,3) = 3360'});

   actual = Combination.permutation(26, 10);
   //26! is much larger than safe int but reduced is int only. delta 0 can only pass if reduced
   assertions.push({Expected: 19275223968000, Actual: actual, Description: 'P(26,10) = 19275223968000', Delta: 0});

   return TestRunner.displayResults('Combination Combination.permutation', assertions, testState);
};
TestSuite.Combination.countPossibilities = async function(testState = {})
{
   TestRunner.clearResults(testState);

   const assertions = [];
   let actual;

   actual = Combination.countPossibilities({numberOfTypesOfObject: 10, numberOfObjectsChosen: 3, orderMatters: true, canRepeat: true});
   assertions.push({Expected: 1000, Actual: actual, Description: 'a 3 digit base 10 lock'});

   actual = Combination.countPossibilities({numberOfTypesOfObject: 10, numberOfObjectsChosen: 3, orderMatters: true, canRepeat: false});
   assertions.push({Expected: 720, Actual: actual, Description: 'the first 3 people in a race of 10'});

   actual = Combination.countPossibilities({numberOfTypesOfObject: 5, numberOfObjectsChosen: 3, orderMatters: false, canRepeat: true});
   assertions.push({Expected: 35, Actual: actual, Description: '3 scoops of 5 flavors of ice cream'});

   actual = Combination.countPossibilities({numberOfTypesOfObject: 5, numberOfObjectsChosen: 2, orderMatters: false, canRepeat: false});
   assertions.push({Expected: 10, Actual: actual, Description: 'drawing 2 names out of a hat of 5 people to form teams'});

   return TestRunner.displayResults('Combination Combination.countPossibilities', assertions, testState);
};
TestSuite.Combination.binomialDistribution = async function(testState = {})
{
   TestRunner.clearResults(testState);

   const assertions = [];
   let actual, expected;

   actual = Combination.binomialDistribution(5, (1 / 2));
   expected = [
      {result: 0, probability: (1 / 32)},  //C(5,0)==1 and 32 == 2**5
      {result: 1, probability: (5 / 32)},  //C(5,1)==5
      {result: 2, probability: (10 / 32)},  //C(5,2)==10
      {result: 3, probability: (10 / 32)},  //C(5,3)==10
      {result: 4, probability: (5 / 32)},  //C(5,4)==5
      {result: 5, probability: (1 / 32)}  //C(5,5)==1
   ];
   assertions.push({Expected: expected, Actual: actual, Description: 'binomialDistribution of heads from 5 coin flips'});

   actual = Combination.binomialDistribution(3, (1 / 6));
   expected = [
      {result: 0, probability: Math.pow((1 / 6), 0) * Math.pow((5 / 6), 3)},  //C(3, 0) == 1
      {result: 1, probability: 3 * Math.pow((1 / 6), 1) * Math.pow((5 / 6), 2)},  //C(3, 1) == 3
      {result: 2, probability: 3 * Math.pow((1 / 6), 2) * Math.pow((5 / 6), 1)},  //C(3, 2) == 3
      {result: 3, probability: Math.pow((1 / 6), 3) * Math.pow((5 / 6), 0)}  //C(3, 3) == 1
   ];
   assertions.push({Expected: expected, Actual: actual, Description: 'binomialDistribution 3d6'});

   actual = Combination.binomialDistribution(12, (1 / 6));
   expected = {result: 5, probability: 792 * Math.pow((1 / 6), 5) * Math.pow((5 / 6), (12 - 5))};  //C(12, 5) == 792
   assertions.push({Expected: expected, Actual: actual[5], Description: 'binomialDistribution 12d6 getting 4 exactly 5 times'});

   actual = Combination.binomialDistribution(1, (1 / 6));
   expected = [
      {result: 0, probability: Math.pow((1 / 6), 0) * Math.pow((5 / 6), 1)},  //C(1, 0) == 1
      {result: 1, probability: Math.pow((1 / 6), 1) * Math.pow((5 / 6), 0)}  //C(1, 1) == 1
   ];
   assertions.push({Expected: expected, Actual: actual, Description: 'binomialDistribution 1d6'});

   actual = Combination.binomialDistribution(0, (1 / 6));
   //C(0,0) * (1/6)**0 * (5/6)**0 == 1*1*1. Surprisingly the math "just works" for this
   expected = [{result: 0, probability: 1}];
   assertions.push({Expected: expected, Actual: actual, Description: 'binomialDistribution 0 attempts can only be 0 success'});

   actual = Combination.binomialDistribution(2, Number.MIN_VALUE);
   expected = [
      {"result": 0, "probability": 1},  //notice how precision has died
      {"result": 1, "probability": 1e-323},  //Number.EPSILON is e-16 so the prob sum is still 1
      {"result": 2, "probability": 0}
   ];
   assertions.push({Expected: expected, Actual: actual, Description: 'binomialDistribution never filters out values', Delta: 0});

   return TestRunner.displayResults('Combination Combination.binomialDistribution', assertions, testState);
};
