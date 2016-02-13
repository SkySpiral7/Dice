'use strict';
//mx^a. m: coefficient, x: variable (I won't use), a: exponent (must be a natural number), mx^a: term
function Polynomial(die)
{
   var termArray;

   this.multiply = function(otherPoly)
   {
      /*for (var i = 0; i < termArray.length; ++i)
      {
         termArray.push({exponent: currentValue, coefficient: 1});
      }*/
   };
   this.negate = function()
   {
   };
   this.addTerm = function(term)
   {
      for (var i = 0; i < termArray.length; ++i)
      {
         if(termArray[i].exponent === term.exponent){termArray[i].coefficient += term.coefficient; return;}
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
/**Pass this into Array.prototype.sort for the order exponent: Infinity to exponent: Infinity.*/
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
/*
(3x^2 + 1)^2
(3x^2 + 1)(3x^2 + 1)
(3x^2 * 3x^2) + (1 * 3x^2) + (3x^2 * 1) + (1 * 1)
9x^4 + 3x^2 + 3x^2 + 1
9x^4 + 6x^2 + 1
*/
