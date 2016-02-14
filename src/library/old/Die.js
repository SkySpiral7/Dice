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
