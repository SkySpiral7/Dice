'use strict';
//TODO: should DicePool name exist or generate a string? (used for drawing bell curves)
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
               //TODO: might be possible to optimize this into the die by changing the constant
               //would need to double check math for exploding first. no that would mess up drop/keep
            }
         }
         results = results.concat(groupResults);
      }
      return results;
   };
   /**@returns {!number} the sum of this.roll()*/
   this.sumRoll = function(randomSource){return Math.summation(this.roll(randomSource));};
   //TODO: consider toDiceArray and creating from a dice array
   //TODO: make function this.getPool(). rename that to groups
   /**@returns an object formatted for JsonReviver.reviveWith(). return.value has all of this DicePool's data elements in it*/
   this.toJSON = function()
   {
      return {  //brace required to be on this line because the semi-colon predictor otherwise assumes I want dead code because it's insane
         name: name,
         hasDropKeep: hasDropKeep,  //these are informational, they will be ignored by _constructor
         hasExplosions: hasExplosions,
         pool: DicePool._defensiveCopier(pool)
      };
   };

   /**You can't call this function. It is only used internally to create a DicePool object.*/
   this._constructor = function()
   {
      if(undefined !== pool) throw new Error('Illegal access');

      if('string' === typeof(arg1) && undefined == arg2) arg2 = Parser.dicePool(arg1);
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

      DicePool._validate(arg1, arg2);
      //array of dice is allowed  //TODO: optimize the groups together

      name = arg1;
      pool = DicePool._defensiveCopier(arg2);

      hasDropKeep = false, hasExplosions = false;
      for (var i = 0; i < pool.length; ++i)
      {
         hasDropKeep = hasDropKeep || (undefined !== pool[i].dropKeepType);
         hasExplosions = hasExplosions || (undefined !== pool[i].die.toJSON().explodeType);
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
      The ones closes to -Infinity will be removed.
      All of them will be removed if dropCount >= diceResults.length.*/
      perform: function(dropCount, diceResults)
      {
         diceResults.sort(Number.ascending);
         if(dropCount > diceResults.length) dropCount = diceResults.length;
         for(var i = dropCount; i > 0; --i){diceResults.shift();}
      }
   },
   DropHighest:
   {
      toString: function(){return '{DropHighest}';},
      toJSON: function(){return '{DropHighest}';},
      /**diceResults will have dropCount number of elements removed.
      The ones closes to Infinity will be removed.
      All of them will be removed if dropCount >= diceResults.length.*/
      perform: function(dropCount, diceResults)
      {
         diceResults.sort(Number.ascending);
         diceResults.reverse();
         if(dropCount > diceResults.length) dropCount = diceResults.length;
         for(var i = dropCount; i > 0; --i){diceResults.shift();}
      }
   },
   KeepLowest:
   {
      toString: function(){return '{KeepLowest}';},
      toJSON: function(){return '{KeepLowest}';},
      /**diceResults will have all but dropCount number of elements removed.
      The ones closes to -Infinity will be kept.
      Nothing happens if keepCount > diceResults.length.*/
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
      The ones closes to Infinity will be kept.
      Nothing happens if keepCount > diceResults.length.*/
      perform: function(keepCount, diceResults)
      {
         var dropCount = (diceResults.length - keepCount);
         if(dropCount > 0) DicePool.dropKeepTypes.DropLowest.perform(dropCount, diceResults);
      }
   }
};
/**
This function is used internally by DicePool. It makes a defensive copy of pool
in order to maintain the immutability of DicePool.
You should have no use for it although it isn't harmful to call.
@param {!object[]} originalPool which will be copied and not modified
@return {!object[]} a new array with new objects with all the same values
*/
DicePool._defensiveCopier = function(originalPool)
{
   var poolCopy = [];  //don't use JSON.clone(originalPool) because that will mess up the order of the properties
   for (var i = 0; i < originalPool.length; ++i)
   {
      poolCopy.push({
         die: originalPool[i].die,  //dice are immutable so I can use the same object
         dieCount: originalPool[i].dieCount,
         areDiceNegative: originalPool[i].areDiceNegative,
         dropKeepType: originalPool[i].dropKeepType,
         dropKeepCount: originalPool[i].dropKeepCount
      });
   }
   return poolCopy;
};
/**
This function is used in the constructor of DicePool. It throws if there is anything invalid about the input.
It also normalizes the input.
You should have no use for it although it isn't harmful to call.
@param {!string} debugName prepended to any error message thrown
@param {!object} pool which may be slightly modified (ie gaining default values)
*/
DicePool._validate = function(debugName, pool)
{
   //TODO: improve error messages (include i value)
   requireTypeOf('string', debugName);
   requireInstanceOf(Array, pool);
   if(0 === pool.length) throw new Error(debugName + '\npool must not be empty');
   for (var i = 0; i < pool.length; ++i)
   {
      //if(!(pool[i].die instanceof Die) && 'object' !== typeof(pool[i].die) && 'string' !== typeof(pool[i].die))
         //throw new Error(debugName + '\ninvalid die: ' + pool[i].die);
         //don't both since Die will throw anyway. I decided to allow die: 2 which works but is confusing
      if(!(pool[i].die instanceof Die)) pool[i].die = new Die(pool[i].die);  //die required: throws if can't create

      if(undefined == pool[i].dieCount) pool[i].dieCount = 1;
      else if(!Number.isNatural(pool[i].dieCount)) throw new Error(debugName + '\ninvalid dieCount: ' + pool[i].dieCount);

      if (undefined != pool[i].dropKeepType || undefined != pool[i].dropKeepCount)
      {
         if(undefined == pool[i].dropKeepCount) pool[i].dropKeepCount = 1;
         if(!Number.isNatural(pool[i].dropKeepCount)) throw new Error(debugName + '\ninvalid dropKeepCount: ' + pool[i].dropKeepCount);
         var explodeType = pool[i].die.toJSON().explodeType;
         var hasFiniteDiceCount = (undefined === explodeType || Die.explodeTypes.Compound === explodeType);
         if(hasFiniteDiceCount && pool[i].dropKeepCount >= pool[i].dieCount) throw new Error(debugName + '\ndropKeepCount ('
            + pool[i].dropKeepCount + ') is too large. dieCount=' + pool[i].dieCount);
         //'3d3! drop 5' is allowed but stupid

         if(DicePool.dropKeepTypes.DropLowest !== pool[i].dropKeepType && DicePool.dropKeepTypes.DropHighest !== pool[i].dropKeepType
            && DicePool.dropKeepTypes.KeepLowest !== pool[i].dropKeepType && DicePool.dropKeepTypes.KeepHighest !== pool[i].dropKeepType)
            throw new Error(debugName + '\ninvalid dropKeepType: ' + pool[i].dropKeepType);
      }
      else pool[i].dropKeepType = pool[i].dropKeepCount = undefined;
      //these aren't deleted so that DicePool._defensiveCopier will always produce the same number of keys
      //this makes production code easier at the cost of complicating tests (correct priority). both costs are small.

      if(undefined == pool[i].areDiceNegative) pool[i].areDiceNegative = false;
      else if('boolean' !== typeof(pool[i].areDiceNegative)) throw new Error(debugName + '\ninvalid areDiceNegative: ' + pool[i].areDiceNegative);
   }
};
//ignore for now: sorting
//don't have min/max since that is stupid and only used for Warhammer stats
//old Polynomial.createDiePolynomial had ScatterDie
//old Polynomial.multiplyPolynomials had min/max
