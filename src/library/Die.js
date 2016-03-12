'use strict';
/**
A single die object (for multiple dice see DicePool). It can be created in the following ways:
new Die() for a 1d6
new Die(20) for a 1d20
new Die('d10!!')
new Die({sideCount: 6, constantModifier: -1, rerollCriteria: '===1', explodeType: Die.explodeTypes.Normal})
*/
function Die(arg1)
{
   var sideCount, constantModifier, isFudgeDie, rerollCriteria, explodeType;

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
      requireTypeOf('function', randomSource);
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
   /**@returns an object formatted for JsonReviver.reviveWith(). return.value has all of this Die's data elements in it*/
   this.toJSON = function()
   {
      return {  //brace required to be on this line because the semi-colon predictor otherwise assumes I want dead code because it's insane
         reviveWith: 'Die',
         useNew: true,
         value:
         {
            sideCount: sideCount,
            constantModifier: constantModifier,
            isFudgeDie: isFudgeDie,
            rerollCriteria: rerollCriteria,
            explodeType: explodeType
         }
      };
   };

   /**You can't call this function. It is only used internally to create a Die object.*/
   this._constructor = function()
   {
      if(undefined !== sideCount) throw new Error('Illegal access');

      var debugName = 'internal error';  //should never be seen because there shouldn't be an error thrown
      if(undefined == arg1) arg1 = {sideCount: 6};
      else if('number' === typeof(arg1)) arg1 = {sideCount: arg1};
      else if ('string' === typeof(arg1))
      {
         debugName = arg1;
         var poolResult = DicePool._parseString(arg1);
         //TODO: re: validate that no DicePool stuff exists
         if(poolResult.length > 1 || poolResult[0].dieCount > 1) throw new Error(debugName + '\ndie count (if provided) must be 1. Use DicePool for 2+');
         arg1 = poolResult[0].die;
      }
      else if('object' === typeof(arg1)) debugName = JSON.stringify(arg1);

      Die._validate(debugName, arg1);
      if(undefined !== arg1.rerollCriteria) Die._optimizeReroll(arg1);

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
@param {!object} input which might be modified (anything except isFudgeDie may be touched)
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
This function is used in the constructor of Die. It throws if there is anything invalid about the input.
It also normalizes the input and defines isFudgeDie (ignoring old value).
You should have no use for it although it isn't harmful to call.
@param {!string} debugName prepended to any error message thrown
@param {!object} input which may be slightly modified (ie gaining default values)
*/
Die._validate = function(debugName, input)
{
   //don't bother checking typeof(input) is object. sideCount required will throw anyway
   //don't bother checking typeof(debugName) is string. that should never happen

   //(undefined == x) is the same as (undefined === x || null === x) unlike (!x) which detects falsy values
   if(undefined == input.sideCount) throw new Error(debugName + '\nsideCount is required');
   if(!Number.isNatural(input.sideCount)) throw new Error(debugName + '\ninvalid sideCount: ' + input.sideCount);

   if(undefined == input.constantModifier) input.constantModifier = 0;
   else if(!Number.isInteger(input.constantModifier)) throw new Error(debugName +
      '\nconstantModifier must be an integer but was: ' + input.constantModifier);

   if (undefined != input.rerollCriteria)
   {
      input.rerollCriteria = input.rerollCriteria.toString();  //unboxes or converts
      if(!(/^(?:[<>]=?|[!=]?==?)-?\d+$/).test(input.rerollCriteria)) throw new Error(debugName +
         '\ninvalid rerollCriteria: ' + input.rerollCriteria);
      input.rerollCriteria = input.rerollCriteria.replace(/^([!=])=*/, '$1==');  //forces !== and ===
   }
   else delete input.rerollCriteria;

   if (undefined != input.explodeType)
   {
      if(Die.explodeTypes.Normal !== input.explodeType && Die.explodeTypes.Compound !== input.explodeType && Die.explodeTypes.Penetrating !== input.explodeType)
         throw new Error(debugName + '\ninvalid explodeType: ' + input.explodeType);
   }
   else delete input.explodeType;

   input.isFudgeDie = (3 === input.sideCount && -2 === input.constantModifier &&
      undefined == input.rerollCriteria && undefined == input.explodeType);

   //all fields are valid when alone. Now validate combinations

   if(1 === input.sideCount && undefined != input.explodeType) throw new Error(debugName + '\nInfinite exploding. sideCount: 1');

   if(undefined !== input.rerollCriteria) Die._validateReroll(debugName, input);
};
/**
This function is called by Die._validate. It throws if there is anything invalid about rerolling.
You should have no use for it although it isn't harmful to call.
@param {!string} debugName prepended to any error message thrown
@param {!object} input which won't be modified
*/
Die._validateReroll = function(debugName, input)
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
      throw new Error(debugName + '\nimpossible to reroll:\n' + JSON.stringify({
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
            throw new Error(debugName + '\nambiguous: does value ' + rerollValue + ' reroll or explode?\n' +
               JSON.stringify({
                  rerollCriteria: input.rerollCriteria, sideCount: input.sideCount, constantModifier: input.constantModifier,
                  explodeType: input.explodeType
               })
            );
         //> and < enforce minimum/maximum # of explosions which is fine
      }
   }
   else if (undefined !== input.explodeType && eval('' + maxValue + input.rerollCriteria))
      throw new Error(debugName + '\nambiguous: does value ' + maxValue + ' reroll or explode?\n' + JSON.stringify({
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

      if(infiniteReroll) throw new Error(debugName + '\nInfinite rerolling:\n' + JSON.stringify({
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

TODO: re: error or warn about reroll penetrating (checks reroll before -1) also in DiceExpression

Define fudge:
1d3-2 without rerolling or exploding
*/
