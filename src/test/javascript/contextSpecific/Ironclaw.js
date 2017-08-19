'use strict';
TestSuite.Ironclaw = {};
TestSuite.Ironclaw.DicePool = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual;

   try{
   actual = new Ironclaw.DicePool(1);
   testResults.push({Expected: new DicePool('d4'), Actual: actual, Description: 'Happy path using new'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   Ironclaw.DicePool('ham');
   TestRunner.failedToThrow(testResults, 'Invalid rank');
   }
   catch(e)
   {
      testResults.push({Expected: getError(Validation.requireNaturalNumber, ['ham']),
      Actual: e, Description: 'Invalid rank'});
   }

   try{
   actual = Ironclaw.DicePool(2);
   testResults.push({Expected: new DicePool('d6'), Actual: actual, Description: '2 => d6'});
   } catch(e){testResults.push({Error: e, Description: '2 => d6'});}

   try{
   actual = Ironclaw.DicePool(3);
   testResults.push({Expected: new DicePool('d8'), Actual: actual, Description: '3 => d8'});
   } catch(e){testResults.push({Error: e, Description: '3 => d8'});}

   try{
   actual = Ironclaw.DicePool(4);
   testResults.push({Expected: new DicePool('d10'), Actual: actual, Description: '4 => d10'});
   } catch(e){testResults.push({Error: e, Description: '4 => d10'});}

   try{
   actual = Ironclaw.DicePool(5);
   testResults.push({Expected: new DicePool('d12'), Actual: actual, Description: '5 => d12'});
   } catch(e){testResults.push({Error: e, Description: '5 => d12'});}

   try{
   actual = Ironclaw.DicePool(6);
   testResults.push({Expected: new DicePool('d12+d4'), Actual: actual, Description: '6 => d12+d4'});
   } catch(e){testResults.push({Error: e, Description: '6 => d12+d4'});}

   try{
   actual = Ironclaw.DicePool(7);
   testResults.push({Expected: new DicePool('d12+d6'), Actual: actual, Description: '7 => d12+d6'});
   } catch(e){testResults.push({Error: e, Description: '7 => d12+d6'});}

   try{
   actual = Ironclaw.DicePool(12);
   testResults.push({Expected: new DicePool('2d12+d6'), Actual: actual, Description: '12 => 2d12+d6'});
   } catch(e){testResults.push({Error: e, Description: '12 => 2d12+d6'});}

   return TestRunner.displayResults('Ironclaw Ironclaw.DicePool', testResults, isFirst);
};
