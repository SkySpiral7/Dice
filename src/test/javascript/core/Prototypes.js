'use strict';
TestSuite.prototypes = {Array: {}, JSON: {}, Math: {}, Number: {}, String: {}};
TestSuite.prototypes.Array.contains = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [];
   assertions.push({Expected: true, Actual: ['a', 'b', 'c'].contains('b'), Description: 'Happy path: middle'});
   assertions.push({Expected: false, Actual: ['a', 'b', 'c'].contains('B'), Description: 'Not found'});
   assertions.push({Expected: false, Actual: ['1', '2', '3'].contains(2), Description: 'Type strict'});
   //assertions.push({Expected: false, Actual: ['1', undefined].contains(), Description: 'No arg'}); undefined behavior

   return TestRunner.displayResults('prototypes Array.prototype.contains', assertions, testState);
};
TestSuite.prototypes.Array.last = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [];
   assertions.push({Expected: 'c', Actual: ['a', 'b', 'c'].last(), Description: 'Happy path'});
   assertions.push({Expected: undefined, Actual: [].last(), Description: 'Empty array'});
   assertions.push({Expected: undefined, Actual: ['a', 'b', 'c',,,,].last(), Description: 'Last is undefined'});
   //var a = []; a[-1] = 5; a.last() is undefined behavior

   return TestRunner.displayResults('prototypes Array.prototype.last', assertions, testState);
};
TestSuite.prototypes.Array.removeByIndex = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], testArray, returned;

   try{
   testArray = [1, 2, 3];
   returned = testArray.removeByIndex(0);
   assertions.push({Expected: JSON.stringify([2, 3]), Actual: JSON.stringify(testArray), Description: 'Happy path: removed index 0'});
   assertions.push({Expected: 1, Actual: returned, Description: 'Happy path: returned removed value'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path'});}

   try{
   testArray = ['a', 'b', 'c'];
   returned = testArray.removeByIndex(1);
   assertions.push({Expected: JSON.stringify(['a', 'c']), Actual: JSON.stringify(testArray), Description: 'Easy: removed index 1'});
   assertions.push({Expected: 'b', Actual: returned, Description: 'Easy: returned removed value'});
   } catch(e){assertions.push({Error: e, Description: 'Easy'});}

   try{
   testArray.removeByIndex(10);
   TestRunner.failedToThrow(assertions, 'Arg too large');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('Illegal index: 10. length=2'), Actual: e, Description: 'Arg too large'});
   }

   try{
   testArray.removeByIndex(Infinity);
   TestRunner.failedToThrow(assertions, 'Arg Infinity');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('Illegal index: Infinity. length=2'), Actual: e, Description: 'Arg Infinity'});
   }

   try{
   testArray.removeByIndex(-1);
   TestRunner.failedToThrow(assertions, 'Negative arg');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('Illegal index: -1'), Actual: e, Description: 'Negative arg'});
   }

   try{
   testArray.removeByIndex(1.2);
   TestRunner.failedToThrow(assertions, 'Decimal arg');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('Illegal index: 1.2'), Actual: e, Description: 'Decimal arg'});
   }

   try{
   testArray.removeByIndex(NaN);
   TestRunner.failedToThrow(assertions, 'NaN arg');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('Illegal index: NaN'), Actual: e, Description: 'NaN arg'});
   }

   try{
   testArray.removeByIndex();
   TestRunner.failedToThrow(assertions, 'No arg');
   }
   catch(e)
   {
       assertions.push({Expected: getError(Validation.requireTypeOf, ['number', undefined]), Actual: e, Description: 'No arg'});
   }

   try{
   testArray.removeByIndex('1');
   TestRunner.failedToThrow(assertions, 'Type strict');
   }
   catch(e)
   {
       assertions.push({Expected: getError(Validation.requireTypeOf, ['number', '1']), Actual: e, Description: 'Type strict'});
   }

   return TestRunner.displayResults('prototypes Array.prototype.removeByIndex', assertions, testState);
};
TestSuite.prototypes.Array.removeElement = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], testArray, returned;

   try{
   testArray = [1, 20, -3];
   returned = testArray.removeElement(20);
   assertions.push({Expected: JSON.stringify([1, -3]), Actual: JSON.stringify(testArray), Description: 'Happy path: removed 20'});
   assertions.push({Expected: 1, Actual: returned, Description: 'Happy path: returned index of removed element'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path'});}

   try{
   testArray.removeElement('blue');
   TestRunner.failedToThrow(assertions, 'Not found');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('Element not found: blue'), Actual: e, Description: 'Not found'});
   }

   try{
   testArray.removeElement('20');
   TestRunner.failedToThrow(assertions, 'Type strict');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('Element not found: 20'), Actual: e, Description: 'Type strict'});
   }

   return TestRunner.displayResults('prototypes Array.prototype.removeElement', assertions, testState);
};
TestSuite.prototypes.JSON.clone = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [];
   assertions.push({Expected: 5, Actual: JSON.clone(5), Description: 'Input: 5'});
   assertions.push({Expected: {'f': 1}, Actual: JSON.clone({'f': 1}), Description: 'Input object'});

   var given = {'f': 1};
   var actual = JSON.clone(given);
   given.g = 5;
   assertions.push({Expected: {'f': 1}, Actual: actual, Description: 'Returns a different object'});

   return TestRunner.displayResults('prototypes JSON.clone', assertions, testState);
};
TestSuite.prototypes.Math.factorial = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [];
   assertions.push({Expected: 24, Actual: Math.factorial(4), Description: 'Input: 4'});
   assertions.push({Expected: 1, Actual: Math.factorial(0), Description: 'Input: 0'});
   assertions.push({Expected: 1, Actual: Math.factorial(1), Description: 'Input: 1'});
   assertions.push({Expected: NaN, Actual: Math.factorial(NaN), Description: 'Input: NaN'});
   assertions.push({Expected: NaN, Actual: Math.factorial('string'), Description: 'Input: string'});
   assertions.push({Expected: undefined, Actual: Math.factorial(-2), Description: 'Input: -2'});
   assertions.push({Expected: undefined, Actual: Math.factorial(2.4), Description: 'Input: 2.4'});
   assertions.push({Expected: Infinity, Actual: Math.factorial(Infinity), Description: 'Input: Infinity'});

   return TestRunner.displayResults('prototypes Math.factorial', assertions, testState);
};
TestSuite.prototypes.Math.summation = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [];
   assertions.push({Expected: 5, Actual: Math.summation([1, 2, 5, -3]), Description: 'Happy path'});
   assertions.push({Expected: 0, Actual: Math.summation([]), Description: 'Empty'});
   assertions.push({Expected: -5, Actual: Math.summation(['1', true, -5]), Description: 'Ignore non-numbers'});
   assertions.push({Expected: Infinity, Actual: Math.summation([Infinity]), Description: 'Infinity'});
   assertions.push({Expected: NaN, Actual: Math.summation([NaN, -Infinity]), Description: 'NaN'});

   return TestRunner.displayResults('prototypes Math.summation', assertions, testState);
};
TestSuite.prototypes.Number.isInteger = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [];
   assertions.push({Expected: true, Actual: Number.isInteger(5), Description: 'Happy path'});
   assertions.push({Expected: true, Actual: Number.isInteger(-5), Description: 'Negative'});
   assertions.push({Expected: true, Actual: Number.isInteger(0), Description: 'Zero'});
   assertions.push({Expected: false, Actual: Number.isInteger({}), Description: 'Wrong type'});
   assertions.push({Expected: false, Actual: Number.isInteger(new Number(5)), Description: 'Very type strict'});
   assertions.push({Expected: false, Actual: Number.isInteger(2.5), Description: 'Not an integer'});
   assertions.push({Expected: false, Actual: Number.isInteger(NaN), Description: 'NaN'});
   assertions.push({Expected: false, Actual: Number.isInteger(Infinity), Description: 'Infinity'});

   return TestRunner.displayResults('prototypes Number.isInteger', assertions, testState);
};
TestSuite.prototypes.Number.isNatural = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [];
   assertions.push({Expected: true, Actual: Number.isNatural(5), Description: 'Happy path'});
   assertions.push({Expected: false, Actual: Number.isNatural({}), Description: 'Wrong type'});
   assertions.push({Expected: false, Actual: Number.isNatural(new Number(5)), Description: 'Very type strict'});
   assertions.push({Expected: false, Actual: Number.isNatural(2.5), Description: 'Not an integer'});
   assertions.push({Expected: false, Actual: Number.isNatural(NaN), Description: 'NaN'});
   assertions.push({Expected: false, Actual: Number.isNatural(Infinity), Description: 'Infinity'});
   assertions.push({Expected: false, Actual: Number.isNatural(-5), Description: 'Negative'});
   assertions.push({Expected: false, Actual: Number.isNatural(0), Description: 'Zero'});

   return TestRunner.displayResults('prototypes Number.isNatural', assertions, testState);
};
TestSuite.prototypes.String.contains = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [];
   assertions.push({Expected: true, Actual: 'me and you'.contains('and'), Description: 'Happy path: middle'});
   assertions.push({Expected: true, Actual: 'me and you'.contains('me and you'), Description: 'Entire string'});
   assertions.push({Expected: false, Actual: 'me and you'.contains('AND'), Description: 'Case sensitive'});
   //assertions.push({Expected: false, Actual: 'me 2 you'.contains(2), Description: 'Type strict'}); undefined behavior
   //assertions.push({Expected: false, Actual: 'me undefined you'.contains(), Description: 'No arg'}); undefined behavior

   return TestRunner.displayResults('prototypes String.prototype.contains', assertions, testState);
};
