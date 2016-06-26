'use strict';
TestSuite.GenerateHtml = {};
TestSuite.GenerateHtml.aggregates = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], input, actual, expected;

   try{
   input = {minimum: -5, maximum: 12, mean: 7.001563, standardDeviation: 3.415523465};
   actual = GenerateHtml.aggregates(input);
   expected = '<b>Statistics</b>';
   expected += '<br />\nMin: -5';
   expected += '<br />\nMax: 12';
   expected += '<br />\nMean: 7.00';
   expected += '<br />\nStandard Deviation: 3.416';
   testResults.push({Expected: expected, Actual: actual, Description: 'Aggregates'});
   } catch(e){testResults.push({Error: e, Description: 'Aggregates'});}

   return TestRunner.displayResults('GenerateHtml GenerateHtml.aggregates', testResults, isFirst);
};
TestSuite.GenerateHtml.statistics = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = GenerateHtml.statistics(Statistics.calculateDiceSums(new DicePool('2d2')));
   //don't modify expected just rerecord it
   expected = '<table border="1" cellpadding="0" cellspacing="2" width="100%">\n';
   expected += '<tr><th>Roll</th><th>Freq</th><th>Chance</th><th>&gt;=</th><th align="center">Bar</th></tr>\n';
   expected += '<tr><td align="center" width="1%">2</td><td align="center" width="1%">1</td><td align="right" width="1%">25.000%';
   expected += '</td><td align="right" width="1%">100.000%</td><td valign="center"><div style="background-color: blue; ';
   expected += 'width:50.000%; height: 0.8em">&nbsp;</div></td></tr>\n';
   expected += '<tr><td align="center" width="1%">3</td><td align="center" width="1%">2</td><td align="right" width="1%">50.000%';
   expected += '</td><td align="right" width="1%">75.000%</td><td valign="center"><div style="background-color: green; ';
   expected += 'width:100.000%; height: 0.8em">&nbsp;</div></td></tr>\n';
   expected += '<tr><td align="center" width="1%">4</td><td align="center" width="1%">1</td><td align="right" width="1%">25.000%';
   expected += '</td><td align="right" width="1%">25.000%</td><td valign="center"><div style="background-color: blue; ';
   expected += 'width:50.000%; height: 0.8em">&nbsp;</div></td></tr>\n';
   expected += '</table>\n';
   testResults.push({Expected: expected, Actual: actual, Description: 'Happy path: 2d2'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path: 2d2'});}

   try{
   var stats = [
      {result: 1, probability: (1/4)},
      {result: 2, probability: (3/4)}
   ];
   actual = GenerateHtml.statistics(stats, '<');
   //don't modify expected just rerecord it
   expected = '<table border="1" cellpadding="0" cellspacing="2" width="100%">\n';
   expected += '<tr><th>Roll</th><th>Chance</th><th>&lt;</th><th align="center">Bar</th></tr>\n';
   expected += '<tr><td align="center" width="1%">1</td><td align="right" width="1%">25.000%';
   expected += '</td><td align="right" width="1%">0.000%</td><td valign="center"><div style="background-color: blue; ';
   expected += 'width:33.333%; height: 0.8em">&nbsp;</div></td></tr>\n';
   expected += '<tr><td align="center" width="1%">2</td><td align="right" width="1%">75.000%';
   expected += '</td><td align="right" width="1%">25.000%</td><td valign="center"><div style="background-color: green; ';
   expected += 'width:100.000%; height: 0.8em">&nbsp;</div></td></tr>\n';
   expected += '</table>\n';
   testResults.push({Expected: expected, Actual: actual, Description: 'Unfair probability <'});
   } catch(e){testResults.push({Error: e, Description: 'Unfair probability <'});}

   return TestRunner.displayResults('GenerateHtml GenerateHtml.statistics', testResults, isFirst);
};
