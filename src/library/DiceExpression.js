'use strict';
//mx^a. m: coefficient, x: indeterminate, a: exponent (must be a natural number), mx^a: term
//is actually a Expression > Algebraic Expression > Rational Expression.
function DiceExpression(die, explodeCount)
{
   var termArray;

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
      termArray = [];

      //TODO: re: consider creating from JSON and other ways
      //TODO: re: make DiceExpression._validate
      die = die.toJSON();  //this is the only thing I need the die for
      if(undefined === die.explodeType) explodeCount = 0;
      var minValue = 1 + die.constantModifier;
      var maxValue = die.sideCount + die.constantModifier;
      var runningPossibilities = 1;
      for (var explodeIndex = 0; explodeIndex <= explodeCount; ++explodeIndex)
      {
         var sidesPossible = 0, thisExplodeValues = [];
         for (var currentValue = minValue; currentValue <= maxValue; ++currentValue)
         {
            if (undefined !== die.explodeType && explodeIndex < explodeCount && currentValue === maxValue)
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
            if(Die.explodeTypes.Normal === die.explodeType) actualValue += (maxValue * explodeIndex);  //I only care about the sum
            else if(Die.explodeTypes.Penetrating === die.explodeType) actualValue += ((maxValue - 1) * explodeIndex);
               //for penetrating explode every die after the first is 1 less
               //then +1 because the first explode has full value then -1 for the last roll (so no action needed)
               //explodeIndex: 0 will add 0 which is correct since the first die has full value

            //http://mathforum.org/library/drmath/view/52207.html
            //exponent: a possible sum to roll (eg 1 to sideCount)
            //coefficient: number of ways to roll it (non-explode always starts as 1)
            if(undefined === die.explodeType) termArray.push({exponent: actualValue, coefficient: 1});
            else thisExplodeValues.push(actualValue);
         }
         if (undefined !== die.explodeType)
         {
            if(0 !== sidesPossible) runningPossibilities *= sidesPossible;  //leave as integers to maintain precision
              //edge case: 1d4!!r<=3 enforces 1 explode so leave runningPossibilities as 1
            for (var i = 0; i < thisExplodeValues.length; ++i)
            {
               //coefficient: probability to roll the sum
               termArray.push({exponent: thisExplodeValues[i], coefficient: (1 / runningPossibilities)});
               //formula for coefficient of non-compound explode: Math.pow((1/sidesPossible), (explodeIndex+1))
                  //unused because the algorithm for compound works for all
            }
         }
      }
      termArray.sort(DiceExpression.exponentDescending);

      die = undefined;  //no longer needed
      explodeCount = undefined;
   };
   this._constructor();
}
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
