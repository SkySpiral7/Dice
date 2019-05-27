'use strict';
var GenerateHtml = {};
GenerateHtml.aggregates = function(aggregate)
{
   //TODO: validate
   var out = '<b>Statistics</b>';
   out += '<br />\nMin: ' + aggregate.minimum;
   out += '<br />\nMax: ' + aggregate.maximum;
   out += '<br />\nMean: ' + aggregate.mean.toFixed(2);
   out += '<br />\nStandard Deviation: ' + aggregate.standardDeviation.toFixed(3);
   return out;
};
GenerateHtml.compareStatistics = function(diffStats, name1, name2)
{
   var out = '<table border="1" cellpadding="0" cellspacing="2" width="100%">';
   out += "\n";
   out += '<tr><th>Roll</th>';
   out += '<th>Diff</th>';
   out += '<th align="center" width="49%">'+name1+'</th>';
   out += '<th align="center" width="49%">'+name2+'</th></tr>';
   out += "\n";

   var absMax = -Infinity;
   for(var i=0; i < diffStats.length; i++)
   {
      if(absMax < Math.abs(diffStats[i].diff)) absMax = Math.abs(diffStats[i].diff);
   }

   for (var i=0; i < diffStats.length; i++)
   {
       out += '<tr><td align="center">' + diffStats[i].result;
       out += '</td><td align="right">';
       out += (100 * diffStats[i].diff).toFixed(3);  //non-freq is weighted but might not be the probability
       out += '%</td>';
       if(diffStats[i].diff!==0) out += '<td valign="center" align="right">';  //for both positive and negative

       if(diffStats[i].diff===0) out += '<td colspan="2" align="center">Same';
      else if (diffStats[i].diff < 0)
      {
          out += '</td><td valign="center">';
          out += '<div style="background-color: blue; width:' + Math.abs(100 * diffStats[i].diff / absMax).toFixed(3)+'%; height: 0.8em">&nbsp;</div>';
      }
      else
      {
          out += '<div style="background-color: red; width:' + Math.abs(100 * diffStats[i].diff / absMax).toFixed(3)+'%; height: 0.8em">&nbsp;</div>';
          out += '</td><td valign="center">';
      }
       out += '</td></tr>';
       out += "\n";
   }
    out += '</table>';
    return out;
};
GenerateHtml.statistics = function(stats, secondColumn)
{
   if(undefined === secondColumn) secondColumn = '>=';
   //TODO: validate
   Statistics.determineProbability(stats);
   var secondValues = [];
   var maxProbability = -Infinity;
   var usesFreq = (undefined != stats[0].frequency);

   for (var currentIndex = 0; currentIndex < stats.length; ++currentIndex)
   {
      if(stats[currentIndex].probability > maxProbability) maxProbability = stats[currentIndex].probability;
      var secondSum = 0;
      for (var potentialIndex = 0; potentialIndex < stats.length; ++potentialIndex)
      {
         if(eval('' + stats[potentialIndex].result + secondColumn + stats[currentIndex].result)) secondSum += stats[potentialIndex].probability;
      }
      //TODO: is untested unless I can figure out math to prove it
      //if the total freq is above perfect accuracy that should work
      //or if multiple prob rounds up
      if(secondSum > 1) secondSum = 1;  //correct rounding error: can't have more than 100%
      secondValues.push(secondSum);
   }

   var out = '<table border="1" cellpadding="0" cellspacing="2" width="100%">\n';
   out += '<tr><th>Roll</th>';
   if(usesFreq) out += '<th>Freq</th>';
   out += '<th>Chance</th><th>' + secondColumn.replace('>', '&gt;').replace('<', '&lt;') + '</th><th align="center">Bar</th></tr>\n';

   for (var i = 0; i < stats.length; ++i)
   {
      out += '<tr><td align="center" width="1%">' + stats[i].result + '</td>';
      if(usesFreq) out += '<td align="center" width="1%">' + stats[i].frequency + '</td>';
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
