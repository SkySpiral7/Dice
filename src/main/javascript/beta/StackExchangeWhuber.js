'use strict';
//from: http://stats.stackexchange.com/questions/130025/formula-for-dropping-dice-non-brute-force/242857#242857
/*Stress tests:
function4(112, 10);
function4(3, 170);
vs
Statistics.calculateDiceSums(new DicePool('6d10 drop lowest'));
Statistics.calculateDiceSums(new DicePool('3d170 drop lowest'));
*/
function function1(sideCount, smallestSide)
{
   var result = DiceExpression.empty();
   for (var i=smallestSide; i <= sideCount; ++i)
   {
      result.addTerm({exponent: i, coefficient: 1});
   }
   return result;
}
function function2(dieCount, sideCount, smallestSide)
{
   var base = function1(sideCount, smallestSide);
   var result = base.clone();
   for (var i=2; i <= dieCount; ++i)
   {
      result.multiply(base);
   }
   return result;
}
function function3(dieCount, sideCount, smallestSide)
{
   var result = function2(dieCount, sideCount, smallestSide);
   result.subtract(function2(dieCount, sideCount, smallestSide+1));
   return result;
}
function function4(dieCount, sideCount)
{
   var workingExpression = function3(dieCount, sideCount, 1);
   workingExpression.multiply(new DiceExpression([{exponent: -1, coefficient: 1}]));
   for (var smallestSide=2; smallestSide <= sideCount; ++smallestSide)
   {
      var currentExpression = function3(dieCount, sideCount, smallestSide);
      currentExpression.multiply(new DiceExpression([{exponent: -smallestSide, coefficient: 1}]));
      workingExpression.add(currentExpression);
   }
   return workingExpression.toDiceResults();
}
