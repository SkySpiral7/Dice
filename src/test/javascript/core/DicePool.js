'use strict';
TestSuite.DicePool = {};
TestSuite.DicePool.equals = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], actual, inputA, inputB;

   try{
   inputA = new DicePool('2d8');
   actual = inputA.equals(inputA);
   assertions.push({Expected: true, Actual: actual, Description: 'Happy path 2d8 same'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path 2d8 same'});}

   try{
   actual = new DicePool('2d8').equals(new DicePool('2d8'));
   assertions.push({Expected: true, Actual: actual, Description: 'Happy path 2d8 equal'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path 2d8 equal'});}

   try{
   actual = new DicePool('2d8').equals(5);
   assertions.push({Expected: false, Actual: actual, Description: 'Not a DicePool'});
   } catch(e){assertions.push({Error: e, Description: 'Not a DicePool'});}

   try{
   actual = new DicePool('2d8').equals(null);
   assertions.push({Expected: false, Actual: actual, Description: 'null'});
   } catch(e){assertions.push({Error: e, Description: 'null'});}

   try{
   actual = new DicePool('2d8').equals(undefined);
   assertions.push({Expected: false, Actual: actual, Description: 'undefined'});
   } catch(e){assertions.push({Error: e, Description: 'undefined'});}

   try{
   inputA = new DicePool('2d8').toJSON();
   inputA.name = 'A';
   inputA = new DicePool(inputA);

   inputB = new DicePool('2d8').toJSON();
   inputB.name = 'B';
   inputB = new DicePool(inputB);

   actual = inputA.equals(inputB);
   assertions.push({Expected: true, Actual: actual, Description: 'Ignores name: equal'});
   assertions.push({Expected: false, Actual: (inputA.toJSON().name === inputB.toJSON().name), Description: 'Ignores name: names are different'});
   } catch(e){assertions.push({Error: e, Description: 'Ignores name'});}

   try{
   actual = new DicePool('2d8').equals(new DicePool('2d8+1d4'));
   assertions.push({Expected: false, Actual: actual, Description: 'Not equal'});
   } catch(e){assertions.push({Error: e, Description: 'Not equal'});}

   return TestRunner.displayResults('DicePool new DicePool().equals()', assertions, testState);
};
TestSuite.DicePool.roll = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], actual, randomSource;

   try{
   randomSource = numberGenerator([{dieSides: 8, values: [5,8]}, {dieSides: 16, values: [12,16]}]);
   actual = new DicePool('2d8+2d16').roll(randomSource);
   assertions.push({Expected: [5, 8, 12, 16], Actual: actual, Description: 'Happy path 2d8+2d16'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path 2d8+2d16'});}

   try{
   randomSource = numberGenerator([{dieSides: 8, values: [5,8]}, {dieSides: 16, values: [12,16]}]);
   actual = new DicePool('2d8-2d16').roll(randomSource);
   assertions.push({Expected: [5, 8, -12, -16], Actual: actual, Description: 'Negative 2d8-2d16'});
   } catch(e){assertions.push({Error: e, Description: 'Negative 2d8-2d16'});}

   try{
   randomSource = numberGenerator.dice(8, [5,8]);
   actual = new DicePool('2d8d1').roll(randomSource);
   assertions.push({Expected: [8], Actual: actual, Description: 'Hooked up to drop/keep'});
   } catch(e){assertions.push({Error: e, Description: 'Hooked up to drop/keep'});}

   return TestRunner.displayResults('DicePool new DicePool().roll()', assertions, testState);
};
TestSuite.DicePool.sumRoll = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], actual, randomSource;

   try{
   randomSource = numberGenerator([{dieSides: 8, values: [5,8]}, {dieSides: 16, values: [12,16]}]);
   actual = new DicePool('2d8+2d16').sumRoll(randomSource);
   assertions.push({Expected: 41, Actual: actual, Description: 'Happy path 2d8+2d16'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path 2d8+2d16'});}

   return TestRunner.displayResults('DicePool new DicePool().sumRoll()', assertions, testState);
};
TestSuite.DicePool.toJSON = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], expected;

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
   assertions.push({Expected: expected, Actual: dicePool.toJSON(), Description: 'Does a defensive copy'});
   } catch(e){assertions.push({Error: e, Description: 'Does a defensive copy'});}

   try{
   var input = {name: '1d2', pool: [
      {
         die: {sideCount: 2}
      }
   ]};
   var actual = new DicePool(input);
   expected = new DicePool('1d2');
   assertions.push({Expected: expected, Actual: actual, Description: 'Bug check: order of properties normalized'});
   } catch(e){assertions.push({Error: e, Description: 'Bug check: order of properties normalized'});}

   return TestRunner.displayResults('DicePool new DicePool().toJSON()', assertions, testState);
};
TestSuite.DicePool._constructor = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], returned, expected;

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
   assertions.push({Expected: expected, Actual: returned, Description: 'Calls _parseString'});
   } catch(e){assertions.push({Error: e, Description: 'Calls _parseString'});}

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
   assertions.push({Expected: expected, Actual: returned, Description: 'Allows value of toJSON'});
   } catch(e){assertions.push({Error: e, Description: 'Allows value of toJSON'});}

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
   assertions.push({Expected: expected, Actual: returned, Description: 'Allows pool'});
   } catch(e){assertions.push({Error: e, Description: 'Allows pool'});}

   try{
   new DicePool('2d4')._constructor();
   TestRunner.failedToThrow(assertions, 'Call _constructor');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('Illegal access'), Actual: e, Description: 'Call _constructor'});
   }

   try{
   new DicePool('2d4d3');
   TestRunner.failedToThrow(assertions, 'Calls _validate');
   }
   catch(e)
   {
       assertions.push({Expected: true, Actual: true, Description: 'Calls _validate'});  //see validate tests
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
   assertions.push({Expected: expected, Actual: dicePool.toJSON(), Description: 'Does a defensive copy'});
   } catch(e){assertions.push({Error: e, Description: 'Does a defensive copy'});}

   try{
   returned = new DicePool('d6+2d2dl').toJSON().hasDropKeep;
   assertions.push({Expected: true, Actual: returned, Description: 'hasDropKeep'});
   } catch(e){assertions.push({Error: e, Description: 'hasDropKeep'});}

   try{
   returned = new DicePool('d2+d4!-d3').toJSON().hasExplosions;
   assertions.push({Expected: true, Actual: returned, Description: 'hasExplosions'});
   } catch(e){assertions.push({Error: e, Description: 'hasExplosions'});}

   return TestRunner.displayResults('DicePool new DicePool()._constructor()', assertions, testState);
};
TestSuite.DicePool.dropKeepTypes = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], input;

   try{
   input = [2, 1, 3, 1];
   DicePool.dropKeepTypes.DropLowest.perform(2, input);
   assertions.push({Expected: [2, 3], Actual: input, Description: 'DropLowest'});
   } catch(e){assertions.push({Error: e, Description: 'DropLowest'});}

   try{
   input = [2, 1, 3, 1];
   DicePool.dropKeepTypes.DropLowest.perform(20, input);
   assertions.push({Expected: [], Actual: input, Description: 'DropLowest: extra'});
   } catch(e){assertions.push({Error: e, Description: 'DropLowest: extra'});}

   try{
   input = [2, 1, 3, 4];
   DicePool.dropKeepTypes.DropHighest.perform(2, input);
   assertions.push({Expected: [2, 1], Actual: input, Description: 'DropHighest'});
   } catch(e){assertions.push({Error: e, Description: 'DropHighest'});}

   try{
   input = [2, 1, 3, 4];
   DicePool.dropKeepTypes.DropHighest.perform(4, input);
   assertions.push({Expected: [], Actual: input, Description: 'DropHighest: extra'});
   } catch(e){assertions.push({Error: e, Description: 'DropHighest: extra'});}

   try{
   input = [2, 1, 3, 4];
   DicePool.dropKeepTypes.KeepLowest.perform(2, input);
   assertions.push({Expected: [2, 1], Actual: input, Description: 'KeepLowest'});
   } catch(e){assertions.push({Error: e, Description: 'KeepLowest'});}

   try{
   input = [2, 1, 3, 4];
   DicePool.dropKeepTypes.KeepLowest.perform(20, input);
   assertions.push({Expected: [2, 1, 3, 4], Actual: input, Description: 'KeepLowest: all'});
   } catch(e){assertions.push({Error: e, Description: 'KeepLowest: all'});}

   try{
   input = [2, 1, 3, 1];
   DicePool.dropKeepTypes.KeepHighest.perform(2, input);
   assertions.push({Expected: [2, 3], Actual: input, Description: 'KeepHighest'});
   } catch(e){assertions.push({Error: e, Description: 'KeepHighest'});}

   try{
   input = [2, 1, 3, 1];
   DicePool.dropKeepTypes.KeepHighest.perform(4, input);
   assertions.push({Expected: [2, 1, 3, 1], Actual: input, Description: 'KeepHighest: all'});
   } catch(e){assertions.push({Error: e, Description: 'KeepHighest: all'});}

   return TestRunner.displayResults('DicePool DicePool.dropKeepTypes.?.perform()', assertions, testState);
};
TestSuite.DicePool._validate = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], input, expected;
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
   assertions.push({Expected: expected, Actual: input, Description: 'Happy Path all'});
   } catch(e){assertions.push({Error: e, Description: 'Happy Path all'});}

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
   assertions.push({Expected: expected, Actual: input, Description: 'Happy Path min'});
   } catch(e){assertions.push({Error: e, Description: 'Happy Path min'});}

   try{
   input = [{die: d6}];
   DicePool._validate(undefined, input);
   TestRunner.failedToThrow(assertions, 'Invalid name');
   }
   catch(e)
   {
       assertions.push({Expected: getError(Validation.requireTypeOf, ['string', undefined]), Actual: e, Description: 'Invalid name'});
   }

   try{
   DicePool._validate('crap', NaN);
   TestRunner.failedToThrow(assertions, 'Invalid pool');
   }
   catch(e)
   {
       assertions.push({Expected: getError(Validation.requireInstanceOf, [Array, NaN]), Actual: e, Description: 'Invalid pool'});
   }

   try{
   DicePool._validate('empty', []);
   TestRunner.failedToThrow(assertions, 'Empty pool');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('empty\npool must not be empty'), Actual: e, Description: 'Empty pool'});
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
   assertions.push({Expected: expected, Actual: input, Description: 'Auto create Die'});
   } catch(e){assertions.push({Error: e, Description: 'Auto create Die'});}

   try{
   input = [{die: d6, dieCount: 'soup'}];
   DicePool._validate('bad', input);
   TestRunner.failedToThrow(assertions, 'Invalid dieCount');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('bad\ninvalid dieCount: soup'), Actual: e, Description: 'Invalid dieCount'});
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
   assertions.push({Expected: expected, Actual: input, Description: 'Default dropKeepCount'});
   } catch(e){assertions.push({Error: e, Description: 'Default dropKeepCount'});}

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
   TestRunner.failedToThrow(assertions, 'Invalid dropKeepCount');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('bad\ninvalid dropKeepCount: 2.5'), Actual: e, Description: 'Invalid dropKeepCount'});
   }

   try{
   input = [
      {
         die: d6,
         dieCount: 2,
         dropKeepType: DicePool.dropKeepTypes.DropLowest,
         dropKeepCount: 3
      }
   ];
   DicePool._validate('2d6d3', input);
   TestRunner.failedToThrow(assertions, 'dropKeepCount too large no explode');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('2d6d3\ndropKeepCount (3) is too large. dieCount=2'),
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
   TestRunner.failedToThrow(assertions, 'dropKeepCount too large compound explode');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('2d6!!d3\ndropKeepCount (3) is too large. dieCount=2'),
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
   assertions.push({Expected: expected, Actual: input, Description: 'dropKeepCount not too large due to explode'});
   } catch(e){assertions.push({Error: e, Description: 'dropKeepCount not too large due to explode'});}

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
   TestRunner.failedToThrow(assertions, 'Invalid dropKeepType');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('bad\ninvalid dropKeepType: 12'),
         Actual: e, Description: 'Invalid dropKeepType'});
   }

   try{
   input = [
      {
         die: d6,
         dieCount: 2,
         dropKeepType: DicePool.dropKeepTypes.KeepLowest,
         dropKeepCount: 2
      }
   ];
   expected = [
      {
         die: d6,
         dieCount: 2,
         dropKeepType: undefined,
         dropKeepCount: undefined,
         areDiceNegative: false
      }
   ];
   DicePool._validate('2d6k2', input);
   assertions.push({Expected: expected, Actual: input, Description: 'keep all removes dropKeepType'});
   } catch(e){assertions.push({Error: e, Description: 'keep all removes dropKeepType'});}

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
   TestRunner.failedToThrow(assertions, 'drop all');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('2d6d2\nIllegal: all dice (2) are always dropped.'),
         Actual: e, Description: 'drop all'});
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
   assertions.push({Expected: expected, Actual: input, Description: 'null dropKeep become undefined'});
   } catch(e){assertions.push({Error: e, Description: 'null dropKeep become undefined'});}

   try{
   input = [
      {
         die: d6,
         areDiceNegative: 3
      }
   ];
   DicePool._validate('bad', input);
   TestRunner.failedToThrow(assertions, 'Invalid areDiceNegative');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('bad\ninvalid areDiceNegative: 3'),
         Actual: e, Description: 'Invalid areDiceNegative'});
   }

   return TestRunner.displayResults('DicePool DicePool._validate()', assertions, testState);
};
