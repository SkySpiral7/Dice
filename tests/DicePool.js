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
   actual = new DicePool('2d8d1').roll(nonRandomNumberGenerator(nonRandomNumbers));
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
Tester.DicePool.toJSON = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], expected;

   try{
   //the tested pool needs explode and drop to make sure they are both fine after copy
   var dicePool = new DicePool('2d2!d');
   dicePool.toJSON().pool[0].dieCount = 5;

   expected = {name: '2d2!d', hasDropKeep: true, hasExplosions: true, pool: [
      {
         die: new Die('d2!'),
         dieCount: 2,
         areDiceNegative: false,
         dropKeepType: DicePool.dropKeepTypes.DropLowest,
         dropKeepCount: 1
      }
   ]};
   testResults.push({Expected: expected, Actual: dicePool.toJSON(), Description: 'Does a defensive copy'});
   } catch(e){testResults.push({Error: e, Description: 'Does a defensive copy'});}

   try{
   var input = {name: '1d2', pool: [
      {
         die: {sideCount: 2}
      }
   ]};
   var actual = new DicePool(input);
   expected = new DicePool('1d2');
   testResults.push({Expected: expected, Actual: actual, Description: 'Bug check: order of properties normalized'});
   } catch(e){testResults.push({Error: e, Description: 'Bug check: order of properties normalized'});}

   TesterUtility.displayResults('DicePool new DicePool().toJSON()', testResults, isFirst);
};
Tester.DicePool._constructor = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], returned, expected;

   try{
   returned = new DicePool('2d4').toJSON();
   expected = {name: '2d4', hasDropKeep: false, hasExplosions: false, pool: [
      {
         die: new Die(4),
         dieCount: 2,
         areDiceNegative: false,
         dropKeepType: undefined,
         dropKeepCount: undefined
      }
   ]};
   testResults.push({Expected: expected, Actual: returned, Description: 'Calls _parseString'});
   } catch(e){testResults.push({Error: e, Description: 'Calls _parseString'});}

   try{
   returned = new DicePool('2d4').toJSON();
   returned = new DicePool(returned).toJSON();
   expected = {name: '2d4', hasDropKeep: false, hasExplosions: false, pool: [
      {
         die: new Die(4),
         dieCount: 2,
         areDiceNegative: false,
         dropKeepType: undefined,
         dropKeepCount: undefined
      }
   ]};
   testResults.push({Expected: expected, Actual: returned, Description: 'Allows value of toJSON'});
   } catch(e){testResults.push({Error: e, Description: 'Allows value of toJSON'});}

   try{
   returned = new DicePool('2d4').toJSON();
   returned = new DicePool(returned.pool).toJSON();
   expected = {name: 'DicePool', hasDropKeep: false, hasExplosions: false, pool: [
      {
         die: new Die(4),
         dieCount: 2,
         areDiceNegative: false,
         dropKeepType: undefined,
         dropKeepCount: undefined
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
   new DicePool('2d4d3');
   TesterUtility.failedToThrow(testResults, 'Calls _validate');
   }
   catch(e)
   {
       testResults.push({Expected: true, Actual: true, Description: 'Calls _validate'});  //see validate tests
   }

   try{
   //the tested pool needs explode and drop to make sure they are both fine after copy
   var input = {name: '2d2!d', pool: [
      {
         die: new Die('d2!'),
         dieCount: 2,
         areDiceNegative: false,
         dropKeepType: DicePool.dropKeepTypes.DropLowest,
         dropKeepCount: 1
      }
   ]};
   var dicePool = new DicePool(input);
   input.pool[0].dieCount = 5;

   expected = {name: '2d2!d', hasDropKeep: true, hasExplosions: true, pool: [
      {
         die: new Die('d2!'),
         dieCount: 2,
         areDiceNegative: false,
         dropKeepType: DicePool.dropKeepTypes.DropLowest,
         dropKeepCount: 1
      }
   ]};
   testResults.push({Expected: expected, Actual: dicePool.toJSON(), Description: 'Does a defensive copy'});
   } catch(e){testResults.push({Error: e, Description: 'Does a defensive copy'});}

   try{
   returned = new DicePool('d6+2d2dl').toJSON().hasDropKeep;
   testResults.push({Expected: true, Actual: returned, Description: 'hasDropKeep'});
   } catch(e){testResults.push({Error: e, Description: 'hasDropKeep'});}

   try{
   returned = new DicePool('d2+d4!-d3').toJSON().hasExplosions;
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
   input = [2, 1, 3, 1];
   DicePool.dropKeepTypes.DropLowest.perform(20, input);
   testResults.push({Expected: [], Actual: input, Description: 'DropLowest: extra'});
   } catch(e){testResults.push({Error: e, Description: 'DropLowest: extra'});}

   try{
   input = [2, 1, 3, 4];
   DicePool.dropKeepTypes.DropHighest.perform(2, input);
   testResults.push({Expected: [2, 1], Actual: input, Description: 'DropHighest'});
   } catch(e){testResults.push({Error: e, Description: 'DropHighest'});}

   try{
   input = [2, 1, 3, 4];
   DicePool.dropKeepTypes.DropHighest.perform(4, input);
   testResults.push({Expected: [], Actual: input, Description: 'DropHighest: extra'});
   } catch(e){testResults.push({Error: e, Description: 'DropHighest: extra'});}

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
Tester.DicePool._validate = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], input, expected;
   var d6 = new Die();

   try{
   input = [
      {
         die: d6,
         dieCount: 3,
         dropKeepType: DicePool.dropKeepTypes.DropLowest,
         dropKeepCount: 2,
         areDiceNegative: true
      }
   ];
   expected = [  //not the same object because input can be modified
      {
         die: d6,
         dieCount: 3,
         dropKeepType: DicePool.dropKeepTypes.DropLowest,
         dropKeepCount: 2,
         areDiceNegative: true
      }
   ];
   DicePool._validate('-3d6d2', input);
   testResults.push({Expected: expected, Actual: input, Description: 'Happy Path all'});
   } catch(e){testResults.push({Error: e, Description: 'Happy Path all'});}

   try{
   input = [{die: d6}];
   expected = [
      {
         die: d6,
         dieCount: 1,
         areDiceNegative: false,
         dropKeepType: undefined,
         dropKeepCount: undefined
      }
   ];
   DicePool._validate('1d6', input);
   testResults.push({Expected: expected, Actual: input, Description: 'Happy Path min'});
   } catch(e){testResults.push({Error: e, Description: 'Happy Path min'});}

   try{
   input = [{die: d6}];
   DicePool._validate(undefined, input);
   TesterUtility.failedToThrow(testResults, 'Invalid name');
   }
   catch(e)
   {
       testResults.push({Expected: getError(requireTypeOf, ['string', undefined]), Actual: e, Description: 'Invalid name'});
   }

   try{
   DicePool._validate('crap', NaN);
   TesterUtility.failedToThrow(testResults, 'Invalid pool');
   }
   catch(e)
   {
       testResults.push({Expected: getError(requireInstanceOf, [Array, NaN]), Actual: e, Description: 'Invalid pool'});
   }

   try{
   DicePool._validate('empty', []);
   TesterUtility.failedToThrow(testResults, 'Empty pool');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('empty\npool must not be empty'), Actual: e, Description: 'Empty pool'});
   }

   try{
   input = [{die: {sideCount: 6}}];
   expected = [
      {
         die: d6,
         dieCount: 1,
         areDiceNegative: false,
         dropKeepType: undefined,
         dropKeepCount: undefined
      }
   ];
   DicePool._validate('1d6', input);
   testResults.push({Expected: expected, Actual: input, Description: 'Auto create Die'});
   } catch(e){testResults.push({Error: e, Description: 'Auto create Die'});}

   try{
   input = [{die: d6, dieCount: 'soup'}];
   DicePool._validate('bad', input);
   TesterUtility.failedToThrow(testResults, 'Invalid dieCount');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('bad\ninvalid dieCount: soup'), Actual: e, Description: 'Invalid dieCount'});
   }

   try{
   input = [
      {
         die: d6,
         dieCount: 2,
         dropKeepType: DicePool.dropKeepTypes.DropLowest
      }
   ];
   expected = [
      {
         die: d6,
         dieCount: 2,
         dropKeepType: DicePool.dropKeepTypes.DropLowest,
         dropKeepCount: 1,
         areDiceNegative: false
      }
   ];
   DicePool._validate('2d6dL', input);
   testResults.push({Expected: expected, Actual: input, Description: 'Default dropKeepCount'});
   } catch(e){testResults.push({Error: e, Description: 'Default dropKeepCount'});}

   try{
   input = [
      {
         die: d6,
         dieCount: 2,
         dropKeepType: DicePool.dropKeepTypes.DropLowest,
         dropKeepCount: 2.5
      }
   ];
   DicePool._validate('bad', input);
   TesterUtility.failedToThrow(testResults, 'Invalid dropKeepCount');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('bad\ninvalid dropKeepCount: 2.5'), Actual: e, Description: 'Invalid dropKeepCount'});
   }

   try{
   input = [
      {
         die: d6,
         dieCount: 2,
         dropKeepType: DicePool.dropKeepTypes.DropLowest,
         dropKeepCount: 2
      }
   ];
   DicePool._validate('2d6d2', input);
   TesterUtility.failedToThrow(testResults, 'dropKeepCount too large no explode');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('2d6d2\ndropKeepCount (2) is too large. dieCount=2'),
         Actual: e, Description: 'dropKeepCount too large no explode'});
   }

   try{
   input = [
      {
         die: new Die('d6!!'),
         dieCount: 2,
         dropKeepType: DicePool.dropKeepTypes.DropLowest,
         dropKeepCount: 3
      }
   ];
   DicePool._validate('2d6!!d3', input);
   TesterUtility.failedToThrow(testResults, 'dropKeepCount too large compound explode');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('2d6!!d3\ndropKeepCount (3) is too large. dieCount=2'),
         Actual: e, Description: 'dropKeepCount too large compound explode'});
   }

   try{
   input = [
      {
         die: new Die('d6!'),
         dieCount: 2,
         dropKeepType: DicePool.dropKeepTypes.DropLowest,
         dropKeepCount: 3
      }
   ];
   expected = [
      {
         die: new Die('d6!'),
         dieCount: 2,
         dropKeepType: DicePool.dropKeepTypes.DropLowest,
         dropKeepCount: 3,
         areDiceNegative: false
      }
   ];
   DicePool._validate('2d6!d3', input);
   testResults.push({Expected: expected, Actual: input, Description: 'dropKeepCount not too large due to explode'});
   } catch(e){testResults.push({Error: e, Description: 'dropKeepCount not too large due to explode'});}

   try{
   input = [
      {
         die: d6,
         dieCount: 2,
         dropKeepType: 12,
         dropKeepCount: 1
      }
   ];
   DicePool._validate('bad', input);
   TesterUtility.failedToThrow(testResults, 'Invalid dropKeepType');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('bad\ninvalid dropKeepType: 12'),
         Actual: e, Description: 'Invalid dropKeepType'});
   }

   try{
   input = [
      {
         die: d6,
         dropKeepType: null,
         dropKeepCount: null
      }
   ];
   expected = [
      {
         die: d6,
         dieCount: 1,
         areDiceNegative: false,
         dropKeepType: undefined,
         dropKeepCount: undefined
      }
   ];
   DicePool._validate('1d6', input);
   testResults.push({Expected: expected, Actual: input, Description: 'null dropKeep become undefined'});
   } catch(e){testResults.push({Error: e, Description: 'null dropKeep become undefined'});}

   try{
   input = [
      {
         die: d6,
         areDiceNegative: 3
      }
   ];
   DicePool._validate('bad', input);
   TesterUtility.failedToThrow(testResults, 'Invalid areDiceNegative');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('bad\ninvalid areDiceNegative: 3'),
         Actual: e, Description: 'Invalid areDiceNegative'});
   }

   TesterUtility.displayResults('DicePool DicePool._validate()', testResults, isFirst);
};
