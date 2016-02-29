'use strict';
Tester.Stringifier = {};
Tester.Stringifier.WarhammerAttackUnit = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

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

   TesterUtility.displayResults('Stringifier Stringifier.WarhammerAttackUnit', testResults, isFirst);
};
