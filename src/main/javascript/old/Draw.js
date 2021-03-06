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
       var diceArray=poolGiven.getAllDice();  //TODO poolGiven is now only used for getStats() and brute

       var doAnyExplode=false;
      for (var i=0; i < diceArray.length; i++)  //check each die
          if(diceArray[i].getStats().doesExplode || diceArray[i].getStats().doesCompoundExplode){doAnyExplode=true; break;}

      if (binom!=undefined)
      {
          if((/^\d+/).test(''+binom)) binom='=='+binom;
          if(binom.startsWith("=") && !binom.startsWith("==")) binom='='+binom;  //must be double equal signs for eval
          if(poolGiven.getStats().outsource.getStats().dropKeepValue!=0) throw new Error('?? binom can\'t have drop count');  //TODO make error

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
}
Draw.compareDiceBellCurve = function(firstPoolGiven, secondPoolGiven){  //TODO add a header, doc, also consider comparing >= col instead of exact
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
//key: rollData[i][0] is result and rollData[i][1] is frequency or prob
//rollData[0][0] is the lowest result
