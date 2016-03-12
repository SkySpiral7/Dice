'use strict';
//TODO: re: should DicePool name exist or generate a string? (used for drawing bell curves)
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
            hasDropKeep: hasDropKeep,  //these are informational, they will be ignored by _constructor
            hasExplosions: hasExplosions,
            pool: pool  //TODO: re: needs defense copy
         }
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

      //DicePool._validate(arg2);  //TODO: re: DicePool._validate and others
      //make sure you can't drop all the values or more

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
//ignore for now: sorting
//don't have min/max since that is stupid and only used for Warhammer stats
//old Polynomial.createDiePolynomial had ScatterDie
//old Polynomial.multiplyPolynomials had min/max
