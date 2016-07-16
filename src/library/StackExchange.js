'use strict';
/*Despite the tests this whole file should be considered beta until I can incorporate it into Statistics:
1. Finish (die with no: constantModifier, rerollCriteria, explodeType)
2. Optimize
3. Compare to brute force
   a. if new is slower then ask if this is actually O(n) and if I'm doing something wrong
   b. if new is faster then continue
4. Make as generic as possible (likely multiple steps)
   a. die with: constantModifier, rerollCriteria, explodeType
   b. any number of drop
   c. any kind of drop, negative
5. Compare again to make sure this can still handle 10k1 etc
6. Put into Statistics*/
var beta = {StackExchange: {}};

/**from: http://stats.stackexchange.com/questions/130025/formula-for-dropping-dice-non-brute-force
I'm not sure about the general problem with varying numbers of dice, sides, and drops, but I think I can see an efficient algorithm for the drop-1 case. The qualifier is that I'm not completely sure that it's correct, but right now I can't see any flaws.

Let's start by not dropping any dice. Suppose X(n) represents the nth die, and suppose Y(n) represents the sum of n dice. Then*/
beta.StackExchange.probabilityThatSumOfDiceIsA = function(a, die, dieCount)
{
   /*This function shows that I understand how to read the statistics equations (I wasn't sure if I could)
   and that the basis of his formulas works.
   This function is assuming die has no: constantModifier, rerollCriteria, explodeType
   also assuming that dieCount >= 0*/

   var sideCount = die.toJSON().sideCount;
   if(0 === dieCount || a < dieCount || a > (dieCount*sideCount)) return 0;
   if(1 === dieCount) return (1 / sideCount);

   var result = 0;
   for (var k = 1; k <= sideCount; ++k)
   {
      result += (beta.StackExchange.probabilityThatSumOfDiceIsA((a-k), die, (dieCount-1)) *
      (1 / sideCount));
   }
   return result;
};

/**Now suppose Z(n) is the sum of n dice when [the smallest] die is dropped. Then

p(nth die is the smallest)p(Y(n-1)=a|nth die is the smallest) + p(nth die is not the smallest)sumOverAllK(p(Z(n-1)=(a-k))p(X(n)=k))

If we define M(n) to be distribution of the minimum of n dies, then*/
function probabilityThat_ZofNIsA(a, die, dieCount)
{
   var sideCount = die.toJSON().sideCount;
   var diceKept = (dieCount-1);
   if(0 === diceKept && 0 === a) return 1;  //dropping the only die will make the sum be 0
   if(0 === diceKept || a < diceKept || a > (diceKept*sideCount)) return 0;
   var diceCountExcludingSelf = (dieCount-1);  //same value as diceKept but different meaning

   var result = (beta.StackExchange.probabilityThat_XofNisSmallestOrEqual(die, dieCount) *
      probabilityThatSumOfDiceIsA_GivenThatXofNisSmallestOrEqual(a, die, diceKept));

   var probabilityThat_XofNisLargestResult = beta.StackExchange.probabilityThat_XofNisLargest(die, dieCount);
   var secondPart = 0;
   for (var k = 1; k <= sideCount; ++k)
   {
      secondPart += (probabilityThat_ZofNIsA((a-k), die, diceCountExcludingSelf) *
      probabilityThat_XofNIsA_GivenThatXofNisLargest(k, die, dieCount));
   }
   secondPart *= probabilityThat_XofNisLargestResult;

   result += secondPart;
   return result;
}
/**This is only for testing and will be deleted later. It helps test Z.
It returns the brute force answer which is what probabilityThat_ZofNIsA is trying to find.
This function's answer is known to be correct and thus can be used to compare or rule out.*/
function subZ(a, die, dieCount)
{
   var sideCount = die.toJSON().sideCount;
   var diceKept = (dieCount-1);
   if(0 === diceKept && 0 === a) return 1;  //dropping the only die will make the sum be 0
   if(0 === diceKept || a < diceKept || a > (diceKept*sideCount)) return 0;

   var stats = Statistics.calculateDiceSums(new DicePool({name: 'Known correct answer', pool: [
      {
         die: die,
         dieCount: dieCount,
         dropKeepType: DicePool.dropKeepTypes.DropLowest,
         dropKeepCount: 1,
         areDiceNegative: false
      }
   ]}));
   Statistics.determineProbability(stats);
   for (var findIndex = 0; findIndex < stats.length; ++findIndex)
   {
      if(a === stats[findIndex].result) return stats[findIndex].probability;
   }
   return 0;
}
/*Doing probabilityThat_ZofNIsA by hand, some work done by brute force (see other tests):
p(Z(n)=a) = p(X(n)<=M(n-1)) * p(Y(n-1)=a|X(n)<=M(n-1)) + p(X(n)>M(n-1)) * sumOverAllK(p(Z(n-1)=(a-k))p(X(n)=k|X(n)>M(n-1)))
Using 2d2 drop lowest, the chance of getting 1 is:
p(Z(n)=1) = (3/4)*(1/3) + (1/4)*(p(Z(n-1)=(1-1))*0 + p(Z(n-1)=(1-2))*1)
p(Z(n)=1) = (1/4) + (1/4)*(1*0 + 0*1)
p(Z(n)=1) = 1/4
This is the correct answer
*/

/**and we can calculate M(n) using
~
Anyway, together this all suggests a dynamic programming algorithm based on Y(n), Z(n), and M(n). Should be quadratic in n.

edit: A comment has been raised on how to calculate p(X(n)<=M(n-1)). Since X(n),M(n-1) can each only take on one of six values, we can just sum over all possibilities:*/
beta.StackExchange.probabilityThat_XofNisSmallestOrEqual = function(die, dieCount)
{
   //this implementation is based on how I calculated it by hand rather than based on his formula
   var sideCount = die.toJSON().sideCount;
   if(1 === dieCount) return 1;  //fast path

   var result = 0;
   for (var myRoll = 1; myRoll <= sideCount; ++myRoll)
   {
      result += probabilityThat_XofNisSmallestOrEqual_GivenThatXofNIsA(myRoll, die, dieCount) *
         (1/sideCount);  //it's the prob for rolling myRoll
   }

   return result;
};

/*Similarly, p(X(n)=k|X(n)>M(n-1)) can be calculated by applying Bayes rule then summing over the possible values of X(n),M(n-1).*/

//others:
beta.StackExchange.probabilityThat_XofNisLargest = function(die, dieCount)
{
   return (1-beta.StackExchange.probabilityThat_XofNisSmallestOrEqual(die, dieCount));
};
function probabilityThat_XofNIsA_GivenThatXofNisLargest(a, die, dieCount)
{
   var probabilityThat_XofNIsA = (1 / die.toJSON().sideCount);
   if(1 === dieCount) return probabilityThat_XofNIsA;  //with only 1 die being the largest means nothing
   var probabilityThat_XofNisLargest = beta.StackExchange.probabilityThat_XofNisLargest(die, dieCount);

   var probabilityThat_XofNisLargest_GivenThatXofNIsAResult = probabilityThat_XofNisLargest_GivenThatXofNIsA(a, die, dieCount);

   return bayesTheorem(probabilityThat_XofNisLargest_GivenThatXofNIsAResult, probabilityThat_XofNIsA, probabilityThat_XofNisLargest);
}

function probabilityThat_XofNisLargest_GivenThatXofNIsA(a, die, dieCount)
{
   if(1 === dieCount) return 1;  //fast path
   if(1 === a) return 0;  //since this is the smallest possible number it can't be strictly greater
   var sideCount = die.toJSON().sideCount;

   var probOtherRolledLower = ((a-1)/sideCount);  //if a=3 then other has a 2/x chance of rolling lower
   var probAllOthersRolledLower = Math.pow(probOtherRolledLower, (dieCount-1));

   return probAllOthersRolledLower;
}
function probabilityThat_XofNisSmallestOrEqual_GivenThatXofNIsA(a, die, dieCount)
{
   if(1 === dieCount) return 1;  //fast path
   var sideCount = die.toJSON().sideCount;

   var probOtherRolledLower = ((a-1)/sideCount);  //if a=3 then other has a 2/x chance of rolling lower
   var probOtherRolledEqualOrHigher = (1-probOtherRolledLower);
   var probAllOthersRolledEqualOrHigher = Math.pow(probOtherRolledEqualOrHigher, (dieCount-1));

   return probAllOthersRolledEqualOrHigher;
}
function probabilityThatSumOfDiceIsA_GivenThatXofNisSmallestOrEqual(a, die, dieKept)
{
   //base cases are covered by probabilityThat_ZofNIsA
   var sideCount = die.toJSON().sideCount;
   var workingExpression = new DiceExpression([{coefficient: 1, exponent: 1}], false);
   workingExpression.addTerm({coefficient: -1, exponent: 1});  //it is now empty
   for (var k = 1; k <= sideCount; ++k)
   {
      var temp;
      //we know that the first die is one of the smallest so reroll all smaller dice
      if(1 === k) temp = Statistics.calculateDiceSums(new DicePool(dieKept + 'd' + sideCount));
      else temp = Statistics.calculateDiceSums(new DicePool(dieKept + 'd' + sideCount + 'r<' + k));
      for (var combinedIndex = 0; combinedIndex < temp.length; ++combinedIndex)
      {
         workingExpression.addTerm({coefficient: temp[combinedIndex].frequency, exponent: temp[combinedIndex].result});
      }
   }

   var diceResults = workingExpression.toDiceResults();
   Statistics.determineProbability(diceResults);
   for (var findIndex = 0; findIndex < diceResults.length; ++findIndex)
   {
      if(a === diceResults[findIndex].result) return diceResults[findIndex].probability;
   }
   return 0;
}

/**@returns the probability of of A given B.*/
function bayesTheorem(probabilityOfBGivenA, probabilityOfA, probabilityOfB)
{
   return (probabilityOfBGivenA * probabilityOfA / probabilityOfB);
}
