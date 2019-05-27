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
GenerateHtml.compareStatistics = function(diffStats)
{
   //TODO: make GenerateHtml.compareStatistics
   return '';
};
GenerateHtml.statistics = function(stats, secondColumn)
{
   if(undefined === secondColumn) secondColumn = '>=';
   Validation.requireTypeOf('string', secondColumn);
   //TODO: this validation is also in Die and is meaty
   if(!(/^(?:[<>]=?|[!=]?==?)?$/).test(secondColumn)) throw new Error('invalid comparison: ' + secondColumn);
   if('=' === secondColumn || '==' === secondColumn) secondColumn = '===';
   Statistics.determineProbability(stats);
   var secondValues = [];
   var maxProbability = -Infinity;
   var usesFreq = (undefined != stats[0].frequency);

   for (var currentIndex = 0; currentIndex < stats.length; ++currentIndex)
   {
      if(stats[currentIndex].probability > maxProbability) maxProbability = stats[currentIndex].probability;
      //if('===' === secondColumn) continue;  //don't bother populating secondValues
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
   out += '<th>Chance</th><th>' + secondColumn.replace('>', '&gt;').replace('<', '&lt;').replace(/=+/, '=') + '</th><th align="center">Bar</th></tr>\n';

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
