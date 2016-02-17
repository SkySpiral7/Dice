'use strict';
var Draw = {};
Draw.compareDiceBellCurve = function(dicePoolLeft, dicePoolRight)
{
   var out = 'Right minus left<br />\n';
   out += '<b>Roll:</b> ' + dicePoolLeft.toJSON().name + ' vs ' + dicePoolRight.toJSON().name;
   var diffStats = Statistics.compareStatistics(Statistics.analyze(dicePoolLeft), Statistics.analyze(dicePoolRight));
   out += GenerateHtml.diffStatistics(diffStats);
   document.getElementById('graphResults').innerHTML = out;
};
Draw.diceBellCurve = function(dicePool)
{
   var out = '<b>Roll:</b> ' + dicePool.toJSON().name + '<br />\n';
   var stats = Statistics.analyze(dicePool);
   out += GenerateHtml.aggregates(Statistics.calculateAggregates(stats));
   out += GenerateHtml.statistics(stats, '>=');
   document.getElementById('graphResults').innerHTML = out;
};
