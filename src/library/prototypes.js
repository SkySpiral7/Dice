/**
@param {!number} index at which the element is located that should be removed
@returns the removed element
*/
if(undefined === Array.prototype.removeByIndex){Array.prototype.removeByIndex = function(index){return this.splice(index, 1);}}
/**
@param element the first occurrence of which will be removed
@returns {!number} the index of the removed element
*/
if (undefined === Array.prototype.removeElement)
{
   Array.prototype.removeElement = function(obj)
   {
      var foundIndex = this.indexOf(obj);
      this.removeByIndex(foundIndex);  //TODO: re: breaks if not found. therefore test
      return foundIndex;
   };
}
/**
Returns the summation of every element in the array (using Number() on each element to try to convert it to a number).
If the array contains arrays this function is deep and calls summation() on each of them.
@returns {!number} the numeric summation of the array
*/
if (undefined === Array.prototype.summation)
{
   Array.prototype.summation = function()  //TODO: re: should this be deep? Or be a util?
   {
      var total = 0;
      for (var i = 0; i < this.length; ++i)
      {
         if(this[i] instanceof Array) total += this[i].summation();  //is deep
         else
         {
            var thisValue = Number(this[i]);  //catches empty string, null, undefined and NaN. although a few of those return 0 but that's fine too (does the same thing)
            if(!isNaN(thisValue)) total += thisValue;  //TODO: re: non numbers could be undefined behavior
         }
      }
      return total;
   };
}
/**
@param {!string} substring to search for
@returns {!boolean} true if this string contains the substring
*/
if(undefined === String.prototype.contains){String.prototype.contains = function(substring){return (-1 !== this.indexOf(substring));};}
/**
@param element to search for
@returns {!boolean} true if the element exists in this array (using ===)
*/
if(undefined === Array.prototype.contains){Array.prototype.contains = function(element){return (-1 !== this.indexOf(element));};}
/**
Factorial is defined as the multiplication of all positive integers less than and equal to the input.
Except 0 and 1 which return 1. This function does not use recursion.
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
