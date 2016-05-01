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

   try{
   expected = input = {die: new Die(2)};
   testResults.push({Expected: expected, Actual: JSON.clone(input, JsonReviver.dicePool), Description: 'Clones Die'});
   } catch(e){testResults.push({Error: e, Description: 'Clones Die'});}

   try{
   expected = input = {dicePool: new DicePool('2d3')};
   testResults.push({Expected: expected, Actual: JSON.clone(input, JsonReviver.dicePool), Description: 'Clones DicePool'});
   } catch(e){testResults.push({Error: e, Description: 'Clones DicePool'});}

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
