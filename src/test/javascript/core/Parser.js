'use strict';
TestSuite.Parser = {};
TestSuite.Parser.dicePool = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], returned, expected, string;

   try{
   string = '2d8+2d16';
   returned = Parser.dicePool(string);
   expected = [
      {
         die: {sideCount: 8, constantModifier: 0},
         dieCount: 2,
         areDiceNegative: false
      },
      {
         die: {sideCount: 16, constantModifier: 0},
         dieCount: 2,
         areDiceNegative: false
      }
   ];
   assertions.push({Expected: expected, Actual: returned, Description: 'Happy path: 2d8+2d16'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path: 2d8+2d16'});}

   try{
   Parser.dicePool();
   TestRunner.failedToThrow(assertions, 'No arg');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('undefined\nexpected "d" or "z". Found: undefined'), Actual: e, Description: 'No arg'});
   }

   try{
   Parser.dicePool('');
   TestRunner.failedToThrow(assertions, 'Empty string');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('\nexpected "d" or "z". Found: '), Actual: e, Description: 'Empty string'});
   }

   try{
   string = '\n  D8    -     z16\t ';
   returned = Parser.dicePool(string);
   expected = [
      {
         die: {sideCount: 8, constantModifier: 0},
         dieCount: 1,
         areDiceNegative: false
      },
      {
         die: {sideCount: 16, constantModifier: -1},
         dieCount: 1,
         areDiceNegative: true
      }
   ];
   assertions.push({Expected: expected, Actual: returned, Description: 'Trim lower: d8-z16'});
   } catch(e){assertions.push({Error: e, Description: 'Trim lower'});}

   try{
   returned = Parser.dicePool('d3 reroll dice    less\t\rthan 3');
   assertions.push({Expected: '<3', Actual: returned[0].die.rerollCriteria, Description: 'Replace all whitespace with 1 space'});
   } catch(e){assertions.push({Error: e, Description: 'Replace all whitespace with 1 space'});}

   try{
   string = 'd8-3d16';
   returned = Parser.dicePool(string);
   expected = [
      {
         die: {sideCount: 8, constantModifier: 0},
         dieCount: 1,
         areDiceNegative: false
      },
      {
         die: {sideCount: 16, constantModifier: 0},
         dieCount: 3,
         areDiceNegative: true
      }
   ];
   assertions.push({Expected: expected, Actual: returned, Description: 'Negative: d8-3d16'});
   } catch(e){assertions.push({Error: e, Description: 'Negative: d8-3d16'});}

   try{
   returned = Parser.dicePool('-d4');
   expected = [
      {
         die: {sideCount: 4, constantModifier: 0},
         dieCount: 1,
         areDiceNegative: true
      }
   ];
   assertions.push({Expected: expected, Actual: returned, Description: 'Leading Negative: -d4'});
   } catch(e){assertions.push({Error: e, Description: 'Leading Negative: -d4'});}

   try{
   returned = Parser.dicePool('+d4');
   expected = [
      {
         die: {sideCount: 4, constantModifier: 0},
         dieCount: 1,
         areDiceNegative: false
      }
   ];
   assertions.push({Expected: expected, Actual: returned, Description: 'Leading plus: +d4'});
   } catch(e){assertions.push({Error: e, Description: 'Leading plus: +d4'});}

   return TestRunner.displayResults('Parser Parser.dicePool', assertions, testState);
};
TestSuite.Parser._diceGroup = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], expected, string, group;

   try{
   group = {};
   string = 'd6';
   Parser._diceGroup(string, string, group);
   expected = {constantModifier: 0, sideCount: 6};
   assertions.push({Expected: expected, Actual: group.die, Description: 'Happy path: d6'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path'});}

   try{
   group = {};
   string = 'z5';
   Parser._diceGroup(string, string, group);
   expected = {constantModifier: -1, sideCount: 5};
   assertions.push({Expected: expected, Actual: group.die, Description: 'z5'});
   } catch(e){assertions.push({Error: e, Description: 'z5'});}

   try{
   Parser._diceGroup('d6+h3', 'h3', {});
   TestRunner.failedToThrow(assertions, 'Non dz type');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('d6+h3\nexpected "d" or "z". Found: h3'), Actual: e, Description: 'Non dz type'});
   }

   try{
   Parser._diceGroup('d6+', '', {});
   TestRunner.failedToThrow(assertions, 'Empty arg');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('d6+\nexpected "d" or "z". Found: '), Actual: e, Description: 'Empty arg'});
   }

   try{
   group = {};
   string = 'd%2';
   Parser._diceGroup(string, string, group);
   assertions.push({Expected: 1002, Actual: group.die.sideCount, Description: 'Leading % to 100'});
   } catch(e){assertions.push({Error: e, Description: 'Leading % to 100'});}

   try{
   group = {};
   string = 'd2%';
   Parser._diceGroup(string, string, group);
   assertions.push({Expected: 200, Actual: group.die.sideCount, Description: 'Non-leading first % to 00'});
   } catch(e){assertions.push({Error: e, Description: 'Non-leading first % to 00'});}

   try{
   group = {};
   string = 'd%%';
   Parser._diceGroup(string, string, group);
   assertions.push({Expected: 10000, Actual: group.die.sideCount, Description: 'Other % to 00'});
   } catch(e){assertions.push({Error: e, Description: 'Other % to 00'});}

   try{
   group = {};
   string = 'df';
   Parser._diceGroup(string, string, group);
   expected = {constantModifier: -2, sideCount: 3};
   assertions.push({Expected: expected, Actual: group.die, Description: 'Fudge die: happy'});
   } catch(e){assertions.push({Error: e, Description: 'Fudge die: happy'});}

   try{
   group = {};
   string = 'zf';
   Parser._diceGroup(string, string, group);
   expected = {constantModifier: -2, sideCount: 3};
   assertions.push({Expected: expected, Actual: group.die, Description: 'Fudge die: zeroed'});
   } catch(e){assertions.push({Error: e, Description: 'Fudge die: zeroed'});}

   try{
   string = 'df!';
   Parser._diceGroup(string, string, {});
   TestRunner.failedToThrow(assertions, 'Fudge die: illegal');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('df!\nFudge/Fate dice don\'t explode or reroll. Illegal: !'),
         Actual: e, Description: 'Fudge die: illegal'});
   }

   try{
   string = 'd!';
   Parser._diceGroup(string, string, {});
   TestRunner.failedToThrow(assertions, 'No sideCount');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('d!\nexpected sideCount. Found: !'), Actual: e, Description: 'No sideCount'});
   }

   try{
   group = {};
   string = 'd3r>=2 penetrating exploding dice';
   Parser._diceGroup(string, string, group);
   assertions.push({Expected: Die.explodeTypes.Penetrating, Actual: group.die.explodeType, Description: 'Short long: explode'});
   assertions.push({Expected: '>=2', Actual: group.die.rerollCriteria, Description: 'Short long: reroll'});
   } catch(e){assertions.push({Error: e, Description: 'Short long'});}

   try{
   group = {};
   string = 'd3r2k1!';
   Parser._diceGroup(string, string, group);
   assertions.push({Expected: '2', Actual: group.die.rerollCriteria, Description: 'Jagged (group between dice): reroll'});
   assertions.push({Expected: 1, Actual: group.dropKeepCount, Description: 'Jagged (group between dice): dropKeepCount'});
   assertions.push({Expected: Die.explodeTypes.Normal, Actual: group.die.explodeType, Description: 'Jagged (group between dice): explode'});
   } catch(e){assertions.push({Error: e, Description: 'Jagged (group between dice)'});}

   try{
   string = 'd3! explode';
   Parser._diceGroup(string, string, {});
   TestRunner.failedToThrow(assertions, '2 explode');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('d3! explode\nmultiple explosions found. Max is 1'), Actual: e, Description: '2 explode'});
   }

   try{
   string = 'd3r-1 reroll 0';
   Parser._diceGroup(string, string, {});
   TestRunner.failedToThrow(assertions, '2 reroll');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('d3r-1 reroll 0\nmultiple reroll criteria found. Max is 1'), Actual: e, Description: '2 reroll'});
   }

   try{
   string = 'd3! reroll 1 reroll rocks';
   Parser._diceGroup(string, string, {});
   TestRunner.failedToThrow(assertions, 'Unparsable');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('d3! reroll 1 reroll rocks\nUnparsable:  reroll rocks'), Actual: e, Description: 'Unparsable'});
   }

   try{
   string = 'd3 reroll 1!';
   Parser._diceGroup(string, string, {});
   TestRunner.failedToThrow(assertions, 'Illegal: Long then short');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('d3 reroll 1!\nUnparsable: !'), Actual: e, Description: 'Illegal: Long then short'});
   }

   return TestRunner.displayResults('Parser Parser._diceGroup', assertions, testState);
};
TestSuite.Parser._shortHand = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], returned, expected, string, group;

   try{
   group = {die: {}};
   string = 'r>1';
   returned = Parser._shortHand(string, string, group);
   assertions.push({Expected: undefined, Actual: group.die.explodeType, Description: 'r>1: explode'});
   assertions.push({Expected: '>1', Actual: group.die.rerollCriteria, Description: 'r>1: reroll'});
   assertions.push({Expected: '', Actual: returned, Description: 'r>1: returned'});
   } catch(e){assertions.push({Error: e, Description: 'r>1'});}

   try{
   group = {die: {}};
   string = 'r1! remainder';
   returned = Parser._shortHand(string, string, group);
   assertions.push({Expected: Die.explodeTypes.Normal, Actual: group.die.explodeType, Description: 'Normal r1: explode'});
   assertions.push({Expected: '1', Actual: group.die.rerollCriteria, Description: 'Normal r1: reroll'});
   assertions.push({Expected: ' remainder', Actual: returned, Description: 'Normal r1: returned'});
   } catch(e){assertions.push({Error: e, Description: 'Normal r1'});}

   try{
   group = {die: {}};
   string = '!pr=2';
   returned = Parser._shortHand(string, string, group);
   assertions.push({Expected: Die.explodeTypes.Penetrating, Actual: group.die.explodeType, Description: 'Penetrating r=2: explode'});
   assertions.push({Expected: '=2', Actual: group.die.rerollCriteria, Description: 'Penetrating r=2: reroll'});
   assertions.push({Expected: '', Actual: returned, Description: 'Penetrating r=2: returned'});
   } catch(e){assertions.push({Error: e, Description: 'Penetrating r=2'});}

   try{
   group = {die: {}};
   string = 'r!==-2!!reroll 1';
   returned = Parser._shortHand(string, string, group);
   assertions.push({Expected: Die.explodeTypes.Compound, Actual: group.die.explodeType, Description: 'Compound r!==-2: explode'});
   assertions.push({Expected: '!==-2', Actual: group.die.rerollCriteria, Description: 'Compound r!==-2: reroll'});
   assertions.push({Expected: 'reroll 1', Actual: returned, Description: 'Compound r!==-2: returned'});
   } catch(e){assertions.push({Error: e, Description: 'Compound r!==-2'});}

   try{
   string = '!!!';  //Compound then regular
   Parser._shortHand(string, string, {die: {}});
   TestRunner.failedToThrow(assertions, '2 explode');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('!!!\nmultiple explosions found. Max is 1'), Actual: e, Description: '2 explode'});
   }

   try{
   string = 'r1r2';
   Parser._shortHand(string, string, {die: {}});
   TestRunner.failedToThrow(assertions, '2 reroll');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('r1r2\nmultiple reroll criteria found. Max is 1'), Actual: e, Description: '2 reroll'});
   }

   try{
   group = {die: {}};
   string = 'dl2';
   returned = Parser._shortHand(string, string, group);
   assertions.push({Expected: DicePool.dropKeepTypes.DropLowest, Actual: group.dropKeepType, Description: 'DropLowest 2: dropKeepType'});
   assertions.push({Expected: 2, Actual: group.dropKeepCount, Description: 'DropLowest 2: dropKeepCount'});
   } catch(e){assertions.push({Error: e, Description: 'DropLowest 2'});}

   try{
   group = {die: {}};
   string = 'dh';
   returned = Parser._shortHand(string, string, group);
   assertions.push({Expected: DicePool.dropKeepTypes.DropHighest, Actual: group.dropKeepType, Description: 'DropHighest: dropKeepType'});
   assertions.push({Expected: 1, Actual: group.dropKeepCount, Description: 'DropHighest: dropKeepCount'});
   } catch(e){assertions.push({Error: e, Description: 'DropHighest'});}

   try{
   group = {die: {}};
   string = 'd3';
   returned = Parser._shortHand(string, string, group);
   assertions.push({Expected: DicePool.dropKeepTypes.DropLowest, Actual: group.dropKeepType, Description: 'Drop 3: dropKeepType'});
   assertions.push({Expected: 3, Actual: group.dropKeepCount, Description: 'Drop 3: dropKeepCount'});
   } catch(e){assertions.push({Error: e, Description: 'Drop 3'});}

   try{
   group = {die: {}};
   string = 'k';
   returned = Parser._shortHand(string, string, group);
   assertions.push({Expected: DicePool.dropKeepTypes.KeepHighest, Actual: group.dropKeepType, Description: 'Keep: dropKeepType'});
   assertions.push({Expected: 1, Actual: group.dropKeepCount, Description: 'Keep: dropKeepCount'});
   } catch(e){assertions.push({Error: e, Description: 'Keep'});}

   try{
   group = {die: {}};
   string = 'kl';
   returned = Parser._shortHand(string, string, group);
   assertions.push({Expected: DicePool.dropKeepTypes.KeepLowest, Actual: group.dropKeepType, Description: 'KeepLowest: dropKeepType'});
   assertions.push({Expected: 1, Actual: group.dropKeepCount, Description: 'KeepLowest: dropKeepCount'});
   } catch(e){assertions.push({Error: e, Description: 'KeepLowest'});}

   try{
   string = 'd1k1';
   Parser._shortHand(string, string, {die: {}});
   TestRunner.failedToThrow(assertions, '2 dropKeep');
   }
   catch(e)
   {
       assertions.push({Expected: new Error('d1k1\nmultiple drop/keep criteria found. Max is 1'), Actual: e, Description: '2 dropKeep'});
   }

   return TestRunner.displayResults('Parser Parser._shortHand', assertions, testState);
};
TestSuite.Parser._longHand = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], returned, expected, string, group;

   try{
   group = {die: {}};
   string = ' exploding ducks';
   returned = Parser._longHand(string, string, group);
   assertions.push({Expected: Die.explodeTypes.Normal, Actual: group.die.explodeType, Description: 'Simple: explode'});
   assertions.push({Expected: undefined, Actual: group.die.rerollCriteria, Description: 'Simple: reroll'});
   assertions.push({Expected: ' ducks', Actual: returned, Description: 'Simple: returned'});
   } catch(e){assertions.push({Error: e, Description: 'Simple'});}

   try{
   group = {die: {}};
   string = ' compound explode die reroll dice that are not equal to 5';
   returned = Parser._longHand(string, string, group);
   assertions.push({Expected: Die.explodeTypes.Compound, Actual: group.die.explodeType, Description: 'Compound r!=5: explode'});
   assertions.push({Expected: '!=5', Actual: group.die.rerollCriteria, Description: 'Compound r!=5: reroll'});
   assertions.push({Expected: '', Actual: returned, Description: 'Compound r!=5: returned'});
   } catch(e){assertions.push({Error: e, Description: 'Compound r!=5'});}

   try{
   group = {die: {}};
   string = ' penetrate explode reroll greater than or equal 3';
   returned = Parser._longHand(string, string, group);
   assertions.push({Expected: Die.explodeTypes.Penetrating, Actual: group.die.explodeType, Description: 'Penetrating r>=3: explode'});
   assertions.push({Expected: '>=3', Actual: group.die.rerollCriteria, Description: 'Penetrating r>=3: reroll'});
   assertions.push({Expected: '', Actual: returned, Description: 'Penetrating r>=3: returned'});
   } catch(e){assertions.push({Error: e, Description: 'Penetrating r>=3'});}

   try{
   group = {die: {}};
   string = ' reroll equal 2';
   returned = Parser._longHand(string, string, group);
   assertions.push({Expected: undefined, Actual: group.die.explodeType, Description: 'r=2: explode'});
   assertions.push({Expected: '=2', Actual: group.die.rerollCriteria, Description: 'r=2: reroll'});
   assertions.push({Expected: '', Actual: returned, Description: 'r=2: returned'});
   } catch(e){assertions.push({Error: e, Description: 'r=2'});}

   try{
   group = {die: {}};
   string = ' reroll less than 1';
   returned = Parser._longHand(string, string, group);
   assertions.push({Expected: undefined, Actual: group.die.explodeType, Description: 'r<1: explode'});
   assertions.push({Expected: '<1', Actual: group.die.rerollCriteria, Description: 'r<1: reroll'});
   assertions.push({Expected: '', Actual: returned, Description: 'r<1: returned'});
   } catch(e){assertions.push({Error: e, Description: 'r<1'});}

   try{
   group = {die: {}};
   string = ' rerolling 8';
   returned = Parser._longHand(string, string, group);
   assertions.push({Expected: undefined, Actual: group.die.explodeType, Description: 'r8: explode'});
   assertions.push({Expected: '8', Actual: group.die.rerollCriteria, Description: 'r8: reroll'});
   assertions.push({Expected: '', Actual: returned, Description: 'r8: returned'});
   } catch(e){assertions.push({Error: e, Description: 'r8'});}

   try{
   string = ' explode explode';
   Parser._longHand(string, string, {die: {}});
   TestRunner.failedToThrow(assertions, '2 explode');
   }
   catch(e)
   {
       assertions.push({Expected: new Error(' explode explode\nmultiple explosions found. Max is 1'), Actual: e, Description: '2 explode'});
   }

   try{
   string = ' reroll 2 reroll 3';
   Parser._longHand(string, string, {die: {}});
   TestRunner.failedToThrow(assertions, '2 reroll');
   }
   catch(e)
   {
       assertions.push({Expected: new Error(' reroll 2 reroll 3\nmultiple reroll criteria found. Max is 1'), Actual: e, Description: '2 reroll'});
   }

   try{
   group = {die: {}};
   string = ' drop the lowest 2';
   returned = Parser._longHand(string, string, group);
   assertions.push({Expected: DicePool.dropKeepTypes.DropLowest, Actual: group.dropKeepType, Description: 'DropLowest 2: dropKeepType'});
   assertions.push({Expected: 2, Actual: group.dropKeepCount, Description: 'DropLowest 2: dropKeepCount'});
   } catch(e){assertions.push({Error: e, Description: 'DropLowest 2'});}

   try{
   group = {die: {}};
   string = ' dropping highest';
   returned = Parser._longHand(string, string, group);
   assertions.push({Expected: DicePool.dropKeepTypes.DropHighest, Actual: group.dropKeepType, Description: 'DropHighest: dropKeepType'});
   assertions.push({Expected: 1, Actual: group.dropKeepCount, Description: 'DropHighest: dropKeepCount'});
   } catch(e){assertions.push({Error: e, Description: 'DropHighest'});}

   try{
   group = {die: {}};
   string = ' ignore 3';
   returned = Parser._longHand(string, string, group);
   assertions.push({Expected: DicePool.dropKeepTypes.DropLowest, Actual: group.dropKeepType, Description: 'Drop 3: dropKeepType'});
   assertions.push({Expected: 3, Actual: group.dropKeepCount, Description: 'Drop 3: dropKeepCount'});
   } catch(e){assertions.push({Error: e, Description: 'Drop 3'});}

   try{
   group = {die: {}};
   string = ' keep 1';
   returned = Parser._longHand(string, string, group);
   assertions.push({Expected: DicePool.dropKeepTypes.KeepHighest, Actual: group.dropKeepType, Description: 'Keep 1: dropKeepType'});
   assertions.push({Expected: 1, Actual: group.dropKeepCount, Description: 'Keep 1: dropKeepCount'});
   } catch(e){assertions.push({Error: e, Description: 'Keep 1'});}

   try{
   group = {die: {}};
   string = ' keep lowest';
   returned = Parser._longHand(string, string, group);
   assertions.push({Expected: DicePool.dropKeepTypes.KeepLowest, Actual: group.dropKeepType, Description: 'KeepLowest: dropKeepType'});
   assertions.push({Expected: 1, Actual: group.dropKeepCount, Description: 'KeepLowest: dropKeepCount'});
   } catch(e){assertions.push({Error: e, Description: 'KeepLowest'});}

   try{
   string = ' remove highest keep lowest';
   Parser._longHand(string, string, {die: {}});
   TestRunner.failedToThrow(assertions, '2 dropKeep');
   }
   catch(e)
   {
       assertions.push({Expected: new Error(' remove highest keep lowest\nmultiple drop/keep criteria found. Max is 1'), Actual: e, Description: '2 dropKeep'});
   }

   try{
   group = {die: {}};
   string = ' keep';
   returned = Parser._longHand(string, string, group);
   assertions.push({Expected: undefined, Actual: group.dropKeepType, Description: 'Ignore keep alone: dropKeepType'});
   assertions.push({Expected: undefined, Actual: group.dropKeepCount, Description: 'Ignore keep alone: dropKeepCount'});
   assertions.push({Expected: string, Actual: returned, Description: 'Ignore keep alone: dropKeepCount'});
   } catch(e){assertions.push({Error: e, Description: 'Ignore keep alone'});}

   return TestRunner.displayResults('Parser Parser._longHand', assertions, testState);
};
