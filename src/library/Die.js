'use strict';
/**
A single die object (for multiple dice see DicePool). It can be created in the following ways:
new Die() for a 1d6
new Die(20) for a 1d20
new Die('d10!!')
new Die({name: 'My die', sideCount: 6, constantModifier: -1, rerollCriteria: '===1', explodeType: Die.explodeTypes.Normal})
*/
function Die(arg1)
{
   var name, sideCount, constantModifier, isFudgeDie, rerollCriteria, explodeType;

   /**@returns true if other is equal to this.*/
   this.equals = function(other)
   {
      if(!(other instanceof Die)) return false;
      if(this === other) return true;
      return (JSON.stringify(this) === JSON.stringify(other));
   };
   /**
   @param {?function} randomSource a function that returns a random number between 0 inclusive and 1 exclusive.
   If not provided Math.random will be used.
   @returns {number[]} the results of rolling the die. Rerolls will not be included
   */
   this.roll = function(randomSource)
   {
      if(undefined == randomSource) randomSource = Math.random;
      if('function' !== typeof(randomSource)) throw new Error(name +
         '\nrandomSource must be a function but was a ' + typeof(randomSource) + ' with toString: ' + randomSource);
      //TODO: re: consider moving randomSource into Die's data

      var valueArray = [];
      var maxValue = sideCount + constantModifier;
      var needsValue, valueRolled;
      do  //so I can loop around (for rerolling and exploding) without recursion
      {
         valueRolled = Math.floor(randomSource() * sideCount) + 1;  //+1 for a min of 1 and a max of sideCount
            //can't use Math.ceil because exactly 0 wouldn't become 1
            //TODO: re: consider forcing constantModifier to have the +1 instead
         valueRolled += constantModifier;
         needsValue = false;

         //exploding dice can't reroll the max value. validate prevents it
         if(valueRolled === maxValue && undefined !== explodeType) needsValue = true;
         else if (Die.explodeTypes.Compound === explodeType)
         {
            //now that I have a non-explode I can sum them all together to simulate a single die value
            valueRolled += Math.summation(valueArray);
            valueArray = [];  //clear out valueArray so that reroll can start fresh
         }

         if(undefined !== rerollCriteria && eval('' + valueRolled + rerollCriteria)) needsValue = true;
         else
         {
            if(0 !== valueArray.length && Die.explodeTypes.Penetrating === explodeType) --valueRolled;
            valueArray.push(valueRolled);
         }
      } while(needsValue);
      return valueArray;
   };
   /**@returns an object with all Die data elements in it. It can be passed into new Die()*/
   this.toJSON = function()
   {
      return {  //brace required to be on this line because the semi-colon predictor otherwise assumes I want dead code because it's insane
         'instanceof': 'Die',  //this is for a JSON reviver
         name: name,  //yes I realize that name might be JSON of the same thing: it's not infinite and it's the best I can do
         sideCount: sideCount,
         constantModifier: constantModifier,
         isFudgeDie: isFudgeDie,
         rerollCriteria: rerollCriteria,
         explodeType: explodeType
      };
   };

   /**You can't call this function. It is only used internally to create a Die object.*/
   this._constructor = function()
   {
      if(undefined !== sideCount) throw new Error('Illegal access');

      if(undefined == arg1) arg1 = {name: '1d6', sideCount: 6};
      else if(arg1 instanceof Number || arg1 instanceof String) arg1 = arg1.valueOf();
      if('number' === typeof(arg1)) arg1 = {name: '1d' + arg1, sideCount: arg1};
      else if('string' === typeof(arg1)) arg1 = Die._parseString(arg1);

      Die._validate(arg1);
      if(undefined !== arg1.rerollCriteria) Die._optimizeReroll(arg1);

      name = arg1.name;
      sideCount = arg1.sideCount;
      constantModifier = arg1.constantModifier;
      isFudgeDie = arg1.isFudgeDie;
      rerollCriteria = arg1.rerollCriteria;
      explodeType = arg1.explodeType;

      arg1 = undefined;  //no longer needed
   };
   this._constructor();
}
/**This is an enum since Symbols aren't well supported enough yet.*/
Die.explodeTypes = {
   Compound: {toString: function(){return '{Compound}';}, toJSON: function(){return '{Compound}';}},
   Normal: {toString: function(){return '{Normal}';}, toJSON: function(){return '{Normal}';}},
   Penetrating: {toString: function(){return '{Penetrating}';}, toJSON: function(){return '{Penetrating}';}}
};
/**
This function is used in the constructor of Die. It modifies input to reduce or eliminate reroll without
changing functionality. So that less rolls occur when calling die.roll().
You should have no use for it although it isn't harmful to call. It assumes input has been validated.
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

   //TODO: re: more _optimizeReroll. See old
};
/**
This function is used in the constructor of Die. It parses the inputString into an object.
You should have no use for it although it isn't harmful to call.
@param {!string} inputString
@returns {!object} the object needed to create a Die. Not optimized or validated.
*/
Die._parseString = function(inputString)
{
   inputString = '' + inputString;  //enforces string type and is null safe
   var jsonResult = {name: inputString};
   var workingString = inputString.trim().toLowerCase().replace(/\s+/g, ' ');  //make copy so that parse errors can use inputString

   if((/^1(?:[^\d%]|$)/).test(workingString)) workingString = workingString.substring(1);  //chop off 1
   else if((/^0(?:[^\d%]|$)/).test(workingString)) throw new Error(inputString + '\ninvalid dieCount: 0');
   else if((/^[\d%]/).test(workingString)) throw new Error(inputString + '\ndie count (if provided) must be 1. Otherwise use DicePool');

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
      if('' !== workingString) throw new Error(inputString + '\nFudge/Fate dice don\'t explode or reroll. Illegal: ' + workingString);
      return jsonResult;
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
   //don't bother checking typeof(input) is object. sideCount required will throw anyway

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
/*
Precedence:
roll value
add constant
if maximum then explode until done
if reroll then reroll
if penetrating subtract 1

TODO: re: error or warn about reroll penetrating (checks reroll before -1) also in Polynomial

Define fudge:
1d3-2 without rerolling or exploding
*/
