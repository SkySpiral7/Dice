'use strict';
var Draw = {};
Draw.compareDiceBellCurve = function(dicePoolLeft, dicePoolRight)
{
   var out = 'Right minus left<br />\n';
   out += '<b>Roll:</b> ' + dicePoolLeft.toJSON().name + ' vs ' + dicePoolRight.toJSON().name;
   var leftStats = Statistics.calculateDiceSums(dicePoolLeft);
   var rightStats = Statistics.calculateDiceSums(dicePoolRight);
   var diffStats = Statistics.compareStatistics(leftStats, rightStats);
   out += GenerateHtml.compareStatistics(diffStats);
   document.getElementById('graphResults').innerHTML = out;
};
Draw.diceBellCurve = function(dicePool, secondColumn)
{
   var name = dicePool.toJSON().name;
   var stats = Statistics.calculateDiceSums(dicePool);
   Draw.precalculated(name, stats, secondColumn);
};
Draw.precalculated = function(name, stats, secondColumn)
{
   var out = '<b>Roll:</b> ' + name + '<br />\n';
   var aggregate = Statistics.calculateAggregates(stats);
   out += GenerateHtml.aggregates(aggregate);
   out += GenerateHtml.statistics(stats, secondColumn);
   document.getElementById('graphResults').innerHTML = out;
};
//TODO: make simple tests that prove don't throw
