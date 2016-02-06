'use strict';
/**
@param element to search for
@returns {!boolean} true if the element exists in this array (using ===)
*/
if(undefined === Array.prototype.contains){Array.prototype.contains = function(element){return (-1 !== this.indexOf(element));};}
/**
@param {!number} index at which the element is located that should be removed
@returns the removed element
@throws if index is illegal
*/
if (undefined === Array.prototype.removeByIndex)
{
   Array.prototype.removeByIndex = function(index)
   {
      if(index instanceof Number) index = index.valueOf();
      if('number' !== typeof(index)) throw new Error('Illegal index type: ' + typeof(index));
      if(Number.isNaN(index) || index < 0 || Math.floor(index) !== index) throw new Error('Illegal index: ' + index);
      if(index >= this.length) throw new Error('Illegal index: ' + index + '. length=' + this.length);
      return this.splice(index, 1)[0];
   };
}
/**
@param element the first occurrence of which will be removed
@returns {!number} the index of the removed element
*/
if (undefined === Array.prototype.removeElement)
{
   Array.prototype.removeElement = function(obj)
   {
      var foundIndex = this.indexOf(obj);
      if(-1 === foundIndex) throw new Error('Element not found: ' + obj);
      this.removeByIndex(foundIndex);
      return foundIndex;
   };
}
/**
Factorial is defined as the multiplication of all positive integers less than and equal to the input.
Except 0 and 1 which return 1. This function does not use recursion.
Using iteration allows very fast speed: input of 170 (the highest non-infinity result) finishes in 0 milliseconds.
Examples:
(NaN or '2') return NaN;
(Infinity) return Infinity;
(-2 or 3.5) return;
(4) return 24;
@param {number} input must also be an integer
@returns {?number} the factorial of input
*/
if (undefined === Math.factorial)
{
   Math.factorial = function(input)
   {
      if(input instanceof Number) input = input.valueOf();
      if('number' !== typeof(input) || Number.isNaN(input)) return NaN;
      if(input < 0 || Math.floor(input) !== input) return undefined;
      //factorial is actually defined for both of these cases but I do not know how to calculate them
      //nor do I care since I don't need it (YAGNI)
      if(Infinity === input) return Infinity;  //to prevent getting stuck in the loop

      var result = 1;  //starts as 1 so that any number can be multiplied into it
      for(var i = 2; i <= input; ++i) result *= i;  //start at 2 because it's pointless to multiply by 1
      return result;  //if input is 0 or 1 then return 1
   };
}
/**
@param {!number[]} elements not typeof number will be ignored. NaN and Infinity won't be ignored.
@returns {!number} the numeric summation of the array
*/
if (undefined === Math.summation)
{
   Math.summation = function(array)
   {
      var total = 0;
      for (var i = 0; i < array.length; ++i)
      {
         var thisValue = array[i];  //stored so that array[i] is not mutated
         if(thisValue instanceof Number) thisValue = thisValue.valueOf();
         if('number' === typeof(thisValue)) total += thisValue;
      }
      return total;
   };
}
/**
Polyfill for ECMAScript 2015 (6th Edition, ECMA-262)
@returns {!boolean} true if input is a whole number that isn't Infinity or NaN
*/
if (undefined === Number.isInteger)
{
   Number.isInteger = function(input)
   {
      //if(input instanceof Number) input = input.valueOf();  //very type strict
      if('number' !== typeof(input)) return false;  //wrong type
      return (Number.isFinite(input) && Math.floor(input) === input);
   };
}
/**
@returns {!boolean} true if input is a number that isn't Infinity or NaN. And is an integer greater than 0.
*/
if (undefined === Number.isNatural){Number.isNatural = function(input){return (Number.isInteger(input) && input > 0);};}
/**
@param {!string} substring to search for (case sensitive)
@returns {!boolean} true if this string contains the substring
*/
if(undefined === String.prototype.contains){String.prototype.contains = function(substring){return (-1 !== this.indexOf(substring));};}
