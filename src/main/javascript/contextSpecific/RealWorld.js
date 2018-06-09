'use strict';
var RealWorld = {};
RealWorld.Coin = new CustomDice.CustomDie(['Heads', 'Tails']);
RealWorld.Coin.flip = RealWorld.Coin.roll;
/** Note that there are 10 "yes", 5 neutral, and 5 "no". Therefore whenever you roll it the "Outlook [is] good". */
RealWorld.MagicEightBall = new CustomDice.CustomDie([
   'As I see it, yes',
   'It is certain',
   'It is decidedly so',
   'Most likely',
   'Outlook good',
   'Signs point to yes',
   'Without a doubt',
   'Yes',
   'Yes - definitely',
   'You may rely on it',
   'Reply hazy, try again',
   'Ask again later',
   'Better not tell you now',
   'Cannot predict now',
   'Concentrate and ask again',
   'Don\'t count on it',
   'My reply is no',
   'My sources say no',
   'Outlook not so good',
   'Very doubtful'
]);
RealWorld.MagicEightBall.shake = RealWorld.MagicEightBall.ask = RealWorld.MagicEightBall.roll;
/**
 * Based on the French playing cards this 52 card deck is the most common deck globally.
 * It contains 4 suits and 13 cards in each suit.
 * The part that's not a global standard is the jokers.
 * In my experience (in the USA) decks always include 2 jokers however most games don't use them.
 * @param includeJokers if true will include 2 jokers (one of each color)
 * @return a deck of objects with the keys Suit (one of Clubs, Diamonds, Hearts, or Spades. undefined for Jokers), FaceName (either Ace, Jack, Queen, King, Joker, or undefined),
 * NumericValue (1-13. 0 for Jokers), and Color (either Black or Red).
 */
RealWorld.StandardAmericanPlayingCards = function(includeJokers)
{
   var deckValues = makeSingleSuit('Clubs', 'Black')
      .concat(makeSingleSuit('Diamonds', 'Red'))
      .concat(makeSingleSuit('Hearts', 'Red'))
      .concat(makeSingleSuit('Spades', 'Black'));
   if (true === includeJokers)
   {
      deckValues = deckValues.concat([
         {FaceName: 'Joker', NumericValue: 0, Color: 'Black'},
         {FaceName: 'Joker', NumericValue: 0, Color: 'Red'}
      ]);
   }
   return new CustomDice.DeckOfCards(deckValues);

   function makeSingleSuit(suit, color)
   {
      var suitValues = [
         {Suit: suit, FaceName: 'Ace', NumericValue: 1, Color: color}
      ];
      for (var value = 2; value <= 10; ++value)
      {
         suitValues.push({Suit: suit, NumericValue: value, Color: color});
      }
      suitValues = suitValues.concat([
         {Suit: suit, FaceName: 'Jack', NumericValue: 11, Color: color},
         {Suit: suit, FaceName: 'Queen', NumericValue: 12, Color: color},
         {Suit: suit, FaceName: 'King', NumericValue: 13, Color: color}
      ]);
      return suitValues;
   }
};
/**
 * The Rider-Waite tarot deck is the most popular tarot card deck.
 * It contains 5 suits with 14 cards in each suit except the trump suit which has 22 cards (a total of 78 cards).
 * The Fool is considered part of the trump suit and has a NumericValue of 0.
 * 
 * The trump suit has the following FaceNames:
 * The Fool, The Magician, The High Priestess, The Empress, The Emperor, The Hierophant,
 * The Lovers, The Chariot, Strength, The Hermit, Wheel of Fortune, Justice, The Hanged Man, Death, Temperance,
 * The Devil, The Tower, The Star, The Moon, The Sun, Judgement, The World
 * 
 * @return a deck of object with these keys: Suit (one of Cups, Pentacles, Swords, Wands, or Trump), FaceName (either Ace, Page, Knight, Queen, King, undefined, or the name of a trump card),
 * and NumericValue (1-14 or for the trump suit 0-21)
 */
RealWorld.RiderWaiteTarotDeck = function()
{
   var deckValues = makeSingleSuit('Cups')
      .concat(makeSingleSuit('Pentacles'))
      .concat(makeSingleSuit('Swords'))
      .concat(makeSingleSuit('Wands'))
      .concat([
         {Suit: 'Trump', FaceName: 'The Fool', NumericValue: 0},
         {Suit: 'Trump', FaceName: 'The Magician', NumericValue: 1},
         {Suit: 'Trump', FaceName: 'The High Priestess', NumericValue: 2},
         {Suit: 'Trump', FaceName: 'The Empress', NumericValue: 3},
         {Suit: 'Trump', FaceName: 'The Emperor', NumericValue: 4},
         {Suit: 'Trump', FaceName: 'The Hierophant', NumericValue: 5},
         {Suit: 'Trump', FaceName: 'The Lovers', NumericValue: 6},
         {Suit: 'Trump', FaceName: 'The Chariot', NumericValue: 7},
         {Suit: 'Trump', FaceName: 'Strength', NumericValue: 8},
         {Suit: 'Trump', FaceName: 'The Hermit', NumericValue: 9},
         {Suit: 'Trump', FaceName: 'Wheel of Fortune', NumericValue: 10},
         {Suit: 'Trump', FaceName: 'Justice', NumericValue: 11},
         {Suit: 'Trump', FaceName: 'The Hanged Man', NumericValue: 12},
         {Suit: 'Trump', FaceName: 'Death', NumericValue: 13},
         {Suit: 'Trump', FaceName: 'Temperance', NumericValue: 14},
         {Suit: 'Trump', FaceName: 'The Devil', NumericValue: 15},
         {Suit: 'Trump', FaceName: 'The Tower', NumericValue: 16},
         {Suit: 'Trump', FaceName: 'The Star', NumericValue: 17},
         {Suit: 'Trump', FaceName: 'The Moon', NumericValue: 18},
         {Suit: 'Trump', FaceName: 'The Sun', NumericValue: 19},
         {Suit: 'Trump', FaceName: 'Judgement', NumericValue: 20},
         {Suit: 'Trump', FaceName: 'The World', NumericValue: 21}
      ]);
   return new CustomDice.DeckOfCards(deckValues);

   function makeSingleSuit(suit)
   {
      var suitValues = [
         {Suit: suit, FaceName: 'Ace', NumericValue: 1}
      ];
      for (var value = 2; value <= 10; ++value)
      {
         suitValues.push({Suit: suit, NumericValue: value});
      }
      suitValues = suitValues.concat([
         {Suit: suit, FaceName: 'Page', NumericValue: 11},
         {Suit: suit, FaceName: 'Knight', NumericValue: 12},
         {Suit: suit, FaceName: 'Queen', NumericValue: 13},
         {Suit: suit, FaceName: 'King', NumericValue: 14}
      ]);
      return suitValues;
   }
};
