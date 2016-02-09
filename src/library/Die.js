'use strict';
function Die(arg1)
{
}
/**
This function is used in the constructor of Die. It parses the inputString into an object.
You should have no use for it although it isn't harmful to call.
@param {!string} inputString
@returns {!object} the object needed to create a Die. Not optimized or validated.
*/
Die._parseString = function(inputString)
{
   var jsonResult = {name: inputString};
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
      //isFudgeDie is defined in validate
      jsonResult.constantModifier = -2;  //1df and 1zf are the same thing so ignore current value of constantModifier
      jsonResult.sideCount = 3;
      workingString = workingString.substring(1);  //chop off 'f'
   }
   else if ((/^\d+/).test(workingString))
   {
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
         if('=' === jsonResult.rerollCriteria || '' === jsonResult.rerollCriteria) jsonResult.rerollCriteria = '==';
           //first is if 'equal' and the other is default
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
It also normalizes the input and defines isFudgeDie (ignoring old value).
You should have no use for it although it isn't harmful to call.
@param {!object} input which may be slightly modified (ie gaining default values)
*/
Die._validate = function(input)
{
   //(undefined == x) is the same as (undefined === x || null === x) unlike (!x) which detects falsy values
   if(input.name instanceof String) input.name = input.name.valueOf();
   else if (undefined == input.name)
   {
      input.name = undefined;  //in case it was null
      input.name = JSON.stringify(input);  //this is safe because JSON.stringify ignores undefined values
   }
   else if('string' !== typeof(input.name)) throw new Error(input.name +
      '\nname must be a string but was: ' + typeof(input.name));

   if(input.sideCount instanceof Number) input.sideCount = input.sideCount.valueOf();  //unbox so that === behaves as expected
   if(undefined == input.sideCount) throw new Error(input.name + '\nsideCount is required');
   if(!Number.isNatural(input.sideCount)) throw new Error(input.name + '\ninvalid sideCount: ' + input.sideCount);

   if(input.constantModifier instanceof Number) input.constantModifier = input.constantModifier.valueOf();
   if(undefined == input.constantModifier) input.constantModifier = 0;
   else if(!Number.isInteger(input.constantModifier)) throw new Error(input.name +
      '\nconstantModifier must be an integer but was: ' + input.constantModifier);

   if (undefined != input.rerollCriteria)
   {
      input.rerollCriteria = input.rerollCriteria.toString();  //unboxes or converts
      if(!(/^(?:[<>]=?|[!=]?==?)-?\d+$/).test(input.rerollCriteria)) throw new Error(input.name +
         '\ninvalid rerollCriteria: ' + input.rerollCriteria);
      input.rerollCriteria = input.rerollCriteria.replace(/^([!=])=*/, '$1==');  //forces !== and ===
   }
   else delete input.rerollCriteria;

   if (undefined != input.explodeType)
   {
      if(Die.explodeTypes.Normal !== input.explodeType && Die.explodeTypes.Compound !== input.explodeType && Die.explodeTypes.Penetrating !== input.explodeType)
         throw new Error(input.name + '\ninvalid explodeType: ' + input.explodeType);
   }
   else delete input.explodeType;

   input.isFudgeDie = (3 === input.sideCount && -2 === input.constantModifier &&
      undefined == input.rerollCriteria && undefined == input.explodeType);

   //all fields are valid when alone. Now validate combinations

   if(1 === input.sideCount && undefined != input.explodeType) throw new Error(input.name + '\nInfinite exploding. sideCount: 1');

   if(undefined !== input.rerollCriteria) Die._validateReroll(input);
};
/**
This function is called by Die._validate. It throws if there is anything invalid about rerolling.
You should have no use for it although it isn't harmful to call.
@param {!object} input which won't be modified
*/
Die._validateReroll = function(input)
{
   var minValue = 1 + input.constantModifier;
   var maxValue = input.sideCount + input.constantModifier;
   var rerollValue = Number.parseInt((/-?\d+$/).exec(input.rerollCriteria)[0]);

   {
   var possibleToReroll;
   if((input.rerollCriteria.startsWith('===') || input.rerollCriteria.startsWith('<')) && minValue > rerollValue)
      possibleToReroll = false;
   else if((/^<[^=]/).test(input.rerollCriteria) && minValue === rerollValue)
      possibleToReroll = false;
   else if((input.rerollCriteria.startsWith('===') || input.rerollCriteria.startsWith('>')) &&
      Die.explodeTypes.Compound !== input.explodeType && rerollValue > maxValue)
      possibleToReroll = false;
   else if((/^>[^=]/).test(input.rerollCriteria) && maxValue === rerollValue)
      possibleToReroll = false;
   else if(input.rerollCriteria.startsWith('!==') && 1 === input.sideCount && rerollValue === maxValue)
      possibleToReroll = false;
   else possibleToReroll = true;

   if(!possibleToReroll)
      throw new Error(input.name + '\nimpossible to reroll:\n' + JSON.stringify({
         rerollCriteria: input.rerollCriteria, sideCount: input.sideCount, constantModifier: input.constantModifier,
         explodeType: input.explodeType
      }));
   }

   if (Die.explodeTypes.Compound === input.explodeType)
   {
      var compoundRerollValue = rerollValue - input.constantModifier;
      var rerollExplodeValue = (compoundRerollValue % input.sideCount === 0);
      if (rerollExplodeValue)
      {
         if(input.rerollCriteria.startsWith('!==') || input.rerollCriteria.startsWith('==='))
            throw new Error(input.name + '\nambiguous: does value ' + rerollValue + ' reroll or explode?\n' +
               JSON.stringify({
                  rerollCriteria: input.rerollCriteria, sideCount: input.sideCount, constantModifier: input.constantModifier,
                  explodeType: input.explodeType
               })
            );
         //> and < enforce minimum/maximum # of explosions which is fine
      }
   }
   else if (undefined !== input.explodeType && eval('' + maxValue + input.rerollCriteria))
      throw new Error(input.name + '\nambiguous: does value ' + maxValue + ' reroll or explode?\n' + JSON.stringify({
         rerollCriteria: input.rerollCriteria, sideCount: input.sideCount, constantModifier: input.constantModifier,
         explodeType: input.explodeType
      }));
   //TODO: re: detect infinite reroll for 1d10!r<=9 optimization required

   //infinite rerolling check doesn't apply to explode because of the above ambiguous checks
   if (undefined === input.explodeType)
   {
      var infiniteReroll = false;
      if(input.rerollCriteria.startsWith('!==')) infiniteReroll = (rerollValue < minValue || rerollValue > maxValue);
         //the only number allowed is impossible to roll
      else infiniteReroll = (eval('' + minValue + input.rerollCriteria) && eval('' + maxValue + input.rerollCriteria));
         //you can only have 1 reroll criteria: you can't 1d6r=1r=6
         //therefore if both min and max are rerolled then they all are

      if(infiniteReroll) throw new Error(input.name + '\nInfinite rerolling:\n' + JSON.stringify({
         rerollCriteria: input.rerollCriteria, sideCount: input.sideCount, constantModifier: input.constantModifier
      }));
   }
};
/**
This function is used in the constructor of Die. It modifies input to reduce or eliminate reroll without
changing functionality. So that less rolls occur when calling die.roll().
You should have no use for it although it isn't harmful to call.
@param {!object} input which might be modified (anything except name and isFudgeDie may be touched)
*/
Die._optimizeReroll = function(input)
{
   var minValue = 1 + input.constantModifier;
   var maxValue = input.sideCount + input.constantModifier;
   var rerollValue = Number.parseInt((/-?\d+$/).exec(input.rerollCriteria)[0]);

   if (input.rerollCriteria.startsWith('!=='))
   {
      //not much of a die anymore but this is what you asked for
      //this is the most optimized of all
      input.sideCount = 1;
      delete input.explodeType;
      delete input.rerollCriteria;

      input.constantModifier = rerollValue - 1;  //-1 because the sideCount always adds 1
      return;
   }

   if(undefined !== input.explodeType && input.rerollCriteria.startsWith('===')) return;  //TODO: re: might optimize later
   if (('===' + minValue) === input.rerollCriteria)
   {
      --input.sideCount;
      ++input.constantModifier;
      delete input.rerollCriteria;
      return;
   }
   if (('===' + maxValue) === input.rerollCriteria)
   {
      --input.sideCount;
      delete input.rerollCriteria;
      return;
   }
   if(input.rerollCriteria.startsWith('===')) return;  //otherwise only possible to optimize with a white list

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
Die.explodeTypes = {
   Normal: {toString: function(){return '{Normal}';}, toJSON: function(){return '{Normal}';}},
   Compound: {toString: function(){return '{Compound}';}, toJSON: function(){return '{Compound}';}},
   Penetrating: {toString: function(){return '{Penetrating}';}, toJSON: function(){return '{Penetrating}';}}
};
/*
Precedence:
roll value
add constant
if maximum then explode until done
if reroll then reroll
if penetrating subtract 1

TODO: re: error or warn about reroll penetrating
TODO: re: 1df! stops being a fudge die. should instead get error

Define fudge:
1d3-2 without rerolling or exploding
*/
