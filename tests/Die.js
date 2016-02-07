'use strict';
Tester.Die = {};
Tester.Die._parseString = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], returned, expected, originalString;
   try{
   originalString = '1d6';
   returned = Die._parseString(originalString);
   expected = {originalString: originalString, isDieNegative: false, constantModifier: 0, sideCount: 6, isFudgeDie: false};
   testResults.push({Expected: expected, Actual: returned, Description: 'Happy path: 1d6'});
   } catch(e){testResults.push({Error: e, Action: 'Happy path'});}

   try{
   originalString = '\n  -Z5\t ';
   returned = Die._parseString(originalString);
   expected = {originalString: originalString, isDieNegative: true, constantModifier: -1, sideCount: 5, isFudgeDie: false};
   testResults.push({Expected: expected, Actual: returned, Description: 'Trim lower: -z5'});
   } catch(e){testResults.push({Error: e, Action: 'Trim lower'});}

   try{
   Die._parseString('0d3');
   TesterUtility.failedToThrow(testResults, '0 dice');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('0d3\ninvalid dieCount: 0'), Actual: e, Description: '0 dice'});
   }

   try{
   Die._parseString('-10d3');
   TesterUtility.failedToThrow(testResults, '10 dice');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('-10d3\ndie count (if provided) must be 1 (or -1). Otherwise use DicePool'), Actual: e, Description: '10 dice'});
   }

   try{
   Die._parseString('%d3');
   TesterUtility.failedToThrow(testResults, 'Hundred dice');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('%d3\ndie count (if provided) must be 1 (or -1). Otherwise use DicePool'), Actual: e, Description: 'Hundred dice'});
   }

   try{
   Die._parseString('1%d3');
   TesterUtility.failedToThrow(testResults, 'Thousand dice');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('1%d3\ndie count (if provided) must be 1 (or -1). Otherwise use DicePool'), Actual: e, Description: 'Thousand dice'});
   }

   try{
   Die._parseString('1h3');
   TesterUtility.failedToThrow(testResults, 'Non dz type');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('1h3\nexpected "d" or "z". Found: h3'), Actual: e, Description: 'Non dz type'});
   }

   try{
   returned = Die._parseString('d%2');
   testResults.push({Expected: 1002, Actual: returned.sideCount, Description: 'Leading % to 100'});
   } catch(e){testResults.push({Error: e, Action: 'Leading % to 100'});}

   try{
   returned = Die._parseString('d2%');
   testResults.push({Expected: 200, Actual: returned.sideCount, Description: 'Non-leading first % to 00'});
   } catch(e){testResults.push({Error: e, Action: 'Non-leading first % to 00'});}

   try{
   returned = Die._parseString('d%%');
   testResults.push({Expected: 10000, Actual: returned.sideCount, Description: 'Other % to 00'});
   } catch(e){testResults.push({Error: e, Action: 'Other % to 00'});}

   try{
   originalString = '-1dF';
   returned = Die._parseString(originalString);
   expected = {originalString: originalString, isDieNegative: false, constantModifier: -2, sideCount: 3, isFudgeDie: true};
   testResults.push({Expected: expected, Actual: returned, Description: 'Fudge die: negative'});
   } catch(e){testResults.push({Error: e, Action: 'Fudge die: negative'});}

   try{
   originalString = 'zf';
   returned = Die._parseString(originalString);
   expected = {originalString: originalString, isDieNegative: false, constantModifier: -2, sideCount: 3, isFudgeDie: true};
   testResults.push({Expected: expected, Actual: returned, Description: 'Fudge die: zeroed'});
   } catch(e){testResults.push({Error: e, Action: 'Fudge die: zeroed'});}

   try{
   Die._parseString('d!');
   TesterUtility.failedToThrow(testResults, 'No sideCount');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('d!\nexpected sideCount. Found: !'), Actual: e, Description: 'No sideCount'});
   }

   try{
   returned = Die._parseString('d3r1!');
   testResults.push({Expected: Die.explodeTypes.Normal, Actual: returned.explodeType, Description: '2 short: explode'});
   testResults.push({Expected: '==1', Actual: returned.rerollCriteria, Description: '2 short: reroll'});
   } catch(e){testResults.push({Error: e, Action: '2 short'});}

   try{
   //also tests: inputString.replace(/\s+/g, ' ');
   returned = Die._parseString('d3 reroll dice less\t\rthan 3 compound explode die');
   testResults.push({Expected: Die.explodeTypes.Compound, Actual: returned.explodeType, Description: '2 long: explode'});
   testResults.push({Expected: '<3', Actual: returned.rerollCriteria, Description: '2 long: reroll'});
   } catch(e){testResults.push({Error: e, Action: '2 long'});}

   try{
   returned = Die._parseString('d3r>=2 penetrating exploding dice');
   testResults.push({Expected: Die.explodeTypes.Penetrating, Actual: returned.explodeType, Description: 'Short long: explode'});
   testResults.push({Expected: '>=2', Actual: returned.rerollCriteria, Description: 'Short long: reroll'});
   } catch(e){testResults.push({Error: e, Action: 'Short long'});}

   try{
   returned = Die._parseString('d3!pr===2');
   testResults.push({Expected: Die.explodeTypes.Penetrating, Actual: returned.explodeType, Description: 'Short Penetrating: explode'});
   testResults.push({Expected: '===2', Actual: returned.rerollCriteria, Description: 'Short Penetrating: reroll'});
   } catch(e){testResults.push({Error: e, Action: 'Short Penetrating'});}

   try{
   returned = Die._parseString('d3r!==-2!!');
   testResults.push({Expected: Die.explodeTypes.Penetrating, Actual: returned.explodeType, Description: 'Short compound: explode'});
   testResults.push({Expected: '!==-2', Actual: returned.rerollCriteria, Description: 'Short compound: reroll'});
   } catch(e){testResults.push({Error: e, Action: 'Short compound'});}

   try{
   Die._parseString('d3! explode');
   TesterUtility.failedToThrow(testResults, '2 explode');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('d3! explode\nmultiple explosions found. Max is 1'), Actual: e, Description: '2 explode'});
   }

   try{
   Die._parseString('d3r-1 reroll 0');
   TesterUtility.failedToThrow(testResults, '2 reroll');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('d3r-1 reroll 0\nmultiple reroll criteria found. Max is 1'), Actual: e, Description: '2 reroll'});
   }

   try{
   Die._parseString('d3 exploding rocks');
   TesterUtility.failedToThrow(testResults, 'Unparsable');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('d3 exploding rocks\nUnparsable:  rocks'), Actual: e, Description: 'Unparsable'});
   }

   TesterUtility.displayResults('Die Die._parseString', testResults, isFirst);
};
Tester.Die._validate = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], input, expected;

   try{
   expected = {originalString: '1d6', sideCount: 6, isDieNegative: true, constantModifier: 1, isFudgeDie: true};
   input = JSON.clone(expected);
   Die._validate(input);
   testResults.push({Expected: expected, Actual: input, Description: 'Happy path'});
   } catch(e){testResults.push({Error: e, Action: 'Happy path'});}

   try{
   input = {originalString: new String('1d6'), sideCount: new Number(6), isDieNegative: new Boolean(false),
      constantModifier: new Number(0), isFudgeDie: new Boolean(false), rerollCriteria: new String('==1')};
   //expected.rerollCriteria = '==1';  //somehow causes Happy path to fail
   expected = {originalString: '1d6', sideCount: 6, isDieNegative: false, constantModifier: 0, isFudgeDie: false,
      rerollCriteria: '==1'};
   Die._validate(input);
   testResults.push({Expected: expected, Actual: input, Description: 'Unbox all'});
   } catch(e){testResults.push({Error: e, Action: 'Unbox all'});}

   try{
   input = {sideCount: 6};
   expected = {originalString: JSON.stringify(input), sideCount: 6, isDieNegative: false, constantModifier: 0, isFudgeDie: false};
   Die._validate(input);
   testResults.push({Expected: expected, Actual: input, Description: 'Default all'});
   } catch(e){testResults.push({Error: e, Action: 'Default all'});}

   try{
   Die._validate({originalString: 2, sideCount: 6});
   TesterUtility.failedToThrow(testResults, 'originalString invalid');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('2\noriginalString must be a string but was: number'), Actual: e, Description: 'originalString invalid'});
   }

   try{
   Die._validate({originalString: '1d6'});
   TesterUtility.failedToThrow(testResults, 'sideCount is required');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('1d6\nsideCount is required'), Actual: e, Description: 'sideCount is required'});
   }

   try{
   Die._validate({originalString: '1d6', sideCount: -2.5});
   TesterUtility.failedToThrow(testResults, 'invalid sideCount');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('1d6\ninvalid sideCount: -2.5'), Actual: e, Description: 'invalid sideCount'});
   }

   try{
   Die._validate({originalString: '1d6', sideCount: 6, isDieNegative: 2});
   TesterUtility.failedToThrow(testResults, 'invalid isDieNegative');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('1d6\ninvalid isDieNegative: 2'), Actual: e, Description: 'invalid isDieNegative'});
   }

   try{
   Die._validate({originalString: '1d6', sideCount: 6, constantModifier: 2.5});
   TesterUtility.failedToThrow(testResults, 'invalid constantModifier');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('1d6\nconstantModifier must be an integer but was: 2.5'), Actual: e, Description: 'invalid constantModifier'});
   }

   try{
   Die._validate({originalString: '1d6', sideCount: 6, isFudgeDie: 2});
   TesterUtility.failedToThrow(testResults, 'invalid isFudgeDie');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('1d6\ninvalid isFudgeDie: 2'), Actual: e, Description: 'invalid isFudgeDie'});
   }

   try{
   Die._validate({originalString: '1d6', sideCount: 6, rerollCriteria: '!'});
   TesterUtility.failedToThrow(testResults, 'invalid rerollCriteria');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('1d6\ninvalid rerollCriteria: !'), Actual: e, Description: 'invalid rerollCriteria'});
   }

   try{
   Die._validate({originalString: '1d6', sideCount: 1, explodeType: Die.explodeTypes.Normal});
   TesterUtility.failedToThrow(testResults, 'infinite exploding');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('1d6\nInfinite exploding. sideCount: 1'), Actual: e, Description: 'infinite exploding'});
   }

   try{
   Die._validate({originalString: '1d6', sideCount: 1, rerollCriteria: '===1'});
   TesterUtility.failedToThrow(testResults, 'infinite rerolling: 1');
   }
   catch(e)
   {
       testResults.push({Expected: new Error(
         '1d6\nInfinite rerolling: {"rerollCriteria":"===1","sideCount":1,"constantModifier":0,"isDieNegative":false}'),
         Actual: e, Description: 'infinite rerolling: 1'});
   }

   try{
   Die._validate({originalString: '1d6', sideCount: 6, constantModifier: 10, rerollCriteria: '<1000'});
   //minValue: 11
   //maxValue: 16
   TesterUtility.failedToThrow(testResults, 'infinite rerolling: positive');
   }
   catch(e)
   {
       testResults.push({Expected: new Error(
         '1d6\nInfinite rerolling: {"rerollCriteria":"<1000","sideCount":6,"constantModifier":10,"isDieNegative":false}'),
         Actual: e, Description: 'infinite rerolling: positive'});
   }

   try{
   Die._validate({originalString: '1d6', sideCount: 6, constantModifier: -10, isDieNegative: true, rerollCriteria: '>=0'});
   //minValue: -9 => 9
   //maxValue: -4 => 4
   TesterUtility.failedToThrow(testResults, 'infinite rerolling: negative');
   }
   catch(e)
   {
       testResults.push({Expected: new Error(
         '1d6\nInfinite rerolling: {"rerollCriteria":">=0","sideCount":6,"constantModifier":-10,"isDieNegative":true}'),
         Actual: e, Description: 'infinite rerolling: negative'});
   }

   TesterUtility.displayResults('Die Die._validate', testResults, isFirst);
};
