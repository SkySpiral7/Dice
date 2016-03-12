'use strict';
Tester.JsonReviver = {};
Tester.JsonReviver.reviveWith = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], input, expected;

   try{
   input = {reviveWith: 'Die', useNew: true, value: 2};
   testResults.push({Expected: new Die(2), Actual: JSON.clone(input, JsonReviver.reviveWith), Description: 'Revives Die'});
   } catch(e){testResults.push({Error: e, Description: 'Revives Die'});}

   try{
   input = {reviveWith: 'DicePool', useNew: true, value: '2d3'};
   testResults.push({Expected: new DicePool('2d3'), Actual: JSON.clone(input, JsonReviver.reviveWith), Description: 'Revives DicePool'});
   } catch(e){testResults.push({Error: e, Description: 'Revives DicePool'});}

   try{
   input = {reviveWith: 'DiceExpression', useNew: true, value: [{exponent: 2, coefficient: 1}, {exponent:1, coefficient: 1}]};
   expected = new DiceExpression(new Die(2));
   testResults.push({Expected: expected, Actual: JSON.clone(input, JsonReviver.reviveWith), Description: 'Revives DiceExpression'});
   } catch(e){testResults.push({Error: e, Description: 'Revives DiceExpression'});}

   try{
   input = {reviveWith: 'Date', useNew: true, value: '2016-03-04T02:37:18.163Z'};
   testResults.push({Expected: new Date('2016-03-04T02:37:18.163Z'), Actual: JSON.clone(input, JsonReviver.reviveWith), Description: 'Revives Date'});
   } catch(e){testResults.push({Error: e, Description: 'Revives Date'});}

   try{
   input = {reviveWith: 'parseInt', value: '15'};
   testResults.push({Expected: 15, Actual: JSON.clone(input, JsonReviver.reviveWith), Description: 'Doesn\'t use new'});
   } catch(e){testResults.push({Error: e, Description: 'Doesn\'t use new'});}

   try{
   testResults.push({Expected: new Die(2), Actual: JSON.clone(new Die(2), JsonReviver.reviveWith), Description: 'Clones Die'});
   } catch(e){testResults.push({Error: e, Description: 'Clones Die'});}

   try{
   expected = input = new DicePool('2d3');
   testResults.push({Expected: expected, Actual: JSON.clone(input, JsonReviver.reviveWith), Description: 'Clones DicePool'});
   } catch(e){testResults.push({Error: e, Description: 'Clones DicePool'});}

   try{
   expected = input = new DiceExpression(new Die(2));
   testResults.push({Expected: expected, Actual: JSON.clone(input, JsonReviver.reviveWith), Description: 'Clones DiceExpression'});
   } catch(e){testResults.push({Error: e, Description: 'Clones DiceExpression'});}

   try{
   testResults.push({Expected: 45, Actual: JSON.clone(45, JsonReviver.reviveWith), Description: 'No revival'});
   } catch(e){testResults.push({Error: e, Description: 'No revival'});}

   try{
   input = {reviveWith: 'Die', useNew: true};
   testResults.push({Expected: new Die(), Actual: JsonReviver.reviveWith(null, input), Description: 'Allows no value'});
   } catch(e){testResults.push({Error: e, Description: 'Allows no value'});}

   try{
   input = {reviveWith: 'parseInt', value: '15'};
   testResults.push({Expected: 15, Actual: JsonReviver.reviveWith(null, input), Description: 'Direct: Doesn\'t use new'});
   testResults.push({Expected: [1,2,3], Actual: JsonReviver.reviveWith(null, [1,2,3]), Description: 'Direct: No revival'});
   } catch(e){testResults.push({Error: e, Description: 'Direct'});}

   try{
   JsonReviver.reviveWith(null, {reviveWith: 'startKeyLogger()', useNew: false, value: 15});
   TesterUtility.failedToThrow(testResults, 'evil safety');  //Description is not a typo
   }
   catch(e)
   {
       testResults.push({Expected: new Error('evil code detected. key:null, value:{"reviveWith":"startKeyLogger()",' +
         '"useNew":false,"value":15}'),
         Actual: e, Description: 'eval safety'});
   }

   try{
   JsonReviver.reviveWith(null, {reviveWith: 'easyAs123', useNew: false, value: 'ABC'});
   TesterUtility.failedToThrow(testResults, 'reviveWith not found');
   }
   catch(e)
   {
       testResults.push({Expected: new ReferenceError('easyAs123 is not defined'), Actual: e, Description: 'reviveWith not found'});
   }

   try{
   JsonReviver.reviveWith('sup', {reviveWith: 'document', useNew: false, value: 0});
   TesterUtility.failedToThrow(testResults, 'non-function reviveWith');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('Not a function. key:sup, value:{"reviveWith":"document","useNew":false,"value":0}'),
         Actual: e, Description: 'non-function reviveWith'});
   }

   try{
   input = {reviveWith: '\t Number.parseInt\n', useNew: false, value: '15'};
   testResults.push({Expected: 15, Actual: JSON.clone(input, JsonReviver.reviveWith), Description: 'Trimmed Dot support'});
   } catch(e){testResults.push({Error: e, Description: 'Trimmed Dot support'});}

   try{
   JsonReviver.reviveWith(null, {reviveWith: 'Die', useNew: true, value: 'blah'});
   TesterUtility.failedToThrow(testResults, 'Revive failed');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('blah\nexpected "d" or "z". Found: blah'), Actual: e, Description: 'Revive failed'});
   }

   TesterUtility.displayResults('JsonReviver JsonReviver.reviveWith', testResults, isFirst);
};
