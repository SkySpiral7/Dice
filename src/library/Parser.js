'use strict';
var Parser = {};
/**
This function is used in the constructor of DicePool. It parses the inputString into an object array used to create a DicePool.
You should have no use for it although it isn't harmful to call.
@param {string} inputString
@returns {!object[]} the object array needed to create a DicePool. Not optimized or validated.
*/
Parser.dicePool = function(inputString)
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
      else groupObject.areDiceNegative = false;

      if ((/^\d+/).test(workingString))
      {
         groupObject.dieCount = Number.parseInt(workingString);  //only parses leading integer
         workingString = workingString.substring(groupObject.dieCount.toString().length);  //remove sideCount from workingString
      }
      else groupObject.dieCount = 1;

      Parser._diceGroup(inputString, workingString, groupObject);
      jsonResult.push(groupObject);
   }
   return jsonResult;
};
/**
This function is used by Parser.dicePool. It parses the workingString populating group.
You should have no use for it although it isn't harmful to call.
Because this is an internal function it makes certain assumptions that won't give error messages if violated.
@param {!string} debugName prepended to error messages
@param {!string} workingString
@param {!object} group an element of DicePool's pool array. Not optimized or validated.
*/
Parser._diceGroup = function(debugName, workingString, group)
{
   group.die = {constantModifier: 0};

   if('z' === workingString[0]) group.die.constantModifier = -1;
   if(!(/^[zd]/).test(workingString)) throw new Error(debugName + '\nexpected "d" or "z". Found: ' + workingString);
   workingString = workingString.substring(1);  //chop off 'd' or 'z'
   if('%' === workingString[0]) workingString = workingString.replace(/%/, '100');  //replace first % with 100
   workingString = workingString.replace(/%/g, '00');  //replace all other % with 2 more zeros

   if ('f' === workingString[0])
   {
      //isFudgeDie is defined in validate  //TODO: re: define in both
      group.die.constantModifier = -2;  //1df and 1zf are the same thing so ignore current value of constantModifier
      group.die.sideCount = 3;
      workingString = workingString.substring(1);  //chop off 'f'
      if('' !== workingString) throw new Error(debugName + '\nFudge/Fate dice don\'t explode or reroll. Illegal: ' + workingString);
      return;
   }
   else if ((/^\d+/).test(workingString))
   {
      group.die.sideCount = Number.parseInt(workingString);  //only parses leading integer
      workingString = workingString.substring(group.die.sideCount.toString().length);  //remove sideCount from workingString
   }
   else throw new Error(debugName + '\nexpected sideCount. Found: ' + workingString);

   //shorthand must come before longhand
   workingString = Parser._shortHand(debugName, workingString, group);
   workingString = Parser._longHand(debugName, workingString, group);

   //if((/^[-+] ?\d+/).test(workingString))  //for now constantModifier isn't in string because ambiguous (add to group or die? which group?)
   //also no string support because why would you need it?
   //constantModifier is used internally and can be used via object construction because not ambiguous
   if('' !== workingString) throw new Error(debugName + '\nUnparsable: ' + workingString);
};
/**
This function is used by Parser._diceGroup. It parses the workingString populating group.
This function handles the short hand reroll and explode syntax for a Die (eg: '!r1').
You should have no use for it although it isn't harmful to call.
Because this is an internal function it makes certain assumptions that won't give error messages if violated.
@param {!string} debugName prepended to error messages
@param {!string} workingString
@param {!object} group
@returns {!string} the unparsed workingString that remains
*/
Parser._shortHand = function(debugName, workingString, group)
{
   while (workingString.length > 0)
   {
      if ('!' === workingString[0])
      {
         if(undefined !== group.die.explodeType) throw new Error(debugName + '\nmultiple explosions found. Max is 1');
         workingString = workingString.substring(1);  //chop off '!'
         if ('!' === workingString[0])  //if it had '!!'
         {
            workingString = workingString.substring(1);
            group.die.explodeType = Die.explodeTypes.Compound;
         }
         else if ('p' === workingString[0])
         {
            workingString = workingString.substring(1);  //chop off 'p'
            group.die.explodeType = Die.explodeTypes.Penetrating;
         }
         else group.die.explodeType = Die.explodeTypes.Normal;
      }
      else if ((/^r(?:[<>]=?|[!=]?==?)?-?\d+/).test(workingString))
      {
         if(undefined !== group.die.rerollCriteria) throw new Error(debugName + '\nmultiple reroll criteria found. Max is 1');
            //could theoretically be an array of criteria but throw for now
         workingString = workingString.substring(1);  //chop off 'r'
         //TODO: re: move this default into Die.validate:
         if((/^-?\d+/).test(workingString)) workingString = '===' + workingString;  //default
         group.die.rerollCriteria = (/^.=?=?-?\d+/).exec(workingString)[0];
         workingString = workingString.substring(group.die.rerollCriteria.length);  //remove rerollCriteria from workingString
      }
      else if ((/^[dk][hl]?\d*/).test(workingString))
      {
         if(undefined !== group.dropKeepType) throw new Error(debugName + '\nmultiple drop/keep criteria found. Max is 1');

         if(workingString.startsWith('dh')) group.dropKeepType = DicePool.dropKeepTypes.DropHighest;
         else if('d' === workingString[0]) group.dropKeepType = DicePool.dropKeepTypes.DropLowest;
         else if(workingString.startsWith('kl')) group.dropKeepType = DicePool.dropKeepTypes.KeepLowest;
         else /*if('k' === workingString[0])*/ group.dropKeepType = DicePool.dropKeepTypes.KeepHighest;
         workingString = workingString.replace(/^[dk][hl]?/, '');

         if ((/^\d+/).test(workingString))
         {
            group.dropKeepCount = Number.parseInt(workingString);  //only parses leading integer
            workingString = workingString.substring(group.dropKeepCount.toString().length);  //remove dropKeepCount from workingString
         }
         else group.dropKeepCount = 1;
      }
      else break;
   }

   return workingString;
};
/**
This function is used by Parser._diceGroup. It parses the workingString populating group.
This function handles the long hand reroll and explode syntax for a Die (eg: ' explode reroll 1').
You should have no use for it although it isn't harmful to call.
Because this is an internal function it makes certain assumptions that won't give error messages if violated.
@param {!string} debugName prepended to error messages
@param {!string} workingString
@param {!object} group
@returns {!string} the unparsed workingString that remains
*/
Parser._longHand = function(debugName, workingString, group)
{
   //TODO: re: figure out how to make DRY while still enforcing shorthand then longhand
   while (workingString.length > 0)  //longhand loop
   {
      //as per the robustness principle I don't care about English grammar as long as the meaning is clear
      if ((/^(?: penetrat(?:ing|e)| compound(?:ing)?)? explo(?:sions?|ding|de)(?: dic?e)?/).test(workingString))
      {
         if(undefined !== group.die.explodeType) throw new Error(debugName + '\nmultiple explosions found. Max is 1');
         if (workingString.startsWith(' compound'))
         {
            workingString = workingString.replace(/ compound(?:ing)?/, '');  //remove word
            group.die.explodeType = Die.explodeTypes.Compound;
         }
         else if (workingString.startsWith(' penetrat'))
         {
            workingString = workingString.replace(/ penetrat(?:ing|e)/, '');  //remove word
            group.die.explodeType = Die.explodeTypes.Penetrating;
         }
         else group.die.explodeType = Die.explodeTypes.Normal;
         workingString = workingString.replace(/ explo(?:sions?|ding|de)(?: dic?e)?/, '');  //remove word(s)
      }
      else if ((/^ reroll(?:ing)? (?:dic?e (?:that are )?)?(?:(?:greater|less) than(?: or equal(?: to)?)? |(?:not )?equal(?: to)? )?-?\d+/).test(workingString))
      {
         if(undefined !== group.die.rerollCriteria) throw new Error(debugName + '\nmultiple reroll criteria found. Max is 1');
            //could theoretically be an array of criteria but throw for now
         workingString = workingString.replace(/^ reroll(?:ing)? (?:dic?e (?:that are )?)?/, '');  //remove word(s)
         if ((/^greater than (?:or )?/).test(workingString))
         {
            group.die.rerollCriteria = '>';
            workingString = workingString.replace(/^greater than (?:or )?/, '');
         }
         else if ((/^less than (?:or )?/).test(workingString))
         {
            group.die.rerollCriteria = '<';
            workingString = workingString.replace(/^less than (?:or )?/, '');
         }
         else if ((/^not /).test(workingString))
         {
            group.die.rerollCriteria = '!';
            workingString = workingString.replace(/^not /, '');
         }
         else group.die.rerollCriteria = '';

         if ((/^equal(?: to)? /).test(workingString))
         {
            group.die.rerollCriteria += '=';
            workingString = workingString.replace(/^equal(?: to)? /, '');
         }
         if('=' === group.die.rerollCriteria || '' === group.die.rerollCriteria) group.die.rerollCriteria = '==';
           //first is if 'equal' and the other is default
         group.die.rerollCriteria += Number.parseInt(workingString);  //grab number
         workingString = workingString.replace(/^-?\d+/, '');  //remove
      }
      //allow: ' keep 1', ' keep lowest', ' keep lowest 1'. reject: ' keep'
      else if ((/^ (?:drop(?:ping)?|remov(?:e|ing)|ignor(?:e|ing)|keep(?:ping)?) (?:the )?(?:(?:low|high)est(?: \d+)?|\d+)/).test(workingString))
      {
         if(undefined !== group.dropKeepType) throw new Error(debugName + '\nmultiple drop/keep criteria found. Max is 1');
         workingString = workingString.replace(/^ (?:drop(?:ping)?|remov(?:e|ing)|ignor(?:e|ing))/, ' drop');  //simplify

         if((/^ drop(?: the)? high/).test(workingString)) group.dropKeepType = DicePool.dropKeepTypes.DropHighest;
         else if(workingString.startsWith(' drop')) group.dropKeepType = DicePool.dropKeepTypes.DropLowest;
         else if((/^ keep(?:ping)?(?: the)? low/).test(workingString)) group.dropKeepType = DicePool.dropKeepTypes.KeepLowest;
         else /*if(workingString.startsWith(' keep'))*/ group.dropKeepType = DicePool.dropKeepTypes.KeepHighest;
         workingString = workingString.replace(/^ (?:drop|keep(?:ping)?)(?: the)?(?: (?:low|high)est)?/, '');

         if ((/^ \d+/).test(workingString))
         {
            group.dropKeepCount = Number.parseInt(workingString);  //only parses leading integer and allows a leading space
            workingString = workingString.substring(group.dropKeepCount.toString().length + 1);  //remove dropKeepCount +1 for space
         }
         else group.dropKeepCount = 1;
      }
      else break;
   }

   return workingString;
};
