'use strict';
//TODO: re: all in file: test, move it somewhere, and doc
function cartesianProduct(superArray)
{
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
function requireTypeOf(expectedType, actualObject)
{
   if('string' !== typeof(expectedType)) throw new Error('Programming error. expectedType is type ' + typeof(constructor));
   if(expectedType !== typeof(actualObject)) throw new Error('Expected: ' + expectedType + '. Got: ' + typeof(actualObject)
      + ' with toString: ' + actualObject);
}
function requireInstanceOf(constructor, actualObject)
{
   if('function' !== typeof(constructor)) throw new Error('Programming error. constructor is type ' + typeof(constructor));
   //edge case: null is type object
   if(null === actualObject) throw new Error('Expected: ' + constructor.name + '. Got null');
   if('object' !== typeof(actualObject)) throw new Error('Expected: ' + constructor.name + '. Got type: ' + typeof(actualObject)
      + ' with toString: ' + actualObject);
   if(!(actualObject instanceof constructor)) throw new Error('Expected: ' + constructor.name + '. Got: ' + actualObject.constructor.name
      + ' with toString: ' + actualObject);
}
function requireNaturalNumber(actualObject)
{
   if(!Number.isNatural(actualObject)) throw new Error('Was type: ' + typeof(actualObject) + ' with toString: ' + actualObject);
}
function getError(functionToCall, args)
{
   try{functionToCall.apply(undefined, args);}
   catch(e){return e;}
}
