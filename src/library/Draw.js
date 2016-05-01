'use strict';
var Draw = {};
Draw.compareDiceBellCurve = function(dicePoolLeft, dicePoolRight)
{
   var out = 'Right minus left<br />\n';
   out += '<b>Roll:</b> ' + dicePoolLeft.toJSON().name + ' vs ' + dicePoolRight.toJSON().name;
   var diffStats = Statistics.compareStatistics(Statistics.calculateDiceSums(dicePoolLeft), Statistics.calculateDiceSums(dicePoolRight));
   out += GenerateHtml.compareStatistics(diffStats);
   document.getElementById('graphResults').innerHTML = out;
};
Draw.diceBellCurve = function(dicePool, secondColumn)
{
   var out = '<b>Roll:</b> ' + dicePool.toJSON().name + '<br />\n';
   var stats = Statistics.calculateDiceSums(dicePool);
   out += GenerateHtml.aggregates(Statistics.calculateAggregates(stats));
   out += GenerateHtml.statistics(stats, secondColumn);
   document.getElementById('graphResults').innerHTML = out;
};
//TODO: re: make 2 simple tests that prove don't throw
