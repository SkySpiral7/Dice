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
}
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
}
