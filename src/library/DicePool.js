//TODO: re: die names are used primarily for debugging. Should they exist?
//a DicePool name, on the other hand, is displayed when drawing bell curves
/**
An object than represents a collection of die objects.
It can be created in the following ways:
new DicePool('2d8+2d16')
new DicePool('PoolName', [
{
   die: new Die(),  //will roll the same object twice
   count: 2,
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
      for (var diceIndex = 0; diceIndex < diceArray.length; ++diceIndex)
      {
         for (var dieCount = 0; dieCount < diceArray[diceIndex].count; ++dieCount)
         {
            results = results.concat(diceArray[diceIndex].die.roll(randomSource));
         }
      }
      return results;
   };
}
/**This is an enum.*/
DicePool.dropKeepTypes = {
   DropLowest: {toString: function(){return '{DropLowest}';}, toJSON: function(){return '{DropLowest}';}},
   DropHighest: {toString: function(){return '{DropHighest}';}, toJSON: function(){return '{DropHighest}';}},
   KeepLowest: {toString: function(){return '{KeepLowest}';}, toJSON: function(){return '{KeepLowest}';}},
   KeepHighest: {toString: function(){return '{KeepHighest}';}, toJSON: function(){return '{KeepHighest}';}}
};
//ignore for now: min/max, sorting
