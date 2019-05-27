'use strict';
var Draw = {};
Draw.compareDiceBellCurve = function(dicePoolLeft, dicePoolRight)
{
   var out = 'Right minus left<br />\n';
   out += '<b>Roll:</b> ' + dicePoolLeft.toJSON().name + ' vs ' + dicePoolRight.toJSON().name + '<br />';

   var leftStats = Statistics.calculateDiceSums(dicePoolLeft);
   var leftAggregates = Statistics.calculateAggregates(leftStats);
   var rightStats = Statistics.calculateDiceSums(dicePoolRight);
   var rightAggregates = Statistics.calculateAggregates(rightStats);
   var diffStats = Statistics.compareStatistics(leftStats, rightStats);

   out += GenerateHtml.compareAggregates(leftAggregates, rightAggregates);
   out += GenerateHtml.compareStatistics(diffStats, dicePoolLeft.toJSON().name, dicePoolRight.toJSON().name);
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
//TODO: make 2 simple tests that prove don't throw
