'use strict';
var Ironclaw = {};
/**
This function is a convenience function for creating a DicePool for the game Ironclaw.
@param {number} rank the number in the trait or skill that will be converted to dice. 1 becomes d4, 7 becomes d12+d6, 12 becomes 2d12+d6
@returns {object} a DicePool that is legal in Ironclaw
*/
Ironclaw.DicePool = function(rank)
{
   Validation.requireNaturalNumber(rank);
   var d12Count = Math.floor(rank / 5);
   var modDice = rank % 5;
   var diceMap = [undefined, new Die(4), new Die(6), new Die(8), new Die(10)];
   var resultDiceArray = [];

   if(0 !== d12Count) resultDiceArray.push({die: new Die(12), dieCount: d12Count});
   if(0 !== modDice) resultDiceArray.push({die: diceMap[modDice], dieCount: 1});  //if modDice is 0 then it uses only d12s

   return new DicePool(resultDiceArray);
};
