'use strict';
var JsonReviver = {};
/**A reviver for JSON.parse. The only 2 recognized keys are die and dicePool (others will return the value as is).
The keys die and dicePool will pass the value into a new Die and DicePool respectively.
@throws Error if the constructors of Die or DicePool threw then console.warn will be called followed by rethrowing.
*/
JsonReviver.dicePool = function(key, value)  //TODO: re: have them use this
{
   try
   {
      if('die' === key && !(value instanceof Die)) return new Die(value);
      if('dicePool' === key && !(value instanceof DicePool)) return new DicePool(value);
   }
   catch(e)
   {
      console.warn('Could not revive', key, value, e);
      throw e;
   }
   return value;
};
