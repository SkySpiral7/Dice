function generate_Binomials(trials, probability){
    /*var lessThan=0;  //I only care about exactly
    for(var i=0; i < numberDesired; i++)  //0 is valid since it is all of them failing
       lessThan+=Binomial_distribution(i, trials, probability);  //adding up mutually exclusive events
    var exactly=Binomial_distribution(numberDesired, trials, probability);
    var greaterThan=0;
    for(var i=numberDesired+1; i <= trials; i++)
       greaterThan+=Binomial_distribution(i, trials, probability);  //adding up mutually exclusive events
    //alert('lessThan='+lessThan+'\nexactly='+exactly+'\ngreaterThan='+greaterThan);  //add together for more results
    */
    var bellCurve=[];
   for(var i=0; i <= trials; i++)
       bellCurve.push(Binomial_distribution(i, trials, probability));
    return bellCurve;
   function Binomial_distribution(numberDesired, trials, probability){  //Combination * p^k * (1-p)^(n-k) where p is probability of win
       if(numberDesired==0 && probability==0) return 1;  //always
       if(numberDesired > trials || probability==0) return 0;  //impossible. notice how (n-k)! is undefined
       var result=Combination(numberDesired, trials);
       result*=Math.pow(probability, numberDesired);
       result*=Math.pow((1-probability), (trials-numberDesired));
       return result;
   }
}
function Combination(numberDesired, trials){  //n!/(k!*(n-k)!) where n=number of trials k=number you want
    var demoninator=Math.factorial(trials-numberDesired);
    demoninator*=Math.factorial(numberDesired);
    return (Math.factorial(trials)/demoninator);
}

function everyDieValueWeighted(myDie){
    var results=[[0, 1]];  //for first pass then this is overwritten
    var explodeCount=0;
    var explodeMax=explodeCount+5;
    if(!myDie.getStats().doesExplode && !myDie.getStats().doesCompoundExplode){explodeCount=0; explodeMax=1;}
   for (; Number(results[results.length-1][1].toFixed(4))!=0 && explodeCount < explodeMax; explodeCount++)  //explode loop
   {
       var rollData=Polynomial.createDiePolynomial(myDie, explodeCount);

      if (explodeMax > 1 && explodeCount > 0)
      {
          //pad with [] so that they are sums
          results=[];
          for(var i=0; i < rollData.length; i++)
             results.push([rollData[i]]);
          rollData=results;

          rollData=explodeSplit(rollData, [myDie]);  //splits non-compound explosions into the correct dice
      }
       results=[];
      for (var i=0; i < rollData.length; i++)
      {
          var sum=0, chance=1;
         for (var j=0; j < rollData[i].length; j++)
             {sum+=rollData[i][j][0]; chance*=rollData[i][j][1];}
          Polynomial.addPolynomials(results, sum, chance);
      }
       results=results.sort(sumAscending);  //sort by sum ascending
       //results is only summed to know when to stop, rollData is what is returned
   }
    return rollData;
}

function explodeSplit(rollData, diceArray){
    var results=[];
   for (var sumIndex=0; sumIndex < rollData.length; sumIndex++)
   {
       var thisSum=[];
      for (var diceIndex=0; diceIndex < diceArray.length; diceIndex++)
      {
          var explodeValue = diceArray[diceIndex].getStats().explodeValue;  //is undefined if !doesExplode
         if (diceArray[diceIndex].getStats().doesExplode && rollData[sumIndex][diceIndex][0] >= explodeValue)  //reg and pen but not compound
         {
             if(diceArray[diceIndex].getMinValue() < 1) throw new Error("explodeSplit can't handle dice with a minimum value less than 1.");
             if(diceArray[diceIndex].hasNames()) throw new Error("explodeSplit can't handle named dice.");
             var doesPenetrate = diceArray[diceIndex].getStats().doesPenetrate;
            if (doesPenetrate)
            {
                rollData[sumIndex][diceIndex][0]-=explodeValue;  //remove first explosion
                explodeValue--;  //every explosion after the first is 1 less
            }
             var timesExploded = Math.ceil(rollData[sumIndex][diceIndex][0]/explodeValue)-1;  //max is explodeCount. not the same as Math.floor due to whole numbers
             if(doesPenetrate) timesExploded++;  //1 explosion has already happened
             var remainderValue = rollData[sumIndex][diceIndex][0]%explodeValue;
             if(remainderValue==0 && !doesPenetrate) remainderValue=explodeValue;  //if pen it can't roll max but can roll 0
             //TODO: some dice have 0 (z) and then there's fudge and modifiers... which are impossible to separate
             var newChance=Math.pow(rollData[sumIndex][diceIndex][1], (1/(timesExploded+1)));  //each die is the same exploded or not
             thisSum.push([remainderValue, newChance]);
             for(var i=0; i < timesExploded; i++) thisSum.push([explodeValue, newChance]);
         }
          else thisSum.push([rollData[sumIndex][diceIndex][0], rollData[sumIndex][diceIndex][1]]);
      }
       results.push(thisSum);
   }
    return results;
};

function cartesianProduct(array1Given, array2Given){  //they aren't changed
    var results=[];
   for (var i=0; i < array1Given.length; i++)
   for (var j=0; j < array2Given.length; j++)
       results.push([array1Given[i], array2Given[j]]);
    return (results);
}

function nextCartesianProduct(array1Given, array2Given){  //they aren't changed
    var results=[];
   for(var i=0; i < array1Given.length; i++)
   for(var j=0; j < array2Given.length; j++)
   {
       var thisRow=array1Given[i].slice();  //copy array
       thisRow.push(array2Given[j]);  //the difference is here: array2Given[j] is added to a copy of array1Given[i] so that it will be on the same level
       results.push(thisRow);
   }
    return results;
}
/*function combineCartesian(arrayGiven){  //goal: turn [[[a, 1], red], [[a, 1], green]] into [[a, 1, red], [a, 1, green]]
    var results=[];
   for (var i=0; i < arrayGiven.length; i++)  //per group: [[a, 1], red]
   {
       var thisRow=arrayGiven[i][0].slice(0);  //copy first element: [a, 1]
       //I don't know why it needs to be copied. seems like arrayGiven[i][0].push(arrayGiven[i][1]); should've worked
       thisRow.push(arrayGiven[i][1]);  //add second element: red
       results.push(thisRow);  //group done
   }
    return results;
}*/  //see exmaple in function doc
