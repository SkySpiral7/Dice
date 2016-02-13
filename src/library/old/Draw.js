var Draw={};
Draw.WarhammerBellCurve = function(diceCount, toHitValue, toWoundValue, toSaveValue, extraSave, secondColumn){
    if(secondColumn==undefined) secondColumn='>=';
    if(extraSave==undefined) extraSave=7;  //impossible
    var out = '<br />\n<b>Warhammer Bell Curve:</b> Dice Count: '+diceCount+'. To Hit Value: '+toHitValue+'. To Wound Value: '+toWoundValue+'. Save Value: '+toSaveValue;
    if(extraSave < 7) out+='. Extra Save: '+extraSave;
    out+='<br />';

    var rollData=[];
    for(var i=0; i < diceCount; i++) rollData.push(0);  //needs to start as this for it to combine correctly
    rollData.push(1);  //[diceCount]
    //the start data represents that the dice being equal to diceCount is 100% and all other values are 0%
    if(toHitValue > 1) rollData=WarhammerCombine(rollData, toHitValue);
    if(toWoundValue > 1) rollData=WarhammerCombine(rollData, toWoundValue);
    if(toSaveValue < 7) rollData=WarhammerCombine(rollData, 8-(toSaveValue));  //weird but true
    if(extraSave < 7) rollData=WarhammerCombine(rollData, 8-(extraSave));

    out += Draw.generateBinomialTable(rollData, secondColumn);  //must be sent 1D
    document.getElementById('graphResults').innerHTML += out;

   function WarhammerCombine(originalCurve, targetNumber){
       var results=[originalCurve[0]];  //set [0]. 0 can't be sent to Warhammer. the number is as is
      for (var diceIndex=1; diceIndex < originalCurve.length; diceIndex++)
      {
          if(originalCurve[diceIndex]==0) continue;  //ignore the impossible values
          var rollData=Warhammer(diceIndex, targetNumber);
         for (var i=0; i < rollData.length; i++)
         {
             var chanceOfSuccess=rollData[i]*originalCurve[diceIndex];  //mulitply because both must be true
             if(results[i]==undefined) results[i]=chanceOfSuccess;
             else results[i]+=chanceOfSuccess;  //add exclusive events for either to be true
         }
      }
       for(var i=0; i < results.length; i++) if(results[i]==undefined) results[i]=0;  //everything else did not occur. must fix up the number
       return results;
   }
   function Warhammer(diceCount, targetNumber){
       var diceArray = new DicePool(diceCount+'d6').getAllDice();
       var finishedPolys=[];
      for (var diceIndex=0; diceIndex < diceArray.length; diceIndex++)
      {
          var polyNom=everyDieValueWeighted(diceArray[diceIndex]);
          var possibleNumberWins=0;
          for(var i=0; i < polyNom.length; i++)  //count probability for each
             if(polyNom[i][0] >= targetNumber) possibleNumberWins++;
          var binomProb=generate_Binomials(1, (possibleNumberWins/polyNom.length));
          var polyNom=[];
         for (var i=0; i < binomProb.length; i++)
         {
             polyNom.push([i, binomProb[i]]);  //to be in the form of [value, freq]
         }
          finishedPolys.push(polyNom);  //stored as polys so I can multiply them
      }
       finishedPolys=Polynomial.multiplyPolynomials(finishedPolys, new DicePool());  //given an empty pool
       var results=[];  //strip out the results so that it is 1D again
       for(var i=0; i < finishedPolys.length; i++) results[finishedPolys[i][0]]=finishedPolys[i][1];
       for(var i=0; i < results.length; i++) if(results[i]==undefined) results[i]=0;  //everything else did not occur. must fix up the number
       return results;
   }
}
Draw.diceBellCurve = function(poolGiven, secondColumn, binom){
    if(secondColumn==undefined) secondColumn='>=';
    var resultsDiv = document.getElementById('graphResults');
    var out = '<br />\n<b>Roll:</b> ' + poolGiven.getName();
    if(binom!=undefined) out+=' each '+binom;
    out+='<br />';

    if(!(poolGiven instanceof DicePool)) throw new Error('?? must be dice pool');
    if(poolGiven.getAllDice().length==0){resultsDiv.innerHTML += out + 'No Data'; return;}

    var rollData;
    rollData=parseStr(poolGiven, binom);
   if (typeof(rollData) == 'object')  //an array otherwise undefined
   {
       //out+=rollData;
       if(rollData[0][1]==undefined) out += Draw.generateBinomialTable(rollData, secondColumn);  //1D means Binomial
       else out += Draw.generateDiceSumTable(rollData, secondColumn);
   }
    else out+=rollData;  //message for debugging (string)

    resultsDiv.innerHTML += out;

   function parseStr(poolGiven, binom){
       var diceArray=poolGiven.getAllDice();  //TODO: poolGiven is now only used for getStats() and brute

       var doAnyExplode=false;
      for (var i=0; i < diceArray.length; i++)  //check each die
          if(diceArray[i].getStats().doesExplode || diceArray[i].getStats().doesCompoundExplode){doAnyExplode=true; break;}

      if (binom!=undefined)
      {
          if((/^\d+/).test(''+binom)) binom='=='+binom;
          if(binom.startsWith("=") && !binom.startsWith("==")) binom='='+binom;  //must be double equal signs for eval
          if(poolGiven.getStats().outsource.getStats().dropKeepValue!=0) throw new Error('?? binom can\'t have drop count');  //TODO: make error

          var finishedPolys=[];
         for (var diceIndex=0; diceIndex < diceArray.length; diceIndex++)
         {
             var polyNom=everyDieValueWeighted(diceArray[diceIndex]);
             var possibleNumberWins=0;
            for(var i=0; i < polyNom.length; i++)  //count probability for each
                if(eval(''+polyNom[i][0]+binom)) possibleNumberWins++;
             var binomProb=generate_Binomials(1, (possibleNumberWins/polyNom.length));
             var polyNom=[];
            for (var i=0; i < binomProb.length; i++)
            {
                polyNom.push([i, binomProb[i]]);  //to be in the form of [value, freq]
            }
             finishedPolys.push(polyNom);
         }
          finishedPolys=Polynomial.multiplyPolynomials(finishedPolys, poolGiven);
          var results=[];  //strip out the results so that it is 1D again
          for(var i=0; i < finishedPolys.length; i++) results[finishedPolys[i][0]]=finishedPolys[i][1];
          return results;
      }

       if(poolGiven.getStats().outsource.getStats().dropKeepValue!=0) return bruteForce(poolGiven, doAnyExplode);  //can't be done in any other way

      if (!doAnyExplode)
      {
          var finishedPolys=[];
          for(var i=0; i < diceArray.length; i++){finishedPolys.push(Polynomial.createDiePolynomial(diceArray[i], 0));}  //0 indicates no explosions yet
          var rollData=Polynomial.multiplyPolynomials(finishedPolys, poolGiven);
          //does not have any kind of explode
          return rollData.sort(sumAscending);  //sort by sum ascending
      }

   /*   for (var i=0; i < diceArray.length; i++)  //check each die
          if(diceArray[i].getStats().rerollCriteria!=undefined && diceArray[i].getStats().doesExplode) return bruteForce(poolGiven, false);  //can't be done in any other way
       //this is for regular explodes and penetrating but not compound
   */
       var rollData=[[0, 1]];  //for first pass then this is overwritten
      for (var explodeCount=1; Number(rollData[rollData.length-1][1].toFixed(4))!=0 && explodeCount < 20000; explodeCount++)  //explode loop
      {
          var finishedPolys=[];
         for (var i=0; i < diceArray.length; i++)
         {
             finishedPolys.push(Polynomial.createDiePolynomial(diceArray[i], explodeCount));  //explosions with explosion count
         }
          rollData=Polynomial.multiplyPolynomials(finishedPolys, poolGiven);
      }
       return rollData.sort(sumAscending);  //sort by sum ascending
   }
   function bruteForce(myPool, doAnyExplode){
       var results=[[0, 1]];  //for first pass then this is overwritten
       var explodeCount=0;
       var explodeMax=explodeCount+5;
       if(!doAnyExplode){explodeCount=0; explodeMax=1;}
      for (; Number(results[results.length-1][1].toFixed(4))!=0 && explodeCount < explodeMax; explodeCount++)  //explode loop
      {  //start with 3 explosions to save time since it will often need at least that much
          var diceArray=myPool.getAllDice();
          var rollData=Polynomial.createDiePolynomial(diceArray[0], explodeCount);

          if(diceArray.length > 1) rollData=cartesianProduct(rollData, Polynomial.createDiePolynomial(diceArray[1], explodeCount));
         else  //pad with [] so that they are sums
         {
             results=[];
             for(var i=0; i < rollData.length; i++)
                results.push([rollData[i]]);
             rollData=results;
         }
         for (var i=2; i < diceArray.length; i++)
         {
             rollData=nextCartesianProduct(rollData, Polynomial.createDiePolynomial(diceArray[i], explodeCount));
         }

          if(doAnyExplode && explodeCount > 0) rollData=explodeSplit(rollData, diceArray);  //splits non-compound explosions into the correct dice

          var outterStats=myPool.getStats().outsource.getStats();
         if ((outterStats.dropKeepSwitch=="Drop" && outterStats.lowHighSwitch=="Low") || (outterStats.dropKeepSwitch=="Keep" && outterStats.lowHighSwitch=="High"))
         {
            for(var i=0; i < rollData.length; i++)
                rollData[i]=rollData[i].sort(sumAscending);  //sort by sum ascending
         }
         else
         {
            for(var i=0; i < rollData.length; i++)
                rollData[i]=rollData[i].sort(sumAscending).reverse();  //sort by sum descending
         }
         for (var i=0; i < rollData.length; i++)
         {
             var effectiveDropCount=outterStats.dropKeepValue;
             if(outterStats.dropKeepSwitch=='Keep') effectiveDropCount=rollData[i].length-effectiveDropCount;  //number of dice - dropKeepValue
            for(var dropCount=effectiveDropCount; dropCount > 0; dropCount--)
                rollData[i].shift();  //remove first element until you drop the right number of them
         }

          //got these: drop/keep, reroll (handled by Polynomial.createDiePolynomial), min/max, compound, regular, and pen explosions

          results=[];
         for (var i=0; i < rollData.length; i++)
         {
             var sum=0, chance=1;
            for (var j=0; j < rollData[i].length; j++)
                {sum+=rollData[i][j][0]; chance*=rollData[i][j][1];}
             Polynomial.addPolynomials(results, myPool.getStats().outsource.minMaxDoing(sum), chance);
         }
          results=results.sort(sumAscending);  //sort by sum ascending
          //var tempScope=Number(results[results.length-1][1].toFixed(4));
      }
       return results;
   }
}
Draw.compareDiceBellCurve = function(firstPoolGiven, secondPoolGiven){  //TODO: add a header, doc, also consider comparing >= col instead of exact
    var resultsDiv = document.getElementById('graphResults');
    var out = '<br />Right minus left<br />\n<b>Roll:</b> ' + firstPoolGiven.getName() + ' vs ' + secondPoolGiven.getName();
    out+='<br />';

    if(!(firstPoolGiven instanceof DicePool)) throw new Error('?? must be dice pool');
    if(!(secondPoolGiven instanceof DicePool)) throw new Error('?? must be dice pool');
    if(firstPoolGiven.getAllDice().length==0 || secondPoolGiven.getAllDice().length==0){resultsDiv.innerHTML += out + 'Not enough Data'; return;}

    var rollData1, rollData2;
    rollData1=parseStr(firstPoolGiven);
    rollData2=parseStr(secondPoolGiven);
   if (typeof(rollData1) == 'object' && typeof(rollData2) == 'object')  //an array otherwise undefined
   {
       out += Draw.generateDiceCompareTable(firstPoolGiven.getName(), secondPoolGiven.getName(), rollData1, rollData2);
       //not appended but replaced. out is only appending for the debug strings
       //out+=JSON.stringify(rollData1) + '<br/>\n' + JSON.stringify(rollData2);
   }
    else out+=rollData1 + rollData2;  //message for debugging (string)

    resultsDiv.innerHTML += out;

   function parseStr(poolGiven){
       var diceArray=poolGiven.getAllDice();  //TODO: poolGiven is now only used for getStats() and brute

       var doAnyExplode=false;
      for (var i=0; i < diceArray.length; i++)  //check each die
          if(diceArray[i].getStats().doesExplode || diceArray[i].getStats().doesCompoundExplode){doAnyExplode=true; break;}

       if(poolGiven.getStats().outsource.getStats().dropKeepValue!=0) return bruteForce(poolGiven, doAnyExplode);  //can't be done in any other way

      if (!doAnyExplode)
      {
          var finishedPolys=[];
          for(var i=0; i < diceArray.length; i++){finishedPolys.push(Polynomial.createDiePolynomial(diceArray[i], 0));}  //0 indicates no explosions yet
          var rollData=Polynomial.multiplyPolynomials(finishedPolys, poolGiven);
          //does not have any kind of explode
          return rollData.sort(sumAscending);  //sort by sum ascending
      }

   /*   for (var i=0; i < diceArray.length; i++)  //check each die
          if(diceArray[i].getStats().rerollCriteria!=undefined && diceArray[i].getStats().doesExplode) return bruteForce(poolGiven, false);  //can't be done in any other way
       //this is for regular explodes and penetrating but not compound
   */
       var rollData=[[0, 1]];  //for first pass then this is overwritten
      for (var explodeCount=1; Number(rollData[rollData.length-1][1].toFixed(4))!=0 && explodeCount < 20000; explodeCount++)  //explode loop
      {
          var finishedPolys=[];
         for (var i=0; i < diceArray.length; i++)
         {
             finishedPolys.push(Polynomial.createDiePolynomial(diceArray[i], explodeCount));  //explosions with explosion count
         }
          rollData=Polynomial.multiplyPolynomials(finishedPolys, poolGiven);
      }
       return rollData.sort(sumAscending);  //sort by sum ascending
   }
   function bruteForce(myPool, doAnyExplode){
       var results=[[0, 1]];  //for first pass then this is overwritten
       var explodeCount=0;
       var explodeMax=explodeCount+5;
       if(!doAnyExplode){explodeCount=0; explodeMax=1;}
      for (; Number(results[results.length-1][1].toFixed(4))!=0 && explodeCount < explodeMax; explodeCount++)  //explode loop
      {  //start with 3 explosions to save time since it will often need at least that much
          var diceArray=myPool.getAllDice();
          var rollData=Polynomial.createDiePolynomial(diceArray[0], explodeCount);

          if(diceArray.length > 1) rollData=cartesianProduct(rollData, Polynomial.createDiePolynomial(diceArray[1], explodeCount));
         else  //pad with [] so that they are sums
         {
             results=[];
             for(var i=0; i < rollData.length; i++)
                results.push([rollData[i]]);
             rollData=results;
         }
         for (var i=2; i < diceArray.length; i++)
         {
             rollData=nextCartesianProduct(rollData, Polynomial.createDiePolynomial(diceArray[i], explodeCount));
         }

          if(doAnyExplode && explodeCount > 0) rollData=explodeSplit(rollData, diceArray);  //splits non-compound explosions into the correct dice

          var outterStats=myPool.getStats().outsource.getStats();
         if ((outterStats.dropKeepSwitch=="Drop" && outterStats.lowHighSwitch=="Low") || (outterStats.dropKeepSwitch=="Keep" && outterStats.lowHighSwitch=="High"))
         {
            for(var i=0; i < rollData.length; i++)
                rollData[i]=rollData[i].sort(sumAscending);  //sort by sum ascending
         }
         else
         {
            for(var i=0; i < rollData.length; i++)
                rollData[i]=rollData[i].sort(sumAscending).reverse();  //sort by sum descending
         }
         for (var i=0; i < rollData.length; i++)
         {
             var effectiveDropCount=outterStats.dropKeepValue;
             if(outterStats.dropKeepSwitch=='Keep') effectiveDropCount=rollData[i].length-effectiveDropCount;  //number of dice - dropKeepValue
            for(var dropCount=effectiveDropCount; dropCount > 0; dropCount--)
                rollData[i].shift();  //remove first element until you drop the right number of them
         }

          //got these: drop/keep, reroll (handled by Polynomial.createDiePolynomial), min/max, compound, regular, and pen explosions

          results=[];
         for (var i=0; i < rollData.length; i++)
         {
             var sum=0, chance=1;
            for (var j=0; j < rollData[i].length; j++)
                {sum+=rollData[i][j][0]; chance*=rollData[i][j][1];}
             Polynomial.addPolynomials(results, myPool.getStats().outsource.minMaxDoing(sum), chance);
         }
          results=results.sort(sumAscending);  //sort by sum ascending
          //var tempScope=Number(results[results.length-1][1].toFixed(4));
      }
       return results;
   }
}
Draw.binomialBellCurve = function(trials, probability, secondColumn) {
    if(secondColumn==undefined) secondColumn='>=';
    var out = '<br />\n<b>Trials:</b> ' + trials + ' <b>Probability:</b>' + probability + '<br />';

    rollData=generate_Binomials(trials, probability);
    //out+=rollData;
    out += Draw.generateBinomialTable(rollData, secondColumn);
    document.getElementById('graphResults').innerHTML += out;
}
Draw.generateBinomialTable = function(rollData, secondColumn){
    if(rollData.length == 0) return '';
    var results=[];  //pad the results to 2D so I can use Draw.generateDiceSumTable
    for(var i=0; i < rollData.length; i++) results.push([i, rollData[i]]);

    var output=Draw.generateDiceSumTable(results, secondColumn);
    return output.replace('<th>Roll</th>', '<th>Successes</th>');
}
Draw.generateDiceCompareTable = function(name1, name2, rollData1, rollData2){
    if(rollData1.length == 0 || rollData2.length == 0) return '';
    var out = '';
    var abMax = -1;  //so that the first time is always true
    var diffData=[];

    //can't simply measure if freq since also need to convert weighted
    rollData1=toProb(rollData1);
    rollData2=toProb(rollData2);

   for (var i=0, j=0; i < rollData1.length || j < rollData2.length;) {
      if (i >= rollData1.length)
      {
          diffData.push([rollData2[j][0], (rollData2[j][1])]);
          j++;
          continue;
      }
      if (j >= rollData2.length)
      {
          diffData.push([rollData1[i][0], (-rollData1[i][1])]);
          i++;
          continue;
      }
       if(rollData1[i][1]==0){i++; continue;}  //skip those not possible to roll
       if(rollData2[j][1]==0){j++; continue;}

      if (rollData1[i][0]==rollData2[j][0])
      {
          diffData.push([rollData1[i][0], (rollData2[j][1]-rollData1[i][1])]);
          i++; j++;
      }
      else if(rollData1[i][0] < rollData2[j][0])
      {
          diffData.push([rollData1[i][0], (-rollData1[i][1])]);
          i++;
      }
      else //if(rollData1[i][0] > rollData2[j][0])
      {
          diffData.push([rollData2[j][0], (rollData2[j][1])]);
          j++;
      }
       if(abMax < Math.abs(diffData[diffData.length-1][1])) abMax=Math.abs(diffData[diffData.length-1][1]);
   }

    out = '<table border="1" cellpadding="0" cellspacing="2" width="100%">';
    out += "\n";
    out += '<tr><th>Roll</th>';
    out += '<th>Diff</th>';
    out += '<th align="center" width="49%">'+name1+'</th>';
    out += '<th align="center" width="49%">'+name2+'</th></tr>';
    out += "\n";

   for (var i=0; i < diffData.length; i++) {
       out += '<tr><td align="center">' + diffData[i][0];  //roll
       out += '</td><td align="right">';
       out += (100 * diffData[i][1]).toFixed(3);  //non-freq is weighted but might not be the probability
       out += '%</td>';
       if(diffData[i][1]!==0) out += '<td valign="center" align="right">';  //for both positive and negative

       if(diffData[i][1]===0) out += '<td colspan="2" align="center">Same';
      else if (diffData[i][1] > 0)
      {
          out += '</td><td valign="center">';
          out += '<div style="background-color: blue; width:' + Math.abs(100 * diffData[i][1] / abMax).toFixed(3)+'%; height: 0.8em">&nbsp;</div>';
      }
      else
      {
          out += '<div style="background-color: red; width:' + Math.abs(100 * diffData[i][1] / abMax).toFixed(3)+'%; height: 0.8em">&nbsp;</div>';
          out += '</td><td valign="center">';
      }
       out += '</td></tr>';
       out += "\n";
   }
    out += '</table>';
    return out;
   function toProb(rollData){
       var total=0;
       for(var i=0; i < rollData.length; i++) total+=rollData[i][1];
       if(total==1) return rollData;  //already prob
       for(var i=0; i < rollData.length; i++) rollData[i][1]/=total;
       return rollData;
   }
}
Draw.generateDiceSumTable = function(rollData, secondColumn){
    if(rollData.length==0) return;  //nothing to draw
    if(secondColumn=='=') secondColumn='==';  //heh symmetry. adds an '=' so that eval can read it
    var min, max, count=0, sum=0;
   for (var i=0; i < rollData.length; i++)
   {
       if(rollData[i][1]==0) continue;  //freq is 0 means it can't be done (shouldn't exist)
       if(min==undefined || rollData[i][0] < min) min = rollData[i][0];
       if(max==undefined || max < rollData[i][0]) max = rollData[i][0];
       count += rollData[i][1];
       sum += (rollData[i][0] * rollData[i][1]);  //must be weighted since the ones that occur more often are more likely
   }
    var deviationSquareSum = 0;
    var avg = sum / count;
   for (var i=0; i < rollData.length; i++)
   {
       //if(rollData[i][1]==0) continue;
       var dev = rollData[i][0] - avg;
       dev *= dev;  //squared
       deviationSquareSum += (dev * rollData[i][1]);  //weighted
   }
    var standardDeviation = Math.sqrt(deviationSquareSum / count);

    var out = '<b>Statistics</b>';
    out += '<br>Min: ' + min;
    out += '<br>Max: ' + max;
    out += '<br>Avg: ' + avg.toFixed(2);
    out += '<br>Std Dev: ' + standardDeviation.toFixed(3);

    return out+genTable(rollData, secondColumn);
   function genTable(rollData, secondColumn){
       if(rollData.length == 0) return '';
       //TODO: wait what about machine epsilon? Why can't I just say >= 1?
       var usesFreq=(Number(rollData[0][1].toFixed(6)) >= 1);  //toFixed etc prevents machine epsilon
       var max = 0;
       var totalFreq = 0;
       var out = '';
       var secondValues=[];

      for (var i=0; i < rollData.length; i++) {
          if(rollData[i][1]==0){secondValues.push(0); continue;}
          if(max < rollData[i][1]) max = rollData[i][1];
          totalFreq += rollData[i][1];
          var secondSum=0;
         for (var j=0; j < rollData.length; j++) {
             if(eval(''+rollData[j][0]+secondColumn+rollData[i][0])) secondSum+=rollData[j][1];
         }
          //TODO: why if(!usesFreq)?
          if(!usesFreq && secondSum > 1) secondSum=1;  //rounding error: can't have more than 100%
          secondValues.push(secondSum);
      }

       out = '<table border="1" cellpadding="0" cellspacing="2" width="100%">';
       out += "\n";
       out += '<tr><th>Roll</th>';
       if(usesFreq) out += '<th>Freq</th>';
       out += '<th>Chance</th><th>'+secondColumn.replace('>', '&gt;').replace('<', '&lt;')+'</th><th align="center">Bar</th></tr>';
       out += "\n";

      for (var i=0; i < rollData.length; i++) {
          if(rollData[i][1]==0) continue;  //roll isn't possible
          out += '<tr><td align="center" width="1%">' + rollData[i][0];  //roll
          if(usesFreq && rollData[i][1] > 1e7) out += '</td><td align="center" width="1%">' + rollData[i][1].toPrecision(5);
          else if(usesFreq) out += '</td><td align="center" width="1%">' + Number(rollData[i][1].toPrecision(5));  //TODO: why not always use this one?
          out += '</td><td align="right" width="1%">';
          out += (100 * rollData[i][1] / totalFreq).toFixed(3);  //non-freq is weighted but might not be the probability
          out += '%</td><td align="right" width="1%">';
          out += (100 * secondValues[i] / totalFreq).toFixed(3);
          out += '%</td><td valign="center">';
          out += '<div style="background-color: ';
          if(rollData[i][1] == max) out += 'green';  //not rounded
          else out += 'blue';
          out += '; width:' + (100 * rollData[i][1] / max).toFixed(3)+'%; height: 0.8em">&nbsp;</div>';
          out += '</td></tr>';
          out += "\n";
      }
       out += '</table>';
       return out;
   }
}
