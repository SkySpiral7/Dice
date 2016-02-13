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
Statistics.usePolynomial = function(dicePool)
{
   //assert: no dice explode or drop
   /*var finishedPolys = [], diceArray = dicePool.toJSON().diceArray;
   for(var i = 0; i < diceArray.length; ++i){finishedPolys.push(new Polynomial(diceArray[i], 0));}
   return Polynomial.multiplyPolynomials(finishedPolys, poolGiven);*/
};
Statistics.useDroppingAlgorithm = function()
{
};
/**
@param {object[]} stats created from a Statistics function that uses frequency
@returns undefined. after: same object will also have probability
*/
Statistics.determineProbability = function(stats)
{
   var sum = 0;
   for (var i = 0; i < stats.length; ++i)
   {
      sum += stats[i].frequency;
   }
   for (var i = 0; i < stats.length; ++i)
   {
      stats[i].probability = (stats[i].frequency / sum);
      //delete stats[i].frequency;  //nah. leave it there since frequency has perfect precision
   }
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
      if (undefined != stats[i].frequency)
      {
         //use frequency if possible because it has perfect precision
         count += stats[i].frequency;
         sum += (stats[i].result * stats[i].frequency);  //must be weighted since the ones that occur more often are more likely
      }
      else
      {
         count += stats[i].probability;
         sum += (stats[i].result * stats[i].probability);
      }
   }
   var deviationSquareSum = 0;
   var mean = sum / count;
   for (var i = 0; i < stats.length; ++i)
   {
      var dev = stats[i].result - mean;
      dev *= dev;  //squared
      if(undefined != stats[i].frequency) deviationSquareSum += (dev * stats[i].frequency);  //weighted
      else deviationSquareSum += (dev * stats[i].probability);
   }
   var standardDeviation = Math.sqrt(deviationSquareSum / count);
   return {  //brace required to be on this line because the semi-colon predictor otherwise assumes I want dead code because it's insane
      minimum: min, maximum: max, mean: mean, standardDeviation: standardDeviation
   };
//an empty array (garbage in) returns {minimum: Infinity, maximum: -Infinity, mean: NaN, standardDeviation: NaN} (garbage out)
//TODO: re: later: consider validation instead of garbage in/out
};
/*Unused shorter formula for mean:
For XdY the mean is ((Y+1)/2)*X for any natural number of X and Y except X=1 which has no mean
*/
