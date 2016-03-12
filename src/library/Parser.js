'use strict';
var Parser = {};
/**
This function is used in the constructor of DicePool. It parses the inputString into an object array used to create a DicePool.
You should have no use for it although it isn't harmful to call.
@param {string} inputString
@returns {!object[]} the object array needed to create a DicePool. Not optimized or validated.
*/
Parser.diceGroup = function(inputString)
{
   inputString = '' + inputString;  //enforces string type and is null safe
   var jsonResult = [];
   var workingString = inputString.toLowerCase().replace(/\s+/g, ' ').replace(/-/g, '+-');  //make copy so that parse errors can use inputString
   var groupStringArray = workingString.split('+');
   if('-' === inputString.trim()[0]) groupStringArray.shift();  //leading negative causes first element to be empty
   for (var groupIndex = 0; groupIndex < groupStringArray.length; ++groupIndex)
   {
      var groupObject = {};
      workingString = groupStringArray[groupIndex].trim();
      if('-' === workingString[0]){groupObject.areDiceNegative = true; workingString = workingString.substring(1).trim();}
      if ((/^\d/).test(workingString))
      {
         groupObject.dieCount = Number.parseInt(workingString);  //only parses leading integer
         if(0 === groupObject.dieCount) throw new Error(inputString + '\ninvalid dieCount: 0');
         workingString = workingString.substring(groupObject.dieCount.toString().length);  //remove sideCount from workingString
      }
      else groupObject.dieCount = 1;
      groupObject.die = Parser._die(inputString, workingString);

      jsonResult.push(groupObject);
   }
   return jsonResult;
};
/**
This function is used by Parser.diceGroup. It parses the workingString into an object used to create a Die.
You should have no use for it although it isn't harmful to call.
Because this is an internal function it makes certain assumptions that won't give error messages if violated.
@param {!string} debugName prepended to error messages
@param {!string} workingString
@returns {!object} the object needed to create a Die. Not optimized or validated.
*/
Parser._die = function(debugName, workingString)
{
   var jsonResult = {constantModifier: 0};

   if('z' === workingString[0]) jsonResult.constantModifier = -1;
   if(!(/^[zd]/).test(workingString)) throw new Error(debugName + '\nexpected "d" or "z". Found: ' + workingString);
   workingString = workingString.substring(1);  //chop off 'd' or 'z'
   if('%' === workingString[0]) workingString = workingString.replace(/%/, '100');  //replace first % with 100
   workingString = workingString.replace(/%/g, '00');  //replace all other % with 2 more zeros

   if ('f' === workingString[0])
   {
      //isFudgeDie is defined in validate  //TODO: re: define in both
      jsonResult.constantModifier = -2;  //1df and 1zf are the same thing so ignore current value of constantModifier
      jsonResult.sideCount = 3;
      workingString = workingString.substring(1);  //chop off 'f'
      if('' !== workingString) throw new Error(debugName + '\nFudge/Fate dice don\'t explode or reroll. Illegal: ' + workingString);
      return jsonResult;
   }
   else if ((/^\d+/).test(workingString))
   {
      jsonResult.sideCount = Number.parseInt(workingString);  //only parses leading integer
      workingString = workingString.substring(jsonResult.sideCount.toString().length);  //remove sideCount from workingString
   }
   else throw new Error(debugName + '\nexpected sideCount. Found: ' + workingString);

   //shorthand must come before longhand
   workingString = Parser._shortHand(debugName, workingString, jsonResult);
   workingString = Parser._longHand(debugName, workingString, jsonResult);

   //if((/^[-+] ?\d+/).test(workingString))  //for now constantModifier isn't in string because ambiguous (add to group or die? which group?)
   //also no string support because why would you need it?
   //constantModifier is used internally and can be used via object construction because not ambiguous
   if('' !== workingString) throw new Error(debugName + '\nUnparsable: ' + workingString);

   return jsonResult;
};
/**
This function is used by Parser._die. It parses the workingString populating jsonResult.
This function handles the short hand reroll and explode syntax for a Die (eg: '!r1').
You should have no use for it although it isn't harmful to call.
Because this is an internal function it makes certain assumptions that won't give error messages if violated.
@param {!string} debugName prepended to error messages
@param {!string} workingString
@param {!object} jsonResult
@returns {!string} the unparsed workingString that remains
*/
Parser._shortHand = function(debugName, workingString, jsonResult)
{
   while (workingString.length > 0)
   {
      if ('!' === workingString[0])
      {
         if(undefined !== jsonResult.explodeType) throw new Error(debugName + '\nmultiple explosions found. Max is 1');
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
         if(undefined !== jsonResult.rerollCriteria) throw new Error(debugName + '\nmultiple reroll criteria found. Max is 1');
            //could theoretically be an array of criteria but throw for now
         workingString = workingString.substring(1);  //chop off 'r'
         //TODO: re: move this default into Die.validate:
         if((/^-?\d+/).test(workingString)) workingString = '===' + workingString;  //default
         jsonResult.rerollCriteria = (/^.=?=?-?\d+/).exec(workingString)[0];
         workingString = workingString.substring(jsonResult.rerollCriteria.length);  //remove rerollCriteria from workingString
      }
      else break;
   }

   return workingString;
};
/**
This function is used by Parser._die. It parses the workingString populating jsonResult.
This function handles the long hand reroll and explode syntax for a Die (eg: ' explode reroll 1').
You should have no use for it although it isn't harmful to call.
Because this is an internal function it makes certain assumptions that won't give error messages if violated.
@param {!string} debugName prepended to error messages
@param {!string} workingString
@param {!object} jsonResult
@returns {!string} the unparsed workingString that remains
*/
Parser._longHand = function(debugName, workingString, jsonResult)
{
   //TODO: re: figure out how to make DRY while still enforcing shorthand then longhand
   while (workingString.length > 0)  //longhand loop
   {
      //as per the robustness principle I don't care about English grammar as long as the meaning is clear
      if ((/^(?: penetrat(?:ing|e)| compound(?:ing)?)? explo(?:sions?|ding|de)(?: dic?e)?/).test(workingString))
      {
         if(undefined !== jsonResult.explodeType) throw new Error(debugName + '\nmultiple explosions found. Max is 1');
         if (workingString.startsWith(' compound'))
         {
            workingString = workingString.replace(/ compound(?:ing)?/, '');  //remove word
            jsonResult.explodeType = Die.explodeTypes.Compound;
         }
         else if (workingString.startsWith(' penetrat'))
         {
            workingString = workingString.replace(/ penetrat(?:ing|e)/, '');  //remove word
            jsonResult.explodeType = Die.explodeTypes.Penetrating;
         }
         else jsonResult.explodeType = Die.explodeTypes.Normal;
         workingString = workingString.replace(/ explo(?:sions?|ding|de)(?: dic?e)?/, '');  //remove word(s)
      }
      else if ((/^ reroll(?:ing)? (?:dic?e (?:that are )?)?(?:(?:greater|less) than(?: or equal(?: to)?)? |(?:not )?equal(?: to)? )?-?\d+/).test(workingString))
      {
         if(undefined !== jsonResult.rerollCriteria) throw new Error(debugName + '\nmultiple reroll criteria found. Max is 1');
            //could theoretically be an array of criteria but throw for now
         workingString = workingString.replace(/^ reroll(?:ing)? (?:dic?e (?:that are )?)?/, '');  //remove word(s)
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

   return workingString;
};
