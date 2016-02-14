'use strict';
Tester.prototypes = {Array: {}, JSON: {}, Math: {}, Number: {}, String: {}};
Tester.prototypes.Array.contains = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [];
   testResults.push({Expected: true, Actual: ['a', 'b', 'c'].contains('b'), Description: 'Happy path: middle'});
   testResults.push({Expected: false, Actual: ['a', 'b', 'c'].contains('B'), Description: 'Not found'});
   testResults.push({Expected: false, Actual: ['1', '2', '3'].contains(2), Description: 'Type strict'});
   //testResults.push({Expected: false, Actual: ['1', undefined].contains(), Description: 'No arg'}); undefined behavior

   TesterUtility.displayResults('prototypes Array.prototype.contains', testResults, isFirst);
};
Tester.prototypes.Array.last = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [];
   testResults.push({Expected: 'c', Actual: ['a', 'b', 'c'].last(), Description: 'Happy path'});
   testResults.push({Expected: undefined, Actual: [].last(), Description: 'Empty array'});
   testResults.push({Expected: undefined, Actual: ['a', 'b', 'c',,,,].last(), Description: 'Last is undefined'});
   //var a = []; a[-1] = 5; a.last() is undefined behavior

   TesterUtility.displayResults('prototypes Array.prototype.last', testResults, isFirst);
};
Tester.prototypes.Array.removeByIndex = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], testArray, returned;

   try{
   testArray = [1, 2, 3];
   returned = testArray.removeByIndex(0);
   testResults.push({Expected: JSON.stringify([2, 3]), Actual: JSON.stringify(testArray), Description: 'Happy path: removed index 0'});
   testResults.push({Expected: 1, Actual: returned, Description: 'Happy path: returned removed value'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   testArray = ['a', 'b', 'c'];
   returned = testArray.removeByIndex(1);
   testResults.push({Expected: JSON.stringify(['a', 'c']), Actual: JSON.stringify(testArray), Description: 'Easy: removed index 1'});
   testResults.push({Expected: 'b', Actual: returned, Description: 'Easy: returned removed value'});
   } catch(e){testResults.push({Error: e, Description: 'Easy'});}

   try{
   testArray.removeByIndex(10);
   TesterUtility.failedToThrow(testResults, 'Arg too large');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('Illegal index: 10. length=2'), Actual: e, Description: 'Arg too large'});
   }

   try{
   testArray.removeByIndex(Infinity);
   TesterUtility.failedToThrow(testResults, 'Arg Infinity');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('Illegal index: Infinity. length=2'), Actual: e, Description: 'Arg Infinity'});
   }

   try{
   testArray.removeByIndex(-1);
   TesterUtility.failedToThrow(testResults, 'Negative arg');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('Illegal index: -1'), Actual: e, Description: 'Negative arg'});
   }

   try{
   testArray.removeByIndex(1.2);
   TesterUtility.failedToThrow(testResults, 'Decimal arg');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('Illegal index: 1.2'), Actual: e, Description: 'Decimal arg'});
   }

   try{
   testArray.removeByIndex(NaN);
   TesterUtility.failedToThrow(testResults, 'NaN arg');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('Illegal index: NaN'), Actual: e, Description: 'NaN arg'});
   }

   try{
   testArray.removeByIndex();
   TesterUtility.failedToThrow(testResults, 'No arg');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('Illegal index type: undefined'), Actual: e, Description: 'No arg'});
   }

   try{
   testArray.removeByIndex('1');
   TesterUtility.failedToThrow(testResults, 'Type strict');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('Illegal index type: string'), Actual: e, Description: 'Type strict'});
   }

   TesterUtility.displayResults('prototypes Array.prototype.removeByIndex', testResults, isFirst);
};
Tester.prototypes.Array.removeElement = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], testArray, returned;

   try{
   testArray = [1, 20, -3];
   returned = testArray.removeElement(20);
   testResults.push({Expected: JSON.stringify([1, -3]), Actual: JSON.stringify(testArray), Description: 'Happy path: removed 20'});
   testResults.push({Expected: 1, Actual: returned, Description: 'Happy path: returned index of removed element'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   testArray.removeElement('blue');
   TesterUtility.failedToThrow(testResults, 'Not found');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('Element not found: blue'), Actual: e, Description: 'Not found'});
   }

   try{
   testArray.removeElement('20');
   TesterUtility.failedToThrow(testResults, 'Type strict');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('Element not found: 20'), Actual: e, Description: 'Type strict'});
   }

   TesterUtility.displayResults('prototypes Array.prototype.removeElement', testResults, isFirst);
};
Tester.prototypes.JSON.clone = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [];
   testResults.push({Expected: 5, Actual: JSON.clone(5), Description: 'Input: 5'});
   testResults.push({Expected: {'f': 1}, Actual: JSON.clone({'f': 1}), Description: 'Input object'});

   var given = {'f': 1};
   var actual = JSON.clone(given);
   given.g = 5;
   testResults.push({Expected: {'f': 1}, Actual: actual, Description: 'Returns a different object'});

   TesterUtility.displayResults('prototypes JSON.clone', testResults, isFirst);
};
Tester.prototypes.Math.factorial = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [];
   testResults.push({Expected: 24, Actual: Math.factorial(4), Description: 'Input: 4'});
   testResults.push({Expected: 1, Actual: Math.factorial(0), Description: 'Input: 0'});
   testResults.push({Expected: 1, Actual: Math.factorial(1), Description: 'Input: 1'});
   testResults.push({Expected: NaN, Actual: Math.factorial(NaN), Description: 'Input: NaN'});
   testResults.push({Expected: NaN, Actual: Math.factorial('string'), Description: 'Input: string'});
   testResults.push({Expected: undefined, Actual: Math.factorial(-2), Description: 'Input: -2'});
   testResults.push({Expected: undefined, Actual: Math.factorial(2.4), Description: 'Input: 2.4'});
   testResults.push({Expected: Infinity, Actual: Math.factorial(Infinity), Description: 'Input: Infinity'});

   TesterUtility.displayResults('prototypes Math.factorial', testResults, isFirst);
};
Tester.prototypes.Math.summation = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [];
   testResults.push({Expected: 5, Actual: Math.summation([1, 2, new Number(5), -3]), Description: 'Happy path'});
   testResults.push({Expected: 0, Actual: Math.summation([]), Description: 'Empty'});
   testResults.push({Expected: -5, Actual: Math.summation(['1', true, -5]), Description: 'Ignore non-numbers'});
   testResults.push({Expected: Infinity, Actual: Math.summation([Infinity]), Description: 'Infinity'});
   testResults.push({Expected: NaN, Actual: Math.summation([NaN, -Infinity]), Description: 'NaN'});

   TesterUtility.displayResults('prototypes Math.summation', testResults, isFirst);
};
Tester.prototypes.Number.isInteger = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [];
   testResults.push({Expected: true, Actual: Number.isInteger(5), Description: 'Happy path'});
   testResults.push({Expected: true, Actual: Number.isInteger(-5), Description: 'Negative'});
   testResults.push({Expected: true, Actual: Number.isInteger(0), Description: 'Zero'});
   testResults.push({Expected: false, Actual: Number.isInteger({}), Description: 'Wrong type'});
   testResults.push({Expected: false, Actual: Number.isInteger(new Number(5)), Description: 'Very type strict'});
   testResults.push({Expected: false, Actual: Number.isInteger(2.5), Description: 'Not an integer'});
   testResults.push({Expected: false, Actual: Number.isInteger(NaN), Description: 'NaN'});
   testResults.push({Expected: false, Actual: Number.isInteger(Infinity), Description: 'Infinity'});

   TesterUtility.displayResults('prototypes Number.isInteger', testResults, isFirst);
};
Tester.prototypes.Number.isNatural = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [];
   testResults.push({Expected: true, Actual: Number.isNatural(5), Description: 'Happy path'});
   testResults.push({Expected: false, Actual: Number.isNatural({}), Description: 'Wrong type'});
   testResults.push({Expected: false, Actual: Number.isNatural(new Number(5)), Description: 'Very type strict'});
   testResults.push({Expected: false, Actual: Number.isNatural(2.5), Description: 'Not an integer'});
   testResults.push({Expected: false, Actual: Number.isNatural(NaN), Description: 'NaN'});
   testResults.push({Expected: false, Actual: Number.isNatural(Infinity), Description: 'Infinity'});
   testResults.push({Expected: false, Actual: Number.isNatural(-5), Description: 'Negative'});
   testResults.push({Expected: false, Actual: Number.isNatural(0), Description: 'Zero'});

   TesterUtility.displayResults('prototypes Number.isNatural', testResults, isFirst);
};
Tester.prototypes.String.contains = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [];
   testResults.push({Expected: true, Actual: 'me pop you'.contains('pop'), Description: 'Happy path: middle'});
   testResults.push({Expected: true, Actual: 'me pop you'.contains('me pop you'), Description: 'Entire string'});
   testResults.push({Expected: false, Actual: 'me pop you'.contains('POP'), Description: 'Case sensitive'});
   //testResults.push({Expected: false, Actual: 'me 2 you'.contains(2), Description: 'Type strict'}); undefined behavior
   //testResults.push({Expected: false, Actual: 'me undefined you'.contains(), Description: 'No arg'}); undefined behavior

   TesterUtility.displayResults('prototypes String.prototype.contains', testResults, isFirst);
};
