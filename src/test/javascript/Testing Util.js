'use strict';
/**@returns the error that is thrown by functionToCall when passed args. Note that functionToCall can't reference the this pointer.*/
function getError(functionToCall, args)
{
   try{functionToCall.apply(undefined, args);}
   catch(e){return e;}
}
//TODO: test this more
function numberGenerator(input)
{
   var numberArray = [];
   for (var i=0; i < input.length; ++i)
   {
      if(undefined != input[i].dieSides) numberArray = numberArray.concat(dieResultsToNonRandomArray(input[i].dieSides, input[i].values));
      else if(undefined != input[i].deckSize) numberArray = numberArray.concat(deckResultsToNonRandomArray(input[i].deckSize, input[i].values));
      else numberArray = numberArray.concat(input[i]);
   }
   return function()
   {
      if(0 === numberArray.length) throw new Error('Ran out of numbers');
      return numberArray.shift();
   };

   function dieResultsToNonRandomArray(sides, numberArray)
   {
      for (var i = 0; i < numberArray.length; ++i)
      {
         numberArray[i] = (numberArray[i] - 1) / sides;
      }
      return numberArray;
   }
   function deckResultsToNonRandomArray(initialSize, numberArray)
   {
      for (var i = 0; i < numberArray.length; ++i)
      {
         numberArray[i] = (numberArray[i] - 1) / initialSize;
         --initialSize;
      }
      return numberArray;
   }
}
numberGenerator.dice = function(sides, numberArray)
{
   return numberGenerator([{dieSides: sides, values: numberArray}]);
};
numberGenerator.deck = function(initialSize, numberArray)
{
   return numberGenerator([{deckSize: initialSize, values: numberArray}]);
};
numberGenerator.values = function(numberArray)
{
   return numberGenerator([numberArray]);
};

//TODO: consider moving these tests to a new file:
TestSuite.Util = {};
TestSuite.Util.numberGenerator_dice = async function(testState={})
{
   TestRunner.clearResults(testState);

   var testResults = [], generator;

   try{
   generator = numberGenerator.dice(8, [5]);
   testResults.push({Expected: (4/8), Actual: generator(), Description: 'Quick test'});
   } catch(e){testResults.push({Error: e, Description: 'Quick test'});}

   return TestRunner.displayResults('Testing Util numberGenerator.dice', testResults, testState);
};
TestSuite.Util.numberGenerator_values = async function(testState={})
{
   TestRunner.clearResults(testState);

   var testResults = [], generator;

   try{
   generator = numberGenerator.values([1,2,Infinity]);
   testResults.push({Expected: 1, Actual: generator(), Description: 'Happy path 0'});
   testResults.push({Expected: 2, Actual: generator(), Description: 'Happy path 1'});
   testResults.push({Expected: Infinity, Actual: generator(), Description: 'Happy path 2'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   generator();
   TestRunner.failedToThrow(testResults, 'End');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('Ran out of numbers'), Actual: e, Description: 'End'});
   }

   return TestRunner.displayResults('Testing Util numberGenerator.values', testResults, testState);
};
