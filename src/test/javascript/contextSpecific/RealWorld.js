'use strict';
TestSuite.RealWorld = {};
TestSuite.RealWorld.Coin = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], nonRandomGenerator;

   try{
   nonRandomGenerator = dieResultsToNonRandomGenerator(2, [1]);
   testResults.push({Expected: 'Heads', Actual: RealWorld.Coin.roll(nonRandomGenerator), Description: 'Happy path'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   return TestRunner.displayResults('RealWorld RealWorld.Coin', testResults, isFirst);
};
TestSuite.RealWorld.MagicEightBall = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], nonRandomGenerator;

   try{
   nonRandomGenerator = dieResultsToNonRandomGenerator(20, [20]);
   testResults.push({Expected: 'Very doubtful', Actual: RealWorld.MagicEightBall.roll(nonRandomGenerator), Description: 'Happy path'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   return TestRunner.displayResults('RealWorld RealWorld.MagicEightBall', testResults, isFirst);
};
TestSuite.RealWorld.StandardAmericanPlayingCards = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], nonRandomGenerator, deck, expected;

   try{
   deck = new RealWorld.StandardAmericanPlayingCards(false);
   expected = {Suit: 'Clubs', FaceName: 'Ace', NumericValue: 1, Color: 'Black'};
   nonRandomGenerator = dieResultsToNonRandomGenerator(52, [1]);
   testResults.push({Expected: expected, Actual: deck.draw(nonRandomGenerator), Description: 'Happy path'});

   expected = {Suit: 'Clubs', NumericValue: 2, Color: 'Black'};
   nonRandomGenerator = dieResultsToNonRandomGenerator(51, [1]);
   testResults.push({Expected: expected, Actual: deck.draw(nonRandomGenerator), Description: 'Removes cards'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   deck = new RealWorld.StandardAmericanPlayingCards();
   expected = {Suit: 'Spades', FaceName: 'King', NumericValue: 13, Color: 'Black'};
   nonRandomGenerator = dieResultsToNonRandomGenerator(52, [52]);
   testResults.push({Expected: expected, Actual: deck.draw(nonRandomGenerator), Description: 'No jokers by default'});
   } catch(e){testResults.push({Error: e, Description: 'No jokers by default'});}

   try{
   deck = new RealWorld.StandardAmericanPlayingCards(true);
   expected = {FaceName: 'Joker', NumericValue: 0, Color: 'Red'};
   nonRandomGenerator = dieResultsToNonRandomGenerator(54, [54]);
   testResults.push({Expected: expected, Actual: deck.draw(nonRandomGenerator), Description: 'Include jokers'});
   } catch(e){testResults.push({Error: e, Description: 'Include jokers'});}

   return TestRunner.displayResults('RealWorld RealWorld.StandardAmericanPlayingCards', testResults, isFirst);
};
TestSuite.RealWorld.RiderWaiteTarotDeck = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], nonRandomGenerator, deck, expected;

   try{
   deck = new RealWorld.RiderWaiteTarotDeck();
   expected = {Suit: 'Cups', FaceName: 'Ace', NumericValue: 1};
   nonRandomGenerator = dieResultsToNonRandomGenerator(78, [1]);
   testResults.push({Expected: expected, Actual: deck.draw(nonRandomGenerator), Description: 'Happy path'});

   expected = {Suit: 'Cups', NumericValue: 2};
   nonRandomGenerator = dieResultsToNonRandomGenerator(77, [1]);
   testResults.push({Expected: expected, Actual: deck.draw(nonRandomGenerator), Description: 'Removes cards'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   deck = new RealWorld.RiderWaiteTarotDeck();
   expected = {Suit: 'Wands', FaceName: 'King', NumericValue: 14};
   nonRandomGenerator = dieResultsToNonRandomGenerator(78, [56]);
   testResults.push({Expected: expected, Actual: deck.draw(nonRandomGenerator), Description: 'Last non-trump'});
   } catch(e){testResults.push({Error: e, Description: 'Last non-trump'});}

   try{
   deck = new RealWorld.RiderWaiteTarotDeck();
   expected = {Suit: 'Trump', FaceName: 'The Fool', NumericValue: 0};
   nonRandomGenerator = dieResultsToNonRandomGenerator(78, [57]);
   testResults.push({Expected: expected, Actual: deck.draw(nonRandomGenerator), Description: 'The Fool'});
   } catch(e){testResults.push({Error: e, Description: 'The Fool'});}

   try{
   deck = new RealWorld.RiderWaiteTarotDeck();
   expected = {Suit: 'Trump', FaceName: 'The World', NumericValue: 21};
   nonRandomGenerator = dieResultsToNonRandomGenerator(78, [78]);
   testResults.push({Expected: expected, Actual: deck.draw(nonRandomGenerator), Description: 'The World'});
   } catch(e){testResults.push({Error: e, Description: 'The World'});}

   return TestRunner.displayResults('RealWorld RealWorld.RiderWaiteTarotDeck', testResults, isFirst);
};
