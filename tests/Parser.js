'use strict';
Tester.Parser = {};
Tester.Parser.dicePool = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], returned, expected, string;

   try{
   string = '2d8+2d16';
   returned = Parser.dicePool(string);
   expected = [
      {
         die: {sideCount: 8, constantModifier: 0},
         dieCount: 2
      },
      {
         die: {sideCount: 16, constantModifier: 0},
         dieCount: 2
      }
   ];
   testResults.push({Expected: expected, Actual: returned, Description: 'Happy path: 2d8+2d16'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path: 2d8+2d16'});}

   try{
   Parser.dicePool();
   TesterUtility.failedToThrow(testResults, 'No arg');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('undefined\nexpected "d" or "z". Found: undefined'), Actual: e, Description: 'No arg'});
   }

   try{
   string = '\n  D8    -     z16\t ';
   returned = Parser.dicePool(string);
   expected = [
      {
         die: {sideCount: 8, constantModifier: 0},
         dieCount: 1
      },
      {
         die: {sideCount: 16, constantModifier: -1},
         dieCount: 1,
         areDiceNegative: true
      }
   ];
   testResults.push({Expected: expected, Actual: returned, Description: 'Trim lower: d8-z16'});
   } catch(e){testResults.push({Error: e, Description: 'Trim lower'});}

   try{
   returned = Parser.dicePool('d3 reroll dice    less\t\rthan 3');
   testResults.push({Expected: '<3', Actual: returned[0].die.rerollCriteria, Description: 'Replace all whitespace with 1 space'});
   } catch(e){testResults.push({Error: e, Description: 'Replace all whitespace with 1 space'});}

   try{
   string = 'd8-3d16';
   returned = Parser.dicePool(string);
   expected = [
      {
         die: {sideCount: 8, constantModifier: 0},
         dieCount: 1
      },
      {
         die: {sideCount: 16, constantModifier: 0},
         dieCount: 3,
         areDiceNegative: true
      }
   ];
   testResults.push({Expected: expected, Actual: returned, Description: 'Negative: d8-3d16'});
   } catch(e){testResults.push({Error: e, Description: 'Negative: d8-3d16'});}

   try{
   returned = Parser.dicePool('-d4');
   expected = [
      {
         die: {sideCount: 4, constantModifier: 0},
         dieCount: 1,
         areDiceNegative: true
      }
   ];
   testResults.push({Expected: expected, Actual: returned, Description: 'Negative: -d4'});
   } catch(e){testResults.push({Error: e, Description: 'Negative: -d4'});}

   try{
   Parser.dicePool('0d3');
   TesterUtility.failedToThrow(testResults, '0 dice');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('0d3\ninvalid dieCount: 0'), Actual: e, Description: '0 dice'});
   }

   TesterUtility.displayResults('Parser Parser.dicePool', testResults, isFirst);
};
Tester.Parser._diceGroup = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], expected, string, group;

   try{
   group = {};
   string = 'd6';
   Parser._diceGroup(string, string, group);
   expected = {constantModifier: 0, sideCount: 6};
   testResults.push({Expected: expected, Actual: group.die, Description: 'Happy path: d6'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   group = {};
   string = 'z5';
   Parser._diceGroup(string, string, group);
   expected = {constantModifier: -1, sideCount: 5};
   testResults.push({Expected: expected, Actual: group.die, Description: 'z5'});
   } catch(e){testResults.push({Error: e, Description: 'z5'});}

   try{
   Parser._diceGroup('d6+h3', 'h3', {});
   TesterUtility.failedToThrow(testResults, 'Non dz type');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('d6+h3\nexpected "d" or "z". Found: h3'), Actual: e, Description: 'Non dz type'});
   }

   try{
   Parser._diceGroup('d6+', '', {});
   TesterUtility.failedToThrow(testResults, 'Empty arg');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('d6+\nexpected "d" or "z". Found: '), Actual: e, Description: 'Empty arg'});
   }

   try{
   group = {};
   string = 'd%2';
   Parser._diceGroup(string, string, group);
   testResults.push({Expected: 1002, Actual: group.die.sideCount, Description: 'Leading % to 100'});
   } catch(e){testResults.push({Error: e, Description: 'Leading % to 100'});}

   try{
   group = {};
   string = 'd2%';
   Parser._diceGroup(string, string, group);
   testResults.push({Expected: 200, Actual: group.die.sideCount, Description: 'Non-leading first % to 00'});
   } catch(e){testResults.push({Error: e, Description: 'Non-leading first % to 00'});}

   try{
   group = {};
   string = 'd%%';
   Parser._diceGroup(string, string, group);
   testResults.push({Expected: 10000, Actual: group.die.sideCount, Description: 'Other % to 00'});
   } catch(e){testResults.push({Error: e, Description: 'Other % to 00'});}

   try{
   group = {};
   string = 'df';
   Parser._diceGroup(string, string, group);
   expected = {constantModifier: -2, sideCount: 3};
   testResults.push({Expected: expected, Actual: group.die, Description: 'Fudge die: happy'});
   } catch(e){testResults.push({Error: e, Description: 'Fudge die: happy'});}

   try{
   group = {};
   string = 'zf';
   Parser._diceGroup(string, string, group);
   expected = {constantModifier: -2, sideCount: 3};
   testResults.push({Expected: expected, Actual: group.die, Description: 'Fudge die: zeroed'});
   } catch(e){testResults.push({Error: e, Description: 'Fudge die: zeroed'});}

   try{
   string = 'df!';
   Parser._diceGroup(string, string, {});
   TesterUtility.failedToThrow(testResults, 'Fudge die: illegal');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('df!\nFudge/Fate dice don\'t explode or reroll. Illegal: !'),
         Actual: e, Description: 'Fudge die: illegal'});
   }

   try{
   string = 'd!';
   Parser._diceGroup(string, string, {});
   TesterUtility.failedToThrow(testResults, 'No sideCount');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('d!\nexpected sideCount. Found: !'), Actual: e, Description: 'No sideCount'});
   }

   try{
   group = {};
   string = 'd3r>=2 penetrating exploding dice';
   Parser._diceGroup(string, string, group);
   testResults.push({Expected: Die.explodeTypes.Penetrating, Actual: group.die.explodeType, Description: 'Short long: explode'});
   testResults.push({Expected: '>=2', Actual: group.die.rerollCriteria, Description: 'Short long: reroll'});
   } catch(e){testResults.push({Error: e, Description: 'Short long'});}

   try{
   group = {};
   string = 'd3r2k1!';
   Parser._diceGroup(string, string, group);
   testResults.push({Expected: '===2', Actual: group.die.rerollCriteria, Description: 'Jagged (group between dice): reroll'});
   testResults.push({Expected: 1, Actual: group.dropKeepCount, Description: 'Jagged (group between dice): dropKeepCount'});
   testResults.push({Expected: Die.explodeTypes.Normal, Actual: group.die.explodeType, Description: 'Jagged (group between dice): explode'});
   } catch(e){testResults.push({Error: e, Description: 'Jagged (group between dice)'});}

   try{
   string = 'd3! explode';
   Parser._diceGroup(string, string, {});
   TesterUtility.failedToThrow(testResults, '2 explode');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('d3! explode\nmultiple explosions found. Max is 1'), Actual: e, Description: '2 explode'});
   }

   try{
   string = 'd3r-1 reroll 0';
   Parser._diceGroup(string, string, {});
   TesterUtility.failedToThrow(testResults, '2 reroll');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('d3r-1 reroll 0\nmultiple reroll criteria found. Max is 1'), Actual: e, Description: '2 reroll'});
   }

   try{
   string = 'd3! reroll 1 reroll rocks';
   Parser._diceGroup(string, string, {});
   TesterUtility.failedToThrow(testResults, 'Unparsable');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('d3! reroll 1 reroll rocks\nUnparsable:  reroll rocks'), Actual: e, Description: 'Unparsable'});
   }

   try{
   string = 'd3 reroll 1!';
   Parser._diceGroup(string, string, {});
   TesterUtility.failedToThrow(testResults, 'Illegal: Long then short');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('d3 reroll 1!\nUnparsable: !'), Actual: e, Description: 'Illegal: Long then short'});
   }

   TesterUtility.displayResults('Parser Parser._diceGroup', testResults, isFirst);
};
Tester.Parser._shortHand = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], returned, expected, string, group;

   try{
   group = {die: {}};
   string = 'r>1';
   returned = Parser._shortHand(string, string, group);
   testResults.push({Expected: undefined, Actual: group.die.explodeType, Description: 'r>1: explode'});
   testResults.push({Expected: '>1', Actual: group.die.rerollCriteria, Description: 'r>1: reroll'});
   testResults.push({Expected: '', Actual: returned, Description: 'r>1: returned'});
   } catch(e){testResults.push({Error: e, Description: 'r>1'});}

   try{
   group = {die: {}};
   string = 'r1! remainder';
   returned = Parser._shortHand(string, string, group);
   testResults.push({Expected: Die.explodeTypes.Normal, Actual: group.die.explodeType, Description: 'Normal r1: explode'});
   testResults.push({Expected: '===1', Actual: group.die.rerollCriteria, Description: 'Normal r1: reroll'});
   testResults.push({Expected: ' remainder', Actual: returned, Description: 'Normal r1: returned'});
   } catch(e){testResults.push({Error: e, Description: 'Normal r1'});}

   try{
   group = {die: {}};
   string = '!pr=2';
   returned = Parser._shortHand(string, string, group);
   testResults.push({Expected: Die.explodeTypes.Penetrating, Actual: group.die.explodeType, Description: 'Penetrating r=2: explode'});
   testResults.push({Expected: '=2', Actual: group.die.rerollCriteria, Description: 'Penetrating r=2: reroll'});
   testResults.push({Expected: '', Actual: returned, Description: 'Penetrating r=2: returned'});
   } catch(e){testResults.push({Error: e, Description: 'Penetrating r=2'});}

   try{
   group = {die: {}};
   string = 'r!==-2!!reroll 1';
   returned = Parser._shortHand(string, string, group);
   testResults.push({Expected: Die.explodeTypes.Compound, Actual: group.die.explodeType, Description: 'Compound r!==-2: explode'});
   testResults.push({Expected: '!==-2', Actual: group.die.rerollCriteria, Description: 'Compound r!==-2: reroll'});
   testResults.push({Expected: 'reroll 1', Actual: returned, Description: 'Compound r!==-2: returned'});
   } catch(e){testResults.push({Error: e, Description: 'Compound r!==-2'});}

   try{
   string = '!!!';  //Compound then regular
   Parser._shortHand(string, string, {die: {}});
   TesterUtility.failedToThrow(testResults, '2 explode');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('!!!\nmultiple explosions found. Max is 1'), Actual: e, Description: '2 explode'});
   }

   try{
   string = 'r1r2';
   Parser._shortHand(string, string, {die: {}});
   TesterUtility.failedToThrow(testResults, '2 reroll');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('r1r2\nmultiple reroll criteria found. Max is 1'), Actual: e, Description: '2 reroll'});
   }

   try{
   group = {die: {}};
   string = 'dl2';
   returned = Parser._shortHand(string, string, group);
   testResults.push({Expected: DicePool.dropKeepTypes.DropLowest, Actual: group.dropKeepType, Description: 'DropLowest 2: dropKeepType'});
   testResults.push({Expected: 2, Actual: group.dropKeepCount, Description: 'DropLowest 2: dropKeepCount'});
   } catch(e){testResults.push({Error: e, Description: 'DropLowest 2'});}

   try{
   group = {die: {}};
   string = 'dh';
   returned = Parser._shortHand(string, string, group);
   testResults.push({Expected: DicePool.dropKeepTypes.DropHighest, Actual: group.dropKeepType, Description: 'DropHighest: dropKeepType'});
   testResults.push({Expected: 1, Actual: group.dropKeepCount, Description: 'DropHighest: dropKeepCount'});
   } catch(e){testResults.push({Error: e, Description: 'DropHighest'});}

   try{
   group = {die: {}};
   string = 'd3';
   returned = Parser._shortHand(string, string, group);
   testResults.push({Expected: DicePool.dropKeepTypes.DropLowest, Actual: group.dropKeepType, Description: 'Drop 3: dropKeepType'});
   testResults.push({Expected: 3, Actual: group.dropKeepCount, Description: 'Drop 3: dropKeepCount'});
   } catch(e){testResults.push({Error: e, Description: 'Drop 3'});}

   try{
   group = {die: {}};
   string = 'k';
   returned = Parser._shortHand(string, string, group);
   testResults.push({Expected: DicePool.dropKeepTypes.KeepHighest, Actual: group.dropKeepType, Description: 'Keep: dropKeepType'});
   testResults.push({Expected: 1, Actual: group.dropKeepCount, Description: 'Keep: dropKeepCount'});
   } catch(e){testResults.push({Error: e, Description: 'Keep'});}

   try{
   group = {die: {}};
   string = 'kl';
   returned = Parser._shortHand(string, string, group);
   testResults.push({Expected: DicePool.dropKeepTypes.KeepLowest, Actual: group.dropKeepType, Description: 'KeepLowest: dropKeepType'});
   testResults.push({Expected: 1, Actual: group.dropKeepCount, Description: 'KeepLowest: dropKeepCount'});
   } catch(e){testResults.push({Error: e, Description: 'KeepLowest'});}

   try{
   string = 'd1k1';
   Parser._shortHand(string, string, {die: {}});
   TesterUtility.failedToThrow(testResults, '2 dropKeep');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('d1k1\nmultiple drop/keep criteria found. Max is 1'), Actual: e, Description: '2 dropKeep'});
   }

   TesterUtility.displayResults('Parser Parser._shortHand', testResults, isFirst);
};
Tester.Parser._longHand = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], returned, expected, string, group;

   try{
   group = {die: {}};
   string = ' exploding ducks';
   returned = Parser._longHand(string, string, group);
   testResults.push({Expected: Die.explodeTypes.Normal, Actual: group.die.explodeType, Description: 'Simple: explode'});
   testResults.push({Expected: undefined, Actual: group.die.rerollCriteria, Description: 'Simple: reroll'});
   testResults.push({Expected: ' ducks', Actual: returned, Description: 'Simple: returned'});
   } catch(e){testResults.push({Error: e, Description: 'Simple'});}

   try{
   group = {die: {}};
   string = ' compound explode die reroll dice that are not equal to 5';
   returned = Parser._longHand(string, string, group);
   testResults.push({Expected: Die.explodeTypes.Compound, Actual: group.die.explodeType, Description: 'Compound r!=5: explode'});
   testResults.push({Expected: '!=5', Actual: group.die.rerollCriteria, Description: 'Compound r!=5: reroll'});
   testResults.push({Expected: '', Actual: returned, Description: 'Compound r!=5: returned'});
   } catch(e){testResults.push({Error: e, Description: 'Compound r!=5'});}

   try{
   group = {die: {}};
   string = ' penetrate explode reroll greater than or equal 3';
   returned = Parser._longHand(string, string, group);
   testResults.push({Expected: Die.explodeTypes.Penetrating, Actual: group.die.explodeType, Description: 'Penetrating r>=3: explode'});
   testResults.push({Expected: '>=3', Actual: group.die.rerollCriteria, Description: 'Penetrating r>=3: reroll'});
   testResults.push({Expected: '', Actual: returned, Description: 'Penetrating r>=3: returned'});
   } catch(e){testResults.push({Error: e, Description: 'Penetrating r>=3'});}

   try{
   group = {die: {}};
   string = ' reroll equal 2';
   returned = Parser._longHand(string, string, group);
   testResults.push({Expected: undefined, Actual: group.die.explodeType, Description: 'r=2: explode'});
   testResults.push({Expected: '==2', Actual: group.die.rerollCriteria, Description: 'r=2: reroll'});
   testResults.push({Expected: '', Actual: returned, Description: 'r=2: returned'});
   } catch(e){testResults.push({Error: e, Description: 'r=2'});}

   try{
   group = {die: {}};
   string = ' reroll less than 1';
   returned = Parser._longHand(string, string, group);
   testResults.push({Expected: undefined, Actual: group.die.explodeType, Description: 'r<1: explode'});
   testResults.push({Expected: '<1', Actual: group.die.rerollCriteria, Description: 'r<1: reroll'});
   testResults.push({Expected: '', Actual: returned, Description: 'r<1: returned'});
   } catch(e){testResults.push({Error: e, Description: 'r<1'});}

   try{
   group = {die: {}};
   string = ' rerolling 8';
   returned = Parser._longHand(string, string, group);
   testResults.push({Expected: undefined, Actual: group.die.explodeType, Description: 'r8: explode'});
   testResults.push({Expected: '==8', Actual: group.die.rerollCriteria, Description: 'r8: reroll'});
   testResults.push({Expected: '', Actual: returned, Description: 'r8: returned'});
   } catch(e){testResults.push({Error: e, Description: 'r8'});}

   try{
   string = ' explode explode';
   Parser._longHand(string, string, {die: {}});
   TesterUtility.failedToThrow(testResults, '2 explode');
   }
   catch(e)
   {
       testResults.push({Expected: new Error(' explode explode\nmultiple explosions found. Max is 1'), Actual: e, Description: '2 explode'});
   }

   try{
   string = ' reroll 2 reroll 3';
   Parser._longHand(string, string, {die: {}});
   TesterUtility.failedToThrow(testResults, '2 reroll');
   }
   catch(e)
   {
       testResults.push({Expected: new Error(' reroll 2 reroll 3\nmultiple reroll criteria found. Max is 1'), Actual: e, Description: '2 reroll'});
   }

   try{
   group = {die: {}};
   string = ' drop the lowest 2';
   returned = Parser._longHand(string, string, group);
   testResults.push({Expected: DicePool.dropKeepTypes.DropLowest, Actual: group.dropKeepType, Description: 'DropLowest 2: dropKeepType'});
   testResults.push({Expected: 2, Actual: group.dropKeepCount, Description: 'DropLowest 2: dropKeepCount'});
   } catch(e){testResults.push({Error: e, Description: 'DropLowest 2'});}

   try{
   group = {die: {}};
   string = ' dropping highest';
   returned = Parser._longHand(string, string, group);
   testResults.push({Expected: DicePool.dropKeepTypes.DropHighest, Actual: group.dropKeepType, Description: 'DropHighest: dropKeepType'});
   testResults.push({Expected: 1, Actual: group.dropKeepCount, Description: 'DropHighest: dropKeepCount'});
   } catch(e){testResults.push({Error: e, Description: 'DropHighest'});}

   try{
   group = {die: {}};
   string = ' ignore 3';
   returned = Parser._longHand(string, string, group);
   testResults.push({Expected: DicePool.dropKeepTypes.DropLowest, Actual: group.dropKeepType, Description: 'Drop 3: dropKeepType'});
   testResults.push({Expected: 3, Actual: group.dropKeepCount, Description: 'Drop 3: dropKeepCount'});
   } catch(e){testResults.push({Error: e, Description: 'Drop 3'});}

   try{
   group = {die: {}};
   string = ' keep 1';
   returned = Parser._longHand(string, string, group);
   testResults.push({Expected: DicePool.dropKeepTypes.KeepHighest, Actual: group.dropKeepType, Description: 'Keep 1: dropKeepType'});
   testResults.push({Expected: 1, Actual: group.dropKeepCount, Description: 'Keep 1: dropKeepCount'});
   } catch(e){testResults.push({Error: e, Description: 'Keep 1'});}

   try{
   group = {die: {}};
   string = ' keep lowest';
   returned = Parser._longHand(string, string, group);
   testResults.push({Expected: DicePool.dropKeepTypes.KeepLowest, Actual: group.dropKeepType, Description: 'KeepLowest: dropKeepType'});
   testResults.push({Expected: 1, Actual: group.dropKeepCount, Description: 'KeepLowest: dropKeepCount'});
   } catch(e){testResults.push({Error: e, Description: 'KeepLowest'});}

   try{
   string = ' remove highest keep lowest';
   Parser._longHand(string, string, {die: {}});
   TesterUtility.failedToThrow(testResults, '2 dropKeep');
   }
   catch(e)
   {
       testResults.push({Expected: new Error(' remove highest keep lowest\nmultiple drop/keep criteria found. Max is 1'), Actual: e, Description: '2 dropKeep'});
   }

   try{
   group = {die: {}};
   string = ' keep';
   returned = Parser._longHand(string, string, group);
   testResults.push({Expected: undefined, Actual: group.dropKeepType, Description: 'Ignore keep alone: dropKeepType'});
   testResults.push({Expected: undefined, Actual: group.dropKeepCount, Description: 'Ignore keep alone: dropKeepCount'});
   testResults.push({Expected: string, Actual: returned, Description: 'Ignore keep alone: dropKeepCount'});
   } catch(e){testResults.push({Error: e, Description: 'Ignore keep alone'});}

   TesterUtility.displayResults('Parser Parser._longHand', testResults, isFirst);
};
