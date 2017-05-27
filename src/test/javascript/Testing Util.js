'use strict';
/**@returns the error that is thrown by functionToCall when passed args. Note that functionToCall can't reference the this pointer.*/
function getError(functionToCall, args)
{
   try{functionToCall.apply(undefined, args);}
   catch(e){return e;}
}
function dieResultsToNonRandomArray(sides, numberArray)
{
   for (var i = 0; i < numberArray.length; ++i)
   {
      numberArray[i] = (numberArray[i] - 1) / sides;
   }
   return numberArray;
}
//TODO: far better: nonRandomNumberGenerator([{dieSides: 5, values: [1, 2]}, {deckSize: 3, values: [1, 2]}])
function deckResultsToNonRandomArray(initialSize, numberArray)
{
   for (var i = 0; i < numberArray.length; ++i)
   {
      numberArray[i] = (numberArray[i] - 1) / initialSize;
      --initialSize;
   }
   return numberArray;
}
function dieResultsToNonRandomGenerator(sides, numberArray)
{
   return nonRandomNumberGenerator(dieResultsToNonRandomArray(sides, numberArray));
}
function deckResultsToNonRandomGenerator(initialSize, numberArray)
{
   return nonRandomNumberGenerator(deckResultsToNonRandomArray(initialSize, numberArray));
}
function nonRandomNumberGenerator(numberArray)
{
   return function()
   {
      if(0 === numberArray.length) throw new Error('Ran out of numbers');
      return numberArray.shift();
   };
}

//TODO: consider moving these tests to a new file:
TestSuite.Util = {};
TestSuite.Util.dieResultsToNonRandomArray = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual;

   try{
   actual = dieResultsToNonRandomArray(8, [5, 7]);
   testResults.push({Expected: [(4/8), (6/8)], Actual: actual, Description: 'Quick test'});
   } catch(e){testResults.push({Error: e, Description: 'Quick test'});}

   return TestRunner.displayResults('Testing Util dieResultsToNonRandomArray', testResults, isFirst);
};
TestSuite.Util.dieResultsToNonRandomGenerator = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], generator;

   try{
   generator = dieResultsToNonRandomGenerator(8, [5]);
   testResults.push({Expected: (4/8), Actual: generator(), Description: 'Quick test'});
   } catch(e){testResults.push({Error: e, Description: 'Quick test'});}

   return TestRunner.displayResults('Testing Util dieResultsToNonRandomGenerator', testResults, isFirst);
};
TestSuite.Util.nonRandomNumberGenerator = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], generator;

   try{
   generator = nonRandomNumberGenerator([1,2,3,4,Infinity]);
   testResults.push({Expected: 1, Actual: generator(), Description: 'Happy path 0'});
   testResults.push({Expected: 2, Actual: generator(), Description: 'Happy path 1'});
   testResults.push({Expected: 3, Actual: generator(), Description: 'Happy path 2'});
   testResults.push({Expected: 4, Actual: generator(), Description: 'Happy path 3'});
   testResults.push({Expected: Infinity, Actual: generator(), Description: 'Happy path 4'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   generator();
   TestRunner.failedToThrow(testResults, 'End');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('Ran out of numbers'), Actual: e, Description: 'End'});
   }

   return TestRunner.displayResults('Testing Util nonRandomNumberGenerator', testResults, isFirst);
};
