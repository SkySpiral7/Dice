'use strict';
Tester.DicePool = {};
Tester.DicePool.roll = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], actual, nonRandomNumbers;

   try{
   nonRandomNumbers = dieResultsToNonRandomArray(8, [5, 8]);
   nonRandomNumbers = nonRandomNumbers.concat(dieResultsToNonRandomArray(16, [12, 16]));
   actual = new DicePool('2d8+2d16').roll(nonRandomNumberGenerator(nonRandomNumbers));
   testResults.push({Expected: [5, 8, 12, 16], Actual: actual, Description: 'Happy path 2d8+2d16'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path 2d8+2d16'});}

   try{
   nonRandomNumbers = dieResultsToNonRandomArray(8, [5, 8]);
   nonRandomNumbers = nonRandomNumbers.concat(dieResultsToNonRandomArray(16, [12, 16]));
   actual = new DicePool('2d8-2d16').roll(nonRandomNumberGenerator(nonRandomNumbers));
   testResults.push({Expected: [5, 8, -12, -16], Actual: actual, Description: 'Negative 2d8-2d16'});
   } catch(e){testResults.push({Error: e, Description: 'Negative 2d8-2d16'});}

   try{
   nonRandomNumbers = dieResultsToNonRandomArray(8, [5, 8]);
   actual = new DicePool('2d8d1', [
      {
         die: new Die(8),
         dieCount: 2,
         dropKeepType: DicePool.dropKeepTypes.DropLowest,
         dropKeepCount: 1
      }
   ]).roll(nonRandomNumberGenerator(nonRandomNumbers));
   testResults.push({Expected: [8], Actual: actual, Description: 'Hooked up to drop/keep'});
   } catch(e){testResults.push({Error: e, Description: 'Hooked up to drop/keep'});}

   TesterUtility.displayResults('DicePool new DicePool().roll()', testResults, isFirst);
};
Tester.DicePool.sumRoll = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], actual, nonRandomNumbers;

   try{
   nonRandomNumbers = dieResultsToNonRandomArray(8, [5, 8]);
   nonRandomNumbers = nonRandomNumbers.concat(dieResultsToNonRandomArray(16, [12, 16]));
   actual = new DicePool('2d8+2d16').sumRoll(nonRandomNumberGenerator(nonRandomNumbers));
   testResults.push({Expected: 41, Actual: actual, Description: 'Happy path 2d8+2d16'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path 2d8+2d16'});}

   TesterUtility.displayResults('DicePool new DicePool().sumRoll()', testResults, isFirst);
};
Tester.DicePool._constructor = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], returned, expected;

   try{
   returned = new DicePool('2d4').toJSON().value;
   expected = {name: '2d4', hasDropKeep: false, hasExplosions: false, pool: [
      {
         die: new Die(4),
         dieCount: 2
      }
   ]};
   testResults.push({Expected: expected, Actual: returned, Description: 'Calls _parseString'});
   } catch(e){testResults.push({Error: e, Description: 'Calls _parseString'});}

   try{
   returned = new DicePool('2d4').toJSON().value;
   returned = new DicePool(returned).toJSON().value;
   expected = {name: '2d4', hasDropKeep: false, hasExplosions: false, pool: [
      {
         die: new Die(4),
         dieCount: 2
      }
   ]};
   testResults.push({Expected: expected, Actual: returned, Description: 'Allows value of toJSON'});
   } catch(e){testResults.push({Error: e, Description: 'Allows value of toJSON'});}

   try{
   returned = new DicePool('2d4').toJSON().value;
   returned = new DicePool(returned.pool).toJSON().value;
   expected = {name: 'DicePool', hasDropKeep: false, hasExplosions: false, pool: [
      {
         die: new Die(4),
         dieCount: 2
      }
   ]};
   testResults.push({Expected: expected, Actual: returned, Description: 'Allows pool'});
   } catch(e){testResults.push({Error: e, Description: 'Allows pool'});}

   try{
   new DicePool('2d4')._constructor();
   TesterUtility.failedToThrow(testResults, 'Call _constructor');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('Illegal access'), Actual: e, Description: 'Call _constructor'});
   }

   try{
   returned = new DicePool('d6+2d2dl', [
      {
         die: new Die(),
         dieCount: 1
      },
      {
         die: new Die(2),
         dieCount: 2,
         dropKeepType: DicePool.dropKeepTypes.DropLowest,
         dropKeepCount: 1
      }
   ]).toJSON().value.hasDropKeep;
   testResults.push({Expected: true, Actual: returned, Description: 'hasDropKeep'});
   } catch(e){testResults.push({Error: e, Description: 'hasDropKeep'});}

   try{
   returned = new DicePool('d2+d4!-d3').toJSON().value.hasExplosions;
   testResults.push({Expected: true, Actual: returned, Description: 'hasExplosions'});
   } catch(e){testResults.push({Error: e, Description: 'hasExplosions'});}

   TesterUtility.displayResults('DicePool new DicePool()._constructor()', testResults, isFirst);
};
Tester.DicePool.dropKeepTypes = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], input;

   try{
   input = [2, 1, 3, 1];
   DicePool.dropKeepTypes.DropLowest.perform(2, input);
   testResults.push({Expected: [2, 3], Actual: input, Description: 'DropLowest'});
   } catch(e){testResults.push({Error: e, Description: 'DropLowest'});}

   try{
   input = [2, 1, 3, 4];
   DicePool.dropKeepTypes.DropHighest.perform(2, input);
   testResults.push({Expected: [2, 1], Actual: input, Description: 'DropHighest'});
   } catch(e){testResults.push({Error: e, Description: 'DropHighest'});}

   try{
   input = [2, 1, 3, 4];
   DicePool.dropKeepTypes.KeepLowest.perform(2, input);
   testResults.push({Expected: [2, 1], Actual: input, Description: 'KeepLowest'});
   } catch(e){testResults.push({Error: e, Description: 'KeepLowest'});}

   try{
   input = [2, 1, 3, 4];
   DicePool.dropKeepTypes.KeepLowest.perform(20, input);
   testResults.push({Expected: [2, 1, 3, 4], Actual: input, Description: 'KeepLowest: all'});
   } catch(e){testResults.push({Error: e, Description: 'KeepLowest: all'});}

   try{
   input = [2, 1, 3, 1];
   DicePool.dropKeepTypes.KeepHighest.perform(2, input);
   testResults.push({Expected: [2, 3], Actual: input, Description: 'KeepHighest'});
   } catch(e){testResults.push({Error: e, Description: 'KeepHighest'});}

   try{
   input = [2, 1, 3, 1];
   DicePool.dropKeepTypes.KeepHighest.perform(4, input);
   testResults.push({Expected: [2, 1, 3, 1], Actual: input, Description: 'KeepHighest: all'});
   } catch(e){testResults.push({Error: e, Description: 'KeepHighest: all'});}

   TesterUtility.displayResults('DicePool DicePool.dropKeepTypes.?.perform()', testResults, isFirst);
};
