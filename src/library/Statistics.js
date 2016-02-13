'use strict';
var Statistics = {};
Statistics.analyze = function()
{
   //if(no drop) use poly
   //else use new way
   //if(new way not implemented || any gaps) use brute force
};
/*Example API:
Statistics.analyze('2d6'):  //I might not support a string argument
[
//will not include frequency: 0
{result: 2, frequency: 1},  //will be in this order (result ascending)
{result: 3, frequency: 2},
{result: 4, frequency: 3},
{result: 5, frequency: 4},
{result: 6, frequency: 5},
{result: 7, frequency: 6},
{result: 8, frequency: 5},
{result: 9, frequency: 4},
{result: 10, frequency: 3},
{result: 11, frequency: 2},
{result: 12, frequency: 1}
] if possible, else:
[
//will not include probability of 0.0000 or less
{result: 12, probability: (1/36)}
]
*/
Statistics.useBruteForce = function()
{
};
Statistics.usePolynomial = function()
{
};
Statistics.useDroppingAlgorithm = function()
{
};
Statistics.frequencyToProbability = function(stats)
{
};
/**
@param {object[]} stats created from a Statistics function
@returns {object} with: minimum, maximum, mean, standardDeviation
*/
Statistics.calculateAggregates = function(stats)
{
   var min = Infinity, max = -Infinity, count = 0, sum = 0;
   for (var i = 0; i < stats.length; ++i)
   {
      //stats[i].frequency of 0 means the result is impossible which shouldn't exist in the array
      //if it does exist (garbage in) it will only affect min/max (garbage out)
      if(stats[i].result < min) min = stats[i].result;
      if(stats[i].result > max) max = stats[i].result;
      count += stats[i].frequency;
      sum += (stats[i].result * stats[i].frequency);  //must be weighted since the ones that occur more often are more likely
   }
   var deviationSquareSum = 0;
   var mean = sum / count;
   for (var i = 0; i < stats.length; ++i)
   {
      var dev = stats[i].result - mean;
      dev *= dev;  //squared
      deviationSquareSum += (dev * stats[i].frequency);  //weighted
   }
   var standardDeviation = Math.sqrt(deviationSquareSum / count);
   return {
      minimum: min, maximum: max, mean: mean, standardDeviation: standardDeviation
   };
//an empty array (garbage in) returns {minimum: Infinity, maximum: -Infinity, mean: NaN, standardDeviation: NaN} (garbage out)
//TODO: re: later: consider validation instead of garbage in/out
};
/*Unused shorter formula for mean:
For XdY the mean is ((Y+1)/2)*X for any natural number of X and Y except X=1 which has no mean
*/
