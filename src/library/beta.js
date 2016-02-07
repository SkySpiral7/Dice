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
function Die(diceStringGiven, nameArray){
   //private:
    var isDieNegative=false;
    var doesUseZero=false;
    var isFudgeDie=false;
    var sideCount=0;
    var doesExplode=false;  //die options
    var doesPenetrate=false;
    var doesCompoundExplode=false;
    //var minMaxSwitch="None";
    //var minMaxValue=0;
    var rerollCriteria;  //==undefined;
    var explodeValue;  //used for stats not anywhere else
    var constantModifier=0;
    var dieName;  //==undefined;
   this.setName = function(nameGiven){dieName=nameGiven;};
   this.getName = function(){
       if(dieName==undefined) return this.generateString();
       return dieName;
   }
   this.generateString = function()
   {
       var dieString='';
       if(isDieNegative) dieString+='-';
       if(doesUseZero) dieString+='z';
       else dieString+='d';
       if(isFudgeDie) dieString+='F';
       else dieString+=sideCount;
       if(doesExplode || doesCompoundExplode) dieString+='!';
       if(doesPenetrate) dieString+='p';
       else if(doesCompoundExplode) dieString+='!';
       if(rerollCriteria!=undefined) dieString+='r'+rerollCriteria;
       if(constantModifier > 0) dieString+='+'+constantModifier;
       else if(!isFudgeDie && constantModifier < 0) dieString+=constantModifier;  //fudge has a -1 but don't show that since it would be wrong
       return dieString;
   };
   this.getStats = function(){
       var returnObject={};
       returnObject.nameArray=nameArray.slice();  //copies array so that it is read only
       returnObject.isDieNegative=isDieNegative;
       returnObject.doesUseZero=doesUseZero;
       returnObject.isFudgeDie=isFudgeDie;
       returnObject.sideCount=sideCount;
       returnObject.doesExplode=doesExplode;
       returnObject.doesPenetrate=doesPenetrate;
       returnObject.doesCompoundExplode=doesCompoundExplode;
       returnObject.rerollCriteria=rerollCriteria;
       returnObject.explodeValue=explodeValue;
       returnObject.constantModifier=constantModifier;
       returnObject.dieName=dieName;
       return returnObject;
   };
   this.equals = function(otherDie){
       if(!(otherDie instanceof Die)) return false;
       if(isDieNegative!=otherDie.isDieNegative) return false;
       if(doesUseZero!=otherDie.doesUseZero) return false;
       if(isFudgeDie!=otherDie.isFudgeDie) return false;
       if(sideCount!=otherDie.sideCount) return false;
       if(doesExplode!=otherDie.doesExplode) return false;
       if(doesPenetrate!=otherDie.doesPenetrate) return false;
       if(doesCompoundExplode!=otherDie.doesCompoundExplode) return false;
       if(rerollCriteria!=otherDie.rerollCriteria) return false;
       if(explodeValue!=otherDie.explodeValue) return false;
       if(constantModifier!=otherDie.constantModifier) return false;
       //if(dieName!=otherDie.dieName) return false;  //do not compare these
       if(nameArray.length!=otherDie.nameArray.length) return false;
       for(var i=0; i < nameArray.length; i++) if(nameArray[i]!=otherDie.nameArray[i]) return false;  //note that it ignores object type
       return true;
   };
   this.hasNames = function(){return (nameArray.length!=0);};
   this.isFudge = function(){return isFudgeDie;};
   this.getMaxValue = function(){  //TODO redoc and note that it assumes the sum
       if(rerollCriteria!=undefined && rerollCriteria.startsWith('>') && doesCompoundExplode) return (Number((/\d+$/).exec(rerollCriteria)[0])+constantModifier);  //reroll caps the Infinity
       if(doesExplode || doesCompoundExplode) return Infinity;  //doesExplode includes doesPenetrate; Infinity is a number
      if (rerollCriteria!=undefined)
      {
          //loop through every possible value (at least 1 is possible to be at this point) and return the highest possible
         for (var rerollCountLoopIndex=sideCount; rerollCountLoopIndex >= this.getMinValue(); rerollCountLoopIndex--)  //backwards so to hit the highest first
         {
             var valueConsidered=rerollCountLoopIndex;
             if(nameArray.length!=0) valueConsidered=nameArray[rerollCountLoopIndex];
             if(!isNaN(valueConsidered)) valueConsidered+=constantModifier;
             if(!eval(''+valueConsidered+rerollCriteria)) return valueConsidered;  //it is not rerolled
         }
          alert("Program error. Unforseen location inside Die.getMaxValue");
      }
       if(nameArray.length > 0 && !isNaN(nameArray[sideCount-1])) return (Number(nameArray[sideCount-1])+constantModifier);
       //TODO if all numbers this might not be the max. sort them on creation to solve this
       if(nameArray.length > 0) return nameArray[sideCount-1];
       if(isFudgeDie) return 1;  //has no constant modifier and doesn't explode
       if(doesUseZero) return (sideCount-1+constantModifier);
       return (sideCount+constantModifier);
   };
   this.getMinValue = function(){  //TODO redoc
       var possibleMinValue;
       if(nameArray.length > 0) possibleMinValue=nameArray[0];
       //else if(isFudgeDie) return -1;  //see doesUseZero constantModifier instead due to reroll
       else if(doesUseZero) possibleMinValue=0;
       else possibleMinValue=1;
       possibleMinValue+=constantModifier;
       if(rerollCriteria==undefined) return possibleMinValue;
       //loop through every possible value (at least 1 is possible to be at this point) and return the lowest possible
       if(nameArray.length > 0) possibleMinValue=0;  //must start at 0 for the loop to work
      while (true)  //a valid value will be found. I know this because it does not infinitely reroll due to validity checked in constructor
      {
          var valueConsidered=possibleMinValue;
          if(nameArray.length!=0) valueConsidered=nameArray[possibleMinValue];
          if(nameArray.length!=0 && !isNaN(valueConsidered)) valueConsidered+=constantModifier;
          if(!eval(''+valueConsidered+rerollCriteria)) return valueConsidered;  //it is not rerolled
          possibleMinValue++;
      }
       //Unreachable
   };
   this.getSides = function(){return sideCount;};
   //currently unreachable anyway:
   /*function minMaxCounting(holder){  //doesn't need to know this
       minMaxSwitch="None";
      if (combineRegex(DicePool.minMaxRegexStart, /\d+/).test(holder))
      {
          if((/max/).test(holder)) minMaxSwitch="Max";  //contains the word max
          else minMaxSwitch="Min";
          holder=holder.replace(DicePool.minMaxRegexStart, "");  //chop off
          minMaxValue=parseInt((/^\d+/).exec(holder)+'');  //to capture the number. it looks pointless to +'' but I don't know another way to change regex object to int
          holder=holder.replace(/^\d+/, "");
      }
       return holder;
   };
   function minMaxDoing(total){  //doesn't need to know this
       if(minMaxSwitch=="None") return total;
       if(minMaxSwitch=="Min" && total < minMaxValue) return minMaxValue;  //did not reach min
       else if(minMaxSwitch=="Max" && total > minMaxValue) return minMaxValue;  //exceeded max
       return total;
   };*/
   this.roll = function(){
       var valueArray=[];
       var isPenetrated=false;
      while (true)  //so I can loop around (for rerolling and exploding) without recursion
      {
          var anotherDie=false;
          var valueRolled=0;
          //var total=0;
          //var replacedTotal=0;
          valueRolled=Math.ceil(Math.random()*sideCount);  //ceil to start at 1
          while(valueRolled%sideCount==0 && doesCompoundExplode){valueRolled+=Math.ceil(Math.random()*sideCount);}
          if(valueRolled==sideCount && doesExplode) anotherDie=true;
          if(isPenetrated) valueRolled--;  //value of 1 less
          if(doesUseZero) valueRolled--;  //but coins start at 0
          //if(isFudgeDie) uses constantModifier below
          if(nameArray.length!=0) valueRolled=nameArray[valueRolled];  //named dice are always coins and never negative
          if(!isNaN(valueRolled)) valueRolled+=constantModifier;
          //replacedTotal=total;
          //total=this.minMaxDoing(total);
          if(rerollCriteria!=undefined && eval(''+valueRolled+rerollCriteria)) continue;  //TODO what does it mean to have "2d6r6!"? impossible but get another die and reroll
          if(isDieNegative) valueRolled*=-1;
          valueArray.push(valueRolled);
          if(doesPenetrate) isPenetrated=true;  //anotherDie will have already been set to true or false
          if(anotherDie) continue;  //exploded. roll again after recording the value
          break;  //no more values
      }
       return valueArray;
   };
   this.flip = this.roll;  //coin alias
   this.spin = this.roll;  //spinner alias
   function constructorCalled(objectGiven){
       if(nameArray.length!=0){if(!namedConstructor()); return '';}  //TODO if a named die is entirely numbers it is allowed everything

       return holder;
   };
   function namedConstructor(){  //doesn't need to know this
       //none of these errors should be possible
       if(isFudgeDie) throw new Error(diceStringGiven+"\nfudge dice can't have named sides");
       if(isDieNegative) throw new Error(diceStringGiven+"\nnamed dice can't be negative");
       doesUseZero=true;  //always a coin
       sideCount=nameArray.length;  //just ignore the number of sides passed and use the number of names given
       if(doesExplode || doesCompoundExplode) throw new Error(diceStringGiven+"\nnamed dice can't explode (compound or otherwise).");
       //if(minMaxValue!=0 || minMaxSwitch!="None") throw new Error(diceStringGiven+"\na named dice can't have a min or max");
       return false;  //all numbers
   };
   //constructor:
    if(diceStringGiven==undefined) diceStringGiven="1d6";  //default
    nameArray=argumentsToArray(arguments);
    //TODO: doc: let me count the ways: Die(), Die("1d6"), Die("heads", "tails"), Die("yes", "no", "maybe"), Die(["yes", "no", "maybe"])
    if(nameArray==undefined || nameArray.length==1) nameArray=[];  //make empty array (not provided or diceStringGiven only)
    else if(nameArray.length==2 && nameArray[0]==undefined) nameArray=[];
    else if(nameArray.length==2 && (nameArray[1] instanceof Array) && nameArray[1].length==0) nameArray=[];  //name passed was an empty array (DicePool does this)
    if(nameArray.length==0 && typeof(diceStringGiven)!="string") throw new Error("Die("+diceStringGiven+", ~) the first parameter must be a string type");
    return constructorCalled(this);
    //if this is a named die then diceStringGiven will be ignored (since it is actually the first name or something else)
};
