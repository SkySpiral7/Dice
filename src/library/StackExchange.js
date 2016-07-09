'use strict';
//Despite the tests this whole file should be considered beta until I can incorporate it into Statistics
var beta = {StackExchange: {}};

/**from: http://stats.stackexchange.com/questions/130025/formula-for-dropping-dice-non-brute-force
I'm not sure about the general problem with varying numbers of dice, sides, and drops, but I think I can see an efficient algorithm for the drop-1 case. The qualifier is that I'm not completely sure that it's correct, but right now I can't see any flaws.

Let's start by not dropping any dice. Suppose X(n) represents the nth die, and suppose Y(n) represents the sum of n dice. Then*/
beta.StackExchange.probabilityThatSumOfDiceIsA = function(a, die, dieCount)
{
   /*This function shows that I understand how to read the statistics equations (which I doubt)
   and that the basis of his formulas works.
   This function is assuming die has no: constantModifier, rerollCriteria, explodeType
   also assuming that dieCount >= 1*/

   var sideCount = die.toJSON().sideCount;
   if(a < dieCount || a > (dieCount*sideCount)) return 0;
   if(1 === dieCount) return (1 / sideCount);

   var result = 0;
   for (var k = 1; k <= sideCount; ++k)
   {
      result += (beta.StackExchange.probabilityThatSumOfDiceIsA((a-k), die, (dieCount-1)) *
      (1 / sideCount));
   }
   return result;
}

/**Now suppose Z(n) is the sum of n dice when one die is dropped. Then
~
If we define M(n) to be distribution of the minimum of n dies, then*/
function probabilityThat_ZofNIsA(a, die, dieCount)
{
   var sideCount = die.toJSON().sideCount;
   var diceKept = (dieCount-1);
   if(0 === diceKept || a < diceKept || a > (diceKept*sideCount)) return 0;
   if(1 === diceKept) return /*?*/;

   var result = (probabilityThat_XofNisSmallest(/*?*/) * beta.StackExchange.probabilityThatSumOfDiceIsA(a, die, (dieCount-1)));

   var probabilityThat_XofNisNotSmallest = probabilityThat_XofNisNotSmallest(/*?*/);
   var secondPart = 0;
   for (var k = 1; k <= sideCount; ++k)
   {
      secondPart += (probabilityThat_ZofNIsA((a-k), die, (dieCount-1)) *
      probabilityThat_XofNIsA_GivenThatXofNisNotSmallest(/*?*/));
   }
   secondPart *= probabilityThat_XofNisNotSmallest;

   result += secondPart;
   return result;
}

/**and we can calculate M(n) using*/
function probabilityThat_theSmallestIsA(/*?*/)
{
   var result = probabilityThat_XofNisSmallest(/*?*/) * probabilityThat_XofNIsA_GivenThatXofNisTheSmallest(/*?*/);
   result += (probabilityThat_XofNisNotSmallest(/*?*/) * probabilityThat_theSmallestIsA_GivenThatXofNisNotSmallest(/*?*/));
   return result;
}

/**Anyway, together this all suggests a dynamic programming algorithm based on Y(n), Z(n), and M(n). Should be quadratic in n.

edit: A comment has been raised on how to calculate p(X(n)<=M(n-1)). Since X(n),M(n-1) can each only take on one of six values, we can just sum over all possibilities:*/
function probabilityThat_XofNisSmallest(die, dieCount)
{
   var sideCount = die.toJSON().sideCount;
   var result = 0;
   for (var a = 1; a <= sideCount; ++a)
   {
      for (var b = 1; b <= sideCount; ++b)
      {
         if(a <= b) result += ((1 / sideCount) * probabilityThat_theSmallestIsA(/*? with dieCount-1*/));
      }
   }
}

/*Similarly, p(X(n)=k|X(n)>M(n-1)) can be calculated by applying Bayes rule then summing over the possible values of X(n),M(n-1).*/

//others:
function probabilityThat_XofNisNotSmallest(die, dieCount)
{
   return (1-probabilityThat_XofNisSmallest(die, dieCount));
}
function probabilityThat_XofNIsA_GivenThatXofNisNotSmallest(){}  //TODO: stub
function probabilityThat_XofNIsA_GivenThatXofNisTheSmallest(){}  //TODO: stub
function probabilityThat_theSmallestIsA_GivenThatXofNisNotSmallest(){}  //TODO: stub

/**@returns the probability of of A given B.*/
function bayesTheorem(probabilityOfBGivenA, probabilityOfA, probabilityOfB)
{
   return (probabilityOfBGivenA * probabilityOfA / probabilityOfB);
}
