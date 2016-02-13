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
    /*actual probability with reroll: 2d4!r3
    1: 1/3
    2: 1/3
    4+: 1/3
    5: 1/3
    6: 1/3
    8+: 1/3
    for regular (and pen) Math.pow((1/sidesPossible), (explodeIndex+1)) works fine

    actual probability with reroll: 2d4!!r3
    1: 1/3
    2: 1/3
    4+: 1/3
    5: 1/4
    6: 1/4
    7: 1/4
    8+: 1/4
    for compound it isn't so simple... the number that exists in this explosion times running total chance
    */
}

Polynomial.multiplyPolynomials = function(polyNomGiven, myPool){
    if(myPool==undefined) myPool=new DicePool();  //empty pool
    var polyNom=polyNomGiven.slice(0);  //clone to avoid changing original
    var results=polyNom[0];
    polyNom.shift();
   while (polyNom.length!=0)
   {
       var newPoly=[];
       var nextPoly=polyNom[0];

       //if(poolInfo is drop/keep) then ignore lower of i or j only on first pass of each poly
          //that's not true. the lowest depends on all dice and thus affects every final sum differently
      for (var i=0; i < results.length; i++)
      for (var j=0; j < nextPoly.length; j++)
      {
          var newValue=results[i][0]+nextPoly[j][0];  //Ax^B this is B
          var newFreq=results[i][1]*nextPoly[j][1];  //Ax^B this is A
          Polynomial.addPolynomials(newPoly, newValue, newFreq);
      }
       results=newPoly;
       polyNom.shift();
   }
    //I do not need to sort since they are still in ascending order from creation to here
    return combineResults(results, myPool);  //number array
   function combineResults(results, myPool){
       var newData=[];
      for (var i=0; i < results.length; i++)
      {
          if(results[i][1]==0) continue;  //not possible to roll
          var modifiedValue=(results[i][0]+myPool.getStats().constantModifier);
          modifiedValue=myPool.getStats().outsource.minMaxDoing(modifiedValue);
          Polynomial.addPolynomials(newData, modifiedValue, results[i][1]);  //[value, freq] need to use this in case of min/max
      }
       //now all the data has been updated with the totalModifier and min/max
       return newData;
   }
}
Polynomial.addPolynomials = function(poly, value, freq){
   for(var i = 0; i < poly.length; i++){
       if(poly[i][0] == value){poly[i][1]+=freq; return;}  //sum exists so increase freq
   }
    poly.push([value, freq]);  //sum is new. the sums are done in order ascending so that when pushed they are still in order
}
