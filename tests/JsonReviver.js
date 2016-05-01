'use strict';
Tester.JsonReviver = {};
Tester.JsonReviver.dicePool = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], input, expected;

   try{
   input = {die: 2};
   expected = {die: new Die(2)};
   testResults.push({Expected: expected, Actual: JSON.clone(input, JsonReviver.dicePool), Description: 'Revives Die'});
   } catch(e){testResults.push({Error: e, Description: 'Revives Die'});}

   try{
   input = {dicePool: '2d3'};
   expected = {dicePool: new DicePool('2d3')};
   testResults.push({Expected: expected, Actual: JSON.clone(input, JsonReviver.dicePool), Description: 'Revives DicePool'});
   } catch(e){testResults.push({Error: e, Description: 'Revives DicePool'});}

   /*Not sure if will do:
   try{
   input = {reviveWith: 'DiceExpression', useNew: true, value: [{exponent: 2, coefficient: 1}, {exponent:1, coefficient: 1}]};
   expected = new DiceExpression(new Die(2));
   testResults.push({Expected: expected, Actual: JSON.clone(input, JsonReviver.dicePool), Description: 'Revives DiceExpression'});
   } catch(e){testResults.push({Error: e, Description: 'Revives DiceExpression'});}
   */

   /*Not ready yet:
   try{
   testResults.push({Expected: new Die(2), Actual: JSON.clone(new Die(2), JsonReviver.dicePool), Description: 'Clones Die'});
   } catch(e){testResults.push({Error: e, Description: 'Clones Die'});}

   try{
   expected = input = new DicePool('2d3');
   testResults.push({Expected: expected, Actual: JSON.clone(input, JsonReviver.dicePool), Description: 'Clones DicePool'});
   } catch(e){testResults.push({Error: e, Description: 'Clones DicePool'});}

   try{
   expected = input = new DiceExpression(new Die(2));
   testResults.push({Expected: expected, Actual: JSON.clone(input, JsonReviver.dicePool), Description: 'Clones DiceExpression'});
   } catch(e){testResults.push({Error: e, Description: 'Clones DiceExpression'});}
   */

   try{
   testResults.push({Expected: 42, Actual: JSON.clone(42, JsonReviver.dicePool), Description: 'No revival'});
   } catch(e){testResults.push({Error: e, Description: 'No revival'});}

   try{
   JsonReviver.dicePool('die', 'blah');
   TesterUtility.failedToThrow(testResults, 'Revive failed');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('blah\nexpected "d" or "z". Found: blah'), Actual: e, Description: 'Revive failed'});
   }

   TesterUtility.displayResults('JsonReviver JsonReviver.dicePool', testResults, isFirst);
};
