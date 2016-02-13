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
   var workingPolynomial, pool = dicePool.toJSON().pool;
   for (var dieIndex = 0; dieIndex < pool.length; ++dieIndex)
   {
      for (var dieCount = 0; dieCount < pool[dieIndex].dieCount; ++dieCount)
      {
         //dice are immutable so it's ok to reuse the same one
         var newPolynomial = new Polynomial(pool[dieIndex].die);
         if(undefined === workingPolynomial) workingPolynomial = newPolynomial;
         else workingPolynomial.multiply(newPolynomial);
      }
   }
   var finalTerms = workingPolynomial.toJSON().terms;
   var result = [];
   for (var i = 0; i < finalTerms.length; ++i)
   {
      //rename them to something meaningful
      result.push({result: finalTerms[i].exponent, frequency: finalTerms[i].coefficient});
   }
   result.sort(resultAscending);
   return result;
};
//TODO: re: test all sort orders
/**Pass this into Array.prototype.sort for the order result: -Infinity to result: Infinity.*/
function resultAscending(a,b){return (a.result - b.result);}
//TODO: re: actually put these on: Number, Poly, and Stats
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
   if(!(stats instanceof Array)) throw new Error('stats must be an array but was: ' + typeof(stats));
   if(0 === stats.length) throw new Error('stats must not be an empty array');
   //an empty array would return {minimum: Infinity, maximum: -Infinity, mean: NaN, standardDeviation: NaN}
   for (var i = 0; i < stats.length; ++i)
   {
      //stats[i].frequency of 0 means the result is impossible which shouldn't exist in the array
      //if it does exist (garbage in) it will only affect min/max (garbage out)
      //TODO: re: consider validation instead of garbage in/out
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
};
/*Unused shorter formula for mean:
For XdY the mean is ((Y+1)/2)*X for any natural number of X and Y except X=1 which has no mean
*/
