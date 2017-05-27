'use strict';
TestSuite.CustomDice = {};
TestSuite.CustomDice.CustomDie = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], input, nonRandomGenerator, die;

   try{
   input = ['a', 'b', 'c'];
   nonRandomGenerator = dieResultsToNonRandomGenerator(3, [1, 3]);
   die = new CustomDice.CustomDie(input);
   testResults.push({Expected: 'a', Actual: die.roll(nonRandomGenerator), Description: 'Happy path'});
   testResults.push({Expected: 'c', Actual: die.roll(nonRandomGenerator), Description: 'Holds onto array'});
   testResults.push({Expected: ['a', 'b', 'c'], Actual: input.copy(), Description: 'Does not change input'});
   input.pop();
   nonRandomGenerator = dieResultsToNonRandomGenerator(3, [3]);
   testResults.push({Expected: 'c', Actual: die.roll(nonRandomGenerator), Description: 'Makes defensive copy'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   return TestRunner.displayResults('CustomDice CustomDice.CustomDie', testResults, isFirst);
};
TestSuite.CustomDice.DeckOfCards = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], input, nonRandomGenerator, die;

   try{
   input = ['a', 'b', 'c'];
   die = new CustomDice.DeckOfCards(input);
   nonRandomGenerator = dieResultsToNonRandomGenerator(3, [2]);
   testResults.push({Expected: 'b', Actual: die.roll(nonRandomGenerator), Description: 'Happy path'});
   nonRandomGenerator = dieResultsToNonRandomGenerator(2, [1]);
   testResults.push({Expected: 'a', Actual: die.roll(nonRandomGenerator), Description: 'Holds onto array'});
   testResults.push({Expected: ['a', 'b', 'c'], Actual: input.copy(), Description: 'Does not change input'});
   input.pop();
   nonRandomGenerator = dieResultsToNonRandomGenerator(1, [1]);
   testResults.push({Expected: 'c', Actual: die.draw(nonRandomGenerator), Description: 'Makes defensive copy. Draw alias.'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   die.roll();
   TestRunner.failedToThrow(testResults, 'No more values');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('No more values'),
         Actual: e, Description: 'No more values'});
   }

   return TestRunner.displayResults('CustomDice CustomDice.DeckOfCards', testResults, isFirst);
};
