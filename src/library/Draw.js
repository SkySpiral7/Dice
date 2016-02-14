'use strict';
var Draw = {};
Draw.diceBellCurve = function(dicePool)
{
   var out = '';
   var stats = Statistics.analyze(dicePool);
   out += GenerateHtml.aggregates(Statistics.calculateAggregates(stats));
   out += GenerateHtml.statistics(stats, '>=');
   document.getElementById('graphResults').innerHTML = out;
};
