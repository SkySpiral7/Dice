'use strict';
TestSuite.Stringifier = {};
TestSuite.Stringifier.L5RGeneralRoll = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = Stringifier.L5RGeneralRoll({valuesKept: [11,14], totalValue: 26, voidPointsRecovered: 1, valuesDropped: [2,3], success: true});
   expected  = 'Values kept: 11+14 = 25+1 = 26\n';
   expected += 'Void points recovered: 1. Result: Success\n';
   expected += 'Values dropped: 2,3\n';
   testResults.push({Expected: expected, Actual: actual, Description: '2 values each, success'});
   } catch(e){testResults.push({Error: e, Description: '2 values each, success'});}

   try{
   actual = Stringifier.L5RGeneralRoll({valuesKept: [11], totalValue: 10, voidPointsRecovered: 0, valuesDropped: [2], success: false});
   expected  = 'Values kept: 11 = 11-1 = 10\n';
   expected += 'Void points recovered: 0. Result: Failure\n';
   expected += 'Values dropped: 2\n';
   testResults.push({Expected: expected, Actual: actual, Description: 'Single failure'});
   } catch(e){testResults.push({Error: e, Description: 'Single failure'});}

   try{
   actual = Stringifier.L5RGeneralRoll({valuesKept: [11], totalValue: 11, voidPointsRecovered: 0, valuesDropped: [], success: true});
   expected  = 'Values: 11 = 11\n';
   expected += 'Void points recovered: 0. Result: Success\n';
   testResults.push({Expected: expected, Actual: actual, Description: 'None dropped'});
   } catch(e){testResults.push({Error: e, Description: 'None dropped'});}

   return TestRunner.displayResults('Stringifier Stringifier.L5RGeneralRoll', testResults, isFirst);
};
TestSuite.Stringifier.WarhammerAttackUnit = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual;

   try{
   actual = Stringifier.WarhammerAttackUnit({hit: 0});
   testResults.push({Expected: 'None hit.', Actual: actual, Description: 'None hit'});
   } catch(e){testResults.push({Error: e, Description: 'None hit'});}

   try{
   actual = Stringifier.WarhammerAttackUnit({hit: 5, wounded: 0});
   testResults.push({Expected: 'Number hit: 5. None wounded.', Actual: actual, Description: 'None wounded'});
   } catch(e){testResults.push({Error: e, Description: 'None wounded'});}

   try{
   actual = Stringifier.WarhammerAttackUnit({hit: 5, wounded: 3, unsavedWounds: 0});
   testResults.push({Expected: 'Number hit: 5. Number wounded: 3. All Saved.', Actual: actual, Description: 'All Saved'});
   } catch(e){testResults.push({Error: e, Description: 'All Saved'});}

   try{
   actual = Stringifier.WarhammerAttackUnit({hit: 5, wounded: 3, unsavedWounds: 2});
   testResults.push({Expected: 'Number hit: 5. Number wounded: 3. Unsaved Wounds: 2.', Actual: actual, Description: 'Unsaved Wounds'});
   } catch(e){testResults.push({Error: e, Description: 'Unsaved Wounds'});}

   return TestRunner.displayResults('Stringifier Stringifier.WarhammerAttackUnit', testResults, isFirst);
};
