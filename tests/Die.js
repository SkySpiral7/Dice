'use strict';
Tester.Die = {};
Tester.Die.roll = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], actual, nonRandomNumbers, generator;

   try{
   //use the only die that isn't random
   testResults.push({Expected: [1], Actual: new Die(1).roll(), Description: 'No arg'});
   } catch(e){testResults.push({Error: e, Description: 'No arg'});}

   try{
   new Die().roll(5);
   TesterUtility.failedToThrow(testResults, 'randomSource wrong type');
   }
   catch(e)
   {
      testResults.push({Expected: getError(requireTypeOf, ['function', 5]),
         Actual: e, Description: 'randomSource wrong type'});
   }

   try{
   generator = nonRandomNumberGenerator([0]);
   actual = new Die().roll(generator);
   testResults.push({Expected: [1], Actual: actual, Description: 'Random exactly 0 is 1'});
   } catch(e){testResults.push({Error: e, Description: 'Random exactly 0 is 1'});}

   try{
   generator = nonRandomNumberGenerator([(1 - Number.EPSILON)]);
   actual = new Die(1000000).roll(generator);
   testResults.push({Expected: [1000000], Actual: actual, Description: 'Random almost 1 is max'});
   } catch(e){testResults.push({Error: e, Description: 'Random almost 1 is max'});}

   try{
   generator = dieResultsToNonRandomGenerator(8, [3, 5]);
   actual = new Die({sideCount: 8, constantModifier: 10, rerollCriteria: '===13'}).roll(generator);
   testResults.push({Expected: [15], Actual: actual, Description: 'Reroll uses constantModifier'});
   } catch(e){testResults.push({Error: e, Description: 'Reroll uses constantModifier'});}

   try{
   generator = dieResultsToNonRandomGenerator(8, [8, 3, 8, 5]);
   actual = new Die('d8!r3').roll(generator);
   testResults.push({Expected: [8, 8, 5], Actual: actual, Description: 'Regular explode with reroll'});
   } catch(e){testResults.push({Error: e, Description: 'Regular explode with reroll'});}

   try{
   generator = dieResultsToNonRandomGenerator(8, [8, 3, 8, 5]);
   actual = new Die('d8r3!p').roll(generator);
   testResults.push({Expected: [8, 7, 4], Actual: actual, Description: 'Penetrating explode then reroll'});
   } catch(e){testResults.push({Error: e, Description: 'Penetrating explode then reroll'});}

   try{
   generator = dieResultsToNonRandomGenerator(8, [3, 8, 5]);
   actual = new Die('d8r3!p').roll(generator);
   testResults.push({Expected: [8, 4], Actual: actual, Description: 'Reroll then penetrating explode'});
   } catch(e){testResults.push({Error: e, Description: 'Reroll then penetrating explode'});}

   try{
   generator = dieResultsToNonRandomGenerator(8, [8, 8, 1, 8, 1]);
   actual = new Die('d8!!r17').roll(generator);
   testResults.push({Expected: [9], Actual: actual, Description: 'Reroll with compound explode'});
   } catch(e){testResults.push({Error: e, Description: 'Reroll with compound explode'});}

   TesterUtility.displayResults('Die new Die().roll()', testResults, isFirst);
};
Tester.Die._constructor = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], die, input, expected;

   try{
   die = new Die();
   expected = {sideCount: 6, constantModifier: 0, isFudgeDie: false,
      rerollCriteria: undefined, explodeType: undefined};
   testResults.push({Expected: expected, Actual: die.toJSON().value, Description: 'No arg'});
   } catch(e){testResults.push({Error: e, Description: 'No arg'});}

   try{
   new Die()._constructor();
   TesterUtility.failedToThrow(testResults, 'Call _constructor');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('Illegal access'), Actual: e, Description: 'Call _constructor'});
   }

   try{
   die = new Die(3);
   expected = {sideCount: 3, constantModifier: 0, isFudgeDie: false,
      rerollCriteria: undefined, explodeType: undefined};
   testResults.push({Expected: expected, Actual: die.toJSON().value, Description: 'Number arg'});
   } catch(e){testResults.push({Error: e, Description: 'Number arg'});}

   try{
   die = new Die('d4');
   expected = {sideCount: 4, constantModifier: 0, isFudgeDie: false,
      rerollCriteria: undefined, explodeType: undefined};
   testResults.push({Expected: expected, Actual: die.toJSON().value, Description: 'String arg'});
   } catch(e){testResults.push({Error: e, Description: 'String arg'});}

   try{
   new Die('10d3');
   TesterUtility.failedToThrow(testResults, '10 dice');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('10d3\ndie count (if provided) must be 1. Use DicePool for 2+'), Actual: e, Description: '10 dice'});
   }

   TesterUtility.displayResults('Die new Die()._constructor', testResults, isFirst);
};
Tester.Die._optimizeReroll = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], input, expected;

   try{
   input = {sideCount: 6, constantModifier: 1,
      rerollCriteria: '!==4', explodeType: Die.explodeTypes.Normal};
   expected = {sideCount: 1, constantModifier: 3};
   Die._optimizeReroll(input);
   testResults.push({Expected: expected, Actual: input, Description: '!=='});
   } catch(e){testResults.push({Error: e, Description: '!=='});}

   try{
   input = {sideCount: 6, constantModifier: 1, rerollCriteria: '===2'};
   expected = {sideCount: 5, constantModifier: 2};
   Die._optimizeReroll(input);
   testResults.push({Expected: expected, Actual: input, Description: '=== min'});
   } catch(e){testResults.push({Error: e, Description: '=== min'});}

   try{
   input = {sideCount: 6, constantModifier: 1, rerollCriteria: '===7'};
   expected = {sideCount: 5, constantModifier: 1};
   Die._optimizeReroll(input);
   testResults.push({Expected: expected, Actual: input, Description: '=== max'});
   } catch(e){testResults.push({Error: e, Description: '=== max'});}

   TesterUtility.displayResults('Die Die._optimizeReroll', testResults, isFirst);
};
Tester.Die._parseString = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], returned, expected, name;
   try{
   name = 'd6';
   returned = Die._parseString(name, name);
   expected = {constantModifier: 0, sideCount: 6};
   testResults.push({Expected: expected, Actual: returned, Description: 'Happy path: d6'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   name = 'z5';
   returned = Die._parseString(name, name);
   expected = {constantModifier: -1, sideCount: 5};
   testResults.push({Expected: expected, Actual: returned, Description: 'z5'});
   } catch(e){testResults.push({Error: e, Description: 'z5'});}

   try{
   Die._parseString('h3');
   TesterUtility.failedToThrow(testResults, 'Non dz type');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('h3\nexpected "d" or "z". Found: h3'), Actual: e, Description: 'Non dz type'});
   }

   try{
   Die._parseString('');
   TesterUtility.failedToThrow(testResults, 'Empty arg');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('\nexpected "d" or "z". Found: '), Actual: e, Description: 'Empty arg'});
   }

   try{
   returned = Die._parseString('d%2');
   testResults.push({Expected: 1002, Actual: returned.sideCount, Description: 'Leading % to 100'});
   } catch(e){testResults.push({Error: e, Description: 'Leading % to 100'});}

   try{
   returned = Die._parseString('d2%');
   testResults.push({Expected: 200, Actual: returned.sideCount, Description: 'Non-leading first % to 00'});
   } catch(e){testResults.push({Error: e, Description: 'Non-leading first % to 00'});}

   try{
   returned = Die._parseString('d%%');
   testResults.push({Expected: 10000, Actual: returned.sideCount, Description: 'Other % to 00'});
   } catch(e){testResults.push({Error: e, Description: 'Other % to 00'});}

   try{
   name = 'df';
   returned = Die._parseString(name);
   expected = {constantModifier: -2, sideCount: 3};
   testResults.push({Expected: expected, Actual: returned, Description: 'Fudge die: happy'});
   } catch(e){testResults.push({Error: e, Description: 'Fudge die: happy'});}

   try{
   name = 'zf';
   returned = Die._parseString(name);
   expected = {constantModifier: -2, sideCount: 3};
   testResults.push({Expected: expected, Actual: returned, Description: 'Fudge die: zeroed'});
   } catch(e){testResults.push({Error: e, Description: 'Fudge die: zeroed'});}

   try{
   Die._parseString('df!');
   TesterUtility.failedToThrow(testResults, 'Fudge die: illegal');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('df!\nFudge/Fate dice don\'t explode or reroll. Illegal: !'),
         Actual: e, Description: 'Fudge die: illegal'});
   }

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
   testResults.push({Expected: '===1', Actual: returned.rerollCriteria, Description: '2 short: reroll'});
   } catch(e){testResults.push({Error: e, Description: '2 short'});}

   try{
   returned = Die._parseString('d3 reroll dice less than 3 compound explode die');
   testResults.push({Expected: Die.explodeTypes.Compound, Actual: returned.explodeType, Description: '2 long: explode'});
   testResults.push({Expected: '<3', Actual: returned.rerollCriteria, Description: '2 long: reroll'});
   } catch(e){testResults.push({Error: e, Description: '2 long'});}

   try{
   returned = Die._parseString('d3r>=2 penetrating exploding dice');
   testResults.push({Expected: Die.explodeTypes.Penetrating, Actual: returned.explodeType, Description: 'Short long: explode'});
   testResults.push({Expected: '>=2', Actual: returned.rerollCriteria, Description: 'Short long: reroll'});
   } catch(e){testResults.push({Error: e, Description: 'Short long'});}

   try{
   returned = Die._parseString('d3!pr=2');
   testResults.push({Expected: Die.explodeTypes.Penetrating, Actual: returned.explodeType, Description: 'Short Penetrating: explode'});
   testResults.push({Expected: '=2', Actual: returned.rerollCriteria, Description: 'Short Penetrating: reroll'});
   } catch(e){testResults.push({Error: e, Description: 'Short Penetrating'});}

   try{
   returned = Die._parseString('d3r!==-2!!');
   testResults.push({Expected: Die.explodeTypes.Compound, Actual: returned.explodeType, Description: 'Short compound: explode'});
   testResults.push({Expected: '!==-2', Actual: returned.rerollCriteria, Description: 'Short compound: reroll'});
   } catch(e){testResults.push({Error: e, Description: 'Short compound'});}

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
   expected = {sideCount: 6, constantModifier: -1, isFudgeDie: false,
      rerollCriteria: '===1', explodeType: Die.explodeTypes.Normal};
   input = JSON.clone(expected);
   input.explodeType = Die.explodeTypes.Normal;  //can't be cloned
   Die._validate('1d6r1!', input);
   testResults.push({Expected: expected, Actual: input, Description: 'Happy path'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   expected = {sideCount: 3, constantModifier: -2, isFudgeDie: true};
   input = JSON.clone(expected);
   Die._validate('1dF', input);
   testResults.push({Expected: expected, Actual: input, Description: 'Happy path: fudge'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path: fudge'});}

   try{
   input = {sideCount: 6};
   expected = {sideCount: 6, constantModifier: 0, isFudgeDie: false};
   Die._validate('1d6', input);
   testResults.push({Expected: expected, Actual: input, Description: 'Default all'});
   } catch(e){testResults.push({Error: e, Description: 'Default all'});}

   try{
   Die._validate('1d6', {});
   TesterUtility.failedToThrow(testResults, 'sideCount is required');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('1d6\nsideCount is required'), Actual: e, Description: 'sideCount is required'});
   }

   try{
   Die._validate('1d6', {sideCount: -2.5});
   TesterUtility.failedToThrow(testResults, 'invalid sideCount');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('1d6\ninvalid sideCount: -2.5'), Actual: e, Description: 'invalid sideCount'});
   }

   try{
   Die._validate('1d6', {sideCount: 6, constantModifier: 2.5});
   TesterUtility.failedToThrow(testResults, 'invalid constantModifier');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('1d6\nconstantModifier must be an integer but was: 2.5'), Actual: e, Description: 'invalid constantModifier'});
   }

   try{
   input = {sideCount: 6, rerollCriteria: '=1'};
   Die._validate('1d6', input);
   testResults.push({Expected: '===1', Actual: input.rerollCriteria, Description: 'Correct rerollCriteria ='});
   } catch(e){testResults.push({Error: e, Description: 'Correct rerollCriteria ='});}

   try{
   input = {sideCount: 6, rerollCriteria: '==1'};
   Die._validate('1d6', input);
   testResults.push({Expected: '===1', Actual: input.rerollCriteria, Description: 'Normalize rerollCriteria =='});
   } catch(e){testResults.push({Error: e, Description: 'Normalize rerollCriteria =='});}

   try{
   Die._validate('1d6', {sideCount: 6, rerollCriteria: '!2'});
   TesterUtility.failedToThrow(testResults, 'invalid rerollCriteria');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('1d6\ninvalid rerollCriteria: !2'), Actual: e, Description: 'invalid rerollCriteria'});
   }

   try{
   Die._validate('1d6', {sideCount: 6, explodeType: Die.explodeTypes});
   TesterUtility.failedToThrow(testResults, 'invalid exploding');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('1d6\ninvalid explodeType: [object Object]'), Actual: e, Description: 'invalid exploding'});
   }

   try{
   Die._validate('1d6', {sideCount: 1, explodeType: Die.explodeTypes.Normal});
   TesterUtility.failedToThrow(testResults, 'infinite exploding');
   }
   catch(e)
   {
       testResults.push({Expected: new Error('1d6\nInfinite exploding. sideCount: 1'), Actual: e, Description: 'infinite exploding'});
   }

   TesterUtility.displayResults('Die Die._validate', testResults, isFirst);
};
Tester.Die._validateReroll = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], input, expected;

   try{
   Die._validateReroll('1d6', {sideCount: 6, constantModifier: 0, rerollCriteria: '===0'});
   TesterUtility.failedToThrow(testResults, 'reroll impossible: === small');
   }
   catch(e)
   {
       testResults.push({Expected: new Error(
         '1d6\nimpossible to reroll:\n{"rerollCriteria":"===0","sideCount":6,"constantModifier":0}'),
         Actual: e, Description: 'reroll impossible: === small'});
   }

   try{
   Die._validateReroll('1d6', {sideCount: 6, constantModifier: 0, rerollCriteria: '<=0'});
   TesterUtility.failedToThrow(testResults, 'reroll impossible: <= small');
   }
   catch(e)
   {
       testResults.push({Expected: new Error(
         '1d6\nimpossible to reroll:\n{"rerollCriteria":"<=0","sideCount":6,"constantModifier":0}'),
         Actual: e, Description: 'reroll impossible: <= small'});
   }

   try{
   input = {sideCount: 6, constantModifier: 0, rerollCriteria: '<=1'};
   expected = {sideCount: 6, constantModifier: 0, rerollCriteria: '<=1'};
   Die._validateReroll('1d6', input);
   testResults.push({Expected: expected, Actual: input, Description: 'Reroll <= min'});
   } catch(e){testResults.push({Error: e, Description: 'Reroll <= min'});}

   try{
   Die._validateReroll('1d6', {sideCount: 6, constantModifier: 0, rerollCriteria: '<1'});
   TesterUtility.failedToThrow(testResults, 'reroll impossible: < min');
   }
   catch(e)
   {
       testResults.push({Expected: new Error(
         '1d6\nimpossible to reroll:\n{"rerollCriteria":"<1","sideCount":6,"constantModifier":0}'),
         Actual: e, Description: 'reroll impossible: < min'});
   }

   try{
   Die._validateReroll('1d6', {sideCount: 6, constantModifier: 0, rerollCriteria: '===7'});
   TesterUtility.failedToThrow(testResults, 'reroll impossible: === large');
   }
   catch(e)
   {
       testResults.push({Expected: new Error(
         '1d6\nimpossible to reroll:\n{"rerollCriteria":"===7","sideCount":6,"constantModifier":0}'),
         Actual: e, Description: 'reroll impossible: === large'});
   }

   try{
   Die._validateReroll('1d6', {sideCount: 6, constantModifier: 0, rerollCriteria: '>=7'});
   TesterUtility.failedToThrow(testResults, 'reroll impossible: >= large');
   }
   catch(e)
   {
       testResults.push({Expected: new Error(
         '1d6\nimpossible to reroll:\n{"rerollCriteria":">=7","sideCount":6,"constantModifier":0}'),
         Actual: e, Description: 'reroll impossible: >= large'});
   }

   try{
   input = {sideCount: 6, constantModifier: 0, rerollCriteria: '>=6'};
   expected = {sideCount: 6, constantModifier: 0, rerollCriteria: '>=6'};
   Die._validateReroll('1d6', input);
   testResults.push({Expected: expected, Actual: input, Description: 'Reroll >= max'});
   } catch(e){testResults.push({Error: e, Description: 'Reroll >= max'});}

   try{
   Die._validateReroll('1d6', {sideCount: 6, constantModifier: 0, rerollCriteria: '>6'});
   TesterUtility.failedToThrow(testResults, 'reroll impossible: > max');
   }
   catch(e)
   {
       testResults.push({Expected: new Error(
         '1d6\nimpossible to reroll:\n{"rerollCriteria":">6","sideCount":6,"constantModifier":0}'),
         Actual: e, Description: 'reroll impossible: > max'});
   }

   try{
   input = {sideCount: 10, constantModifier: 0, rerollCriteria: '===11', explodeType: Die.explodeTypes.Compound};
   expected = {sideCount: 10, constantModifier: 0, rerollCriteria: '===11', explodeType: Die.explodeTypes.Compound};
   Die._validateReroll('1d6', input);
   testResults.push({Expected: expected, Actual: input, Description: 'Reroll compound === large'});
   } catch(e){testResults.push({Error: e, Description: 'Reroll compound === large'});}

   try{
   input = {sideCount: 10, constantModifier: 0, rerollCriteria: '>21', explodeType: Die.explodeTypes.Compound};
   expected = {sideCount: 10, constantModifier: 0, rerollCriteria: '>21', explodeType: Die.explodeTypes.Compound};
   Die._validateReroll('1d6', input);
   testResults.push({Expected: expected, Actual: input, Description: 'Reroll compound > large'});
   } catch(e){testResults.push({Error: e, Description: 'Reroll compound > large'});}

   try{
   Die._validateReroll('1d6', {sideCount: 1, constantModifier: 1, rerollCriteria: '!==2'});
   TesterUtility.failedToThrow(testResults, 'reroll impossible: !== only');
   }
   catch(e)
   {
       testResults.push({Expected: new Error(
         '1d6\nimpossible to reroll:\n{"rerollCriteria":"!==2","sideCount":1,"constantModifier":1}'),
         Actual: e, Description: 'reroll impossible: !== only'});
   }

   try{
   Die._validateReroll('1d6', {sideCount: 6, constantModifier: 0, rerollCriteria: '>=5', explodeType: Die.explodeTypes.Normal});
   TesterUtility.failedToThrow(testResults, 'ambiguous not compound');
   }
   catch(e)
   {
       testResults.push({Expected: new Error(
         '1d6\nambiguous: does value 6 reroll or explode?\n'+
         '{"rerollCriteria":">=5","sideCount":6,"constantModifier":0,"explodeType":"{Normal}"}'),
         Actual: e, Description: 'ambiguous not compound'});
   }

   try{
   Die._validateReroll('1d6', {sideCount: 6, constantModifier: 1, rerollCriteria: '===13', explodeType: Die.explodeTypes.Compound});
   TesterUtility.failedToThrow(testResults, 'ambiguous compound');
   }
   catch(e)
   {
       testResults.push({Expected: new Error(
         '1d6\nambiguous: does value 13 reroll or explode?\n'+
         '{"rerollCriteria":"===13","sideCount":6,"constantModifier":1,"explodeType":"{Compound}"}'),
         Actual: e, Description: 'ambiguous compound'});
   }

   try{
   input = {sideCount: 6, constantModifier: 1, rerollCriteria: '>=13', explodeType: Die.explodeTypes.Compound};
   expected = {sideCount: 6, constantModifier: 1, rerollCriteria: '>=13', explodeType: Die.explodeTypes.Compound};
   Die._validateReroll('1d6', input);
   testResults.push({Expected: expected, Actual: input, Description: 'not ambiguous compound >='});
   } catch(e){testResults.push({Error: e, Description: 'not ambiguous compound >='});}

   try{
   input = {sideCount: 6, constantModifier: 1, rerollCriteria: '<=13', explodeType: Die.explodeTypes.Compound};
   expected = {sideCount: 6, constantModifier: 1, rerollCriteria: '<=13', explodeType: Die.explodeTypes.Compound};
   Die._validateReroll('1d6', input);
   testResults.push({Expected: expected, Actual: input, Description: 'not ambiguous compound <='});
   } catch(e){testResults.push({Error: e, Description: 'not ambiguous compound <='});}

   try{
   input = {sideCount: 6, constantModifier: 0, rerollCriteria: '!==2'};
   expected = {sideCount: 6, constantModifier: 0, rerollCriteria: '!==2'};
   Die._validateReroll('1d6', input);
   testResults.push({Expected: expected, Actual: input, Description: 'Reroll !=2'});
   } catch(e){testResults.push({Error: e, Description: 'Reroll !=2'});}

   try{
   Die._validateReroll('1d6', {sideCount: 1, constantModifier: 0, rerollCriteria: '===1'});
   TesterUtility.failedToThrow(testResults, 'infinite rerolling: 1');
   }
   catch(e)
   {
       testResults.push({Expected: new Error(
         '1d6\nInfinite rerolling:\n{"rerollCriteria":"===1","sideCount":1,"constantModifier":0}'),
         Actual: e, Description: 'infinite rerolling: 1'});
   }

   try{
   Die._validateReroll('1d6', {sideCount: 6, constantModifier: 10, rerollCriteria: '<1000'});
   //minValue: 11
   //maxValue: 16
   TesterUtility.failedToThrow(testResults, 'infinite rerolling: positive');
   }
   catch(e)
   {
       testResults.push({Expected: new Error(
         '1d6\nInfinite rerolling:\n{"rerollCriteria":"<1000","sideCount":6,"constantModifier":10}'),
         Actual: e, Description: 'infinite rerolling: positive'});
   }

   try{
   Die._validateReroll('1d6', {sideCount: 6, constantModifier: -10, rerollCriteria: '>=-9'});
   //minValue: -9
   //maxValue: -4
   TesterUtility.failedToThrow(testResults, 'infinite rerolling: negative');
   }
   catch(e)
   {
       testResults.push({Expected: new Error(
         '1d6\nInfinite rerolling:\n{"rerollCriteria":">=-9","sideCount":6,"constantModifier":-10}'),
         Actual: e, Description: 'infinite rerolling: negative'});
   }

   try{
   Die._validateReroll('1d6', {sideCount: 6, constantModifier: 0, rerollCriteria: '!==10'});
   TesterUtility.failedToThrow(testResults, 'infinite rerolling: !=');
   }
   catch(e)
   {
       testResults.push({Expected: new Error(
         '1d6\nInfinite rerolling:\n{"rerollCriteria":"!==10","sideCount":6,"constantModifier":0}'),
         Actual: e, Description: 'infinite rerolling: !='});
   }

   TesterUtility.displayResults('Die Die._validateReroll', testResults, isFirst);
};
