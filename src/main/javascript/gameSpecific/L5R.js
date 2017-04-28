'use strict';
var L5R = {};
/**
This function is a convenience function for creating a DicePool for the game Legend of the Five Rings (L5R).

It can be called in the following ways:
new L5R.DicePool('3k1', true)  //true is optional and means hasEmphasis
L5R.DicePool(3, 2, false)  //false is optional and means !hasEmphasis
L5R.DicePool({diceRolled: 3, diceKept: 2, hasEmphasis: true})  //hasEmphasis is optional

@returns {object} a DicePool that is legal in L5R
*/
L5R.DicePool = function(arg1, arg2, arg3)
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
   if('string' === typeof(arg1)) jsonResult = L5R.Parser(arg1, arg2);
   else throw new Error('Illegal argument. input was: ' + debugString);

   var dicePoolName = '' + jsonResult[0].dieCount + 'k';
   if(undefined === jsonResult[0].dropKeepCount) dicePoolName += jsonResult[0].dieCount;
   else dicePoolName += jsonResult[0].dropKeepCount;
   if(undefined !== jsonResult[0].die.rerollCriteria) dicePoolName += ' emphasis';

   var dicePool = new DicePool(dicePoolName, jsonResult);
   var jsonResult = dicePool.toJSON();

   if(jsonResult.pool.length !== 1) throw new Error('Not a valid L5R DicePool: multiple dice groups. input was: ' + debugString);
   //negative is covered by L5R.Parser which will always be called
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
L5R.Parser = function(inputString, hasEmphasis)
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
/**
This is prebuilt function for rolling dice in the game Legend of the Five Rings (L5R).
Input's circumstanceBonus, numberOfRaises, and randomSource are optional.
Input's circumstanceBonus can also be negative to represent a penalty.
Note that the numberOfRaises will raise the targetNumber so don't pass in any free raises.
Likewise if a free raise was used to increase the result then instead add 5 to circumstanceBonus.

Simplified contract, given:
{?circumstanceBonus, ?numberOfRaises, targetNumber, diceRolled, diceKept, ?hasEmphasis, ?randomSource}
returns:
{valuesKept[], totalValue, voidPointsRecovered, valuesDropped[], success}

@param {object} input (which may be mutated) with: {?number: integer}circumstanceBonus, {?number: natural}numberOfRaises,
   {number: natural}targetNumber, {number: natural}diceRolled, {number: natural}diceKept,
   {?boolean}hasEmphasis, {?function}randomSource (see Die.roll)
@returns {object} with: {number[]: natural}valuesKept, {number: integer}totalValue, {number: integer}voidPointsRecovered,
   {number[]: natural}valuesDropped, {boolean}success
*/
//TODO: consider how to improve doc (for all functions)
L5R.GeneralRoll = function(input)
{
   if(undefined === input.circumstanceBonus) input.circumstanceBonus = 0;
   else if(!Number.isInteger(input.circumstanceBonus)) throw new Error('Must be an integer but was ' + input.circumstanceBonus);
   if(undefined === input.numberOfRaises) input.numberOfRaises = 0;
   else if(!Number.isInteger(input.numberOfRaises) || input.numberOfRaises < 0) throw new Error('Must be a non-negative integer but was ' + input.numberOfRaises);
   requireNaturalNumber(input.targetNumber);
   requireNaturalNumber(input.diceRolled);
   if(input.diceRolled > 10) throw new Error('It\'s never possible to roll more than 10 dice. input was: ' + input.diceRolled);
   requireNaturalNumber(input.diceKept);
   if(input.diceKept > input.diceRolled) throw new Error('diceKept (' + input.diceKept + ') is more than diceRolled (' + input.diceRolled + ')');
      //below doesn't use DicePool's KeepHighest therefore I must validate diceKept myself
   if(true !== input.hasEmphasis) input.hasEmphasis = false;

   input.targetNumber += (input.numberOfRaises * 5);  //increase difficulty

   var output = {valuesKept: [], totalValue: 0, voidPointsRecovered: 0, valuesDropped: [], success: undefined};
   output.toString = function(){return L5R.GeneralRoll.Stringifier(this);};
   var dicePool = new DicePool(input.diceRolled + 'd10!!' + (input.hasEmphasis ? 'r1' : ''));

   var allValues = dicePool.roll(input.randomSource);
   allValues.sort(Number.ascending);

   //start with the highest number and count down until there's no explosion
   for (var i = allValues.length - 1; i >= 0 && allValues[i] >= 10; --i)
   {
      output.voidPointsRecovered += Math.floor(allValues[i] / 10);  //for each explode. most dice don't recover void
      //void points are recovered even for dice that are dropped
   }
   output.voidPointsRecovered = Math.floor(output.voidPointsRecovered / 2);  //every other explode

   var dropCount = (allValues.length - input.diceKept);
   output.valuesDropped = allValues.splice(0, dropCount);
   output.valuesKept = allValues;  //rename allValues since it has been mutated
   output.totalValue = Math.summation(output.valuesKept) + input.circumstanceBonus;  //circumstanceBonus may be negative

   output.success = (output.totalValue >= input.targetNumber);

   return output;
};
/**
@param {!object} rollResults the results of L5R.GeneralRoll
@returns {!string} a human readable description of those results
*/
L5R.GeneralRoll.Stringifier = function(rollResults)
{
   {  //block of first output line
      var output;
      if(rollResults.valuesDropped.length > 0) output = 'Values kept: ';
      else output = 'Values: ';

      output += rollResults.valuesKept.toString().replace(/,/g, '+');
      var keptSum = Math.summation(rollResults.valuesKept);
      output += ' = ' + keptSum;

      if (keptSum !== rollResults.totalValue)
      {
         //it's ok to reverse engineer the circumstanceBonus because it's easy to do
         //and it would be silly to have circumstanceBonus in the output of the Prebuilt
         if(keptSum < rollResults.totalValue) output += '+';
         output += '' + (rollResults.totalValue - keptSum);
         output += ' = ' + rollResults.totalValue;
      }
      output += '\n';
   }

   output += 'Void points recovered: ' + rollResults.voidPointsRecovered + '. ';
   output += 'Result: ' + (rollResults.success ? 'Success' : 'Failure') + '\n';

   if(rollResults.valuesDropped.length > 0) output += 'Values dropped: ' + rollResults.valuesDropped.toString() + '\n';

   return output;
};
