'use strict';
//TODO: re: die names are used primarily for debugging. Should they exist?
//a DicePool name, on the other hand, is displayed when drawing bell curves
/**
An object than represents a collection of die objects.
It can be created in the following ways:
new DicePool('2d8+2d16')
new DicePool('PoolName', [  //PoolName is optional. You may pass in only a single argument.
{
   die: new Die(),  //will roll the same object twice
   dieCount: 2,
   dropKeepType: DicePool.dropKeepTypes.DropLowest,
   dropKeepCount: 1,
   areDiceNegative: false
}
]);
new DicePool({name: 'PoolName', pool: [
{
   die: new Die(),  //will roll the same object twice
   dieCount: 2,
   dropKeepType: DicePool.dropKeepTypes.DropLowest,
   dropKeepCount: 1,
   areDiceNegative: false
}
]});
*/
function DicePool(arg1, arg2)
{
   var name, pool, hasDropKeep, hasExplosions;

   /**@returns {!boolean} true if other is equal to this.*/
   this.equals = function(other)
   {
      if(!(other instanceof DicePool)) return false;
      if(this === other) return true;
      return (JSON.stringify(this) === JSON.stringify(other));
   };
   /**
   @param {?function} randomSource a function that returns a random number between 0 inclusive and 1 exclusive.
   If not provided Math.random will be used.
   @returns {!number[]} an array of every die.roll() result.
   */
   this.roll = function(randomSource)
   {
      var results = [];
      for (var groupIndex = 0; groupIndex < pool.length; ++groupIndex)
      {
         var groupResults = [];
         for (var dieIndex = 0; dieIndex < pool[groupIndex].dieCount; ++dieIndex)
         {
            groupResults = groupResults.concat(pool[groupIndex].die.roll(randomSource));
         }
         if(undefined !== pool[groupIndex].dropKeepType) pool[groupIndex].dropKeepType.
            perform(pool[groupIndex].dropKeepCount, groupResults);
         if (pool[groupIndex].areDiceNegative)  //the only valid truthy value is true
         {
            for (var groupResultIndex = 0; groupResultIndex < groupResults.length; ++groupResultIndex)
            {
               groupResults[groupResultIndex] *= -1;
               //TODO: re: might be possible to optimize this into the die by changing the constant
               //would need to double check math for exploding first. no that would mess up drop/keep
            }
         }
         results = results.concat(groupResults);
      }
      return results;
   };
   /**@returns {!number} the sum of this.roll()*/
   this.sumRoll = function(randomSource){return Math.summation(this.roll(randomSource));};
   //TODO: re: consider toDiceArray and creating from a dice array
   //TODO: re: make function this.getPool(). rename that to groups
   /**@returns an object formatted for JsonReviver.reviveWith(). return.value has all of this DicePool's data elements in it*/
   this.toJSON = function()
   {
      return {  //brace required to be on this line because the semi-colon predictor otherwise assumes I want dead code because it's insane
         reviveWith: 'DicePool',
         useNew: true,
         value:
         {
            name: name,
            hasDropKeep: hasDropKeep,
            hasExplosions: hasExplosions,
            pool: pool  //TODO: re: needs defense copy
         }
      };
   };

   /**You can't call this function. It is only used internally to create a DicePool object.*/
   this._constructor = function()
   {
      if(undefined !== pool) throw new Error('Illegal access');

      if('string' === typeof(arg1) && undefined == arg2) arg2 = DicePool._parseString(arg1);
      else if (undefined == arg2 && undefined != arg1.pool)
      {
         arg2 = arg1.pool;
         arg1 = arg1.name;
      }
      else if (undefined == arg2)
      {
         arg2 = arg1;
         arg1 = 'DicePool';
      }

      //DicePool._validate(arg2);  //TODO: re: DicePool._validate and others

      name = arg1;
      pool = arg2;
      //pool = JSON.clone(arg2, JsonReviver.reviveWith);  //defense copy and creates the Die objects

      hasDropKeep = false, hasExplosions = false;
      for (var i = 0; i < pool.length; ++i)
      {
         if(!(pool[i].die instanceof Die)) pool[i].die = new Die(pool[i].die);
         hasDropKeep = hasDropKeep || (undefined !== pool[i].dropKeepType);
         hasExplosions = hasExplosions || (undefined !== pool[i].die.toJSON().value.explodeType);
         if(hasDropKeep && hasExplosions) break;  //no more information to find
      }

      arg1 = undefined;  //no longer needed
      arg2 = undefined;
   };
   this._constructor();
}
/**This is an enum and strategy pattern.*/
DicePool.dropKeepTypes = {
   DropLowest:
   {
      toString: function(){return '{DropLowest}';},
      toJSON: function(){return '{DropLowest}';},
      /**diceResults will have dropCount number of elements removed.
      The ones closes to -Infinity will be removed.*/
      perform: function(dropCount, diceResults)
      {
         diceResults.sort(Number.ascending);
         for(var i = dropCount; i > 0; --i){diceResults.shift();}
      }
   },
   DropHighest:
   {
      toString: function(){return '{DropHighest}';},
      toJSON: function(){return '{DropHighest}';},
      /**diceResults will have dropCount number of elements removed.
      The ones closes to Infinity will be removed.*/
      perform: function(dropCount, diceResults)
      {
         diceResults.sort(Number.ascending);
         diceResults.reverse();
         for(var i = dropCount; i > 0; --i){diceResults.shift();}
      }
   },
   KeepLowest:
   {
      toString: function(){return '{KeepLowest}';},
      toJSON: function(){return '{KeepLowest}';},
      /**diceResults will have all but dropCount number of elements removed.
      The ones closes to -Infinity will be kept (possibly all of them).*/
      perform: function(keepCount, diceResults)
      {
         var dropCount = (diceResults.length - keepCount);
         if(dropCount > 0) DicePool.dropKeepTypes.DropHighest.perform(dropCount, diceResults);
      }
   },
   KeepHighest:
   {
      toString: function(){return '{KeepHighest}';},
      toJSON: function(){return '{KeepHighest}';},
      /**diceResults will have all but dropCount number of elements removed.
      The ones closes to Infinity will be kept (possibly all of them).*/
      perform: function(keepCount, diceResults)
      {
         var dropCount = (diceResults.length - keepCount);
         if(dropCount > 0) DicePool.dropKeepTypes.DropLowest.perform(dropCount, diceResults);
      }
   }
};
/**
This function is used in the constructor of DicePool. It parses the inputString into an object array.
You should have no use for it although it isn't harmful to call.
@param {!string} inputString
@returns {!object[]} the object array needed to create a DicePool. Not optimized or validated.
*/
DicePool._parseString = function(inputString)
{
   var jsonResult = [];
   var workingString = inputString.toLowerCase().replace(/-/g, '+-');  //make copy so that parse errors can use inputString
   var groupStringArray = workingString.split('+');
   if('-' === inputString.trim()[0]) groupStringArray.shift();  //leading negative causes first element to be empty
   for (var groupIndex = 0; groupIndex < groupStringArray.length; ++groupIndex)
   {
      var groupObject = {};
      workingString = groupStringArray[groupIndex].trim();
      if('-' === workingString[0]){groupObject.areDiceNegative = true; workingString = workingString.substring(1);}
      if ((/^\d/).test(workingString))
      {
         groupObject.dieCount = Number.parseInt(workingString);  //only parses leading integer
         workingString = workingString.substring(groupObject.dieCount.toString().length);  //remove sideCount from workingString
      }
      else groupObject.dieCount = 1;
      groupObject.die = Die._parseString('1' + workingString);

      jsonResult.push(groupObject);
   }
   return jsonResult;
};
/**
This function is used in the constructor of Die. It parses the inputString into an object.
You should have no use for it although it isn't harmful to call.
@param {!string} inputString
@returns {!object} the object needed to create a Die. Not optimized or validated.
*/
Die._parseString = function(inputString)
{
   inputString = '' + inputString;  //enforces string type and is null safe
   var jsonResult = {name: inputString};
   var workingString = inputString.trim().toLowerCase().replace(/\s+/g, ' ');  //make copy so that parse errors can use inputString

   if((/^1(?:[^\d%]|$)/).test(workingString)) workingString = workingString.substring(1);  //chop off 1
   else if((/^0(?:[^\d%]|$)/).test(workingString)) throw new Error(inputString + '\ninvalid dieCount: 0');
   else if((/^[\d%]/).test(workingString)) throw new Error(inputString + '\ndie count (if provided) must be 1. Otherwise use DicePool');

   jsonResult.constantModifier = 0;
   if('z' === workingString[0]) jsonResult.constantModifier = -1;
   if(!(/^[zd]/).test(workingString)) throw new Error(inputString + '\nexpected "d" or "z". Found: ' + workingString);
   workingString = workingString.substring(1);  //chop off 'd' or 'z'
   if('%' === workingString[0]) workingString = workingString.replace(/%/, '100');  //replace first % with 100
   workingString = workingString.replace(/%/g, '00');  //replace all other % with 2 more zeros

   if ('f' === workingString[0])
   {
      //isFudgeDie is defined in validate
      jsonResult.constantModifier = -2;  //1df and 1zf are the same thing so ignore current value of constantModifier
      jsonResult.sideCount = 3;
      workingString = workingString.substring(1);  //chop off 'f'
      if('' !== workingString) throw new Error(inputString + '\nFudge/Fate dice don\'t explode or reroll. Illegal: ' + workingString);
      return jsonResult;
   }
   else if ((/^\d+/).test(workingString))
   {
      jsonResult.sideCount = Number.parseInt(workingString);  //only parses leading integer
      workingString = workingString.substring(jsonResult.sideCount.toString().length);  //remove sideCount from workingString
   }
   else throw new Error(inputString + '\nexpected sideCount. Found: ' + workingString);

   //shorthand must come before longhand
   while (workingString.length > 0)
   {
      if ('!' === workingString[0])
      {
         if(undefined !== jsonResult.explodeType) throw new Error(inputString + '\nmultiple explosions found. Max is 1');
         workingString = workingString.substring(1);  //chop off '!'
         if ('!' === workingString[0])  //if it had '!!'
         {
            workingString = workingString.substring(1);
            jsonResult.explodeType = Die.explodeTypes.Compound;
         }
         else if ('p' === workingString[0])
         {
            workingString = workingString.substring(1);  //chop off 'p'
            jsonResult.explodeType = Die.explodeTypes.Penetrating;
         }
         else jsonResult.explodeType = Die.explodeTypes.Normal;
      }
      else if ((/^r(?:[<>]=?|[!=]?==?)?-?\d+/).test(workingString))
      {
         if(undefined !== jsonResult.rerollCriteria) throw new Error(inputString + '\nmultiple reroll criteria found. Max is 1');
            //could theoretically be an array of criteria but throw for now
         workingString = workingString.substring(1);  //chop off 'r'
         if((/^-?\d+/).test(workingString)) workingString = '==' + workingString;  //default
         jsonResult.rerollCriteria = (/^.=?=?-?\d+/).exec(workingString)[0];
         workingString = workingString.substring(jsonResult.rerollCriteria.length);  //remove rerollCriteria from workingString
         if('=' === jsonResult.rerollCriteria) jsonResult.rerollCriteria = '==';  //must be double equal signs for eval
      }
      else break;
   }
   //TODO: re: figure out how to make DRY while still enforcing shorthand then longhand
   while (workingString.length > 0)  //longhand loop
   {
      //as per the robustness principle I don't care about English grammar as long as the meaning is clear
      if ((/^(?: penetrat(?:ing|e)| compound(?:ing)?)? explo(?:sions?|ding|de)(?: dic?e)?/).test(workingString))
      {
         if(undefined !== jsonResult.explodeType) throw new Error(inputString + '\nmultiple explosions found. Max is 1');
         if (workingString.startsWith(' compound'))
         {
            workingString = workingString.replace(/ compound(?:ing)?/, '');  //remove word
            jsonResult.explodeType = Die.explodeTypes.Compound;
         }
         else if (workingString.startsWith(" penetrat"))
         {
            workingString = workingString.replace(/ penetrat(?:ing|e)/, '');  //remove word
            jsonResult.explodeType = Die.explodeTypes.Penetrating;
         }
         else jsonResult.explodeType = Die.explodeTypes.Normal;
         workingString = workingString.replace(/ explo(?:sions?|ding|de)(?: dic?e)?/, '');  //remove word(s)
      }
      else if ((/^ reroll (?:dic?e (?:that are )?)?(?:(?:greater|less) than(?: or equal(?: to)?)? |(?:not )?equal(?: to)? )?-?\d+/).test(workingString))
      {
         if(undefined !== jsonResult.rerollCriteria) throw new Error(inputString + '\nmultiple reroll criteria found. Max is 1');
            //could theoretically be an array of criteria but throw for now
         workingString = workingString.replace(/^ reroll (?:dic?e (?:that are )?)?/, '');  //remove word(s)
         if ((/^greater than (?:or )?/).test(workingString))
         {
            jsonResult.rerollCriteria = '>';
            workingString = workingString.replace(/^greater than (?:or )?/, '');
         }
         else if ((/^less than (?:or )?/).test(workingString))
         {
            jsonResult.rerollCriteria = '<';
            workingString = workingString.replace(/^less than (?:or )?/, '');
         }
         else if ((/^not /).test(workingString))
         {
            jsonResult.rerollCriteria = '!';
            workingString = workingString.replace(/^not /, '');
         }
         else jsonResult.rerollCriteria = '';

         if ((/^equal(?: to)? /).test(workingString))
         {
            jsonResult.rerollCriteria += '=';
            workingString = workingString.replace(/^equal(?: to)? /, '');
         }
         if('=' === jsonResult.rerollCriteria || '' === jsonResult.rerollCriteria) jsonResult.rerollCriteria = '==';
           //first is if 'equal' and the other is default
         jsonResult.rerollCriteria += Number.parseInt(workingString);  //grab number
         workingString = workingString.replace(/^-?\d+/, '');  //remove
      }
      else break;
   }
   //for now keep constantModifier internal only
   //if((/^ *[-+] *\d+$/).test(workingString)){jsonResult.constantModifier=Number(workingString); workingString='';}
   if('' !== workingString) throw new Error(inputString + '\nUnparsable: ' + workingString);

   return jsonResult;
};
//TODO: re: DicePool._parseString does everything
//ignore for now: min/max, sorting
//old Polynomial.createDiePolynomial had negative and ScatterDie
//old Polynomial.multiplyPolynomials had min/max
