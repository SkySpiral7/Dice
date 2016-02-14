'use strict';
var GenerateHtml = {};
/*
[
//will not include frequency: 0
{result: 2, frequency: 1},  //will be in this order (result ascending)
]
*/
GenerateHtml.statistics = function()
{
};
GenerateHtml.aggregates = function(aggregate)
{
   var out = '<b>Statistics</b>';
   out += '<br />\nMin: ' + aggregate.minimum;
   out += '<br />\nMax: ' + aggregate.maximum;
   out += '<br />\nMean: ' + aggregate.mean.toFixed(2);
   out += '<br />\nStandard Deviation: ' + aggregate.standardDeviation.toFixed(3);
   return out;
   //document.getElementById('graphResults').innerHTML += GenerateHtml.aggregates(Statistics.calculateAggregates(Statistics.usePolynomial(new DicePool('2d6'))));
   //TODO: re: needs helpers. not sure how many
};
GenerateHtml.compareStatistics = function()
{
};
