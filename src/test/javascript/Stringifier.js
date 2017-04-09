'use strict';
TestSuite.Stringifier = {};
TestSuite.Stringifier.PathfinderAttack = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = Stringifier.PathfinderAttack({attack: 'Critical Miss'});
   expected  = 'Critical Miss.';
   testResults.push({Expected: expected, Actual: actual, Description: 'Critical Miss'});
   } catch(e){testResults.push({Error: e, Description: 'Critical Miss'});}

   try{
   actual = Stringifier.PathfinderAttack({attack: 'Miss'});
   expected  = 'Miss.';
   testResults.push({Expected: expected, Actual: actual, Description: 'Miss'});
   } catch(e){testResults.push({Error: e, Description: 'Miss'});}

   try{
   actual = Stringifier.PathfinderAttack({attack: 'Hit', damage: {nonLethal: 0, lethal: 0}});
   expected  = 'Hit but damage reduction has reduced it all.';
   testResults.push({Expected: expected, Actual: actual, Description: 'Hit no damage'});
   } catch(e){testResults.push({Error: e, Description: 'Hit no damage'});}

   try{
   actual = Stringifier.PathfinderAttack({attack: 'Hit', damage: {nonLethal: 0, lethal: 1}});
   expected  = 'Hit dealing 1 point of damage.';
   testResults.push({Expected: expected, Actual: actual, Description: 'Hit lethal'});
   } catch(e){testResults.push({Error: e, Description: 'Hit lethal'});}

   try{
   actual = Stringifier.PathfinderAttack({attack: 'Hit', damage: {nonLethal: 5, lethal: 0}});
   expected  = 'Hit dealing 5 points of non-lethal damage.';
   testResults.push({Expected: expected, Actual: actual, Description: 'Hit non-lethal'});
   } catch(e){testResults.push({Error: e, Description: 'Hit non-lethal'});}

   try{
   actual = Stringifier.PathfinderAttack({attack: 'Critical Hit', damage: {nonLethal: 5, lethal: 31}});
   expected  = 'Critical Hit dealing 31 points of damage and 5 points of non-lethal damage.';
   testResults.push({Expected: expected, Actual: actual, Description: 'Critical Hit both'});
   } catch(e){testResults.push({Error: e, Description: 'Critical Hit both'});}

   try{
   actual = Stringifier.PathfinderAttack({attack: 'Critical Hit', damage: {nonLethal: 1, lethal: 1}});
   expected  = 'Critical Hit dealing 1 point of damage and 1 point of non-lethal damage.';
   testResults.push({Expected: expected, Actual: actual, Description: 'Grammar'});
   } catch(e){testResults.push({Error: e, Description: 'Grammar'});}

   return TestRunner.displayResults('Stringifier Stringifier.PathfinderAttack', testResults, isFirst);
};
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
