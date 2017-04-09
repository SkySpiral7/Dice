'use strict';
//objects expected to be defined: Parser
//other game specific files: Prebuilt, Stringifier

/**
This function is a convenience function for creating a DicePool for the game Legend of the Five Rings (L5R).

It can be called in the following ways:
new L5RDicePool('3k1', true)  //true is optional and means hasEmphasis
L5RDicePool(3, 2, false)  //false is optional and means !hasEmphasis
L5RDicePool({diceRolled: 3, diceKept: 2, hasEmphasis: true})  //hasEmphasis is optional

@returns {object} a DicePool that is legal in L5R
*/
function L5RDicePool(arg1, arg2, arg3)
{
   var debugString = JSON.stringify([arg1, arg2, arg3]);
   if ('object' === typeof(arg1))
   {
      //convert {diceRolled: 3, diceKept: 2, hasEmphasis: true} into ('3k2', true)
      arg2 = arg1.hasEmphasis;
      arg1 = '' + arg1.diceRolled + 'k' + arg1.diceKept;
   }
   else if ('number' === typeof(arg1))
   {
      //convert (3,2,true) into ('3k2', true)
      arg1 = '' + arg1 + 'k' + arg2;
      arg2 = arg3;
      arg3 = undefined;
   }

   var jsonResult;
   if('string' === typeof(arg1)) jsonResult = Parser.L5RShortHand(arg1, arg2);
   else throw new Error('Illegal argument. input was: ' + debugString);

   var dicePoolName = '' + jsonResult[0].dieCount + 'k';
   if(undefined === jsonResult[0].dropKeepCount) dicePoolName += jsonResult[0].dieCount;
   else dicePoolName += jsonResult[0].dropKeepCount;
   if(undefined !== jsonResult[0].die.rerollCriteria) dicePoolName += ' emphasis';

   var dicePool = new DicePool(dicePoolName, jsonResult);
   var jsonResult = dicePool.toJSON();

   if(jsonResult.pool.length !== 1) throw new Error('Not a valid L5R DicePool: multiple dice groups. input was: ' + debugString);
   //negative is covered by Parser.L5RShortHand which will always be called
   if(jsonResult.pool[0].dieCount > 10) throw new Error('It\'s never possible to roll more than 10 dice. input was: ' + debugString);

   return dicePool;
}
/**
This function is used to parse the short hand used in the game Legend of the Five Rings (L5R).
It parses the inputString into an object array used to create a DicePool.

You should have no use for it although it isn't harmful to call.
@param {string} inputString XkY syntax
@param {?boolean} hasEmphasis
@returns {!object[]} the object array needed to create a DicePool. Not optimized or validated.
*/
Parser.L5RShortHand = function(inputString, hasEmphasis)
{
   var debugString = '' + inputString;  //enforces string type and is null safe
   inputString = debugString.trim().toLowerCase();

   if(!(/^\+?\s*\d+k\d+/).test(inputString)) throw new Error('Expected XkY. Found: ' + debugString);
   inputString = inputString.replace('k', 'd10!!kh');  //replaces only the first k
   if(hasEmphasis) inputString += ' reroll 1';
   //use shorthand kh and longhand reroll because short must be before long
   //thus if user included any other short/long they will be in the right order

   var jsonResult = Parser.dicePool(inputString);

   return jsonResult;
};
