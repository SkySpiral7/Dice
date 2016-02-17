'use strict';
function dieResultsToNonRandomArray(sides, numberArray)
{
   for (var i = 0; i < numberArray.length; ++i)
   {
      numberArray[i] = (numberArray[i] - 1) / sides;
   }
   return numberArray;
}
function dieResultsToNonRandomGenerator(sides, numberArray)
{
   return nonRandomNumberGenerator(dieResultsToNonRandomArray(sides, numberArray));
}
function nonRandomNumberGenerator(numberArray)  //TODO: re: test it
{
   return function()
   {
      if(0 === numberArray.length) throw new Error('Ran out of numbers');
      return numberArray.shift();
   };
}
