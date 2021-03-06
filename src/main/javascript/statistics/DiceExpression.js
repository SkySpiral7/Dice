'use strict';
//mx^a. m: coefficient, x: indeterminate, a: exponent (must be a natural number), mx^a: term
//is actually a Expression > Algebraic Expression > Rational Expression.
function DiceExpression(arg1, arg2)
{
   var termArray, useProbability;

   /**This function lets you add this Expression to otherExpression (this Expression is mutated to be the result).*/
   this.add = function(otherExpression)
   {
      Validation.requireInstanceOf(DiceExpression, otherExpression);
      var otherTerms = otherExpression.toJSON();
      for (var i = 0; i < otherTerms.length; ++i)
      {
        this.addTerm(otherTerms[i]);
      }
   };
   /**
   This function lets you add a term to this Expression (this Expression is mutated to be the result).
   If you have a Expression e then e.addTerm({coefficient: 3, exponent: 2}) is e + 3x^2.
   */
   this.addTerm = function(term)
   {
      //TODO: should I unbox parameters?
      Validation.requireTypeOf('number', term.coefficient);  //allow NaN and Infinity
      Validation.requireTypeOf('number', term.exponent);

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
   /**@returns a copy of this object.*/
   this.clone = function()
   {
      return new DiceExpression(termArray, useProbability);  //the constrcutor will do a defensive copy
   };
   /**@returns true if other is equal to this.*/
   this.equals = function(other)
   {
      if(!(other instanceof DiceExpression)) return false;
      if(this === other) return true;
      return (JSON.stringify(this) === JSON.stringify(other));
   };
   /**
   This function lets you multiply this Expression by otherExpression (this Expression is mutated to be the result).
   If this is 3x^2 + 1 then this.multiply(this) is 9x^4 + 6x^2 + 1.
   */
   this.multiply = function(otherExpression)
   {
      Validation.requireInstanceOf(DiceExpression, otherExpression);
      //copy out termArray so that this.addTerm can be used for the new terms
      var oldTermArray = termArray;
      termArray = [];
      var otherTerms = otherExpression.toJSON();
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
      for (var termIndex = 0; termIndex < termArray.length; ++termIndex)
      {
         if('number' === typeof(termArray[termIndex].exponent)) termArray[termIndex].exponent *= -1;
         else  //instance of Array
         {
            for (var exponentIndex = 0; exponentIndex < termArray[termIndex].exponent.length; ++exponentIndex)
            {
               termArray[termIndex].exponent[exponentIndex] *= -1;
               //TODO: this is only fine if all functions allow exponent array
            }
         }
      }
      termArray.reverse();  //works in this case
   };
   /** Used to multiply by itself a given number of times.*/
   this.power = function(raisedTo)
   {
      Validation.requireNaturalNumber(raisedTo);
      --raisedTo;
      for (var multiplier = this.clone(); raisedTo > 0; --raisedTo)
      {
         this.multiply(multiplier);
      }
   };
   /**This function lets you subtract another DiceExpression from this Expression (this Expression is mutated to be the result).*/
   this.subtract = function(otherExpression)
   {
      Validation.requireInstanceOf(DiceExpression, otherExpression);
      var otherTerms = otherExpression.toJSON();
      for (var i = 0; i < otherTerms.length; ++i)
      {
        this.addTerm({exponent: otherTerms[i].exponent, coefficient: -otherTerms[i].coefficient});
      }
   };
   /**@returns {object[]} objects contain result (the sum rolled) and either frequency (if possible) or probability (otherwise).*/
   this.toDiceResults = function()
   {
      var result = [];
      for (var i = 0; i < termArray.length; ++i)
      {
         //rename them from the expression names to the dice names
         if(useProbability) result.push({result: termArray[i].exponent, probability: termArray[i].coefficient});
         else result.push({result: termArray[i].exponent, frequency: termArray[i].coefficient});
      }
      result.reverse();  //works in this case
      return result;
   };
   /**@returns an object with this DiceExpression's termArray elements in it in a format that can be passed into the constructor*/
   this.toJSON = function()
   {
      //TODO: doesn't include useProbability
      return JSON.clone(termArray);  //defensive copy
   };

   /**You can't call this function. It is only used internally to create a DiceExpression object.*/
   this._constructor = function()
   {
      if(undefined !== termArray) throw new Error('Illegal access');
      termArray = [];
      if(undefined === arg1){useProbability = false; return;}
      if('boolean' === typeof(arg1)){useProbability = arg1; return;}
      if (arg1 instanceof Array)
      {
         useProbability = arg2;
         if (0 !== arg1.length && undefined !== arg1[0].result)
         {
            //convert arg1 from result array to term array
            for (var i = 0; i < arg1.length; ++i)
            {
               //TODO: validation: useProbability requires probability else requires frequency
               if(useProbability) arg1[i] = {exponent: arg1[i].result, coefficient: arg1[i].probability};
               else arg1[i] = {exponent: arg1[i].result, coefficient: arg1[i].frequency};
            }
         }
         termArray = JSON.clone(arg1);  //defensive copy
         termArray.sort(DiceExpression.exponentDescending);
         arg1 = undefined;
         arg2 = undefined;
         return;
      }

      //TODO: make DiceExpression._validate
      if(undefined !== arg2) throw new Error('No explode count');
      if(arg1 instanceof Die) arg1 = {die: arg1, dieCount: 1, areDiceNegative: false};
      var diceGroup = arg1;
      useProbability = (undefined !== diceGroup.die.toJSON().explodeType);
      termArray = DiceExpression.everyValue(diceGroup);
      DiceExpression.combineValues(termArray);
      termArray.sort(DiceExpression.exponentDescending);

      arg1 = undefined;  //no longer needed
      arg2 = undefined;
   };
   this._constructor();
}
//TODO: doc and test DiceExpression.combineValues
//before: [{[1]: 1/2}, {[1,2]: 1/4}, {[2,2]: 1/4}]
//after: [{1: 1/2}, {3: 1/4}, {4: 1/4}]
DiceExpression.combineValues = function(everyValue)
{
   for (var i = 0; i < everyValue.length; ++i)
   {
      everyValue[i].exponent = Math.summation(everyValue[i].exponent);
   }
};
//TODO: doc DiceExpression.everyValue and move some tests
DiceExpression.everyValue = function(diceGroup)
{
   if(diceGroup instanceof Die) diceGroup = {die: diceGroup, dieCount: 1, areDiceNegative: false};
   var die = diceGroup.die.toJSON();
   var hasExplosions = (undefined !== die.explodeType);
   var minValue = 1 + die.constantModifier;
   var maxValue = die.sideCount + die.constantModifier;
   var runningPossibilities = 1;
   var result = [];
   for (var explodeIndex = 0; 0 === result.length || 0 !== Number(result.last().coefficient.toFixed(5)); ++explodeIndex)
   {
      var sidesPossible = 0, thisExplodeValues = [];
      for (var currentValue = minValue; currentValue <= maxValue; ++currentValue)
      {
         if (hasExplosions && currentValue === maxValue)
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
         if(diceGroup.areDiceNegative) actualValue = -actualValue;
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
      else break;
   }
   return result;
};
/**Pass this into Array.prototype.sort for the order exponent: Infinity to exponent: -Infinity.*/
DiceExpression.exponentDescending = function(a,b)
{
   if('number' === typeof(a.exponent)) return (b.exponent - a.exponent);
   //else is an array
   return (Math.summation(b.exponent) - Math.summation(a.exponent));
}
/*Example API:
new DiceExpression('7x^4 - x + 6x^3 + 2').toJSON():  //I won't support creation from string
[
{coefficient: 7, exponent: 4},  //will be in this order (exponent descending)
{coefficient: 6, exponent: 3},
{coefficient: -1, exponent: 1},
{coefficient: 2, exponent: 0}
]
*/
//TODO: make a math readme doc which gives a quick overview and links that math forum and se
