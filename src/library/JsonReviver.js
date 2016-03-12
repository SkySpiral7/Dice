'use strict';
var JsonReviver = {};
/**A reviver for JSON.parse. If the parsed object has properties reviveWith and value then that object will be revived.
This function returns new X(value.value) if(value.useNew) where value.reviveWith = 'X';
if(!value.useNew) returns X(value.value)
Note that value.reviveWith may contain dots so that name spaces can be used.
@param key is ignored
@throws Error if value.reviveWith exists but couldn't (or won't) be revived.
*/
JsonReviver.reviveWith = function(key, value)
{
   //TODO: re: (Reviver) What about non-string reviveWith?
   if('string' !== typeof(value.reviveWith)) return value;

   var reviveWith = value.reviveWith.trim();
   if(!(/^[\w.]+$/).test(reviveWith))  //eval safety
   {
      throw new Error('evil code detected. key:' + key + ', value:' + JSON.stringify(value));
   }
   try{reviveWith = eval(reviveWith);}
   catch(e)
   {
      console.warn('Could not revive', key, value, e);
      throw e;  //ReferenceError: <reviveWith's value> is not defined
   }
   if ('function' !== typeof(reviveWith))
   {
      throw new Error('Not a function. key:' + key + ', value:' + JSON.stringify(value));
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
