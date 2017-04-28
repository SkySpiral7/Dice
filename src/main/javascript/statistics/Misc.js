'use strict';
//TODO: all in file: test, move it somewhere
/**
This function returns every possible combination of each element passed in.
What it does is a little hard to describe. If you pass in:
[[1,2], [3,4]] you will get back [[1,3], [1,4], [2,3], [2,4]] (in no particular order)
so it is the cartesianProduct of the 2 sets passed in. This allows any number of sets:
[[1,2], [3,4], [5,6], [7]] returns [[1,3,5,7], [1,3,6,7], [1,4,5,7], [1,4,6,7], [2,3,5,7], [2,3,6,7], [2,4,5,7], [2,4,6,7]]
The elements are not required to have the same length.
@param {Array[]} superArray (which isn't mutated) is the array of all sets whose elements are to be matched up
*/
function cartesianProduct(superArray)
{
   //alternatively I could count up with indexes: [0,0,0] then [0,0,1] etc but that would be more complicated
   //although the only place this is currently used will have every element the same
   //so I could could count up in a number base which would be comparable complicated but easier to understand

   //TODO: validate cartesianProduct
   if(1 === superArray.length) return superArray;
   var results = firstCartesianProduct(superArray[0], superArray[1]);
   for (var i = 2; i < superArray.length; ++i)
   {
      results = nextCartesianProduct(results, superArray[i]);
   }
   return results;

   function firstCartesianProduct(array1, array2)
   {
      var results = [];
      for (var i = 0; i < array1.length; ++i)
      for (var j = 0; j < array2.length; ++j)
         results.push([array1[i], array2[j]]);
      return results;
   }
   function nextCartesianProduct(array1, array2)
   {
      var results = [];
      for (var i = 0; i < array1.length; ++i)
      for (var j = 0; j < array2.length; ++j)
      {
         var thisRow = array1[i].slice();  //copy array
         thisRow.push(array2[j]);  //the difference is here: array2[j] is added to a copy of array1[i] so that it will be on the same level
         results.push(thisRow);
      }
      return results;
   }
}
/*
inspired by: https://www.mathsisfun.com/combinatorics/combinations-permutations-calculator.html
TODO: consider adding function possibleCombinations({numberOfTypesOfObject: 3, numberOfObjectsChoosen: 2, orderMatters: true, canRepeat: true})
statisticalCombination(numberOfTypesOfObject, numberOfObjectsChoosen){return combinatorics({orderMatters: false, canRepeat: false});}
statisticalPermutation(numberOfTypesOfObject, numberOfObjectsChoosen){return combinatorics({orderMatters: true, canRepeat: false});}

Formulas (assuming indistinguishable objects but allowing duplicate results):
n=numberOfTypesOfObject, r=numberOfObjectsChoosen
orderMatters: false, canRepeat: false. n!/((n-r)!*r!)
orderMatters: true, canRepeat: false. n!/(n-r)!
orderMatters: false, canRepeat: true. (n+r-1)!/(r!*(n-1)!) I haven't seen this formula before
orderMatters: true, canRepeat: true. n^r
Note that for all but the last the factorial can be reduced before calculated
*/
