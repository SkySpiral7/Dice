Polynomial.createDiePolynomial = function(dieObject, explodeCount){
    if((dieObject instanceof ScatterDie) && explodeCount==0) return [['Direct Hit', 1], ['Scatter', 2]];  //returned correctly instead of output meaningless data
    if(dieObject instanceof ScatterDie) return [['Direct Hit', (1/3)], ['Scatter', (2/3)]];
    //if(dieObject instanceof ScatterDie) return [[0, 0]];  //ignored. didn't work
    var results=[], values=[], chance=[];
    var dieMax=dieObject.getSides()+dieObject.getStats().constantModifier;
    dieObject=dieObject.getStats();
    var reroll=dieObject.rerollCriteria;
    var totalPossible;
    var previousPossible=1;
    if(!dieObject.doesExplode && !dieObject.doesCompoundExplode) explodeCount=0;  //this die doesn't explode
   for (var explodeIndex=0; explodeIndex <= explodeCount; explodeIndex++)
   {
       totalPossible=0;
      for (var i=1; i <= (dieMax-dieObject.constantModifier); i++)
      {
          var die=i;
          if(dieObject.doesUseZero) die--;
          //if(dieObject.isFudgeDie) die--;  //uses constantModifier below
          if(dieObject.doesPenetrate && explodeIndex > 0) die--;
          if(dieObject.nameArray.length!=0) die=dieObject.nameArray[die];  //named dice are always coins and never negative
          if(!isNaN(die)) die+=dieObject.constantModifier;
          if(dieObject.isDieNegative) die*=-1;
          if(explodeIndex > 0 && dieObject.doesCompoundExplode) die+=(dieMax*explodeIndex);  //modified here for rerolling reasons. sum for compound
         if (reroll==undefined || !eval(die+''+reroll))
         {
             totalPossible++;
             if(explodeIndex != explodeCount && i == (dieMax-dieObject.constantModifier)) continue;  //same as break; skip over the max since it would explode
             if(explodeIndex > 0 && dieObject.doesExplode) die+=(dieMax*explodeIndex);  //modified here for rerolling reasons. sum for regular
             if(explodeCount==0) results.push([die, 1]);  //value, freq
             else values.push(die);
         }
      }
      if (explodeCount > 0)
      {
          if(dieObject.doesCompoundExplode) previousPossible*=totalPossible;
         for (var i=0; i < totalPossible-1; i++)
         {
             if(dieObject.doesExplode) chance.push(Math.pow(totalPossible, (explodeIndex+1)));  //1/probability
             else chance.push(previousPossible);  //1/probability
         }
      }
   }
    if(dieObject.doesExplode) chance.push(Math.pow(totalPossible, (explodeCount+1)));  //1/probability
    else chance.push(previousPossible);  //1/probability
    if(results.length!=0) return results;
    for(var i=0; i < values.length; i++)
      results.push([values[i], (1/chance[i])]);
    return results;
    /*estimation of drops: 4d6k2 get 7
    1-P(1 pair not 7)^6 where 6 is Combination(4 trials pick 2)
    */
}
/*actual probability with reroll: 1d4!r3
1: 1/3
2: 1/3
3: 0
4+: 1/3
(4+1=5): 1/3 * 1/3
(4+2=6): 1/3 * 1/3
(4+3=7): 0 due to reroll 3
(4+4=8)+: 1/3 * 1/3
for normal Math.pow((1/sidesPossible), (explodeIndex+1)) works fine

actual probability with reroll: 1d4!pr3
1: 1/3
2: 1/3
3: 0
4+: 1/3
(4+1-1=4): 1/3 * 1/3
(4+2-1=5): 1/3 * 1/3
(4+3-1=6): 0 due to reroll 3
(4+4-1=7)+: 1/3 * 1/3
penetrating is the same as normal

actual probability with reroll: 1d4!!r3
1: 1/3
2: 1/3
3: 0
4+: 1/3
(4+1=5): 1/3 * 1/4
(4+2=6): 1/3 * 1/4
(4+3=7): 1/3 * 1/4
(4+4=8)+: 1/3 * 1/4
for compound it isn't so simple... (the number of possibilities that exists in this explosion) * (running total chance)

actual probability with reroll: 1d4!!r<=3
1: 0
2: 0
3: 0
4+: 1
(4+1=5): 1 * 1/4
(4+2=6): 1 * 1/4
(4+3=7): 1 * 1/4
(4+4=8)+: 1 * 1/4
edge case: if(the number of possibilities that exists in this explosion is 0) then don't change the running chance
*/
//old Polynomial.multiplyPolynomials had min/max
