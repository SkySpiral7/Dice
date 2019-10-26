'use strict';
var Algorithm = {};
/**
This function analyzes the diceGroup given and returns the fastest possible algorithm.
@param {object} diceGroup an element of DicePool.toJSON().pool
@returns {function} that takes a diceGroup and everyValue
and returns objects contain result (the sum rolled) and either frequency (if possible) or probability (otherwise).
It will not include frequency of 0 or probability of less than 0.00000 (5) and will be in result ascending order.
*/
Algorithm.analyze = function(diceGroup)
{
   //check them in order from fastest to slowest
   if(undefined === diceGroup.dropKeepType) return Algorithm.nonDropping;
   if (Die.explodeTypes.Penetrating !== diceGroup.die.toJSON().explodeType)
   {
      var isDropping = (DicePool.dropKeepTypes.DropLowest === diceGroup.dropKeepType ||
         DicePool.dropKeepTypes.DropHighest === diceGroup.dropKeepType);
      if(isDropping && 1 === diceGroup.dropKeepCount) return Algorithm.singleDrop;
      if (!isDropping && (diceGroup.dieCount - 1) === diceGroup.dropKeepCount &&
         Die.explodeTypes.Normal !== diceGroup.die.toJSON().explodeType) return Algorithm.singleDrop;
         //Keeping all but the lowest with compound or no explode is the same as drop lowest.
         //The actual algorithm doesn't need the diceGroup to be converted.
      //else fall through
   }
   return Algorithm.bruteForce;  //if any gaps then bruteForce
};
//TODO: make a brute force for every combination and also for every sum (currently only sum)
Algorithm.bruteForce = function(diceGroup, everyDieValue)
{
   var useProbability = (undefined !== diceGroup.die.toJSON().explodeType);
   //don't call DiceExpression.combineValues so that the results aren't summed together
   var newExpression = new DiceExpression(everyDieValue, useProbability);  //TODO: consider explodeCount 0 to use prob

   var stats = newExpression.toDiceResults();
   if(useProbability) Statistics.determineProbability(stats);  //safe because it doesn't touch stats[].results
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
/**
Returns the statistics for a given element of DicePool.toJSON().pool using a Polynomial based algorithm.
The algorithm is faster than brute force but can't support drop/keep.
@param {object} diceGroup
@param {number} everyDieValue the results of DiceExpression.everyValue
@returns {object[]} the dice results
*/
Algorithm.nonDropping = function(diceGroup, everyDieValue)
{
   //assert: no drop/keep
   var useProbability = (undefined !== diceGroup.die.toJSON().explodeType);
   DiceExpression.combineValues(everyDieValue);
   var workingExpression = new DiceExpression(everyDieValue, useProbability);
   workingExpression.power(diceGroup.dieCount);
   return workingExpression.toDiceResults();
};
/**Based on: http://stats.stackexchange.com/questions/130025/formula-for-dropping-dice-non-brute-force/242857#242857
The group MUST be drop lowest 1 or drop highest 1. Does not support penetrating explosions.
The algorithm supports everything else and is faster than brute force.*/
Algorithm.singleDrop = function(diceGroup, everyDieValue)
{
   //TODO: test and doc KeepHighest etc
   var dropLowest = (DicePool.dropKeepTypes.DropLowest === diceGroup.dropKeepType || DicePool.dropKeepTypes.KeepHighest === diceGroup.dropKeepType);
   return diceResultsForASingleDrop(dropLowest, diceGroup, JSON.clone(everyDieValue));

   function expressionForMultipleDice(dieCount, everyDieValue)  //f2 of se. uses Algorithm.nonDropping but returns expression
   {
      if(0 === everyDieValue.length) return new DiceExpression();  //not needed but this fast path adds clarity
      everyDieValue = JSON.clone(everyDieValue);  //I don't want the combine to mutate everyDieValue
      DiceExpression.combineValues(everyDieValue);
      var workingExpression = new DiceExpression(everyDieValue);
      workingExpression.power(dieCount);
      return workingExpression;
   }
   function expressionForSingleDropIsExactlyResult(dropLowest, diceGroup, everyDieValue)  //f3 of se with x^-k
   {
      var excludedValue = dropLowest ?
         Math.min.apply(null, everyDieValue[0].exponent) :
         Math.max.apply(null, everyDieValue[0].exponent);
      //if(everyDieValue[0].exponent.length > 1 && diceGroup.die.toJSON().explodeType === Die.explodeTypes.Penetrating) ++excludedValue;
         //assuming DropLowest and the next smallest is 1 higher (ie no rerolls) the answer is still wrong
      var result = expressionForMultipleDice(diceGroup.dieCount, everyDieValue);
      everyDieValue.shift();
      result.subtract(expressionForMultipleDice(diceGroup.dieCount, everyDieValue));  //This ignores all sums that are greater.
      result.multiply(new DiceExpression([{exponent: -excludedValue, coefficient: 1}]));  //This drops the die. It can't be moved to f2 because it needs to be x^-k for k+1 as well.
      //dropping 2 dice is not: *-excludedValue*-excludedValue, *(-excludedValue*2), *-excludedValue*-(excludedValue+1)
      return result;
   }
   function diceResultsForASingleDrop(dropLowest, diceGroup, everyDieValue)  //f4 of se with moved x^-k
   {
      var useProbability = (undefined !== diceGroup.die.toJSON().explodeType);
      //both true or both false. Makes sure that the value removed is the first in array.
      if(diceGroup.areDiceNegative === dropLowest) everyDieValue.reverse();
      var workingExpression = new DiceExpression(useProbability);
      while (0 !== everyDieValue.length)
      {
         workingExpression.add(expressionForSingleDropIsExactlyResult(dropLowest, diceGroup, everyDieValue));
      }
      return workingExpression.toDiceResults();
   }
};
