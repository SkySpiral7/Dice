'use strict';
//Despite the tests this whole file should be considered beta until I can incorporate it into Statistics
var beta = {StackExchange: {}};

/*from: http://stats.stackexchange.com/questions/130025/formula-for-dropping-dice-non-brute-force
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

/*
function probabilityThat_ZofNIsA(a, diceArray){
   //assuming: homogeneous dice pool (such as 4d10), exactly 1 die is dropped (and it is the lowest), no rerolls or min/max, standard die only
   //also assuming that a is a possible sum for the pool
   //var diceArray = poolGiven.getAllDice();
   var n = diceArray.length;
   var result = (probabilityThat_XofNisSmallest(?) * probabilityThat_YofNisA(a, diceArray.slice(1)));
   result += (probabilityThat_XofNisNotSmallest(?) * bigSum(a, diceArray.slice(1)));
}

function bigSum(a, diceArray){
   var n = diceArray.length;
}

function probabilityThat_XofNisSmallest(?){
}

function probabilityThat_XofNisNotSmallest(?){
}

function probabilityThat_YofNisA(a, diceArray){
   var n = diceArray.length;
   var finishedPolys=[];
   for(var i=0; i < diceArray.length; i++){finishedPolys.push(Polynomial.createDiePolynomial(diceArray[i], 0));}  //0 indicates no explosions yet
   var rollData=Polynomial.multiplyPolynomials(finishedPolys);

   var totalFreq=0;
   for(var i=0; i < rollData.length; i++){totalFreq+=rollData[i][1];}
   for(var i=0; i < rollData.length; i++){if(rollData[i][0] === a) return (rollData[i][1] / totalFreq);}
}
/**/
