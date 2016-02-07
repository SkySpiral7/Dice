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
/**
This function is used in the constructor of Die. It parses the inputString into an object.
You should have no use for it although it isn't harmful to call.
@param {!string} inputString
@returns {!object} the object needed to create a Die. Not optimized or validated.
*/
Die._parseString = function(inputString)
{
   var jsonResult = {originalString: inputString};
   var workingString = inputString.trim().toLowerCase().replace(/\s+/g, ' ');  //make copy. trim, lower case and replace all whitespace with space

   if((/^1[^\d%]/).test(workingString)) workingString = workingString.substring(1);  //chop off 1
   else if((/^0[^\d%]/).test(workingString)) throw new Error(inputString + '\ninvalid dieCount: 0');
   else if((/^[\d%]/).test(workingString)) throw new Error(inputString + '\ndie count (if provided) must be 1 (or -1). Otherwise use DicePool');

   jsonResult.constantModifier = 0;
   if((/^z/).test(workingString)) jsonResult.constantModifier = -1;
   if(!(/^[zd]/).test(workingString)) throw new Error(inputString + '\nexpected "d" or "z". Found: ' + workingString);
   workingString = workingString.substring(1);  //chop off 'd' or 'z'
   if((/^%/).test(workingString)) workingString = workingString.replace(/%/, '100');  //replace first % with 100
   workingString = workingString.replace(/%/g, '00');  //replace all other % with 2 more zeros

   if ('f' === workingString[0])
   {
      jsonResult.isFudgeDie = true;  //this is only used for describing the die as a string
      jsonResult.constantModifier = -2;  //1df and 1zf are the same thing so ignore current value of constantModifier
      jsonResult.sideCount = 3;
      workingString = workingString.substring(1);  //chop off 'f'
   }
   else if ((/^\d+/).test(workingString))
   {
      jsonResult.isFudgeDie = false;
      jsonResult.sideCount = Number.parseInt(workingString);  //only parses leading integer
      workingString = workingString.substring(jsonResult.sideCount.toString().length);  //remove sideCount from workingString
   }
   else throw new Error(inputString + '\nexpected sideCount. Found: ' + workingString);

   //shorthand must come before longhand
   while (workingString.length > 0)
   {
      if ('!' === workingString[0])
      {
         if(undefined !== jsonResult.explodeType) throw new Error(inputString + '\nmultiple explosions found. Max is 1');
         workingString = workingString.substring(1);  //chop off '!'
         if ('!' === workingString[0])  //if it had '!!'
         {
            workingString = workingString.substring(1);
            jsonResult.explodeType = Die.explodeTypes.Compound;
         }
         else if ('p' === workingString[0])
         {
            workingString = workingString.substring(1);  //chop off 'p'
            jsonResult.explodeType = Die.explodeTypes.Penetrating;
         }
         else jsonResult.explodeType = Die.explodeTypes.Normal;
      }
      else if ((/^r(?:[<>]=?|[!=]?==?)?-?\d+/).test(workingString))
      {
         if(undefined !== jsonResult.rerollCriteria) throw new Error(inputString + '\nmultiple reroll criteria found. Max is 1');
            //could theoretically be an array of criteria but throw for now
         workingString = workingString.substring(1);  //chop off 'r'
         if((/^-?\d+/).test(workingString)) workingString = '==' + workingString;  //default
         jsonResult.rerollCriteria = (/^.=?=?-?\d+/).exec(workingString)[0];
         workingString = workingString.substring(jsonResult.rerollCriteria.length);  //remove rerollCriteria from workingString
         if('=' === jsonResult.rerollCriteria) jsonResult.rerollCriteria = '==';  //must be double equal signs for eval
      }
      else break;
   }
   //TODO: re: figure out how to make DRY while still enforcing shorthand then longhand
   while (workingString.length > 0)  //longhand loop
   {
      //as per the robustness principle I don't care about English grammar as long as the meaning is clear
      if ((/^(?: penetrat(?:ing|e)| compound(?:ing)?)? explo(?:sions?|ding|de)(?: dic?e)?/).test(workingString))
      {
         if(undefined !== jsonResult.explodeType) throw new Error(inputString + '\nmultiple explosions found. Max is 1');
         if (workingString.startsWith(' compound'))
         {
            workingString = workingString.replace(/ compound(?:ing)?/, '');  //remove word
            jsonResult.explodeType = Die.explodeTypes.Compound;
         }
         else if (workingString.startsWith(" penetrat"))
         {
            workingString = workingString.replace(/ penetrat(?:ing|e)/, '');  //remove word
            jsonResult.explodeType = Die.explodeTypes.Penetrating;
         }
         else jsonResult.explodeType = Die.explodeTypes.Normal;
         workingString = workingString.replace(/ explo(?:sions?|ding|de)(?: dic?e)?/, '');  //remove word(s)
      }
      else if ((/^ reroll (?:dic?e (?:that are )?)?(?:(?:greater|less) than(?: or equal(?: to)?)? |(?:not )?equal(?: to)? )?-?\d+/).test(workingString))
      {
         if(undefined !== jsonResult.rerollCriteria) throw new Error(inputString + '\nmultiple reroll criteria found. Max is 1');
            //could theoretically be an array of criteria but throw for now
         workingString = workingString.replace(/^ reroll (?:dic?e (?:that are )?)?/, '');  //remove word(s)
         if ((/^greater than (?:or )?/).test(workingString))
         {
            jsonResult.rerollCriteria = '>';
            workingString = workingString.replace(/^greater than (?:or )?/, '');
         }
         else if ((/^less than (?:or )?/).test(workingString))
         {
            jsonResult.rerollCriteria = '<';
            workingString = workingString.replace(/^less than (?:or )?/, '');
         }
         else if ((/^not /).test(workingString))
         {
            jsonResult.rerollCriteria = '!';
            workingString = workingString.replace(/^not /, '');
         }
         else jsonResult.rerollCriteria = '';

         if ((/^equal(?: to)? /).test(workingString))
         {
            jsonResult.rerollCriteria += '=';
            workingString = workingString.replace(/^equal(?: to)? /, '');
         }
         if('=' === jsonResult.rerollCriteria || '' === jsonResult.rerollCriteria) jsonResult.rerollCriteria = '==';  //first is if 'equal' and the other is default
         jsonResult.rerollCriteria += Number.parseInt(workingString);  //grab number
         workingString = workingString.replace(/^-?\d+/, '');  //remove
      }
      else break;
   }
   //for now keep constantModifier internal only
   //if((/^ *[-+] *\d+$/).test(workingString)){jsonResult.constantModifier=Number(workingString); workingString='';}
   if('' !== workingString) throw new Error(inputString + '\nUnparsable: ' + workingString);

   return jsonResult;
};
/**
This function is used in the constructor of Die. It throws if there is anything invalid about the input.
You should have no use for it although it isn't harmful to call.
@param {!object} input which may be slightly modified (ie gaining default values)
*/
Die._validate = function(input)
{
   //(undefined == x) is the same as (undefined === x || null === x) unlike (!x) which detects falsy values
   if(input.originalString instanceof String) input.originalString = input.originalString.valueOf();
   else if (undefined == input.originalString)
   {
      input.originalString = undefined;  //in case it was null
      input.originalString = JSON.stringify(input);  //this is safe because JSON.stringify ignores undefined values
   }
   else if('string' !== typeof(input.originalString)) throw new Error(input.originalString + '\noriginalString must be a string but was: ' + typeof(input.originalString));

   if(input.sideCount instanceof Number) input.sideCount = input.sideCount.valueOf();  //unbox so that === behaves as expected
   if(undefined == input.sideCount) throw new Error(input.originalString + '\nsideCount is required');
   if(!Number.isNatural(input.sideCount)) throw new Error(input.originalString + '\ninvalid sideCount: ' + input.sideCount);

   if(input.constantModifier instanceof Number) input.constantModifier = input.constantModifier.valueOf();
   if(undefined == input.constantModifier) input.constantModifier = 0;
   else if(!Number.isInteger(input.constantModifier)) throw new Error(input.originalString + '\nconstantModifier must be an integer but was: ' + input.constantModifier);

   if(input.isFudgeDie instanceof Boolean) input.isFudgeDie = input.isFudgeDie.valueOf();
   if(undefined == input.isFudgeDie) input.isFudgeDie = false;
   else if(true !== input.isFudgeDie && false !== input.isFudgeDie) throw new Error(input.originalString + '\ninvalid isFudgeDie: ' + input.isFudgeDie);

   if (undefined != input.rerollCriteria)
   {
      input.rerollCriteria = input.rerollCriteria.toString();  //unboxes or converts
      if(!(/^(?:[<>]=?|[!=]?==?)-?\d+$/).test(input.rerollCriteria)) throw new Error(input.originalString + '\ninvalid rerollCriteria: ' + input.rerollCriteria);
      input.rerollCriteria = input.rerollCriteria.replace(/^([!=])=*/, '$1==');  //forces !== and ===
   }

   if (undefined != input.explodeType)
   {
      if(Die.explodeTypes.Normal !== input.explodeType && Die.explodeTypes.Compound !== input.explodeType && Die.explodeTypes.Penetrating !== input.explodeType)
         throw new Error(input.originalString + '\ninvalid explodeType: ' + input.explodeType);
   }

   //all fields are valid when alone. Now validate combinations

   if(1 === input.sideCount && undefined != input.explodeType) throw new Error(input.originalString + '\nInfinite exploding. sideCount: 1');

   if (undefined != input.rerollCriteria)
   {
      var minValue = 1 + input.constantModifier;
      var maxValue = input.sideCount + input.constantModifier;
      if(eval('' + minValue + input.rerollCriteria) && eval('' + maxValue + input.rerollCriteria))
         throw new Error(input.originalString + '\nInfinite rerolling: ' + JSON.stringify({
            rerollCriteria: input.rerollCriteria, sideCount: input.sideCount, constantModifier: input.constantModifier
         }));
      //you can only have 1 reroll criteria. so you can't 1d6r=1r=6 therefore if both min and max are rerolled then they all are
      //TODO: re: !=2 will cause this to fail
   }
};
/**
This function is used in the constructor of Die. It modifies input to reduce or eliminate reroll without
changing functionality. So that less rolls occur when calling die.roll().
You should have no use for it although it isn't harmful to call.
@param {!object} input which might be modified (anything except originalString may be touched)
*/
//TODO: re: isFudgeDie may need to be touched more depending on how Die display works
Die._optimizeReroll = function(input)
{
   if(undefined == input.rerollCriteria) return;  //fast path

   return;
   var minValue = 1 + input.constantModifier;
   var maxValue = input.sideCount + input.constantModifier;
   var explodeValue = maxValue;
   //explode is not affected by constantModifier but reroll is

   if ('!==' === rerollCriteria)
   {
      //not much of a die anymore but this is what you asked for
      //this is the most optimized of all
      input.sideCount = 1;
      input.isFudgeDie = false;
      input.explodeType = undefined;

      input.constantModifier = Number.parseInt(rerollCriteria.substring(3));
      --input.constantModifier;  //because the sideCount always adds 1
      input.rerollCriteria = undefined;
   }
   return;
   //TODO: re: more. See below
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
};
/**This is an enum since Symbols aren't well supported enough yet.*/
Die.explodeTypes = {Normal: {}, Compound: {}, Penetrating: {}};
/*
Precedence:
roll value
add constant
if maximum then explode until done
if reroll then start over

Define fudge:
1d3-2 that claims to be fudge
without rerolling or exploding
*/
//TODO: re: enforce fudge
//TODO: re: tests
