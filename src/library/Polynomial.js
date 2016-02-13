'use strict';
//mx^a. m: coefficient, x: variable (I won't use), a: exponent (must be a natural number), mx^a: term
function Polynomial(die)
{
   var termArray;

   /**
   This function lets you multiply this Polynomial by otherPoly (this Polynomial is mutated to be the result).
   If this is 3x^2 + 1 then this.multiply(this) is 9x^4 + 6x^2 + 1.
   */
   this.multiply = function(otherPoly)
   {
      //TODO: re: not null safe
      if(!(otherPoly instanceof Polynomial)) throw new Error('Expected: Polynomial. Got: ' + otherPoly.constructor.name);
      //copy out termArray so that this.addTerm can be used for the new terms
      var oldTermArray = termArray;
      termArray = [];
      var otherTerms = otherPoly.toJSON().terms;
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
   this.negate = function()
   {
   };
   /**
   This function lets you add a term to this Polynomial (this Polynomial is mutated to be the result).
   If you have a Polynomial p then p.addTerm({coefficient: 3, exponent: 2}) is p + 3x^2.
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
      termArray.sort(exponentDescending);  //TODO: is this needed?
   };
   /**@returns an object with all Polynomial data elements in it*/
   this.toJSON = function()
   {
      return {  //brace required to be on this line because the semi-colon predictor otherwise assumes I want dead code because it's insane
         'instanceof': 'Polynomial',  //this is for a JSON reviver
         terms: termArray  //TODO: re: consider defensive copy
      };
   };

   /**You can't call this function. It is only used internally to create a Polynomial object.*/
   this._constructor = function()
   {
      if(undefined !== termArray) throw new Error('Illegal access');
      termArray = [];

      //TODO: re: consider creating from JSON and other ways
      //TODO: re: make Polynomial._validate
      die = die.toJSON();  //this is the only thing I need the die for
      var minValue = 1 + die.constantModifier;
      var maxValue = die.sideCount + die.constantModifier;
      for (var currentValue = minValue; currentValue <= maxValue; ++currentValue)
      {
         if(undefined !== die.rerollCriteria && eval('' + currentValue + die.rerollCriteria)) continue;  //exclude reroll values
         //http://mathforum.org/library/drmath/view/52207.html
         //exponent: a possible thing to roll (eg 1 to sideCount)
         //coefficient: number of ways to roll it (always starts as 1 without explosions etc)
         termArray.push({exponent: currentValue, coefficient: 1});
      }
      termArray.sort(exponentDescending);

      die = undefined;  //no longer needed
   };
   this._constructor();
}
/**Pass this into Array.prototype.sort for the order exponent: Infinity to exponent: -Infinity.*/
function exponentDescending(a,b){return (b.exponent - a.exponent);}  //TODO: re: put somewhere else
/*Example API:
new Polynomial('7x^4 - x + 6x^3 + 2').toJSON():  //I won't support creation from string
[
{coefficient: 7, exponent: 4},  //will be in this order (exponent descending)
{coefficient: 6, exponent: 3},
{coefficient: -1, exponent: 1},
{coefficient: 2, exponent: 0}
]
*/
