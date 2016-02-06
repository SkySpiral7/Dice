'use strict';
Tester.Die = {};
Tester.Die._parseString = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], returned, expected, originalString;
   try{
   originalString = '1d6';
   returned = Die._parseString(originalString);
   expected = {originalString: originalString, isNegativeDice: false, constantModifier: 0, sideCount: 6, isFudgeDie: false};
   testResults.push({Expected: expected, Actual: returned, Description: 'Happy path: 1d6'});
   } catch(e){testResults.push({Error: e, Action: 'Happy path'});}

   try{
   originalString = '\n  -Z5\t ';
   returned = Die._parseString(originalString);
   expected = {originalString: originalString, isNegativeDice: true, constantModifier: -1, sideCount: 5, isFudgeDie: false};
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
   expected = {originalString: originalString, isNegativeDice: false, constantModifier: -2, sideCount: 3, isFudgeDie: true};
   testResults.push({Expected: expected, Actual: returned, Description: 'Fudge die: negative'});
   } catch(e){testResults.push({Error: e, Action: 'Fudge die: negative'});}

   try{
   originalString = 'zf';
   returned = Die._parseString(originalString);
   expected = {originalString: originalString, isNegativeDice: false, constantModifier: -2, sideCount: 3, isFudgeDie: true};
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
