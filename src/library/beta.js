function groupParser(groupString){  //TODO tons of testing. and make a loud option returned as the 2nd element
   //TODO have a before and after string but keep the rest as is (objects)
   //<a>You can sepperate multiple kinds of grand totals with ; or , each of which will be displayed in the same result box.</a><br />
   //<a>Note: Due to the use of parentheses there is no reason to affect the combination of each number sepperated by ; or , (which isn't totalled togther anyway).</a><br />
    if(!groupString.contains("{") || !groupString.contains("}")) return silentRollDice(groupString);
   while (groupString.contains("{"))
   {
       var parseArray=findFirstCompleteCurlyBrackets(groupString);
       if(parseArray == null) throw new Error('{} wasn\'t paired');  //TODO: wrong bracket order
       var sendArray=parseInner(parseArray[1]);  //array of sums
       var outsource=new numberGroup(parseArray[2]);  //modifiers end at [,+{}]
       outsource.dropDoing(sendArray);  //sendArray is changed
       groupString=parseArray[0]+"["+outsource.minMaxDoing(sendArray.summation())+"]"+numberGroup(parseArray[2]);
       //TODO: I want {1d20, 1d6, 1d4}dl1 to return an array.length==2 but then what? do I allow ({1d20, 1d6, 1d4}dl1).summation()?
   }
    return eval(groupString);  //so that it will be an array (or number) instead of string
   function parseInner(stringGiven){  //TODO have something like this for dicepool so it can have named dice in the constructor (typeof will say if such an object exists)
       var result=[];
      while (stringGiven.length>0)
      {
         if (stringGiven.charAt(0)=='[')
         {
             var arrayReturnValue=getArray(stringGiven);
             if(arrayReturnValue[1]==undefined) throw new Error('[] wasn\'t paired');  //TODO
             result.push(arrayReturnValue[1].summation());
             stringGiven=arrayReturnValue[0];
         }
         else
         {
             var firstPart=(/^.+?,/).exec(stringGiven)[0];  //convert to string
             if(firstPart=="null") firstPart=stringGiven;
             else firstPart=firstPart.substring(0, firstPart.length-1);
             result.push(silentRollDice(firstPart));
             stringGiven=stringGiven.substring(firstPart.length);
         }
          if(stringGiven.charAt(0)==',') stringGiven=stringGiven.substring(1);
          stringGiven=stringGiven.trim();
      }
       return result;
      function getArray(arrayStringGiven){
          if(arrayStringGiven.charAt(0)!='[') return [arrayStringGiven];  //[1] is undefined
          var bracketCount=1;
          var builtArray='[';
         for (var i=1; bracketCount>0 && i < arrayStringGiven.length; i++)
         {
             if(arrayStringGiven.charAt(i)=='[') bracketCount++;
             else if(arrayStringGiven.charAt(i)==']') bracketCount--;
             builtArray+=arrayStringGiven.charAt(i);
         }
          if(bracketCount>0) return [arrayStringGiven];  //[1] is undefined
          return [arrayStringGiven.substring(builtArray.length), eval(builtArray)];  //if(arrayStringGiven.length==builtArray.length) then [0] is the empty string
      };  //from string array get that array and return it and the remaining string
   }
}
function findFirstCompleteCurlyBrackets(totalString){
    if(!totalString.contains("{") || !totalString.contains("}")) return null;  //contains no groups
    if(!(/[{].*?[}]/).test(totalString)) return null;  //are not grouped correctly
    var innerText=(/^.*?[}]/).exec(totalString)[0];  //catch all up to the first close brace (including the brace itself)
    var afterText=totalString.substring(innerText.length);  //everything after
    innerText=innerText.substring(0, innerText.length-1);  //remove '}'
    var beforeText=innerText;  //copy for now
    innerText=(/[{].*?$/).exec(innerText)[0];  //catch all after the first open brace (including the brace itself)
    beforeText=beforeText.substring(0, (beforeText.length-innerText.length));  //from 0 to beforeText if it didn't have innerText. in order to remove it
    innerText=innerText.substring(1);  //remove '{'
    return [beforeText, innerText, afterText];  //innermost does not have {} which are gone
}

//http://stats.stackexchange.com/questions/130025/formula-for-dropping-dice-non-brute-force
/**
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
/**/

function probabilityThat_YofNisA(a, diceArray){
    var n = diceArray.length;
    var finishedPolys=[];
    for(var i=0; i < diceArray.length; i++){finishedPolys.push(Polynomial.createDiePolynomial(diceArray[i], 0));}  //0 indicates no explosions yet
    var rollData=Polynomial.multiplyPolynomials(finishedPolys);

    var totalFreq=0;
    for(var i=0; i < rollData.length; i++){totalFreq+=rollData[i][1];}
    for(var i=0; i < rollData.length; i++){if(rollData[i][0] === a) return (rollData[i][1] / totalFreq);}
}
