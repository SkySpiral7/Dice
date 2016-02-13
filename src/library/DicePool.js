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
   var name, pool;

   /**@returns {!number} the sum of this.roll()*/
   this.sumRoll = function(randomSource){return Math.summation(this.roll(randomSource));};
   /**@returns {!number[]} an array of every die.roll() result.*/
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
   //TODO: re: consider toDiceArray and creating from a dice array
   /**@returns an object with all DicePool data elements in it. It can be passed into new DicePool()*/
   this.toJSON = function()
   {
      return {  //brace required to be on this line because the semi-colon predictor otherwise assumes I want dead code because it's insane
         'instanceof': 'DicePool',  //this is for a JSON reviver
         name: name,
         pool: pool
      };
   };
   /**@returns true if other is equal to this.*/
   this.equals = function(other)
   {
      if(!(other instanceof DicePool)) return false;
      if(this === other) return true;
      return (JSON.stringify(this) === JSON.stringify(other));
   };

   /**You can't call this function. It is only used internally to create a DicePool object.*/
   this._constructor = function()
   {
      if(undefined !== pool) throw new Error('Illegal access');

      if(arg1 instanceof String) arg1 = arg1.valueOf();
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
      pool = arg2;  //TODO: re: should I do a defense copy? Also in toJSON

      arg1 = undefined;  //no longer needed
      arg2 = undefined;
   };
   this._constructor();
}
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
      groupObject.die = new Die('1' + workingString);

      jsonResult.push(groupObject);
   }
   return jsonResult;
};
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
//ignore for now: min/max, sorting
