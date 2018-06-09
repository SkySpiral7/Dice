'use strict';
TestSuite.CustomDice = {};
TestSuite.CustomDice.CustomDie = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], input, nonRandomGenerator, die;

   try{
   input = ['a', 'b', 'c'];
   nonRandomGenerator = numberGenerator.dice(3, [1, 3]);
   die = new CustomDice.CustomDie(input);
   testResults.push({Expected: 'a', Actual: die.roll(nonRandomGenerator), Description: 'Happy path'});
   testResults.push({Expected: 'c', Actual: die.roll(nonRandomGenerator), Description: 'Holds onto array'});
   testResults.push({Expected: ['a', 'b', 'c'], Actual: input.copy(), Description: 'Does not change input'});
   input.pop();
   nonRandomGenerator = numberGenerator.dice(3, [3]);
   testResults.push({Expected: 'c', Actual: die.roll(nonRandomGenerator), Description: 'Makes defensive copy'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   return TestRunner.displayResults('CustomDice CustomDice.CustomDie', testResults, isFirst);
};
TestSuite.CustomDice.DeckOfCards = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], input, nonRandomGenerator, deck;

   try{
   input = ['a', 'b', 'c'];
   deck = new CustomDice.DeckOfCards(input);
   nonRandomGenerator = numberGenerator.dice(3, [2]);
   testResults.push({Expected: 'b', Actual: deck.roll(nonRandomGenerator), Description: 'Happy path'});
   nonRandomGenerator = numberGenerator.dice(2, [1]);
   testResults.push({Expected: 'a', Actual: deck.roll(nonRandomGenerator), Description: 'Holds onto array'});
   testResults.push({Expected: ['a', 'b', 'c'], Actual: input.copy(), Description: 'Does not change input'});
   input.pop();
   nonRandomGenerator = numberGenerator.dice(1, [1]);
   testResults.push({Expected: 'c', Actual: deck.draw(nonRandomGenerator), Description: 'Makes defensive copy. Draw alias.'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   deck.roll();
   TestRunner.failedToThrow(testResults, 'No more values');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('No more values'),
         Actual: e, Description: 'No more values'});
   }

   return TestRunner.displayResults('CustomDice CustomDice.DeckOfCards', testResults, isFirst);
};
TestSuite.CustomDice.RollTable = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], input, randomSource, table;

   try{
   input = ['a', {min: 50, value: 'b'}, {min: 100, value: 'c'}];
   table = new CustomDice.RollTable(new DicePool('1d%'), input);
   randomSource = numberGenerator.dice(100, [50, 1, 30, 70]);
   testResults.push({Expected: 'b', Actual: table.roll(randomSource), Description: 'Happy path'});
   testResults.push({Expected: 'a', Actual: table.roll(randomSource), Description: 'Holds onto array'});
   testResults.push({Expected: ['a', {min: 50, value: 'b'}, {min: 100, value: 'c'}], Actual: input.copy(), Description: 'Does not change input'});
   input.pop();
   testResults.push({Expected: 'a', Actual: table.roll(randomSource), Description: 'Makes defensive copy. Compares range.'});
   testResults.push({Expected: 'b', Actual: table.roll(randomSource), Description: 'Compares range rounds down.'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   input = [{min: -1, value: 'e'}, {min: 5}];
   table = new CustomDice.RollTable(new DicePool('1d10'), input);
   randomSource = numberGenerator.dice(10, [1,8]);
   testResults.push({Expected: 'e', Actual: table.roll(randomSource), Description: 'Impossible uses range, first can be object'});
   testResults.push({Expected: undefined, Actual: table.roll(randomSource), Description: 'Functions'});
   } catch(e){testResults.push({Error: e, Description: 'First is object'});}

   try{
   input = [{min: 5, value: Math.random}, {min: 8, value: {name: 'head', description: 'big'}}, {min: Infinity}];
   table = new CustomDice.RollTable(new DicePool('2d10'), input);
   randomSource = numberGenerator.dice(10, [1,1, 3,2, 10,10]);
   testResults.push({Expected: undefined, Actual: table.roll(randomSource), Description: 'No min is undefined'});
   testResults.push({Expected: Math.random, Actual: table.roll(randomSource), Description: 'Allows custom values'});
   testResults.push({Expected: {name: 'head', description: 'big'}, Actual: table.roll(randomSource), Description: 'Returns objects'});
   } catch(e){testResults.push({Error: e, Description: 'Undefined and returns objects'});}
 
   try{
   input = [{min: 1, table: new CustomDice.CustomDie(['a', 'b'])}];
   table = new CustomDice.RollTable(new DicePool('1d1'), input);
   randomSource = numberGenerator.dice(2, [1]);
   testResults.push({Expected: 'a', Actual: table.roll(randomSource), Description: 'Simple nesting'});

   input = ['n', {min: 1, table: new CustomDice.RollTable(new DicePool('1d2'), ['a', {min: 2, value: 'b'}])}];
   table = new CustomDice.RollTable(new DicePool('1d1'), input);
   randomSource = numberGenerator.dice(2, [2]);
   testResults.push({Expected: 'b', Actual: table.roll(randomSource), Description: 'Table in table'});
   } catch(e){testResults.push({Error: e, Description: 'nesting'});}
 
   return TestRunner.displayResults('CustomDice CustomDice.RollTable', testResults, isFirst);
};
