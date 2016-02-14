'use strict';
var GenerateHtml = {};
/*
[
//will not include frequency: 0
{result: 2, frequency: 1},  //will be in this order (result ascending)
]
*/
GenerateHtml.statistics = function(stats, secondColumn)
{
   //TODO: re: validate
   Statistics.determineProbability(stats);
   var secondValues = [];
   var maxProbability = -Infinity;
   var usesFreq = (undefined != stats[0].frequency);

   for (var i = 0; i < stats.length; ++i)
   {
      if(stats[i].probability > maxProbability) maxProbability = stats[i].probability;
      var secondSum = 0;
      for (var j = 0; j < stats.length; ++j)
      {
         if(eval('' + stats[j].result + secondColumn + stats[i].result)) secondSum += stats[j].probability;
      }
      if(secondSum > 1) secondSum = 1;  //correct rounding error: can't have more than 100%
      secondValues.push(secondSum);
   }
   //TODO: re: more tests

   var out = '<table border="1" cellpadding="0" cellspacing="2" width="100%">\n';
   out += '<tr><th>Roll</th>';
   if(usesFreq) out += '<th>Freq</th>';
   out += '<th>Chance</th><th>' + secondColumn.replace('>', '&gt;').replace('<', '&lt;') + '</th><th align="center">Bar</th></tr>\n';

   for (var i = 0; i < stats.length; ++i)
   {
      out += '<tr><td align="center" width="1%">' + stats[i].result + '</td>';
      //not allowed to have more than 5 digits so use scientific:
      if(usesFreq && stats[i].frequency > 1e7) out += '<td align="center" width="1%">' + stats[i].frequency.toPrecision(5) + '</td>';
      else if(usesFreq) out += '<td align="center" width="1%">' + stats[i].frequency + '</td>';
      out += '<td align="right" width="1%">' + (100 * stats[i].probability).toFixed(3) + '%</td>';
      out += '<td align="right" width="1%">' + (100 * secondValues[i]).toFixed(3) + '%</td>';
      out += '<td valign="center">';
      out += '<div style="background-color: ';
      if(maxProbability === stats[i].probability) out += 'green';  //not rounded
      else out += 'blue';
      out += '; width:' + (100 * stats[i].probability / maxProbability).toFixed(3)+'%; height: 0.8em">&nbsp;</div>';
      out += '</td></tr>\n';
   }
   out += '</table>\n';
   return out;
};
GenerateHtml.aggregates = function(aggregate)
{
   //TODO: re: validate
   var out = '<b>Statistics</b>';
   out += '<br />\nMin: ' + aggregate.minimum;
   out += '<br />\nMax: ' + aggregate.maximum;
   out += '<br />\nMean: ' + aggregate.mean.toFixed(2);
   out += '<br />\nStandard Deviation: ' + aggregate.standardDeviation.toFixed(3);
   return out;
};
GenerateHtml.compareStatistics = function()
{
};
