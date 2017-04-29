'use strict';
var Statistics = {};
/**
This function analyzes the diceGroup given and returns the result of the best possible algorithm.
@param {object} diceGroup an element of DicePool.toJSON().pool
@returns {object[]} objects contain result (the sum rolled) and either frequency (if possible) or probability (otherwise).
It will not include frequency of 0 or probability of less than 0.00000 (5) and will be in result ascending order.
*/
Statistics.analyze = function(diceGroup)
{
   var algorithm;
   if(undefined === diceGroup.dropKeepType) algorithm = Statistics.useNonDroppingAlgorithm;
   //later useDroppingAlgorithm
   else algorithm = Statistics.useBruteForce;  //if any gaps then useBruteForce

   if(undefined === diceGroup.die.toJSON().explodeType) return algorithm(diceGroup, 0);
   //if(does explode):
   var stats = [], explodeCount = 0;  //200,001 sided die is the smallest that will end with 0 explodes
   //TODO: should be math for predicting # explodes
   do
   {
      stats = algorithm(diceGroup, explodeCount);
      if(0 === explodeCount) Statistics.determineProbability(stats);
      ++explodeCount;
      //the only way for stats to be empty is if the explodeCount < the minimum number of explodes enforced by reroll
      //when the percent would be < 0.000% then stop
   } while(0 === stats.length || 0 !== Number(stats.last().probability.toFixed(5)));
   //TODO: consider pushing 0% check down to DiceExpression
   return stats;
};
/**
Note that a single die (that doesn't explode) has no mean or standardDeviation for the same
reason that a single item has no average. There's no way for this function to detect a single die
however the results will be meaningless (and min/max pointless).

Also note that maximum is the highest of the results given even though exploding
dice have no actual maximum (unless enforced externally).

@param {object[]} stats created from a Statistics function
@returns {object} with: minimum, maximum, mean, standardDeviation
*/
Statistics.calculateAggregates = function(stats)
{
   var min = Infinity, max = -Infinity, count = 0, sum = 0;
   Validation.requireInstanceOf(Array, stats);
   if(0 === stats.length) throw new Error('stats must not be an empty array');
   //an empty array would return {minimum: Infinity, maximum: -Infinity, mean: NaN, standardDeviation: NaN}
   for (var i = 0; i < stats.length; ++i)
   {
      //stats[i].frequency of 0 means the result is impossible which shouldn't exist in the array
      //if it does exist (garbage in) it will only affect min/max (garbage out)
      //TODO: consider validation instead of garbage in/out
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
/**
This function analyzes the dicePool given and returns the result of the best possible algorithm.
Each group of the pool will be individually optimized and the results combined.
@param {object} dicePool the DicePool for which statistics will be calculated
@returns {object[]} objects containing result (the sum rolled) and either frequency (if possible) or probability (otherwise).
It will not include frequency of 0 or probability of less than 0.00000 (5) and will be in result ascending order.
*/
Statistics.calculateDiceSums = function(dicePool)
{
   var pool = dicePool.toJSON().pool;
   var results = [], useProbability = dicePool.toJSON().hasExplosions;
   for (var i = 0; i < pool.length; ++i)
   {
      var stats = Statistics.analyze(pool[i]);  //TODO: test
      if(useProbability) Statistics.determineProbability(stats);  //if any of them have probability then they all need it
      results.push(stats);
   }
   return Statistics.combineResults(results, useProbability);
};
/**
This function takes an array of statistics (arrays), combining them into a single result (array).
They are combined by assuming each element represents possibilities for a single die (or group) with
the returned value being the statistics for the sum of them.
@param {object[][]} statsArray each element was returned by a statistics calculation function
@param {boolean} useProbability if true then frequency will be ignored (if present)
@returns {object[]} a single statistics results
*/
Statistics.combineResults = function(statsArray, useProbability)
{
   //TODO: validate alot in this file
   //uses the non dropping algorithm (see Statistics.useNonDroppingAlgorithm)
   var workingExpression = new DiceExpression(statsArray[0], useProbability);
   for (var i = 1; i < statsArray.length; ++i)
   {
      workingExpression.multiply(new DiceExpression(statsArray[i], useProbability));
   }
   return workingExpression.toDiceResults();
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
   //TODO: add null safe validate
   if(undefined !== stats[0].probability) return;  //already done
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
//TODO: see old/stats util.js@generate_Binomials
//TODO: consider a floor of 0 for games that just mean you failed
/**Given a number of die and either passCriteria, failCriteria, or both, this function calculates the
chances of the number of successes. A failure is -1, success is +1, and everything else is
not counted (+0).
@param {string} passCriteria must be like '>= 5'
@param {string} failCriteria must be like '>= 5'
@returns {object[]} a statistics object where the result is the sum of the successes (minus failures)
*/
Statistics.passFailBinomial = function(die, diceCount, passCriteria, failCriteria)
{
   Validation.requireInstanceOf(Die, die);
   Validation.requireNaturalNumber(diceCount);
   if(null == passCriteria && null == failCriteria) throw new Error('Required: passCriteria and/or failCriteria');

   if(null == passCriteria) passCriteria = '=== NaN';
   else
   {
      Validation.requireTypeOf('string', passCriteria);
      //TODO: not DRY or clean:
      if(!(/^(?:[<>]=?|[!=]==?)?-?\d+$/).test(passCriteria)) throw new Error('Invalid passCriteria: ' + passCriteria);
   }
   if(null == failCriteria) failCriteria = '=== NaN';
   else
   {
      Validation.requireTypeOf('string', failCriteria);
      if(!(/^(?:[<>]=?|[!=]==?)?-?\d+$/).test(failCriteria)) throw new Error('Invalid failCriteria: ' + failCriteria);
   }
   if(undefined !== die.toJSON().explodeType) throw new Error('Exploding not supported: ' + JSON.stringify(die));
   //I'm allowing reroll because there are no implications of it. even though I don't know why you would

   var tempExpressionJson = DiceExpression.everyValue(die, 0);
   var singleDieExpression = new DiceExpression([{coefficient: 1, exponent: 1}], false);
   singleDieExpression.addTerm({coefficient: -1, exponent: 1});  //it is now empty
   //TODO: I should be able to create an empty one directly (no arg)
   //currently possible to create an empty one via an empty array but future validation will prevent that
   for (var i = 0; i < tempExpressionJson.length; ++i)
   {
      var passed = eval(tempExpressionJson[i].exponent + passCriteria);
      var failed = eval(tempExpressionJson[i].exponent + failCriteria);
      if(passed && failed) throw new Error('Illegal: ' + tempExpressionJson[i].exponent + ' both passed and failed.' +
         'die: ' + JSON.stringify(die) + ' pass: ' + passCriteria + ' fail: ' + failCriteria);

      if(passed) singleDieExpression.addTerm({coefficient: 1, exponent: 1});
      else if(failed) singleDieExpression.addTerm({coefficient: 1, exponent: -1});
      else singleDieExpression.addTerm({coefficient: 1, exponent: 0});
   }
   var singleDieJson = singleDieExpression.toJSON();

   //TODO: not DRY. this is the 3rd place with the non-dropping algorithm
   var workingExpression = new DiceExpression(singleDieJson, false);  //no need to clone json because DiceExpression doesn't corrupt it
   for (var dieIndex = 1; dieIndex < diceCount; ++dieIndex)
   {
      var newExpression = new DiceExpression(singleDieJson, false);
      workingExpression.multiply(newExpression);
   }
   return workingExpression.toDiceResults();
};
//TODO: test all sort orders
/**Pass this into Array.prototype.sort for the order result: -Infinity to result: Infinity.*/
Statistics.resultAscending = function(a,b){return (a.result - b.result);};
//TODO: make a brute force for every combination and also for every sum (currently only sum)
Statistics.useBruteForce = function(diceGroup, explodeCount)
{
   if(undefined === diceGroup.die.toJSON().explodeType) explodeCount = 0;
   var everyValue = [];
   for (var dieCount = 0; dieCount < diceGroup.dieCount; ++dieCount)
   {
      var everyDieValue = DiceExpression.everyValue(diceGroup.die, explodeCount);
      var newExpression = new DiceExpression(everyDieValue, (0 !== explodeCount));  //TODO: consider explodeCount 0 to use prob
      //TODO: consider having DiceExpression and DiceExpression.everyValue take isNegative
      if(diceGroup.areDiceNegative) newExpression.negateExponents();

      var stats = newExpression.toDiceResults();
      if(0 !== explodeCount) Statistics.determineProbability(stats);  //safe because it doesn't touch results
      everyValue.push(stats);  //TODO: could just JSON.clone this in a loop
   }
   // everyValue = new Array(diceGroup.dieCount).fill(stats);  //need to prove this is safe or use JSON.clone

   //assert: everyValue.length > 0 because DicePool should prevent that case
   if (1 === everyValue.length)
   {
      var terms = new DiceExpression(everyValue[0], (0 !== explodeCount)).toJSON();
      DiceExpression.combineValues(terms);  //TODO: obviously needs refactoring
      return new DiceExpression(terms, (0 !== explodeCount)).toDiceResults();
   }
   var everyCombination = Combination.cartesianProduct(everyValue);

   var everySum = [];
   for (var resultIndex = 0; resultIndex < everyCombination.length; ++resultIndex)
   {
      var everyResult = [], probability = 1;
      for (var dieIndex = 0; dieIndex < everyCombination[resultIndex].length; ++dieIndex)
      {
         everyResult = everyResult.concat(everyCombination[resultIndex][dieIndex].result);  //concat shallow copies array
         if(0 !== explodeCount) probability *= everyCombination[resultIndex][dieIndex].probability;
      }
      if(undefined !== diceGroup.dropKeepType) diceGroup.dropKeepType.perform(diceGroup.dropKeepCount, everyResult);
      //the probability is the product of all of the probability but only some dice are used for the result sum
      if(0 === explodeCount) everySum.push({exponent: Math.summation(everyResult), coefficient: 1});
      else everySum.push({exponent: Math.summation(everyResult), coefficient: probability});
   }

   //combine matching sums:
   var finalExpression = new DiceExpression([everySum[0]], (0 !== explodeCount));
   for (var i = 1; i < everySum.length; ++i)
   {
      finalExpression.addTerm(everySum[i]);
   }

   return finalExpression.toDiceResults();
};
Statistics.useDroppingAlgorithm = function()
{
};
/**
Returns the statistics for a given element of DicePool.toJSON().pool using a Polynomial based algorithm.
The algorithm is faster than brute force but can't support drop/keep.
@param {object} diceGroup
@param {number} explodeCount the maximum number of times a die can explode (ignored for those that don't explode)
@returns {object[]} the dice results
*/
Statistics.useNonDroppingAlgorithm = function(diceGroup, explodeCount)
{
   //assert: no drop/keep
   var workingExpression = new DiceExpression(diceGroup.die, explodeCount);
   if(diceGroup.areDiceNegative) workingExpression.negateExponents();
   for (var dieCount = 1; dieCount < diceGroup.dieCount; ++dieCount)
   {
      //dice are immutable so it's ok to reuse the same one
      var newExpression = new DiceExpression(diceGroup.die, explodeCount);
      //TODO: faster: since all dice are the same I can get json and reuse it a bunch
      if(diceGroup.areDiceNegative) newExpression.negateExponents();
      workingExpression.multiply(newExpression);
   }
   return workingExpression.toDiceResults();
};
