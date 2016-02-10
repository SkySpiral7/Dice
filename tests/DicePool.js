'use strict';
Tester.DicePool = {};
Tester.DicePool.roll = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], actual, generator;

   try{
   generator = new NonRandomNumberGenerator([(4/8), (7/8), (11/16), (15/16)]).generate;
   actual = new DicePool('2d8+2d16', [
      {
         die: new Die(8),
         dieCount: 2
      },
      {
         die: new Die(16),
         dieCount: 2
      }
   ]).roll(generator);
   testResults.push({Expected: [5, 8, 12, 16], Actual: actual, Description: 'Happy path 2d8+2d16'});
   } catch(e){testResults.push({Error: e, Action: 'Happy path 2d8+2d16'});}

   try{
   generator = new NonRandomNumberGenerator([(4/8), (7/8), (11/16), (15/16)]).generate;
   actual = new DicePool('2d8-2d16', [
      {
         die: new Die(8),
         dieCount: 2
      },
      {
         die: new Die(16),
         dieCount: 2,
         areDiceNegative: true
      }
   ]).roll(generator);
   testResults.push({Expected: [5, 8, -12, -16], Actual: actual, Description: 'Negative 2d8-2d16'});
   } catch(e){testResults.push({Error: e, Action: 'Negative 2d8-2d16'});}

   TesterUtility.displayResults('DicePool new DicePool().roll()', testResults, isFirst);
};
