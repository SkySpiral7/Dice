'use strict';
TestSuite.RealWorld = {};
TestSuite.RealWorld.Coin = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], nonRandomGenerator;

   try{
   nonRandomGenerator = numberGenerator.dice(2, [1]);
   assertions.push({Expected: 'Heads', Actual: RealWorld.Coin.roll(nonRandomGenerator), Description: 'Happy path'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path'});}

   try{
   nonRandomGenerator = numberGenerator.dice(2, [2]);
   assertions.push({Expected: 'Tails', Actual: RealWorld.Coin.flip(nonRandomGenerator), Description: 'flip is alias for roll'});
   } catch(e){assertions.push({Error: e, Description: 'flip is alias for roll'});}

   return TestRunner.displayResults('RealWorld RealWorld.Coin', assertions, testState);
};
TestSuite.RealWorld.MagicEightBall = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], nonRandomGenerator;

   try{
   nonRandomGenerator = numberGenerator.dice(20, [20]);
   assertions.push({Expected: 'Very doubtful', Actual: RealWorld.MagicEightBall.roll(nonRandomGenerator), Description: 'Happy path'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path'});}

   try{
   nonRandomGenerator = numberGenerator.dice(20, [1]);
   assertions.push({Expected: 'As I see it, yes', Actual: RealWorld.MagicEightBall.shake(nonRandomGenerator), Description: 'shake is alias for roll'});
   } catch(e){assertions.push({Error: e, Description: 'shake is alias for roll'});}

   try{
   nonRandomGenerator = numberGenerator.dice(20, [19]);
   assertions.push({Expected: 'Outlook not so good', Actual: RealWorld.MagicEightBall.ask(nonRandomGenerator), Description: 'ask is alias for roll'});
   } catch(e){assertions.push({Error: e, Description: 'ask is alias for roll'});}

   return TestRunner.displayResults('RealWorld RealWorld.MagicEightBall', assertions, testState);
};
TestSuite.RealWorld.StandardAmericanPlayingCards = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], nonRandomGenerator, deck, expected;

   try{
   deck = new RealWorld.StandardAmericanPlayingCards(false);
   expected = {Suit: 'Clubs', FaceName: 'Ace', NumericValue: 1, Color: 'Black'};
   nonRandomGenerator = numberGenerator.dice(52, [1]);
   assertions.push({Expected: expected, Actual: deck.draw(nonRandomGenerator), Description: 'Happy path'});

   expected = {Suit: 'Clubs', NumericValue: 2, Color: 'Black'};
   nonRandomGenerator = numberGenerator.dice(51, [1]);
   assertions.push({Expected: expected, Actual: deck.draw(nonRandomGenerator), Description: 'Removes cards'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path'});}

   try{
   deck = new RealWorld.StandardAmericanPlayingCards();
   expected = {Suit: 'Spades', FaceName: 'King', NumericValue: 13, Color: 'Black'};
   nonRandomGenerator = numberGenerator.dice(52, [52]);
   assertions.push({Expected: expected, Actual: deck.draw(nonRandomGenerator), Description: 'No jokers by default'});
   } catch(e){assertions.push({Error: e, Description: 'No jokers by default'});}

   try{
   deck = new RealWorld.StandardAmericanPlayingCards(true);
   expected = {FaceName: 'Joker', NumericValue: 0, Color: 'Red'};
   nonRandomGenerator = numberGenerator.dice(54, [54]);
   assertions.push({Expected: expected, Actual: deck.draw(nonRandomGenerator), Description: 'Include jokers'});
   } catch(e){assertions.push({Error: e, Description: 'Include jokers'});}

   return TestRunner.displayResults('RealWorld RealWorld.StandardAmericanPlayingCards', assertions, testState);
};
TestSuite.RealWorld.RiderWaiteTarotDeck = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], nonRandomGenerator, deck, expected;

   try{
   deck = new RealWorld.RiderWaiteTarotDeck();
   expected = {Suit: 'Cups', FaceName: 'Ace', NumericValue: 1};
   nonRandomGenerator = numberGenerator.dice(78, [1]);
   assertions.push({Expected: expected, Actual: deck.draw(nonRandomGenerator), Description: 'Happy path'});

   expected = {Suit: 'Cups', NumericValue: 2};
   nonRandomGenerator = numberGenerator.dice(77, [1]);
   assertions.push({Expected: expected, Actual: deck.draw(nonRandomGenerator), Description: 'Removes cards'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path'});}

   try{
   deck = new RealWorld.RiderWaiteTarotDeck();
   expected = {Suit: 'Wands', FaceName: 'King', NumericValue: 14};
   nonRandomGenerator = numberGenerator.dice(78, [56]);
   assertions.push({Expected: expected, Actual: deck.draw(nonRandomGenerator), Description: 'Last non-trump'});
   } catch(e){assertions.push({Error: e, Description: 'Last non-trump'});}

   try{
   deck = new RealWorld.RiderWaiteTarotDeck();
   expected = {Suit: 'Trump', FaceName: 'The Fool', NumericValue: 0};
   nonRandomGenerator = numberGenerator.dice(78, [57]);
   assertions.push({Expected: expected, Actual: deck.draw(nonRandomGenerator), Description: 'The Fool'});
   } catch(e){assertions.push({Error: e, Description: 'The Fool'});}

   try{
   deck = new RealWorld.RiderWaiteTarotDeck();
   expected = {Suit: 'Trump', FaceName: 'The World', NumericValue: 21};
   nonRandomGenerator = numberGenerator.dice(78, [78]);
   assertions.push({Expected: expected, Actual: deck.draw(nonRandomGenerator), Description: 'The World'});
   } catch(e){assertions.push({Error: e, Description: 'The World'});}

   return TestRunner.displayResults('RealWorld RealWorld.RiderWaiteTarotDeck', assertions, testState);
};
