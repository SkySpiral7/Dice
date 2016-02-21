'use strict';
Tester.GenerateHtml = {};
Tester.GenerateHtml.aggregates = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], input, actual, expected;

   try{
   input = {minimum: 2, maximum: 12, mean: 7.001563, standardDeviation: 2.415123465};
   actual = GenerateHtml.aggregates(input);
   expected = '<b>Statistics</b>';
   expected += '<br />\nMin: 2';
   expected += '<br />\nMax: 12';
   expected += '<br />\nMean: 7.00';
   expected += '<br />\nStandard Deviation: 2.415';
   testResults.push({Expected: expected, Actual: actual, Description: 'Aggregates'});
   } catch(e){testResults.push({Error: e, Description: 'Aggregates'});}

   TesterUtility.displayResults('GenerateHtml GenerateHtml.aggregates', testResults, isFirst);
};
Tester.GenerateHtml.statistics = function(isFirst)
{
   TesterUtility.clearResults(isFirst);

   var testResults = [], actual, expected;

   try{
   actual = GenerateHtml.statistics(Statistics.calculateDiceSums(new DicePool('2d6')), '>=');
   //don't modify expected just rerecord it
   expected = '<table border="1" cellpadding="0" cellspacing="2" width="100%">\n';
   expected += '<tr><th>Roll</th><th>Freq</th><th>Chance</th><th>&gt;=</th><th align="center">Bar</th></tr>\n';
   expected += '<tr><td align="center" width="1%">2</td><td align="center" width="1%">1</td><td align="right" width="1%">';
   expected += '2.778%</td><td align="right" width="1%">100.000%</td><td valign="center"><div style="background-color: blue;';
   expected += ' width:16.667%; height: 0.8em">&nbsp;</div></td></tr>\n';
   expected += '<tr><td align="center" width="1%">3</td><td align="center" width="1%">2</td><td align="right" width="1%">';
   expected += '5.556%</td><td align="right" width="1%">97.222%</td><td valign="center"><div style="background-color: blue;';
   expected += ' width:33.333%; height: 0.8em">&nbsp;</div></td></tr>\n';
   expected += '<tr><td align="center" width="1%">4</td><td align="center" width="1%">3</td><td align="right" width="1%">';
   expected += '8.333%</td><td align="right" width="1%">91.667%</td><td valign="center"><div style="background-color: blue;';
   expected += ' width:50.000%; height: 0.8em">&nbsp;</div></td></tr>\n';
   expected += '<tr><td align="center" width="1%">5</td><td align="center" width="1%">4</td><td align="right" width="1%">';
   expected += '11.111%</td><td align="right" width="1%">83.333%</td><td valign="center"><div style="background-color: blue;';
   expected += ' width:66.667%; height: 0.8em">&nbsp;</div></td></tr>\n';
   expected += '<tr><td align="center" width="1%">6</td><td align="center" width="1%">5</td><td align="right" width="1%">';
   expected += '13.889%</td><td align="right" width="1%">72.222%</td><td valign="center"><div style="background-color: blue;';
   expected += ' width:83.333%; height: 0.8em">&nbsp;</div></td></tr>\n';
   expected += '<tr><td align="center" width="1%">7</td><td align="center" width="1%">6</td><td align="right" width="1%">';
   expected += '16.667%</td><td align="right" width="1%">58.333%</td><td valign="center"><div style="background-color: green;';
   expected += ' width:100.000%; height: 0.8em">&nbsp;</div></td></tr>\n';
   expected += '<tr><td align="center" width="1%">8</td><td align="center" width="1%">5</td><td align="right" width="1%">';
   expected += '13.889%</td><td align="right" width="1%">41.667%</td><td valign="center"><div style="background-color: blue;';
   expected += ' width:83.333%; height: 0.8em">&nbsp;</div></td></tr>\n';
   expected += '<tr><td align="center" width="1%">9</td><td align="center" width="1%">4</td><td align="right" width="1%">';
   expected += '11.111%</td><td align="right" width="1%">27.778%</td><td valign="center"><div style="background-color: blue;';
   expected += ' width:66.667%; height: 0.8em">&nbsp;</div></td></tr>\n';
   expected += '<tr><td align="center" width="1%">10</td><td align="center" width="1%">3</td><td align="right" width="1%">';
   expected += '8.333%</td><td align="right" width="1%">16.667%</td><td valign="center"><div style="background-color: blue;';
   expected += ' width:50.000%; height: 0.8em">&nbsp;</div></td></tr>\n';
   expected += '<tr><td align="center" width="1%">11</td><td align="center" width="1%">2</td><td align="right" width="1%">';
   expected += '5.556%</td><td align="right" width="1%">8.333%</td><td valign="center"><div style="background-color: blue;';
   expected += ' width:33.333%; height: 0.8em">&nbsp;</div></td></tr>\n';
   expected += '<tr><td align="center" width="1%">12</td><td align="center" width="1%">1</td><td align="right" width="1%">';
   expected += '2.778%</td><td align="right" width="1%">2.778%</td><td valign="center"><div style="background-color: blue;';
   expected += ' width:16.667%; height: 0.8em">&nbsp;</div></td></tr>\n';
   expected += '</table>\n';
   testResults.push({Expected: expected, Actual: actual, Description: 'Happy path: 2d6'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path: 2d6'});}

   TesterUtility.displayResults('GenerateHtml GenerateHtml.statistics', testResults, isFirst);
};
