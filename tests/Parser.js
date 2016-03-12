'use strict';
Tester.Parser = {};
Tester.Parser.diceGroup = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], returned, expected, string;

   try{
   string = '2d8+2d16';
   returned = Parser.diceGroup(string);
   expected = [
      {
         die: Parser._die(string, 'd8'),
         dieCount: 2
      },
      {
         die: Parser._die(string, 'd16'),
         dieCount: 2
      }
   ];
   testResults.push({Expected: expected, Actual: returned, Description: 'Happy path: 2d8+2d16'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path: 2d8+2d16'});}

   try{
   Parser.diceGroup();
   TesterUtility.failedToThrow(testResults, 'No arg');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('undefined\nexpected "d" or "z". Found: undefined'), Actual: e, Description: 'No arg'});
   }

   try{
   string = '\n  D8    -     z16\t ';
   returned = Parser.diceGroup(string);
   expected = [
      {
         die: Parser._die(string, 'd8'),
         dieCount: 1
      },
      {
         die: Parser._die(string, 'z16'),
         dieCount: 1,
         areDiceNegative: true
      }
   ];
   testResults.push({Expected: expected, Actual: returned, Description: 'Trim lower: d8-z16'});
   } catch(e){testResults.push({Error: e, Description: 'Trim lower'});}

   try{
   returned = Parser.diceGroup('d3 reroll dice    less\t\rthan 3');
   testResults.push({Expected: '<3', Actual: returned[0].die.rerollCriteria, Description: 'Replace all whitespace with 1 space'});
   } catch(e){testResults.push({Error: e, Description: 'Replace all whitespace with 1 space'});}

   try{
   string = 'd8-3d16';
   returned = Parser.diceGroup(string);
   expected = [
      {
         die: Parser._die(string, 'd8'),
         dieCount: 1
      },
      {
         die: Parser._die(string, 'd16'),
         dieCount: 3,
         areDiceNegative: true
      }
   ];
   testResults.push({Expected: expected, Actual: returned, Description: 'Negative: d8-3d16'});
   } catch(e){testResults.push({Error: e, Description: 'Negative: d8-3d16'});}

   try{
   returned = Parser.diceGroup('-d4');
   expected = [
      {
         die: Parser._die('-d4', 'd4'),
         dieCount: 1,
         areDiceNegative: true
      }
   ];
   testResults.push({Expected: expected, Actual: returned, Description: 'Negative: -d4'});
   } catch(e){testResults.push({Error: e, Description: 'Negative: -d4'});}

   try{
   Parser.diceGroup('0d3');
   TesterUtility.failedToThrow(testResults, '0 dice');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('0d3\ninvalid dieCount: 0'), Actual: e, Description: '0 dice'});
   }

   TesterUtility.displayResults('Parser Parser.diceGroup', testResults, isFirst);
};
Tester.Parser._die = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], returned, expected, string;

   try{
   string = 'd6';
   returned = Parser._die(string, string);
   expected = {constantModifier: 0, sideCount: 6};
   testResults.push({Expected: expected, Actual: returned, Description: 'Happy path: d6'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   string = 'z5';
   returned = Parser._die(string, string);
   expected = {constantModifier: -1, sideCount: 5};
   testResults.push({Expected: expected, Actual: returned, Description: 'z5'});
   } catch(e){testResults.push({Error: e, Description: 'z5'});}

   try{
   Parser._die('d6+h3', 'h3');
   TesterUtility.failedToThrow(testResults, 'Non dz type');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('d6+h3\nexpected "d" or "z". Found: h3'), Actual: e, Description: 'Non dz type'});
   }

   try{
   Parser._die('d6+', '');
   TesterUtility.failedToThrow(testResults, 'Empty arg');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('d6+\nexpected "d" or "z". Found: '), Actual: e, Description: 'Empty arg'});
   }

   try{
   string = 'd%2';
   returned = Parser._die(string, string);
   testResults.push({Expected: 1002, Actual: returned.sideCount, Description: 'Leading % to 100'});
   } catch(e){testResults.push({Error: e, Description: 'Leading % to 100'});}

   try{
   string = 'd2%';
   returned = Parser._die(string, string);
   testResults.push({Expected: 200, Actual: returned.sideCount, Description: 'Non-leading first % to 00'});
   } catch(e){testResults.push({Error: e, Description: 'Non-leading first % to 00'});}

   try{
   string = 'd%%';
   returned = Parser._die(string, string);
   testResults.push({Expected: 10000, Actual: returned.sideCount, Description: 'Other % to 00'});
   } catch(e){testResults.push({Error: e, Description: 'Other % to 00'});}

   try{
   string = 'df';
   returned = Parser._die(string, string);
   expected = {constantModifier: -2, sideCount: 3};
   testResults.push({Expected: expected, Actual: returned, Description: 'Fudge die: happy'});
   } catch(e){testResults.push({Error: e, Description: 'Fudge die: happy'});}

   try{
   string = 'zf';
   returned = Parser._die(string, string);
   expected = {constantModifier: -2, sideCount: 3};
   testResults.push({Expected: expected, Actual: returned, Description: 'Fudge die: zeroed'});
   } catch(e){testResults.push({Error: e, Description: 'Fudge die: zeroed'});}

   try{
   string = 'df!';
   Parser._die(string, string);
   TesterUtility.failedToThrow(testResults, 'Fudge die: illegal');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('df!\nFudge/Fate dice don\'t explode or reroll. Illegal: !'),
         Actual: e, Description: 'Fudge die: illegal'});
   }

   try{
   string = 'd!';
   Parser._die(string, string);
   TesterUtility.failedToThrow(testResults, 'No sideCount');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('d!\nexpected sideCount. Found: !'), Actual: e, Description: 'No sideCount'});
   }

   try{
   string = 'd3r>=2 penetrating exploding dice';
   returned = Parser._die(string, string);
   testResults.push({Expected: Die.explodeTypes.Penetrating, Actual: returned.explodeType, Description: 'Short long: explode'});
   testResults.push({Expected: '>=2', Actual: returned.rerollCriteria, Description: 'Short long: reroll'});
   } catch(e){testResults.push({Error: e, Description: 'Short long'});}

   try{
   string = 'd3! explode';
   Parser._die(string, string);
   TesterUtility.failedToThrow(testResults, '2 explode');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('d3! explode\nmultiple explosions found. Max is 1'), Actual: e, Description: '2 explode'});
   }

   try{
   string = 'd3r-1 reroll 0';
   Parser._die(string, string);
   TesterUtility.failedToThrow(testResults, '2 reroll');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('d3r-1 reroll 0\nmultiple reroll criteria found. Max is 1'), Actual: e, Description: '2 reroll'});
   }

   try{
   string = 'd3! reroll 1 reroll rocks';
   Parser._die(string, string);
   TesterUtility.failedToThrow(testResults, 'Unparsable');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('d3! reroll 1 reroll rocks\nUnparsable:  reroll rocks'), Actual: e, Description: 'Unparsable'});
   }

   try{
   string = 'd3 reroll 1!';
   Parser._die(string, string);
   TesterUtility.failedToThrow(testResults, 'Illegal: Long then short');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('d3 reroll 1!\nUnparsable: !'), Actual: e, Description: 'Illegal: Long then short'});
   }

   TesterUtility.displayResults('Parser Parser._die', testResults, isFirst);
};
Tester.Parser._shortHand = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], returned, expected, string, inputJson;

   try{
   inputJson = {};
   string = 'r>1';
   returned = Parser._shortHand(string, string, inputJson);
   testResults.push({Expected: undefined, Actual: inputJson.explodeType, Description: 'r>1: explode'});
   testResults.push({Expected: '>1', Actual: inputJson.rerollCriteria, Description: 'r>1: reroll'});
   testResults.push({Expected: '', Actual: returned, Description: 'r>1: returned'});
   } catch(e){testResults.push({Error: e, Description: 'r>1'});}

   try{
   inputJson = {};
   string = 'r1! remainder';
   returned = Parser._shortHand(string, string, inputJson);
   testResults.push({Expected: Die.explodeTypes.Normal, Actual: inputJson.explodeType, Description: 'Normal r1: explode'});
   testResults.push({Expected: '===1', Actual: inputJson.rerollCriteria, Description: 'Normal r1: reroll'});
   testResults.push({Expected: ' remainder', Actual: returned, Description: 'Normal r1: returned'});
   } catch(e){testResults.push({Error: e, Description: 'Normal r1'});}

   try{
   inputJson = {};
   string = '!pr=2';
   returned = Parser._shortHand(string, string, inputJson);
   testResults.push({Expected: Die.explodeTypes.Penetrating, Actual: inputJson.explodeType, Description: 'Penetrating r=2: explode'});
   testResults.push({Expected: '=2', Actual: inputJson.rerollCriteria, Description: 'Penetrating r=2: reroll'});
   testResults.push({Expected: '', Actual: returned, Description: 'Penetrating r=2: returned'});
   } catch(e){testResults.push({Error: e, Description: 'Penetrating r=2'});}

   try{
   inputJson = {};
   string = 'r!==-2!!reroll 1';
   returned = Parser._shortHand(string, string, inputJson);
   testResults.push({Expected: Die.explodeTypes.Compound, Actual: inputJson.explodeType, Description: 'Compound r!==-2: explode'});
   testResults.push({Expected: '!==-2', Actual: inputJson.rerollCriteria, Description: 'Compound r!==-2: reroll'});
   testResults.push({Expected: 'reroll 1', Actual: returned, Description: 'Compound r!==-2: returned'});
   } catch(e){testResults.push({Error: e, Description: 'Compound r!==-2'});}

   try{
   inputJson = {};
   string = '!!!';  //Compound then regular
   Parser._shortHand(string, string, inputJson);
   TesterUtility.failedToThrow(testResults, '2 explode');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('!!!\nmultiple explosions found. Max is 1'), Actual: e, Description: '2 explode'});
   }

   try{
   inputJson = {};
   string = 'r1r2';
   Parser._shortHand(string, string, inputJson);
   TesterUtility.failedToThrow(testResults, '2 reroll');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('r1r2\nmultiple reroll criteria found. Max is 1'), Actual: e, Description: '2 reroll'});
   }

   TesterUtility.displayResults('Parser Parser._shortHand', testResults, isFirst);
};
Tester.Parser._longHand = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], returned, expected, string, inputJson;

   try{
   inputJson = {};
   string = ' exploding ducks';
   returned = Parser._longHand(string, string, inputJson);
   testResults.push({Expected: Die.explodeTypes.Normal, Actual: inputJson.explodeType, Description: 'Simple: explode'});
   testResults.push({Expected: undefined, Actual: inputJson.rerollCriteria, Description: 'Simple: reroll'});
   testResults.push({Expected: ' ducks', Actual: returned, Description: 'Simple: returned'});
   } catch(e){testResults.push({Error: e, Description: 'Simple'});}

   try{
   inputJson = {};
   string = ' compound explode die reroll dice that are not equal to 5';
   returned = Parser._longHand(string, string, inputJson);
   testResults.push({Expected: Die.explodeTypes.Compound, Actual: inputJson.explodeType, Description: 'Compound r!=5: explode'});
   testResults.push({Expected: '!=5', Actual: inputJson.rerollCriteria, Description: 'Compound r!=5: reroll'});
   testResults.push({Expected: '', Actual: returned, Description: 'Compound r!=5: returned'});
   } catch(e){testResults.push({Error: e, Description: 'Compound r!=5'});}

   try{
   inputJson = {};
   string = ' penetrate explode reroll greater than or equal 3';
   returned = Parser._longHand(string, string, inputJson);
   testResults.push({Expected: Die.explodeTypes.Penetrating, Actual: inputJson.explodeType, Description: 'Penetrating r>=3: explode'});
   testResults.push({Expected: '>=3', Actual: inputJson.rerollCriteria, Description: 'Penetrating r>=3: reroll'});
   testResults.push({Expected: '', Actual: returned, Description: 'Penetrating r>=3: returned'});
   } catch(e){testResults.push({Error: e, Description: 'Penetrating r>=3'});}

   try{
   inputJson = {};
   string = ' reroll equal 2';
   returned = Parser._longHand(string, string, inputJson);
   testResults.push({Expected: undefined, Actual: inputJson.explodeType, Description: 'r=2: explode'});
   testResults.push({Expected: '==2', Actual: inputJson.rerollCriteria, Description: 'r=2: reroll'});
   testResults.push({Expected: '', Actual: returned, Description: 'r=2: returned'});
   } catch(e){testResults.push({Error: e, Description: 'r=2'});}

   try{
   inputJson = {};
   string = ' reroll less than 1';
   returned = Parser._longHand(string, string, inputJson);
   testResults.push({Expected: undefined, Actual: inputJson.explodeType, Description: 'r<1: explode'});
   testResults.push({Expected: '<1', Actual: inputJson.rerollCriteria, Description: 'r<1: reroll'});
   testResults.push({Expected: '', Actual: returned, Description: 'r<1: returned'});
   } catch(e){testResults.push({Error: e, Description: 'r<1'});}

   try{
   inputJson = {};
   string = ' rerolling 8';
   returned = Parser._longHand(string, string, inputJson);
   testResults.push({Expected: undefined, Actual: inputJson.explodeType, Description: 'r8: explode'});
   testResults.push({Expected: '==8', Actual: inputJson.rerollCriteria, Description: 'r8: reroll'});
   testResults.push({Expected: '', Actual: returned, Description: 'r8: returned'});
   } catch(e){testResults.push({Error: e, Description: 'r8'});}

   try{
   inputJson = {};
   string = ' explode explode';
   Parser._longHand(string, string, inputJson);
   TesterUtility.failedToThrow(testResults, '2 explode');
   }
   catch(e)
   {
       testResults.push({Expected: new Error(' explode explode\nmultiple explosions found. Max is 1'), Actual: e, Description: '2 explode'});
   }

   try{
   inputJson = {};
   string = ' reroll 2 reroll 3';
   Parser._longHand(string, string, inputJson);
   TesterUtility.failedToThrow(testResults, '2 reroll');
   }
   catch(e)
   {
       testResults.push({Expected: new Error(' reroll 2 reroll 3\nmultiple reroll criteria found. Max is 1'), Actual: e, Description: '2 reroll'});
   }

   TesterUtility.displayResults('Parser Parser._longHand', testResults, isFirst);
};
