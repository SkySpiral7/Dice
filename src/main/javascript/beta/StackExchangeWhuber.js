'use strict';
//from: http://stats.stackexchange.com/questions/130025/formula-for-dropping-dice-non-brute-force/242857#242857
/*Stress tests:
dicePoolDropLowest(new DicePool('112d10 drop lowest'));
dicePoolDropLowest(new DicePool('3d170 drop lowest'));
vs
Statistics.calculateDiceSums(new DicePool('6d10 drop lowest'));
Statistics.calculateDiceSums(new DicePool('3d170 drop lowest'));
*/
function expressionForMultipleDice(dieCount, everyDieValue)  //f2 of se. uses Algorithm.useNonDroppingAlgorithm but returns expression
{
   everyDieValue = JSON.clone(everyDieValue);  //I don't want the combine to mutate everyDieValue
   DiceExpression.combineValues(everyDieValue);
   var workingExpression = new DiceExpression(everyDieValue);
   workingExpression.power(dieCount);
   return workingExpression;
}
function expressionForDropLowestIsExactlyResult(dieCount, everyDieValue)  //f3 of se with x^-k
{
   var smallestSide = everyDieValue[0].exponent[0];
   var result = expressionForMultipleDice(dieCount, everyDieValue);
   everyDieValue.shift();
   result.subtract(expressionForMultipleDice(dieCount, everyDieValue));  //This ignores all sums that are greater.
   result.multiply(new DiceExpression([{exponent: -smallestSide, coefficient: 1}]));  //This drops the lowest die. It can't be moved to f2 because it needs to be x^-k for k+1 as well.
   //dropping 2 dice is not: *-smallestSide*-smallestSide, *(-smallestSide*2), *-smallestSide*-(smallestSide+1)
   return result;
}
//TODO: allow non-compound explode, hook up to prod
function diceResultsForASingleDrop(diceGroup, everyDieValue)  //f4 of se with moved x^-k
{
   var useProbability = (undefined !== diceGroup.die.toJSON().explodeType);
   if(diceGroup.areDiceNegative) everyDieValue.reverse();
   var workingExpression = new DiceExpression(useProbability);
   while (0 !== everyDieValue.length)
   {
      workingExpression.add(expressionForDropLowestIsExactlyResult(diceGroup.dieCount, everyDieValue));
   }
   return workingExpression.toDiceResults();
}
function dicePoolDropLowest(dicePool)
{
   var diceGroup = dicePool.toJSON().pool[0];
   var everyDieValue = DiceExpression.everyValue(diceGroup);
   return diceResultsForASingleDrop(diceGroup, JSON.clone(everyDieValue));
}
