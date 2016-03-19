'use strict';
Tester.Misc = {};
Tester.Misc.getProperty = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], input, expected;

   try{
   testResults.push({Expected: alert, Actual: getProperty('alert'), Description: 'Happy path'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   getProperty(5);
   TesterUtility.failedToThrow(testResults, 'Invalid path');
   }
   catch(e)
   {
       testResults.push({Expected: getError(requireTypeOf, ['string', 5]), Actual: e, Description: 'Invalid path'});
   }

   try{
   getProperty('startKeyLogger()');
   TesterUtility.failedToThrow(testResults, 'evil safety');  //Description is not a typo
   }
   catch(e)
   {
       testResults.push({Expected: new Error('evil code detected: startKeyLogger()'),
         Actual: e, Description: 'eval safety'});
   }

   try{
   testResults.push({Expected: Math.PI, Actual: getProperty('Math.PI'), Description: 'Math.PI'});
   } catch(e){testResults.push({Error: e, Description: 'Math.PI'});}

   try{
   testResults.push({Expected: document.getElementById, Actual: getProperty('document.getElementById'), Description: 'document.getElementById'});
   } catch(e){testResults.push({Error: e, Description: 'document.getElementById'});}

   try{
   getProperty('easyAs123');
   TesterUtility.failedToThrow(testResults, 'not found');
   }
   catch(e)
   {
       testResults.push({Expected: new ReferenceError('easyAs123 is not defined'), Actual: e, Description: 'not found'});
   }

   TesterUtility.displayResults('Misc getProperty', testResults, isFirst);
};
