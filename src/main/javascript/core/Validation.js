'use strict';
//TODO: all in file: test
//TODO: add namespace Validation
/**@throws Error if actualObject is not an instanceof constructor.*/
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
/**@throws Error if actualNumber is not an integer. See Number.isInteger.*/
function requireInteger(actualNumber)  //might not be a number
{
   if(!Number.isInteger(actualNumber)) throw new Error('Expected Integer. Got type: ' + typeof(actualNumber) +
      ' with toString: ' + actualNumber);
}
/**@throws Error if actualNumber is not a natural number. See Number.isNatural.*/
function requireNaturalNumber(actualNumber)  //might not be a number
{
   if(!Number.isNatural(actualNumber)) throw new Error('Expected Natural Number. Got type: ' + typeof(actualNumber) +
      ' with toString: ' + actualNumber);
}
/**@throws Error if actualObject doesn't have type expectedType.*/
function requireTypeOf(expectedType, actualObject)
{
   if('string' !== typeof(expectedType)) throw new Error('Programming error. expectedType is type ' + typeof(constructor));
   if(expectedType !== typeof(actualObject)) throw new Error('Expected: ' + expectedType + '. Got: ' + typeof(actualObject)
      + ' with toString: ' + actualObject);
}
