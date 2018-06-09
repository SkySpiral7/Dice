'use strict';
var CustomDice = {};

/**
 * A type of die that picks between one of the possibleValues.
 * It holds on to a shallow copy of possibleValues.
 */
CustomDice.CustomDie = function(possibleValues)
{
   possibleValues = possibleValues.copy();
   var die = new Die(possibleValues.length);
   /**
    * @param randomSource passed down to Die.roll
    * @return a random element of possibleValues. Will be returned as-is rather than wrapped in an array.
    */
   this.roll = function(randomSource)
   {
      return possibleValues[die.roll(randomSource)[0] - 1];
   };
};
/**
 * A type of die that picks between one of the possibleValues then removes that value so that it can't be picked again.
 * Note that it only supports drawing cards. It does not do things like looking at the top card etc.
 * It is not intended to play Magic the Gathering etc it is intended for things like critical hit decks.
 * It holds on to a shallow copy of possibleValues.
 */
CustomDice.DeckOfCards = function(possibleValues)
{
   possibleValues = possibleValues.copy();
   /**
    * @param randomSource passed down to Die.roll
    * @return a random element of possibleValues. Will be removed then returned as-is rather than wrapped in an array.
    */
   this.roll = function(randomSource)
   {
      if(0 === possibleValues.length) throw new Error('No more values');
      var die = new Die(possibleValues.length);
      var index = die.roll(randomSource)[0] - 1;
      var returnValue = possibleValues[index];
      possibleValues.removeByIndex(index);
      return returnValue;
   };
   /**
    * Alias for roll.
    */
   this.draw = this.roll;
};
/**
 * An object with a single function named roll.
 * It holds on to a shallow copy of possibleValues.
 * @param dicePool the DicePool that will be used to roll against the table
 * @param rawRows the table rows. Each must be an object with min (number), and value (anything) or table.
 *                The table property trumps value and the result of the roll method will be returned.
 *                The rows must be in order with the smallest min being first.
 *                If the first element is not an object then it will be assumed to have a min of -Infinity.
 * 
 * Examples:
new CustomDice.RollTable(new DicePool('1d%'), [
'Armor and shields',
{min: 11, value: 'Weapons'},
{min: 21, value: 'Potions'},
{min: 31, value: 'Rings'},
{min: 41, value: 'Rods'},
{min: 51, value: 'Scrolls'},
{min: 66, value: 'Staves'},
{min: 69, value: 'Wands'},
{min: 84, value: 'Wondrous items'}
]);
 */
CustomDice.RollTable = function(dicePool, rawRows)
{
   var rows = [];
   if('object' === typeof(rawRows[0])) rows.push({min: rawRows[0].min, value: rawRows[0].value, table: rawRows[0].table});
   else rows.push({min: -Infinity, value: rawRows[0]});
   for (var i = 1; i < rawRows.length; ++i)
   {
      rows.push({min: rawRows[i].min, value: rawRows[i].value, table: rawRows[i].table});
   }
   /**
    * @param randomSource passed to DicePool.sumRoll
    * @returns the value of the last row that has a min less than or equal to the sum rolled.
    *          undefined if there is no acceptable row.
    */
   this.roll = function(randomSource)
   {
      var sum = dicePool.sumRoll(randomSource);
      for (var i = (rows.length - 1); i >= 0; --i)
      {
         if(rows[i].min <= sum && undefined !== rows[i].table) return rows[i].table.roll(randomSource);
         if(rows[i].min <= sum) return rows[i].value;
      }
      return;
   };
};
