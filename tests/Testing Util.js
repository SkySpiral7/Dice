'use strict';
function convertDiceResults(sides, numberArray)
{
   for (var i = 0; i < numberArray.length; ++i)
   {
      numberArray[i] = (numberArray[i] - 1) / sides;
   }
   return numberArray;
}
function convertNonRandomDie(sides, numberArray)
{
   return new NonRandomNumberGenerator(convertDiceResults(sides, numberArray)).generate;
}
function NonRandomNumberGenerator(numberArray)  //TODO: re: test it
{
   this.generate = function()
   {
      if(0 === numberArray.length) throw new Error('Ran out of numbers');
      return numberArray.shift();
   };
}
