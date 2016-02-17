'use strict';
var Statistics = {};
/**
This function analyzes the dicePool given and returns the result of the best possible algorithm.
@returns {object[]} objects contain result (the sum rolled) and either frequency (if possible) or probability (otherwise).
It will not include frequency of 0 or probability of less than 0.00000 (5) and will be in result ascending order.
*/
Statistics.analyze = function(dicePool)
{
   var pool = dicePool.toJSON().pool, hasExplosions = false, hasDropKeep = false;
   for (var dieIndex = 0; dieIndex < pool.length; ++dieIndex)
   {
      hasDropKeep |= (undefined !== pool[dieIndex].dropKeepType);
      hasExplosions |= (undefined !== pool[dieIndex].die.toJSON().explodeType);
      if(hasExplosions && hasDropKeep) break;  //no more information to find
   }
   if(hasDropKeep) throw new Error('Drop/keep not yet supported');  //useBruteForce then useDroppingAlgorithm
   //TODO: re: later optimize so that all non-drop usePolynomial drops useDroppingAlgorithm and combine results
   if(!hasExplosions) return Statistics.usePolynomial(dicePool, 0);
   //if(hasExplosions):
   var stats = [], explodeCount = 0;
   do
   {
      stats = Statistics.usePolynomial(dicePool, explodeCount);
      ++explodeCount;
      //the only way for stats to be empty is if the explodeCount < the minimum number of explodes enforced by reroll
      //when the percent would be < 0.000% then stop
   } while(0 === stats.length || 0 !== Number(stats.last().probability.toFixed(5)));
   //TODO: re: this seems intensive for large pools. consider pushing 0% check down to Polynomial
   return stats;
   //if any gaps then useBruteForce
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
/*Unused shorter formula for mean:
For XdY the mean is ((Y+1)/2)*X for any natural number of X and Y except X=1 which has no mean*/
};
Statistics.compareStatistics = function(stats1, stats2)
{
};
/**
@param {object[]} stats created from a Statistics function that uses frequency
@returns {undefined} after: stats will also have probability
*/
Statistics.determineProbability = function(stats)
{
   //TODO: re: add null safe validate
   if(undefined != stats[0].probability) return;  //already done
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
//TODO: re: test all sort orders
/**Pass this into Array.prototype.sort for the order result: -Infinity to result: Infinity.*/
Statistics.resultAscending = function(a,b){return (a.result - b.result);};
Statistics.useBruteForce = function()
{
};
Statistics.useDroppingAlgorithm = function()
{
};
/**
Returns the statistics for a given DicePool using a Polynomial based algorithm.
The algorithm is faster than brute force but can't support drop/keep.
@param {number} explodeCount the maximum number of times a die can explode (ignored for those that don't explode)
*/
Statistics.usePolynomial = function(dicePool, explodeCount)
{
   //assert: no drop/keep
   var workingPolynomial, pool = dicePool.toJSON().pool, hasExplosions = false;
   for (var dieIndex = 0; dieIndex < pool.length; ++dieIndex)
   {
      for (var dieCount = 0; dieCount < pool[dieIndex].dieCount; ++dieCount)
      {
         hasExplosions |= (undefined !== pool[dieIndex].die.toJSON().explodeType);

         //dice are immutable so it's ok to reuse the same one
         var newPolynomial = new Polynomial(pool[dieIndex].die, explodeCount);
         if(pool[dieIndex].areDiceNegative) newPolynomial.negateExponents();

         if(undefined === workingPolynomial) workingPolynomial = newPolynomial;
         else workingPolynomial.multiply(newPolynomial);
      }
   }
   var finalTerms = workingPolynomial.toJSON().terms;
   var result = [];
   for (var i = 0; i < finalTerms.length; ++i)
   {
      //rename them to something meaningful
      if(hasExplosions) result.push({result: finalTerms[i].exponent, probability: finalTerms[i].coefficient});
      else result.push({result: finalTerms[i].exponent, frequency: finalTerms[i].coefficient});
   }
   result.sort(Statistics.resultAscending);
   return result;
};
