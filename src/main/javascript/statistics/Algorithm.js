'use strict';
var Algorithm = {};
/**
This function analyzes the diceGroup given and returns the best possible algorithm.
@param {object} diceGroup an element of DicePool.toJSON().pool
@returns {function} that takes a diceGroup and everyValue
and returns objects contain result (the sum rolled) and either frequency (if possible) or probability (otherwise).
It will not include frequency of 0 or probability of less than 0.00000 (5) and will be in result ascending order.
*/
Algorithm.analyze = function(diceGroup)
{
   if(undefined === diceGroup.dropKeepType) return Algorithm.useNonDroppingAlgorithm;
   //later useDroppingAlgorithm
   return Algorithm.useBruteForce;  //if any gaps then useBruteForce
};
//TODO: make a brute force for every combination and also for every sum (currently only sum)
Algorithm.useBruteForce = function(diceGroup, everyDieValue)
{
   var useProbability = (undefined !== diceGroup.die.toJSON().explodeType);
   //don't call DiceExpression.combineValues so that the results aren't summed together
   var newExpression = new DiceExpression(everyDieValue, useProbability);  //TODO: consider explodeCount 0 to use prob

   var stats = newExpression.toDiceResults();
   if(useProbability) Statistics.determineProbability(stats);  //safe because it doesn't touch results
   var everyValue = [];
   for (var dieCount = 0; dieCount < diceGroup.dieCount; ++dieCount)
   {
      everyValue.push(JSON.clone(stats));
   }
   // everyValue = new Array(diceGroup.dieCount).fill(stats);  //need to prove this is safe or use JSON.clone

   //assert: everyValue.length > 0 because DicePool should prevent that case
   if (1 === diceGroup.dieCount)
   {
      var terms = new DiceExpression(everyValue[0], useProbability).toJSON();
      DiceExpression.combineValues(terms);  //TODO: obviously needs refactoring
      return new DiceExpression(terms, useProbability).toDiceResults();
   }
   var everyCombination = Combination.cartesianProduct(everyValue);

   var everySum = [];
   for (var resultIndex = 0; resultIndex < everyCombination.length; ++resultIndex)
   {
      var everyResult = [], probability = 1;
      for (var dieIndex = 0; dieIndex < everyCombination[resultIndex].length; ++dieIndex)
      {
         everyResult = everyResult.concat(everyCombination[resultIndex][dieIndex].result);  //concat shallow copies array
         if(useProbability) probability *= everyCombination[resultIndex][dieIndex].probability;
      }
      if(undefined !== diceGroup.dropKeepType) diceGroup.dropKeepType.perform(diceGroup.dropKeepCount, everyResult);
      //the probability is the product of all of the probability but only some dice are used for the result sum
      if(!useProbability) everySum.push({exponent: Math.summation(everyResult), coefficient: 1});
      else everySum.push({exponent: Math.summation(everyResult), coefficient: probability});
   }

   //combine matching sums:
   var finalExpression = new DiceExpression([everySum[0]], useProbability);
   for (var i = 1; i < everySum.length; ++i)
   {
      finalExpression.addTerm(everySum[i]);
   }

   return finalExpression.toDiceResults();
};
Algorithm.dropLowest = function(diceGroup, everyDieValue)
{
   //This currently doesn't support enough dice features so it's here but requires a manual import.
   return diceResultsForASingleDrop(diceGroup, everyDieValue);
};
/**
Returns the statistics for a given element of DicePool.toJSON().pool using a Polynomial based algorithm.
The algorithm is faster than brute force but can't support drop/keep.
@param {object} diceGroup
@param {number} explodeCount the maximum number of times a die can explode (ignored for those that don't explode)
@returns {object[]} the dice results
*/
Algorithm.useNonDroppingAlgorithm = function(diceGroup, everyDieValue)
{
   //assert: no drop/keep
   var useProbability = (undefined !== diceGroup.die.toJSON().explodeType);
   DiceExpression.combineValues(everyDieValue);
   var workingExpression = new DiceExpression(everyDieValue, useProbability);
   workingExpression.power(diceGroup.dieCount);
   return workingExpression.toDiceResults();
};
