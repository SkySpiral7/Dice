'use strict';
//from: http://stats.stackexchange.com/questions/130025/formula-for-dropping-dice-non-brute-force/242857#242857
/*Stress tests:
function4(112, 10);
function4(3, 170);
vs
Statistics.calculateDiceSums(new DicePool('6d10 drop lowest'));
Statistics.calculateDiceSums(new DicePool('3d170 drop lowest'));
*/
function expressionForASingleDie(sideCount, smallestSide)  //f1 of se. should be replaced by DiceExpression.everyValue
{
   var result = new DiceExpression();
   for (var i=smallestSide; i <= sideCount; ++i)
   {
      result.addTerm({exponent: i, coefficient: 1});
   }
   return result;
}
function expressionForMultipleDice(dieCount, sideCount, smallestSide)  //f2 of se. should be replaced by Statistics.useNonDroppingAlgorithm
{
   var base = expressionForASingleDie(sideCount, smallestSide);
   var result = base.clone();
   for (var i=2; i <= dieCount; ++i)
   {
      result.multiply(base);
   }
   return result;
}
function expressionForDropLowestIsExactlyResult(dieCount, sideCount, smallestSide)  //f3 of se with x^-k
{
   var result = expressionForMultipleDice(dieCount, sideCount, smallestSide);
   result.subtract(expressionForMultipleDice(dieCount, sideCount, smallestSide+1));  //This ignores all sums that are greater.
   result.multiply(new DiceExpression([{exponent: -smallestSide, coefficient: 1}]));  //This drops the lowest die. It can't be moved to f2 because it needs to be x^-k for k+1 as well.
   //dropping 2 dice is not: *-smallestSide*-smallestSide, *(-smallestSide*2), *-smallestSide*-(smallestSide+1)
   return result;
}
function diceResultsForASingleDrop(dieCount, sideCount)  //f4 of se with moved x^-k
{
   var workingExpression = expressionForDropLowestIsExactlyResult(dieCount, sideCount, 1);
   for (var smallestSide=2; smallestSide <= sideCount; ++smallestSide)
   {
      workingExpression.add(expressionForDropLowestIsExactlyResult(dieCount, sideCount, smallestSide));
   }
   return workingExpression.toDiceResults();
}
