'use strict';
//mx^a. m: coefficient, x: indeterminate, a: exponent (must be a natural number), mx^a: term
//is actually a Expression > Algebraic Expression > Rational Expression.
function DiceExpression(arg1, arg2)
{
   var termArray, useProbability;

   /**
   This function lets you add a term to this Expression (this Expression is mutated to be the result).
   If you have a Expression e then e.addTerm({coefficient: 3, exponent: 2}) is e + 3x^2.
   */
   this.addTerm = function(term)
   {
      if(term.coefficient instanceof Number) term.coefficient = term.coefficient.valueOf();
      else if('number' !== typeof(term.coefficient)) throw new Error('term.coefficient must be a number but was: ' + typeof(term.coefficient));
      if(term.exponent instanceof Number) term.exponent = term.exponent.valueOf();
      else if('number' !== typeof(term.exponent)) throw new Error('term.exponent must be a number but was: ' + typeof(term.exponent));

      if(0 === term.coefficient) return;  //fast path and to prevent adding it
      for (var i = 0; i < termArray.length; ++i)
      {
         if (termArray[i].exponent === term.exponent)
         {
            termArray[i].coefficient += term.coefficient;
            if(0 === termArray[i].coefficient) termArray.removeByIndex(i);
            return;
         }
      }
      termArray.push(term);
      termArray.sort(DiceExpression.exponentDescending);  //TODO: is this needed?
   };
   /**
   This function lets you multiply this Expression by otherExpression (this Expression is mutated to be the result).
   If this is 3x^2 + 1 then this.multiply(this) is 9x^4 + 6x^2 + 1.
   */
   this.multiply = function(otherExpression)
   {
      //TODO: re: not null safe
      if(!(otherExpression instanceof DiceExpression)) throw new Error('Expected: DiceExpression. Got: ' + otherExpression.constructor.name);
      //copy out termArray so that this.addTerm can be used for the new terms
      var oldTermArray = termArray;
      termArray = [];
      var otherTerms = otherExpression.toJSON().terms;
      while (0 !== oldTermArray.length)
      {
         var currentTerm = oldTermArray.shift();
         for (var i = 0; i < otherTerms.length; ++i)
         {
            var newCoefficient = currentTerm.coefficient * otherTerms[i].coefficient;
            var newExponent = currentTerm.exponent + otherTerms[i].exponent;
            //addTerm will combine already existing terms if possible
            this.addTerm({exponent: newExponent, coefficient: newCoefficient});
         }
      }
   };
   /**All exponents are multiplied by -1. Doesn't change any coefficients.*/
   this.negateExponents = function()
   {
      for(var i = 0; i < termArray.length; ++i){termArray[i].exponent *= -1;}
      termArray.reverse();  //works in this case
   };
   /**@returns {object[]} objects contain result (the sum rolled) and either frequency (if possible) or probability (otherwise).*/
   this.toDiceResults = function()
   {
      var result = [];
      for (var i = 0; i < termArray.length; ++i)
      {
         //rename them to something meaningful
         if(useProbability) result.push({result: termArray[i].exponent, probability: termArray[i].coefficient});
         else result.push({result: termArray[i].exponent, frequency: termArray[i].coefficient});
      }
      result.reverse();  //works in this case
      return result;
   };
   /**@returns an object with all DiceExpression data elements in it*/
   this.toJSON = function()
   {
      return {  //brace required to be on this line because the semi-colon predictor otherwise assumes I want dead code because it's insane
         'instanceof': 'DiceExpression',  //this is for a JSON reviver
         terms: termArray  //TODO: re: consider defensive copy
      };
   };

   /**You can't call this function. It is only used internally to create a DiceExpression object.*/
   this._constructor = function()
   {
      if(undefined !== termArray) throw new Error('Illegal access');
      if (arg1 instanceof Array)
      {
         useProbability = arg2;
         if (undefined !== arg1[0].result)
         {
            //convert arg1 from result array to term array
            for (var i = 0; i < arg1.length; ++i)
            {
               //TODO: re: validation: useProbability requires probability else requires frequency
               if(useProbability) arg1[i] = {exponent: arg1[i].result, coefficient: arg1[i].probability};
               else arg1[i] = {exponent: arg1[i].result, coefficient: arg1[i].frequency};
            }
         }
         termArray = arg1;  //TODO: re: needs defensive copy? And validation
         termArray.sort(DiceExpression.exponentDescending);
         arg1 = undefined;
         arg2 = undefined;
         return;
      }
      termArray = [];

      //TODO: re: make DiceExpression._validate
      var die = arg1;
      var explodeCount = arg2;
      var hasExplosions = (undefined !== explodeCount && explodeCount > 0);
      //notice how an exploding die with explodeCount 0 uses frequency
      hasExplosions = hasExplosions && (undefined !== die.toJSON().explodeType);
      if(!hasExplosions) explodeCount = 0;
      useProbability = hasExplosions;
      termArray = DiceExpression.everyValue(die, explodeCount);
      DiceExpression.combineValues(termArray);
      termArray.sort(DiceExpression.exponentDescending);

      arg1 = undefined;  //no longer needed
      arg2 = undefined;
   };
   this._constructor();
}
//TODO: re: doc and test DiceExpression.combineValues
//before: [{[1]: 1/2}, {[1,2]: 1/4}, {[2,2]: 1/4}]
//after: [{1: 1/2}, {3: 1/4}, {4: 1/4}]
DiceExpression.combineValues = function(everyValue)
{
   for (var i = 0; i < everyValue.length; ++i)
   {
      everyValue[i].exponent = Math.summation(everyValue[i].exponent);
   }
};
//TODO: re: doc DiceExpression.everyValue and move some tests
DiceExpression.everyValue = function(die, explodeCount)
{
   die = die.toJSON();  //this is the only thing I need the die for
   var hasExplosions = (explodeCount > 0);
   var minValue = 1 + die.constantModifier;
   var maxValue = die.sideCount + die.constantModifier;
   var runningPossibilities = 1;
   var result = [];
   for (var explodeIndex = 0; explodeIndex <= explodeCount; ++explodeIndex)
   {
      var sidesPossible = 0, thisExplodeValues = [];
      for (var currentValue = minValue; currentValue <= maxValue; ++currentValue)
      {
         if (hasExplosions && explodeIndex < explodeCount && currentValue === maxValue)
         {
            //value explodes so it isn't a possibility unless we reach the explode limit
            ++sidesPossible;  //increment because this does affect the runningPossibilities
            continue;
         }
         var actualValue = currentValue;
         if(Die.explodeTypes.Compound === die.explodeType) actualValue += (maxValue * explodeIndex);  //first time adds 0
            //check for compound explode must be before reroll check and the other explodes after
         if(undefined !== die.rerollCriteria && eval('' + actualValue + die.rerollCriteria)) continue;  //exclude reroll values
         ++sidesPossible;
         actualValue = [actualValue];
         if(Die.explodeTypes.Normal === die.explodeType) actualValue = actualValue.concat(new Array(explodeIndex).fill(maxValue));
         else if (Die.explodeTypes.Penetrating === die.explodeType && 0 !== explodeIndex)
         {
            var explodesRemaining = explodeIndex;
            actualValue = [maxValue];  //only the first has the full value
            --explodesRemaining;
            actualValue = actualValue.concat(new Array(explodesRemaining).fill((maxValue - 1)));
            actualValue.push((currentValue - 1));
         }

         //http://mathforum.org/library/drmath/view/52207.html
         //exponent: a possible sum to roll (eg 1 to sideCount)
         //coefficient: number of ways to roll it (non-explode always starts as 1)
         if(!hasExplosions) result.push({exponent: actualValue, coefficient: 1});
         else thisExplodeValues.push(actualValue);
      }
      if (hasExplosions)
      {
         if(0 !== sidesPossible) runningPossibilities *= sidesPossible;  //leave as integers to maintain precision
           //edge case: 1d4!!r<=3 enforces 1 explode so leave runningPossibilities as 1
         for (var i = 0; i < thisExplodeValues.length; ++i)
         {
            //coefficient: probability to roll the sum
            result.push({exponent: thisExplodeValues[i], coefficient: (1 / runningPossibilities)});
            //formula for coefficient of non-compound explode: Math.pow((1/sidesPossible), (explodeIndex+1))
               //unused because the algorithm for compound works for all
         }
      }
   }
   return result;
};
/**Pass this into Array.prototype.sort for the order exponent: Infinity to exponent: -Infinity.*/
DiceExpression.exponentDescending = function(a,b){return (b.exponent - a.exponent);}
/*Example API:
new DiceExpression('7x^4 - x + 6x^3 + 2').toJSON():  //I won't support creation from string
[
{coefficient: 7, exponent: 4},  //will be in this order (exponent descending)
{coefficient: 6, exponent: 3},
{coefficient: -1, exponent: 1},
{coefficient: 2, exponent: 0}
]
*/
//TODO: re: made a math readme which gives a quick overview and links that math forum and se