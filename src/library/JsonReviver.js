'use strict';
var JsonReviver = {};
/**A reviver for JSON.parse. If the parsed object has properties reviveWith and value then that object will be revived.
This function returns new X(value.value) if(value.useNew) where value.reviveWith = 'X';
if(!value.useNew) returns X(value.value)
Note that value.reviveWith may contain dots so that name spaces can be used.
Since calling value.reviveWith will execute arbitrary code: do not use this reviver if you do not trust the JSON being parsed.
@param key is ignored
@throws Error if value.reviveWith exists but couldn't be revived.
*/
JsonReviver.reviveWith = function(key, value)
{
   //TODO: re: (Reviver) What about non-string reviveWith?
   if('string' !== typeof(value.reviveWith)) return value;

   var reviveWith = value.reviveWith.trim();
   try{reviveWith = eval(reviveWith);}
   catch(e)
   {
      console.warn('Could not revive', key, value, e);
      throw e;  //ReferenceError, TypeError, or if reviveWith called a function that got an error
   }
   if ('function' !== typeof(reviveWith))
   {
      throw new Error('Not a function. key:' + key + ', value:' + JSON.stringify(value));
      //it needs to be a function for both return statements below
   }

   try
   {
      //I'll allow typeof(useNew) !== 'boolean' even though it should be either true or false
      if(value.useNew) return new reviveWith(value.value);
      return reviveWith(value.value);
   }
   catch(e)
   {
      console.warn('Could not revive', key, value, e);
      throw e;
   }
};
/**A reviver for JSON.parse. If value.eval exists then eval will be called on it.
This allows for unlimited versatility.
Do not use this reviver if you do not trust the JSON being parsed.
@param key is ignored
*/
JsonReviver.eval = function(key, value)
{
   if(undefined == value.eval) return value;

   try{return eval(value.eval);}
   catch(e)
   {
      console.warn('Could not revive', key, value, e);
      throw e;
   }
};
