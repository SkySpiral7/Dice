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
