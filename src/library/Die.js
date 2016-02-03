function Die(diceStringGiven, nameArray){
   //private:
    var isNegativeDice=false;
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
       if(isNegativeDice) dieString+='-';
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
       returnObject.isNegativeDice=isNegativeDice;
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
       if(isNegativeDice!=otherDie.isNegativeDice) return false;
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
          if(isNegativeDice) valueRolled*=-1;
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
       var holder=diceStringGiven.trim().toLowerCase().replace(/\s/g, ' ');  //make copy. trim, lower case and replace all whitespace with space

       if((/^-/).test(holder)){isNegativeDice=true; holder=holder.substring(1);}  //chop off '-'
       if((/^1/).test(holder)) holder=holder.substring(1);  //chop off 1
       if((/^0/).test(holder)) throw new Error(diceStringGiven+"\nyou can't make a dice object with 0 dice. That's invalid");
       if((/^\d+/).test(holder)) throw new Error(diceStringGiven+"\nyou can't make a dice object with more than one die, instead use a dice pool object");
       if((/^z/).test(holder)) doesUseZero=true;  //event of 3z2 for 3 coins 0 or 1
       if(!(/^[zd]/).test(holder)) throw new Error(diceStringGiven+"\ndice must use 'd' or 'z' to specify the dice type");
       holder=holder.substring(1);  //chop off 'd' or 'z'
       if((/^%/).test(holder)) holder=holder.replace(/%/, "100");  //replace first % with 100
       holder=holder.replace(/%/g, "00");  //replace all other % with 2 more zeroes
      if (holder.startsWith("f"))  //already converted to lower case
      {
          doesUseZero=true;  //so that .roll works right. plus this does in fact use the number 0
          isFudgeDie=true;  //set flag for later
          sideCount=3;  //they have 3 sides
          holder=holder.substring(1);  //chop of 'f'
      }
      else
      {
          sideCount=parseInt(holder);  //to capture the next number
          if(sideCount == 0) throw new Error(diceStringGiven+"\nhas a bad number of sides.");  //avoid bad numbers
          holder=holder.substring(sideCount.toString().length);  //remove sideCount from holder
      }
      while (holder.length > 0)
      {
         if (holder.startsWith('!'))
         {
             if(sideCount==1) throw new Error(diceStringGiven+"\nInfinite exploding. A single sided die is not allowed to explode because it would be infinite.");
             if(doesCompoundExplode || doesExplode) throw new Error(diceStringGiven+"\nExplosion defined more than once. This is invalid.");
             holder=holder.substring(1);  //chop off '!'
            if (holder.startsWith('!'))  //if it had "!!"
            {
                holder=holder.substring(1);
                doesCompoundExplode=true;
            }
            else if (holder.startsWith("p"))
            {
                holder=holder.substring(1);  //chop off 'p'
                doesExplode=true;  //penetrating needs both set
                doesPenetrate=true;
            }
             else doesExplode=true;  //doesCompoundExplode and doesExplode can't both be true
         }
         else if ((/^r(?:[<>=]=?|!=)?-?\d+/).test(holder))  //can't do [<>=!]=? since that would allow '!' alone
         {
             if(rerollCriteria!=undefined) throw new Error(diceStringGiven+"\nMore than one reroll criteria specified. This is not possible.");
                //could theoretically be an array of criteria but throw for now
             holder=holder.substring(1);  //chop off 'r'
             if((/^-?\d+/).test(holder)) holder='=='+holder;  //default
             rerollCriteria=(/^..?-?\d+/).exec(holder)[0];
             holder=holder.substring(rerollCriteria.length);  //remove rerollCriteria from holder
             if(rerollCriteria.startsWith("=") && !rerollCriteria.startsWith("==")) rerollCriteria='='+rerollCriteria;  //must be double equal signs for eval
         }
          else break;
      }
      while (holder.length > 0)  //longhand loop
      {
         if ((/^(?:\spenetrat(?:ing|e)|\scompound(?:ing)?)?\sexplo(?:sions?|ding|de)(?:\sdic?e)?/).test(holder))
         {
             if(sideCount==1) throw new Error(diceStringGiven+"\nInfinite exploding. A single sided die is not allowed to explode because it would be infinite.");
             if(doesCompoundExplode || doesExplode) throw new Error(diceStringGiven+"\nExplosion defined more than once. This is invalid.");
             holder=holder.replace(/\sexplo(?:sions?|ding|de)(?:\sdic?e)?/, '');  //remove word(s)
            if (holder.startsWith(' compound'))
            {
                holder=holder.replace(/\scompound(?:ing)?/, '');  //remove word
                doesCompoundExplode=true;
            }
            else if (holder.startsWith(" penetrat"))
            {
                holder=holder.replace(/\spenetrat(?:ing|e)/, '');  //remove word
                doesExplode=true;  //penetrating needs both set
                doesPenetrate=true;
            }
             else doesExplode=true;  //doesCompoundExplode and doesExplode can't both be true
         }
         else if ((/^\sreroll\s(?:dic?e\s(?:that\sare\s)?)?(?:(?:greater|less)\sthan(?:\sor\sequal(?:\sto)?)?\s|(?:not\s)?equal(?:\sto)?\s)?-?\d+/).test(holder))
         {
             if(rerollCriteria!=undefined) throw new Error(diceStringGiven+"\nMore than one reroll criteria specified. This is not possible.");
                //could theoretically be an array of criteria but throw for now
             holder=holder.replace(/^\sreroll\s(?:dic?e\s(?:that\sare\s)?)?/, '');  //remove word(s)
             rerollCriteria='';
             if((/^greater than (?:or )?/).test(holder)){rerollCriteria+='>'; holder=holder.replace(/^greater than (?:or )?/, '');}
             else if((/^less than (?:or )?/).test(holder)){rerollCriteria+='<'; holder=holder.replace(/^less than (?:or )?/, '');}
             else if((/^not /).test(holder)){rerollCriteria+='!'; holder=holder.replace(/^not /, '');}
             if((/^equal(?: to)? /).test(holder)){rerollCriteria+='='; holder=holder.replace(/^equal(?: to)? /, '');}
             if(rerollCriteria=='=' || rerollCriteria=='') rerollCriteria='==';  //first is if 'equal' and the other is default
             rerollCriteria+=parseInt(holder);  //grab number
             holder=holder.replace(/^-?\d+/, '');  //remove
         }
          else break;
      }

       if((/^\s*[-+]\s*\d+$/).test(holder)){constantModifier=Number(holder); holder='';}
      if (isFudgeDie)  //was created as a fudge die
      {
          constantModifier--;  //1 lower
          isFudgeDie=(constantModifier==-1);  //z3-1 is fudge otherwise false because it just isn't fudge
      }
       if(doesUseZero && constantModifier > 0){doesUseZero=false; constantModifier--;}
      if (rerollCriteria==undefined)
      {
         if (doesExplode || doesCompoundExplode)  //includes pen
         {
             explodeValue=sideCount;
             if(nameArray.length > 0) explodeValue=nameArray[nameArray.length-1];  //last value
             //else if(isFudgeDie) explodeValue=1;  //covered below
             else if(doesUseZero) explodeValue--;
             if(!isNaN(explodeValue)) explodeValue+=constantModifier;  //so that named die may have this too
         }
          return holder;
      }
       //else:
       //loop through every possible value and make sure at least 1 is possible to land on
       var possibleToRoll=false, maxValue, rerollCountLoopIndex, canReroll=false;
       if(nameArray.length > 0){maxValue=nameArray.length-1; rerollCountLoopIndex=0;}  //based on get min/max value but shorter and I can't call those here
       //else if(isFudgeDie){maxValue=1; rerollCountLoopIndex=-1;}  //uses doesUseZero with constantModifier
       else if(doesUseZero){maxValue=(sideCount-1); rerollCountLoopIndex=0;}
       else{maxValue=sideCount; rerollCountLoopIndex=1;}
       if(doesPenetrate) rerollCountLoopIndex--;  //the pen die is 1 less so check to see if this is valid
       if(nameArray.length > 0 && (doesExplode || doesCompoundExplode)){explodeValue=nameArray[maxValue]; maxValue--;}
       else if(doesExplode || doesCompoundExplode){explodeValue=maxValue; maxValue--;}  //it must be able to land on something else to prevent infinite explosions
       if((doesExplode || doesCompoundExplode) && constantModifier!=0 && !isNaN(explodeValue)) explodeValue+=constantModifier; //updates explodeValue. includes pen
      if (doesCompoundExplode)  //reroll criteria for compound must be validated differently
      {  //TODO: test
          //minimumPossible and explodeValue ignore isNegativeDice. TODO: consider isNegativeDice
          var minimumPossible=rerollCountLoopIndex;  //min value
          if(nameArray.length!=0) minimumPossible=nameArray[rerollCountLoopIndex];
          if(!isNaN(minimumPossible)) minimumPossible+=constantModifier;  //not else since it could be both
          var rerollNumber=Number((/\d+$/).exec(rerollCriteria)[0]);  //always valid due to being at this point in the code (get abs value by ignoring -)
         if (rerollCriteria.startsWith(">"))
         {
             if(eval(''+minimumPossible+rerollCriteria)) throw new Error(diceStringGiven+"\nInfinite explosions. This means that the die can't be rolled.");
             canReroll=true;  //due to the maximum being infinite the possibility of rerolling always exists
         }
          else if (rerollCriteria.startsWith("==") && rerollNumber%explodeValue==0){}  //canReroll=false;  //do nothing since already set
          //die can never land on a side of explodeValue and the number must be within range
          else if(rerollNumber >= minimumPossible) canReroll=true;  //covers each of these: <, != and ==
          //check for canReroll. check if # > min for valid
      }
      else
      {
         for (; rerollCountLoopIndex <= maxValue; rerollCountLoopIndex++)
         {
             var valueConsidered=rerollCountLoopIndex;
             if(nameArray.length!=0) valueConsidered=nameArray[rerollCountLoopIndex];
             if(!isNaN(valueConsidered)) valueConsidered+=constantModifier;  //not else since it could be both
             if(eval(''+valueConsidered+rerollCriteria)) canReroll=true;
             else possibleToRoll=true;
             //if(nameArray.length!=0 && rerollCountLoopIndex+1==nameArray.length) break;  //named die has 1 less but already covered by maxValue=nameArray.length-1
             if(possibleToRoll && canReroll) break;  //found all I need
         }
          if(doesExplode && eval(''+explodeValue+rerollCriteria)){doesExplode=doesPenetrate=false; explodeValue=undefined;}  //exploding is not possible due to reroll. compound on the other hand is still possible
          if(!possibleToRoll && doesExplode) throw new Error(diceStringGiven+"\nInfinite explosions. This means that the die can't be rolled.");
          //it can land on the max side but that causes an explosion and always is that same side
          else if(!possibleToRoll) throw new Error(diceStringGiven+"\nInfinite rerolling. This means that the die can't be rolled.");
      }

       //TODO: optimize: -3df === 3df; 1d6+1d6 === 2d6
       //reroll optimizing section:
       if(!canReroll) rerollCriteria=undefined;  //it isn't possible to reroll so just remove the overhead
      else if (rerollCriteria.startsWith("!="))  //optimized so that it doesn't have to roll until it can keep it
      {
          isFudgeDie=false;
          sideCount=1;
          doesUseZero=true;  //it is 1z1 so that it always rolls 0
          constantModifier+=Number((/\d+$/).exec(rerollCriteria)[0]);  //plus this means it always has this value
          //+= to include already existing modifiers. such as d6r!=4+2 -> z1+6
          rerollCriteria=undefined;
          //isNegativeDice=false;  //unchanged
          doesExplode=false;  //doesn't explode due to having only 1 valid value
          doesPenetrate=false;
          doesCompoundExplode=false;
          explodeValue=undefined;
      }
      else if (rerollCriteria.startsWith(">"))
      {
          var newSideCount=Number((/\d+$/).exec(rerollCriteria)[0]);  //since can't roll above this it becomes new side maximum
          if(rerollCriteria.startsWith(">=")) newSideCount--;  //can't roll it either means lower the max by 1
          //if(sideCount > newSideCount):  //always true due to if(!canReroll) above
          //isNegativeDice=false;  //unchanged
          doesExplode=false;  //doesn't explode due to explodeValue being impossible to roll (ditto for compound)
          doesPenetrate=false;
          if(sideCount > newSideCount) doesCompoundExplode=false;  //TODO: confirm this
          explodeValue=undefined;
          //doesUseZero=false;  //unchanged
          //isFudgeDie=false;  //checked later
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

       //final processing:
       isFudgeDie=(isFudgeDie && sideCount==3 && constantModifier==-1 && doesUseZero);  //checks isFudgeDie so that z3-1 is false
       //if(holder.length > 0) throw new Error(diceStringGiven+"\nhas incorrect syntax. After processing the string remaining was\n"+holder);
       if(sideCount==1 && doesExplode) throw new Error(diceStringGiven+"\nProgramming error: Infinite explosions due to rerolling optimizing.");
       //might've become invalid due to optimizing
       return holder;
   };
   function namedConstructor(){  //doesn't need to know this
       //none of these errors should be possible
       if(isFudgeDie) throw new Error(diceStringGiven+"\nfudge dice can't have named sides");
       if(isNegativeDice) throw new Error(diceStringGiven+"\nnamed dice can't be negative");
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
