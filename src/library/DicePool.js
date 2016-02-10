//TODO: re: die names are used primarily for debugging. Should they exist?
//a DicePool name, on the other hand, is displayed when drawing bell curves
/**
An object than represents a collection of die objects.
It can be created in the following ways:
new DicePool('2d8+2d16')
new DicePool('PoolName', [
{
   die: new Die(),  //will roll the same object twice
   dieCount: 2,
   dropKeepType: DicePool.dropKeepTypes.DropLowest,
   dropKeepCount: 1,
   areDiceNegative: false
}
]);
*/
function DicePool(name, diceArray)
{
   /**@returns {!number} the sum of this.roll()*/
   this.sumRoll = function(randomSource){return Math.summation(this.roll(randomSource));};
   /**@returns {!number[]} an array of every die.roll() result.*/
   this.roll = function(randomSource)
   {
      var results = [];
      for (var groupIndex = 0; groupIndex < diceArray.length; ++groupIndex)
      {
         var groupResults = [];
         for (var dieIndex = 0; dieIndex < diceArray[groupIndex].dieCount; ++dieIndex)
         {
            groupResults = groupResults.concat(diceArray[groupIndex].die.roll(randomSource));
         }
         if(undefined !== diceArray[groupIndex].dropKeepType) diceArray[groupIndex].dropKeepType.
            perform(diceArray[groupIndex].dropKeepCount, groupResults);
         if (diceArray[groupIndex].areDiceNegative)  //the only valid truthy value is true
         {
            for (var groupResultIndex = 0; groupResultIndex < groupResults.length; ++groupResultIndex)
            {
               groupResults[groupResultIndex] *= -1;
               //TODO: re: might be possible to optimize this into the die by changing the constant
               //would need to double check math for exploding first
            }
         }
         results = results.concat(groupResults);
      }
      return results;
   };
}
/**This is an enum and strategy pattern.*/
DicePool.dropKeepTypes = {
   DropLowest:
   {
      toString: function(){return '{DropLowest}';},
      toJSON: function(){return '{DropLowest}';},
      perform: function(dropKeepCount, diceResults)
      {
         var newResults = [];
         return diceResults;
      }
   },
   DropHighest:
   {
      toString: function(){return '{DropHighest}';},
      toJSON: function(){return '{DropHighest}';},
      perform: function(dropKeepCount, diceResults)
      {
         var newResults = [];
         return diceResults;
      }
   },
   KeepLowest:
   {
      toString: function(){return '{KeepLowest}';},
      toJSON: function(){return '{KeepLowest}';},
      perform: function(dropKeepCount, diceResults)
      {
         var newResults = [];
         return diceResults;
      }
   },
   KeepHighest:
   {
      toString: function(){return '{KeepHighest}';},
      toJSON: function(){return '{KeepHighest}';},
      perform: function(dropKeepCount, diceResults)
      {
         var newResults = [];
         return diceResults;
      }
   }
};
//ignore for now: min/max, sorting
