'use strict';
Tester.prototypes = {Array: {testAll: function(isFirst){TesterUtility.testAll(this, isFirst);}}};
Tester.prototypes.Array.removeByIndex = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], testArray, returned;

   try{
   testArray = [1, 2, 3];
   returned = testArray.removeByIndex(0);
   testResults.push({Expected: JSON.stringify([2, 3]), Actual: JSON.stringify(testArray), Description: 'Happy path: removed index 0'});
   testResults.push({Expected: 1, Actual: returned, Description: 'Happy path: returned removed value'});
   } catch(e){testResults.push({Error: e, Action: 'Happy path'});}

   try{
   testArray = ['a', 'b', 'c'];
   returned = testArray.removeByIndex(1);
   testResults.push({Expected: JSON.stringify(['a', 'c']), Actual: JSON.stringify(testArray), Description: 'Easy: removed index 1'});
   testResults.push({Expected: 'b', Actual: returned, Description: 'Easy: returned removed value'});
   } catch(e){testResults.push({Error: e, Action: 'Easy'});}

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

   TesterUtility.displayResults('Tester.prototypes.Array.removeByIndex', testResults, isFirst);
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
   } catch(e){testResults.push({Error: e, Action: 'Happy path'});}

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

   TesterUtility.displayResults('Tester.prototypes.Array.removeElement', testResults, isFirst);
};
/*
TODO: re: can't test until I know what to do with it
Tester.prototypes.Array.summatioun = fnction(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], testArray, returned;

   try{
   testArray = [1, 20, -3];
   returned = testArray.removeElement(20);
   testResults.push({Expected: JSON.stringify([1, -3]), Actual: JSON.stringify(testArray), Description: 'Happy path: removed 20'});
   testResults.push({Expected: 1, Actual: returned, Description: 'Happy path: returned index of removed element'});
   } catch(e){testResults.push({Error: e, Action: 'Happy path'});}

   TesterUtility.displayResults('Tester.prototypes.Array.summation', testResults, isFirst);
};
*/
Tester.prototypes.Array.contains = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [];
   testResults.push({Expected: true, Actual: ['a', 'b', 'c'].contains('b'), Description: 'Happy path: middle'});
   testResults.push({Expected: false, Actual: ['a', 'b', 'c'].contains('B'), Description: 'Not found'});
   testResults.push({Expected: false, Actual: ['1', '2', '3'].contains(2), Description: 'Type strict'});
   //testResults.push({Expected: false, Actual: ['1', undefined].contains(), Description: 'No arg'}); undefined behavior

   TesterUtility.displayResults('Tester.prototypes.Array.contains', testResults, isFirst);
};
Tester.prototypes.String = {testAll: function(isFirst){TesterUtility.testAll(this, isFirst);}};
Tester.prototypes.String.contains = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [];
   testResults.push({Expected: true, Actual: 'me pop you'.contains('pop'), Description: 'Happy path: middle'});
   testResults.push({Expected: true, Actual: 'me pop you'.contains('me pop you'), Description: 'Entire string'});
   testResults.push({Expected: false, Actual: 'me pop you'.contains('POP'), Description: 'Case sensitive'});
   //testResults.push({Expected: false, Actual: 'me 2 you'.contains(2), Description: 'Type strict'}); undefined behavior
   //testResults.push({Expected: false, Actual: 'me undefined you'.contains(), Description: 'No arg'}); undefined behavior

   TesterUtility.displayResults('Tester.prototypes.String.contains', testResults, isFirst);
};
