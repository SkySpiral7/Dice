//this file contains things from the previous version of the application for reference
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
   this.flip = this.roll;  //coin alias
   this.spin = this.roll;  //spinner alias
};
Die._optimizeReroll = function()
{
      if (rerollCriteria.startsWith(">"))
      {
          var newSideCount=Number((/\d+$/).exec(rerollCriteria)[0]);  //since can't roll above this it becomes new side maximum
          if(rerollCriteria.startsWith(">=")) newSideCount--;  //can't roll it either means lower the max by 1
          //if(sideCount > newSideCount):  //always true due to if(!canReroll) above
          //isDieNegative=false;  //unchanged
          doesExplode=false;  //doesn't explode due to explodeValue being impossible to roll (ditto for compound)
          doesPenetrate=false;
          if(sideCount > newSideCount) doesCompoundExplode=false;  //TODO: confirm this
          explodeValue=undefined;
          //doesUseZero=false;  //unchanged
          newSideCount-=constantModifier;  //thus shows what would need to be rolled before constantModifier for the highest possible
          sideCount=newSideCount;
          //constantModifier+=Number((/\d+$/).exec(rerollCriteria)[0]);  //unchanged except by doesUseZero optimized later
          rerollCriteria=undefined;  //no longer possible to reroll
      }
       //doesCompoundExplode is handled differently since the extra dies rolled need to be unchanged
      else if (rerollCriteria.startsWith("<") && doesCompoundExplode)  //else if < reduce the sideCount, increase constantModifier and remove the reroll
      {
          if(rerollNumber==undefined) var rerollNumber=Number((/\d+$/).exec(rerollCriteria)[0]);  //should already exist
          //if(!rerollCriteria.startsWith("<=")) rerollNumber--;  //exclude a side
          rerollNumber-=constantModifier;
          constantModifier+=Math.floor(rerollNumber/sideCount)*sideCount;
          //if() might remove reroll TODO
      }
      else if (rerollCriteria.startsWith("<"))  // && !doesCompoundExplode  //else if < reduce the sideCount, increase constantModifier and remove the reroll
      {
          var rerollCount=Number((/\d+$/).exec(rerollCriteria)[0]);
          if(!rerollCriteria.startsWith("<=")) rerollCount--;  //exclude a side
          sideCount-=rerollCount;  //TODO: I think this causes a conflict with explosions (explodeValue)
          constantModifier+=rerollCount;
          rerollCriteria=undefined;
      }
       else if(doesCompoundExplode){}  //do nothing. compound can't be optimized in any other way
      else if (!doesUseZero)  //rerollCriteria.startsWith("==")
      {
          if(rerollCriteria == "==1"){sideCount--; constantModifier++; rerollCriteria=undefined;}  //bump up so that the random range is smaller
          else if(rerollCriteria == ('=='+sideCount)){sideCount--; rerollCriteria=undefined;}  //can't roll max. explodeValue has already been removed
      }
      else  //rerollCriteria.startsWith("==")
      {
          if(rerollCriteria == "==0"){sideCount--; doesUseZero=false; rerollCriteria=undefined;}  //doesUseZero that can't roll 0
          //cleared doesUseZero instead of constantModifier++ then checking if(doesUseZero && constantModifier > 0) since they'd end up the same
          else if(rerollCriteria == ('=='+(sideCount-1))){sideCount--; rerollCriteria=undefined;}  //can't roll max. explodeValue has already been removed
      }
      //else can stay the same since any other == would need to be replaced with named all numbers. and be impossible for explosions
}
//TODO: optimize: 1d6+1d6 === 2d6
//TODO: re: keep isDieNegative in DicePool
function DicePool(diceStringGiven, nameArray){
   //private:
    var diceArray=[];
    /*var dropKeepSwitch="Up";
    var dropCount=0;
    var minMaxSwitch="None";
    var minMaxValue=0;
    var sortDirection="None";*/
    var constantModifier=0;  //only used in rolling  //TODO doc
    var allFudge=false;
    var outsource=new numberGroup();  //constructorCalled will overwrite it otherwise it must be initialized blank like this
    var rolledValues={};  //contains everyRoll and droppedRolls from the previous roll. otherwise the object is empty
    var poolName;
   this.setName = function(nameGiven){poolName=nameGiven;};
   this.getName = function(){
       if(poolName==undefined) return this.generateString();
       return poolName;
   }
   this.generateString = function()
   {
       var poolString='';
       if(constantModifier!=0) poolString+=constantModifier;
      for (var i=0; i < diceArray.length;)
      {
          if(!diceArray[i].getStats().isDieNegative) poolString+='+';
          var dieName=diceArray[i].getName();
          var count=1; i++;
          if(!(diceArray[i] instanceof ScatterDie)) for(; i < diceArray.length && dieName==diceArray[i].getName(); i++) count++;
          if(diceArray[i-1] instanceof ScatterDie) poolString+=dieName;
          else if(dieName.startsWith('-')) poolString+='-'+count+dieName.substring(1);
          else poolString+=count+dieName;
      }
       if(poolString.startsWith('+')) poolString=poolString.substring(1);  //remove leading +
       var outterStats=outsource.getStats();
       if(outterStats.sortDirection=='d') poolString+='sd';
       else if(outterStats.sortDirection!='None') poolString+='sa';
       if(outterStats.dropKeepValue!=0) poolString+=' '+outterStats.dropKeepSwitch+' the '+outterStats.lowHighSwitch+'est '+outterStats.dropKeepValue;
       if(outterStats.minMaxSwitch!='None') poolString+=' '+outterStats.minMaxSwitch+' of '+outterStats.minMaxValue;
       return poolString;
   };
   this.getStats = function(){
       var returnObject={};
       //returnObject.nameArray=nameArray.slice();  //always blank
       returnObject.diceArray=diceArray.slice();  //copies array so that it is read only
       returnObject.constantModifier=constantModifier;
       returnObject.allFudge=allFudge;
       returnObject.outsource=outsource;
       var fakeRolledValues={};
      if (rolledValues.everyRoll!=undefined)
      {
          fakeRolledValues.everyRoll=rolledValues.everyRoll.slice();  //copy each array if exists (either both exist or neither)
          fakeRolledValues.droppedRolls=rolledValues.droppedRolls.slice();  //into the copy object. droppedRolls may be empty
      }
       returnObject.rolledValues=fakeRolledValues;  //could be an empty object
       returnObject.poolName=poolName;
       return returnObject;
   };
   this.getAllDice = function(){return diceArray.slice();};  //copies array so that it is read only
    //TODO add a function that adds to the outsource criteria
   this.add = function(newDiceStringPassed, nameArrayGiven){
       rolledValues={};  //clear out results since they are no longer valid
       //copied from constructor:
       if(newDiceStringPassed==undefined) newDiceStringPassed="1d6";  //default
       nameArrayGiven=argumentsToArray(arguments, 1);
       if(nameArrayGiven==undefined) nameArrayGiven=[];  //make empty array (not provided or newDiceStringPassed only)
       if(nameArrayGiven.length!=0 && typeof(newDiceStringPassed)!="number") throw new Error("DicePool.add("+newDiceStringPassed+", ~) the first parameter of a named die must be a number type which is the number of dice");
       if(nameArrayGiven.length!=0) newDiceStringPassed+="d6";  //needs to be a string for parsing
       if(typeof(newDiceStringPassed)!="string") throw new Error("DicePool.add("+newDiceStringPassed+", ~) the first parameter must be a string type");
       newDiceStringPassed=newDiceStringPassed.trim();  //last line from constructor (not really this one but yeah)
       var theseDiceAreNegative=false;
       if((/^-/).test(newDiceStringPassed)){theseDiceAreNegative=true; newDiceStringPassed=newDiceStringPassed.substring(1);}
       if((/^\D/).test(newDiceStringPassed)) newDiceStringPassed="1"+newDiceStringPassed;  //diceCount needs the leading 1
       var diceCount=(/^\d+/).exec(newDiceStringPassed)[0];  //is a string
       newDiceStringPassed=newDiceStringPassed.substring(diceCount.length);  //chop off the match from the total string
       diceCount=parseInt(diceCount);  //convert string to int
       if(theseDiceAreNegative) newDiceStringPassed="-"+newDiceStringPassed;  //add negative back
       if(diceArray.length==0) allFudge=true;  //so that && allFudge will work below
      for (var i=0; i < diceCount; i++)
      {
          if(nameArrayGiven.length!=0) diceArray.push(new Die(nameArrayGiven));  //can't pass newDiceStringPassed because that would become the first name
          else diceArray.push(new Die(newDiceStringPassed+''));  //convert to string to prevent a crash (will throw a different error)
          allFudge=(diceArray[diceArray.length-1].isFudge() && allFudge);
      }
       //does not have to have a leading 1 but that's optional anyway. Die will determine whether newDiceStringPassed is valid
   };
   this.addDie = function(newDieObject){
       rolledValues={};  //clear out results since they are no longer valid
       if(!(newDieObject instanceof Die) && !(newDieObject instanceof ScatterDie)) throw new Error("DicePool.addDie("+newDieObject+") the parameter must be a Die object (or ScatterDie).");
       if(diceArray.length==0) allFudge=true;  //so that && allFudge will work below
       diceArray.push(newDieObject);
       allFudge=(newDieObject.isFudge() && allFudge);
   };
   this.addAllDice = function(newDice){
       if(!(newDice instanceof Array) && !(newDice instanceof DicePool)) throw new Error("DicePool.addAllDice("+newDice+") the parameter must be an array or a DicePool object.");
       var diceArray=newDice;
       if(newDice instanceof DicePool) diceArray=newDice.getAllDice();
       for(var i=0; i < diceArray.length; i++) this.addDie(diceArray[i]);  //addDie will check each array element
   };
   this.getSize = function(){return diceArray.length;};
   function getSign(number){  //for me for output
       if(typeof(number)!="number") throw new Error("getSign("+number+") must be a number type");
       if(number > 0) return "+";
       if(number < 0) return "-";
       return "0";
   }
   this.generateSumString = function(everyRoll, droppedRolls){  //bad could be empty
       if(droppedRolls==undefined) droppedRolls=[];  //make it empty for .length
       if(!(everyRoll instanceof Array)) throw new Error("DicePool.generateSumString("+everyRoll+", ~) the first parameter must be an array type.");
       if(!(droppedRolls instanceof Array)) throw new Error("DicePool.generateSumString(~, "+droppedRolls+") the second parameter must be an array type (or undefined).");
       var ender="";
       var total=everyRoll.summation();
      for (var i=0; i < everyRoll.length; i++)
      {
          if(allFudge) ender+=getSign(everyRoll[i]);  //if all fudge then only print out +-0 instead of +1 -1 +0
         else
         {
             if(i==0){}  //avoids a leading '+' or ', '
             else if(isNaN(everyRoll[i])) ender+=", ";  //to separate names
             else if(Number(everyRoll[i]) >= 0) ender+="+";
             //else do nothing since the - will display
             ender+=everyRoll[i];
         }
      }
       var replacedTotal=total;
       if(everyRoll.length==0) ender+="All removed: "+droppedRolls;
      else
      {
          total=outsource.minMaxDoing(total);
          ender+=" = "+total;  //your total could be 0 or less
          if(replacedTotal!=total) ender+=" was: "+replacedTotal;
          if(droppedRolls.length > 0) ender+=" removed: "+droppedRolls;
      }
       return ender;
   };
   this.sumRoll = function(isSilent){
       if(isSilent!=false) isSilent=true;  //default
       var total=this.roll().summation();
       if(!isSilent) writeln(this.generateSumString(rolledValues.everyRoll, rolledValues.droppedRolls));
       return outsource.minMaxDoing(total);  //will return 0 if all dropped (which is good)
   };
   this.opposedRollByBestValue = function(otherDicePoolObject, areRollsSilent){
       if(areRollsSilent!=false) areRollsSilent=true;  //default
       if(!(otherDicePoolObject instanceof DicePool)) throw new Error("DicePool.opposedRollByBestValue("+otherDicePoolObject+", ~) the first parameter must be a DicePool type.");
       var myEveryRoll=this.roll();  //so that multiple things can be returned
       var bothAllFudge=allFudge;  //true or false
       otherDicePoolObject.roll();
       var yourResults=otherDicePoolObject.getStats();  //TODO is this needed as a friend?
       bothAllFudge=(yourResults.allFudge && bothAllFudge);  //true or false
       var yourEveryRoll=yourResults.rolledValues.everyRoll;
       var output="";
       myEveryRoll.sort(alphaNumDescending);  //sort array. descending
       yourEveryRoll.sort(alphaNumDescending);
       if(!areRollsSilent) output+="All My Rolls: "+myEveryRoll+"\nAll Your Rolls: "+yourEveryRoll+"\n";
      for (var i=0; i < myEveryRoll.length; i++)
      {
          if(!areRollsSilent && bothAllFudge) output+=getSign(myEveryRoll[i])+" vs "+getSign(yourEveryRoll[i])+": ";
          else if(!areRollsSilent) output+=myEveryRoll[i]+" vs "+yourEveryRoll[i]+": ";
          if(i >= yourEveryRoll.length) return (output+"You win by "+myEveryRoll[i]+" value");
          if(myEveryRoll[i] > yourEveryRoll[i]) return (output+"You win by "+(myEveryRoll[i]-yourEveryRoll[i])+" value");
          if(myEveryRoll[i] < yourEveryRoll[i]) return (output+"You lose by "+(yourEveryRoll[i]-myEveryRoll[i])+" value");
          if(!areRollsSilent) output+="Tie\n";
      }
       if(yourEveryRoll.length > myEveryRoll.length) return (output+"You lose by "+yourEveryRoll[myEveryRoll.length]+" value");  //missing die is treated as 0
       return (output+"You tied");
   };
   this.opposedRollByDice = function(otherDicePoolObject, failurePenalty, areRollsSilent){
       if(areRollsSilent!=false) areRollsSilent=true;  //default
       if(failurePenalty!=false) failurePenalty=true;
       if(!(otherDicePoolObject instanceof DicePool)) throw new Error("DicePool.opposedRollByDice("+otherDicePoolObject+", ~) the first parameter must be a DicePool type.");
       var myEveryRoll=this.roll();  //so that multiple things can be returned
       var bothAllFudge=allFudge;  //true or false
       otherDicePoolObject.roll();
       var yourResults=otherDicePoolObject.getStats();
       bothAllFudge=(yourResults.allFudge && bothAllFudge);  //true or false
       var yourEveryRoll=yourResults.rolledValues.everyRoll;
       var ender="";
       var winCount=0;
       myEveryRoll.sort(alphaNumDescending);  //sort array. descending
       yourEveryRoll.sort(alphaNumDescending);
      for (var i=0; i < myEveryRoll.length; i++)
      {
          if(i >= yourEveryRoll.length) break;
         if (bothAllFudge && !areRollsSilent)  //if all fudge then only print out +-0 instead of +1 -1 +0
         {
             ender+=getSign(myEveryRoll[i])+" vs "+getSign(yourEveryRoll[i]);
             if(i+1 < myEveryRoll.length && i+1 < yourEveryRoll.length) ender+=", ";
         }
         else if(!areRollsSilent)
         {
             ender+=myEveryRoll[i]+" vs "+yourEveryRoll[i];
             if(i+1 < myEveryRoll.length && i+1 < yourEveryRoll.length) ender+=", ";
         }
          if(myEveryRoll[i] > yourEveryRoll[i]) winCount++;  //my roll was better
          else if(myEveryRoll[i] < yourEveryRoll[i] && failurePenalty) winCount--;
          //else do nothing
      }
       if(!areRollsSilent) ender+="\n";
       if(!failurePenalty && myEveryRoll.length > yourEveryRoll.length) winCount+=(myEveryRoll.length-yourEveryRoll.length);  //no penalty for having less dice
       else if(failurePenalty) winCount+=(myEveryRoll.length-yourEveryRoll.length);  //you win for each extra die you have and lose for each one you don't have
       if(winCount > 0) return (ender+"You win by "+winCount+" dice");
       if(winCount < 0) return (ender+"You lose by "+Math.abs(winCount)+" dice");
       if(!failurePenalty) return (ender+"You failed");  //0 is a failure for these
       return (ender+"You tied");
   };
   this.opposedSumRoll = function(otherDicePoolObject, areRollsSilent){
       if(areRollsSilent!=false) areRollsSilent=true;  //default
       if(!(otherDicePoolObject instanceof DicePool)) throw new Error("DicePool.opposedSumRoll("+otherDicePoolObject+", ~) the first parameter must be a DicePool type.");
       var myRoll=this.roll().summation();
       var yourRoll=otherDicePoolObject.roll().summation();
       var output="";
       if(areRollsSilent) output+=myRoll+" vs "+yourRoll+": ";
       if(myRoll > yourRoll) output+="You win";
       else if(myRoll < yourRoll) output+="You Failed";
       else output+="You Tied";
       return output;
   };
   this.countSuccessesRoll = function(successCriteria, failureCriteria, areRollsSilent){
       if(typeof(successCriteria)!="string") throw new Error("DicePool.countSuccessesRoll("+successCriteria+", ~) the first parameter must be a string type (or undefined).");
       if(areRollsSilent!=false) areRollsSilent=true;  //default
      if (failureCriteria != undefined)
      {
          if(typeof(failureCriteria)!="string") throw new Error("DicePool.countSuccessesRoll(~, "+failureCriteria+", ~) the second parameter must be a string type (or undefined).");
          failureCriteria=failureCriteria.trim();
          if(!(/^(?:[<>=]=?\s*)?-?\d+$/).test(failureCriteria)) throw new Error("DicePool.countSuccessesRoll(~, "+failureCriteria+", ~) invalid failureCriteria.");
          if(failureCriteria.startsWith("=") && !failureCriteria.startsWith("==")) failureCriteria='='+failureCriteria;  //must be double equal signs for eval
          if((/^\d+$/).test(failureCriteria)) failureCriteria="=="+failureCriteria;  //default
      }
       successCriteria=successCriteria.trim();
       if(!(/^(?:[<>=]=?\s*)?-?\d+$/).test(successCriteria)) throw new Error("DicePool.countSuccessesRoll("+successCriteria+", ~) invalid successCriteria.");
       if(successCriteria.startsWith("=") && !successCriteria.startsWith("==")) successCriteria='='+successCriteria;  //must be double equal signs for eval
       if((/^\d+$/).test(successCriteria)) successCriteria="=="+successCriteria;  //default
       var everyRoll=this.roll();
       var winCount=0;
       var loseCount=0;
       var output="";
       if(!areRollsSilent) output+="Every roll: "+everyRoll+"\n";
      for (var i=0; i < everyRoll.length; i++){
          if(!areRollsSilent) output+="Success: "+everyRoll[i]+successCriteria+" is "+eval(''+everyRoll[i]+successCriteria);
          if(eval(''+everyRoll[i]+successCriteria)) winCount++;
         if (failureCriteria != undefined)
         {
             if(!areRollsSilent) output+=" and Failure: "+everyRoll[i]+failureCriteria+" is "+eval(''+everyRoll[i]+failureCriteria);
             if(eval(''+everyRoll[i]+failureCriteria)) loseCount++;
         }
          if(!areRollsSilent) output+="\n";
      }
       if(!areRollsSilent) output+="Successes: "+winCount+" Failures: "+loseCount+". Total: ";
       winCount-=loseCount;
       if(winCount > 0) output+=winCount+" Net Successes";
       else if(winCount < 0) output+=Math.abs(winCount)+" Net Failures";
       else output+="There was an equal number of Successes and Failures";
       return output;
   };
   this.roll = function(){
       var temp=0;  //used in for loop
       var everyRoll = new Array();
      for (var i=0; i < diceArray.length; i++)
      {
          everyRoll=everyRoll.concat(diceArray[i].roll());  //same as push if roll() is a single number but if roll() is an array, each element will be pushed instead
      }
       rolledValues.droppedRolls = outsource.dropDoing(everyRoll);  //might be empty
       if(constantModifier!=0) everyRoll.unshift(constantModifier);  //push this constant to the front to be used in summations
       rolledValues.everyRoll = everyRoll;
       return rolledValues.everyRoll;
   };
   function constructorCalled(objectGiven){  //made into a function for clarity
       var holder=diceStringGiven.trim().replace(/\s/g, ' ');  //make copy and replace all whitespace with space
       var warning=false;

       //while(holder.contains("  "))  //sorry. cargo cult
       holder=holder.replace(/  +/g, " ");  //chop out all redundant spaces
       holder=holder.replace(/-/g, "+-");  //change minus to plus a negative so I can split by plus
       var newDiceArray=holder.split("+");
       if(newDiceArray[0]=='') newDiceArray.shift();  //in case of a leading +-
       //TODO: doc (also Scatter): <a>You can sepperate multiple kinds of grand totals with ; or , each of which will be displayed in the same result box.</a><br />
       holder=newDiceArray;
       newDiceArray=[];
      if (!isNaN(holder[0]))
      {
         while (!isNaN(holder[0]))
         {
            if (!warning && (holder[0].contains('e') || holder[0].contains('E')))
            {
                writeln('Warning: scientific notation is being used in constants.\nThis may be a typo if you were trying to refer to '+holder[0].replace(/[eE]/, 'd')+'.\n');
                warning=true;
            }
             constantModifier+=Number(holder.shift());
         }
      }
      for (var i=0; i < holder.length;)
      {
          var total=0;
          var newElement=holder[i]+'';
          i++;
         while (!isNaN(holder[i]))
         {
            if (!warning && (holder[i].contains('e') || holder[i].contains('E')))
            {
                writeln('Warning: scientific notation is being used in constants.\nThis may be a typo if you were trying to refer to '+holder[i].replace(/[eE]/, 'd')+'.\n');
                warning=true;
            }
             total+=Number(holder[i]);
             i++;
         }
          if(total < 0) newElement+=''+total;
          else if(total > 0) newElement+='+'+total;
          newDiceArray.push(newElement.trim());
      }

       holder='';  //prepared for the loop
      while (newDiceArray.length!=0)
      {
          if(holder.length > 0 && holder!=numberGroup(holder)) throw new Error(diceStringGiven+"\nhas incorrect syntax. Dice Pool modifiers must be at the end after every die.");
          if(holder.length > 0) throw new Error(diceStringGiven+"\nhas incorrect syntax. After processing the string remaining was\n"+holder);
             //if there was any string remaing after previous pass. put here instead of bottom becuase there are multiple bottoms
          holder=newDiceArray.shift()+'';
          if(holder.endsWith('r') && newDiceArray[0]!=undefined && newDiceArray[0].startsWith('-')) holder+=newDiceArray.shift().trim();
             //this is not just a patch since r must have a number. so if you want to also subtract 1 be like: "2dFr-1 - 1"
          if((/^\d+[eE]$/).test(holder) && newDiceArray[0]!=undefined && newDiceArray[0].startsWith('-') && !isNaN(newDiceArray[0])) holder+=newDiceArray.shift().trim();
             //this is not just a patch since the syntax for it is: "2d6 + 5e-2 + 1d2" for numbers, 'e' must be followed by a number
         if (holder=='' || holder=='-')
         {
             var message=diceStringGiven+"\nrogue ";
             if(holder=='') message+='+';
             else message+='-';
             message+=' was found';
             if(newDiceArray.length!=0) message+=' before '+(newDiceArray+'').replace(/,/g, '+');
             message+='. Dice or a numeric constant must follow an addition or subtraction.';
             throw new Error(message);
         }
         if (holder.startsWith("ScatterDie"))
         {
            if (!holder.startsWith("ScatterDie("))  //doesn't have the ()
            {
                objectGiven.addDie(new ScatterDie());
                holder=holder.substring("ScatterDie".length);  //chop off "ScatterDie"
                continue;
            }
             //else: below
             var thisLine=(/^.+?\)/).exec(holder)[0];  //capture the call to ScatterDie with parameters
             objectGiven.addDie(eval("new "+thisLine));
             holder=holder.substring(thisLine.length);  //remove the scatter die
             continue;  //note that following the die list can be things like drop
         }
          //else: below
          holder=holder.toLowerCase();
          var isDieNegativePool=holder.startsWith('-');
          if(isDieNegativePool) holder=holder.substring(1);  //chop off '-'
          if(!(/^\d+/).test(holder)) holder="1"+holder;  //must have leading number for diceCount
          var diceCount=(/^\d+/).exec(holder)[0];
          holder=holder.substring(diceCount.length);  //chop off the match from the total string
          diceCount=parseInt(diceCount);  //convert string to int
         if ((/^k/).test(holder))
         {
             holder=holder.substring(1);  //chop off 'k'
             var keepString="kh"+parseInt(holder);  //shorthand for "keep highest" to ensure that shorthand comes before longhand
             if(diceCount<=parseInt(holder)) keepString='';  //keep all of them
             holder=(/^\d+(.*)/).exec(holder)[1];  //capture what follows
             holder="d10!!"+keepString+holder;
         }
          var remainingString=holder;
          if(newDiceArray.length!=0) remainingString+='+'+(newDiceArray+'').replace(/,/g, '+');
          if(remainingString!='') remainingString='The error was found before '+remainingString+'.\n';
          if(!(/^[zd]/).test(holder)) throw new Error(diceStringGiven+"\n"+remainingString+"Dice must use 'd' or 'z' to specify the dice type");
          var remainder=Die(holder);  //has a return type of all unused text
          holder=holder.substring(0, holder.length-remainder.length);  //everything before remainder
          if(isDieNegativePool) holder="-"+holder;  //add negative
          for(var i=0; i < diceCount; i++) objectGiven.addDie(new Die(holder, nameArray));  //the only spot that needs to know this
          holder=remainder;
      }

       outsource=new numberGroup(holder);
       holder=numberGroup(holder);  //as a function is returns the remaining text
       if(holder.trim()!='') throw new Error(diceStringGiven+"\nhas incorrect syntax. After processing the string remaining was\n"+holder);

       if(diceArray.length == 0) throw new Error(diceStringGiven+"\nhas no dice objects which is invalid.");  //avoid bad numbers
       //I removed error checking for max number since js will return Infinity on overflow for me which is your problem
       objectGiven.getName();  //generates the pool's default name
       nameArray=undefined;  //clear out since it is no longer valid
   };
   //constructor:
    if(arguments.length==0){nameArray=[]; return;}  //done. it is an empty pool. TODO test more
    //if(diceStringGiven==undefined) diceStringGiven="1d6";  //default. also test more stuff here like this
    nameArray=argumentsToArray(arguments, 1);
    //TODO: doc: let me count the ways: DicePool(), DicePool("2d6"), DicePool(2, "yes", "no", "maybe"), DicePool(4, ["yes", "no", "maybe"]), DicePool(DicePool), DicePool(Die)
    if(nameArray==undefined) nameArray=[];  //make empty array (not provided or diceStringGiven only)
    if(nameArray.length!=0 && typeof(diceStringGiven)!="number") throw new Error("DicePool("+diceStringGiven+", ~) the first parameter of a named die must be a number type which is the number of dice");
    if(nameArray.length!=0) diceStringGiven+="d6";  //needs to be a string for parsing
    if(typeof(diceStringGiven)!="string" && !(diceStringGiven instanceof Die) && !(diceStringGiven instanceof ScatterDie) && !(diceStringGiven instanceof DicePool))
       throw new Error("DicePool("+diceStringGiven+", ~) the first parameter must be a string, Die or DicePool (or ScatterDie).");
    //if(nameArray.length!=0 && ((diceStringGiven instanceof Die)  || (diceStringGiven instanceof DicePool))) throw new Error("");  //already covered since diceStringGiven isn't a number
    if((diceStringGiven instanceof Die) || (diceStringGiven instanceof ScatterDie)) this.addDie(diceStringGiven);
    else if(diceStringGiven instanceof DicePool) this.addAllDice(diceStringGiven);
    else constructorCalled(this);
};
//static:
DicePool.minMaxRegexStart = /^\s(?:with\s)?(?:a\s)?(?:min|max)(?:imum)?\s(?:of\s)?/;
DicePool.dropKeepRegexShortHand = /^[dk][hl]?\d*/;
DicePool.dropKeepRegexStart = /^\s(?:drop(?:ping)?|remov(?:e|ing)|ignor(?:e|ing)|keep(?:ping)?)/;
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
