'use strict';
TestSuite.CustomDice = {};
TestSuite.CustomDice.CustomDie = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], input, nonRandomGenerator, die;

   try{
   input = ['a', 'b', 'c'];
   nonRandomGenerator = numberGenerator.dice(3, [1, 3]);
   die = new CustomDice.CustomDie(input);
   assertions.push({Expected: 'a', Actual: die.roll(nonRandomGenerator), Description: 'Happy path'});
   assertions.push({Expected: 'c', Actual: die.roll(nonRandomGenerator), Description: 'Holds onto array'});
   assertions.push({Expected: ['a', 'b', 'c'], Actual: input.copy(), Description: 'Does not change input'});
   input.pop();
   nonRandomGenerator = numberGenerator.dice(3, [3]);
   assertions.push({Expected: 'c', Actual: die.roll(nonRandomGenerator), Description: 'Makes defensive copy'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path'});}

   return TestRunner.displayResults('CustomDice CustomDice.CustomDie', assertions, testState);
};
TestSuite.CustomDice.DeckOfCards = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], input, nonRandomGenerator, deck;

   try{
   input = ['a', 'b', 'c'];
   deck = new CustomDice.DeckOfCards(input);
   nonRandomGenerator = numberGenerator.dice(3, [2]);
   assertions.push({Expected: 'b', Actual: deck.roll(nonRandomGenerator), Description: 'Happy path'});
   nonRandomGenerator = numberGenerator.dice(2, [1]);
   assertions.push({Expected: 'a', Actual: deck.roll(nonRandomGenerator), Description: 'Holds onto array'});
   assertions.push({Expected: ['a', 'b', 'c'], Actual: input.copy(), Description: 'Does not change input'});
   input.pop();
   nonRandomGenerator = numberGenerator.dice(1, [1]);
   assertions.push({Expected: 'c', Actual: deck.draw(nonRandomGenerator), Description: 'Makes defensive copy. Draw alias.'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path'});}

   try{
   deck.roll();
   TestRunner.failedToThrow(assertions, 'No more values');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('No more values'),
         Actual: e, Description: 'No more values'});
   }

   return TestRunner.displayResults('CustomDice CustomDice.DeckOfCards', assertions, testState);
};
TestSuite.CustomDice.RollTable = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], input, randomSource, table;

   try{
   input = ['a', {min: 50, value: 'b'}, {min: 100, value: 'c'}];
   table = new CustomDice.RollTable(new DicePool('1d%'), input);
   randomSource = numberGenerator.dice(100, [50, 1, 30, 70]);
   assertions.push({Expected: 'b', Actual: table.roll(randomSource), Description: 'Happy path'});
   assertions.push({Expected: 'a', Actual: table.roll(randomSource), Description: 'Holds onto array'});
   assertions.push({Expected: ['a', {min: 50, value: 'b'}, {min: 100, value: 'c'}], Actual: input.copy(), Description: 'Does not change input'});
   input.pop();
   assertions.push({Expected: 'a', Actual: table.roll(randomSource), Description: 'Makes defensive copy. Compares range.'});
   assertions.push({Expected: 'b', Actual: table.roll(randomSource), Description: 'Compares range rounds down.'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path'});}

   try{
   input = [{min: -1, value: 'e'}, {min: 5}];
   table = new CustomDice.RollTable(new DicePool('1d10'), input);
   randomSource = numberGenerator.dice(10, [1,8]);
   assertions.push({Expected: 'e', Actual: table.roll(randomSource), Description: 'Impossible uses range, first can be object'});
   assertions.push({Expected: undefined, Actual: table.roll(randomSource), Description: 'Functions'});
   } catch(e){assertions.push({Error: e, Description: 'First is object'});}

   try{
   input = [{min: 5, value: Math.random}, {min: 8, value: {name: 'head', description: 'big'}}, {min: Infinity}];
   table = new CustomDice.RollTable(new DicePool('2d10'), input);
   randomSource = numberGenerator.dice(10, [1,1, 3,2, 10,10]);
   assertions.push({Expected: undefined, Actual: table.roll(randomSource), Description: 'No min is undefined'});
   assertions.push({Expected: Math.random, Actual: table.roll(randomSource), Description: 'Allows custom values'});
   assertions.push({Expected: {name: 'head', description: 'big'}, Actual: table.roll(randomSource), Description: 'Returns objects'});
   } catch(e){assertions.push({Error: e, Description: 'Undefined and returns objects'});}
 
   try{
   input = [{min: 1, table: new CustomDice.CustomDie(['a', 'b'])}];
   table = new CustomDice.RollTable(new DicePool('1d1'), input);
   randomSource = numberGenerator.dice(2, [1]);
   assertions.push({Expected: 'a', Actual: table.roll(randomSource), Description: 'Simple nesting'});

   input = ['n', {min: 1, table: new CustomDice.RollTable(new DicePool('1d2'), ['a', {min: 2, value: 'b'}])}];
   table = new CustomDice.RollTable(new DicePool('1d1'), input);
   randomSource = numberGenerator.dice(2, [2]);
   assertions.push({Expected: 'b', Actual: table.roll(randomSource), Description: 'Table in table'});
   } catch(e){assertions.push({Error: e, Description: 'nesting'});}
 
   return TestRunner.displayResults('CustomDice CustomDice.RollTable', assertions, testState);
};
