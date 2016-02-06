'use strict';
Tester.Array = {prototype: {testAll: function(isFirst){TesterUtility.testAll(this, isFirst);}}};
Tester.Array.prototype.removeByIndex=function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults=[], testArray, returned;

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

   TesterUtility.displayResults('Tester.Array.prototype.removeByIndex', testResults, isFirst);
};
