'use strict';
Tester.DicePool = {};
Tester.DicePool.roll = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], actual, nonRandomNumbers;

   try{
   nonRandomNumbers = convertDiceResults(8, [5, 8]);
   nonRandomNumbers = nonRandomNumbers.concat(convertDiceResults(16, [12, 16]));
   actual = new DicePool('2d8+2d16', [
      {
         die: new Die(8),
         dieCount: 2
      },
      {
         die: new Die(16),
         dieCount: 2
      }
   ]).roll(new NonRandomNumberGenerator(nonRandomNumbers).generate);
   testResults.push({Expected: [5, 8, 12, 16], Actual: actual, Description: 'Happy path 2d8+2d16'});
   } catch(e){testResults.push({Error: e, Action: 'Happy path 2d8+2d16'});}

   try{
   nonRandomNumbers = convertDiceResults(8, [5, 8]);
   actual = new DicePool('2d8d1', [
      {
         die: new Die(8),
         dieCount: 2,
         dropKeepType: DicePool.dropKeepTypes.DropLowest,
         dropKeepCount: 1
      }
   ]).roll(new NonRandomNumberGenerator(nonRandomNumbers).generate);
   testResults.push({Expected: [8], Actual: actual, Description: 'Hooked up to drop/keep'});
   } catch(e){testResults.push({Error: e, Action: 'Hooked up to drop/keep'});}

   TesterUtility.displayResults('DicePool new DicePool().roll()', testResults, isFirst);
};
Tester.DicePool.dropKeepTypes = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], input;

   try{
   input = [2, 1, 3, 1];
   DicePool.dropKeepTypes.DropLowest.perform(2, input);
   testResults.push({Expected: [2, 3], Actual: input, Description: 'DropLowest'});
   } catch(e){testResults.push({Error: e, Action: 'DropLowest'});}

   try{
   input = [2, 1, 3, 4];
   DicePool.dropKeepTypes.DropHighest.perform(2, input);
   testResults.push({Expected: [2, 1], Actual: input, Description: 'DropHighest'});
   } catch(e){testResults.push({Error: e, Action: 'DropHighest'});}

   try{
   input = [2, 1, 3, 4];
   DicePool.dropKeepTypes.KeepLowest.perform(2, input);
   testResults.push({Expected: [2, 1], Actual: input, Description: 'KeepLowest'});
   } catch(e){testResults.push({Error: e, Action: 'KeepLowest'});}

   try{
   input = [2, 1, 3, 4];
   DicePool.dropKeepTypes.KeepLowest.perform(20, input);
   testResults.push({Expected: [2, 1, 3, 4], Actual: input, Description: 'KeepLowest: all'});
   } catch(e){testResults.push({Error: e, Action: 'KeepLowest: all'});}

   try{
   input = [2, 1, 3, 1];
   DicePool.dropKeepTypes.KeepHighest.perform(2, input);
   testResults.push({Expected: [2, 3], Actual: input, Description: 'KeepHighest'});
   } catch(e){testResults.push({Error: e, Action: 'KeepHighest'});}

   try{
   input = [2, 1, 3, 1];
   DicePool.dropKeepTypes.KeepHighest.perform(4, input);
   testResults.push({Expected: [2, 1, 3, 1], Actual: input, Description: 'KeepHighest: all'});
   } catch(e){testResults.push({Error: e, Action: 'KeepHighest: all'});}

   TesterUtility.displayResults('DicePool DicePool.dropKeepTypes.?.perform()', testResults, isFirst);
};
