'use strict';
var GenerateHtml = {};
/*
[
//will not include frequency: 0
{result: 2, frequency: 1},  //will be in this order (result ascending)
]
*/
GenerateHtml.statistics = function(stats)
{
   return '';
};
GenerateHtml.aggregates = function(aggregate)
{
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
