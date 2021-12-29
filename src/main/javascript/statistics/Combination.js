'use strict';
const Combination = {};
/**
 This function returns every possible combination of each element passed in.
 What it does is a little hard to describe. If you pass in:
 [[1,2], [3,4]] you will get back [[1,3], [1,4], [2,3], [2,4]] (in no particular order)
 so it is the cartesianProduct of the 2 sets passed in. This allows any number of sets:
 [[1,2], [3,4], [5,6], [7]] returns [[1,3,5,7], [1,3,6,7], [1,4,5,7], [1,4,6,7], [2,3,5,7], [2,3,6,7], [2,4,5,7], [2,4,6,7]]
 The elements are not required to have the same length.
 @param {Array[]} superArray (which isn't mutated) is the array of all sets whose elements are to be matched up
 */
Combination.cartesianProduct = function(superArray)
{
   //alternatively I could count up with indexes: [0,0,0] then [0,0,1] etc but that would be more complicated
   //although the only place this is currently used will have every element the same
   //so I could could count up in a number base which would be comparable complicated but easier to understand

   //TODO: validate cartesianProduct
   if(2 > superArray.length) return superArray;
   let results = firstCartesianProduct(superArray[0], superArray[1]);
   for(var i = 2; i < superArray.length; ++i)
   {
      results = nextCartesianProduct(results, superArray[i]);
   }
   return results;

   function firstCartesianProduct(array1, array2)
   {
      const results = [];
      for(let i = 0; i < array1.length; ++i)
      {
         for(let j = 0; j < array2.length; ++j)
         {
            results.push([array1[i], array2[j]]);
         }
      }
      return results;
   }

   function nextCartesianProduct(array1, array2)
   {
      const results = [];
      for(let i = 0; i < array1.length; ++i)
      {
         for(let j = 0; j < array2.length; ++j)
         {
            const thisRow = array1[i].copy();
            //the difference is here: array2[j] is added to a copy of array1[i] so that it will be on the same level
            thisRow.push(array2[j]);
            results.push(thisRow);
         }
      }
      return results;
   }
};
/**
 * In statistics this is a "combination" function as in "5 choose 2" would be the args (5, 2).
 * In stats this is written as a big () with 5 above 2.
 * orderMatters: false, canRepeat: false
 * Example: drawing 2 names out of a hat of 5 people to form teams.
 * I can't call this function combination because it wouldn't be clear what it does.
 */
Combination.choose = function(numberOfTypesOfObject, numberOfObjectsChosen)
{
   return Combination.countPossibilities(
      {numberOfTypesOfObject: numberOfTypesOfObject, numberOfObjectsChosen: numberOfObjectsChosen, orderMatters: false, canRepeat: false});
};
/**
 * In statistics this is a "permutation" function as in "10 pick 3" would be the args (10, 3).
 * orderMatters: true, canRepeat: false
 * Example: the first 3 people in a race of 10 that can't tie
 * Calling this function permutation is more clear than "pick" although asymmetrical with "choose".
 */
Combination.permutation = function(numberOfTypesOfObject, numberOfObjectsChosen)
{
   return Combination.countPossibilities(
      {numberOfTypesOfObject: numberOfTypesOfObject, numberOfObjectsChosen: numberOfObjectsChosen, orderMatters: true, canRepeat: false});
};
/**
 * Examples:
 * orderMatters && canRepeat: a 3 digit base 10 lock (should be called a permutation lock)
 * orderMatters && !canRepeat: the first 3 people in a race that can't tie (someone can't be in multiple places). This is typical
 * permutation function (aka pick)
 * !orderMatters && canRepeat: 3 scoops of 5 flavors of ice cream
 * !orderMatters && !canRepeat: drawing names out of a hat to form teams. This is typical combination function (aka choose)
 *
 * When canRepeat the objects are indistinguishable.
 *
 * @param args object of numberOfTypesOfObject: number, numberOfObjectsChosen: number, orderMatters: boolean, canRepeat: boolean. All 4
 *    props are required.
 * @returns {number}
 */
Combination.countPossibilities = function(args)
{
   /*
   inspired by: https://www.mathsisfun.com/combinatorics/combinations-permutations-calculator.html
   Formulas
   n=numberOfTypesOfObject, r=numberOfObjectsChosen
   orderMatters: true, canRepeat: true. n^r
   orderMatters: true, canRepeat: false. n!/(n-r)!
   orderMatters: false, canRepeat: true. (n+r-1)!/(r!*(n-1)!) I haven't seen this formula before
   orderMatters: false, canRepeat: false. n!/((n-r)!*r!)
   */
   if(args.orderMatters && args.canRepeat)
   {
      //used for number bases
      //formula: n^r
      return Math.pow(args.numberOfTypesOfObject, args.numberOfObjectsChosen);
   }

   let numeratorArray, denominatorArray;
   if(args.orderMatters && !args.canRepeat)
   {
      //Combination.permutation
      //formula: n!/(n-r)!
      //= numberOfTypesOfObject!/(numberOfTypesOfObject-numberOfObjectsChosen)!
      numeratorArray = toFactorialArray(args.numberOfTypesOfObject);
      denominatorArray = toFactorialArray(args.numberOfTypesOfObject - args.numberOfObjectsChosen);
   }
   else if(!args.orderMatters && args.canRepeat)
   {
      //I haven't seen this formula before
      //formula: (n+r-1)!/(r!*(n-1)!)
      //= (numberOfTypesOfObject+numberOfObjectsChosen-1)!/(numberOfObjectsChosen!*(numberOfTypesOfObject-1)!)
      numeratorArray = toFactorialArray(args.numberOfTypesOfObject + args.numberOfObjectsChosen - 1);

      denominatorArray = toFactorialArray(args.numberOfObjectsChosen);
      denominatorArray = denominatorArray.concat(toFactorialArray(args.numberOfTypesOfObject - 1));
   }
   else if(!args.orderMatters && !args.canRepeat)
   {
      //Combination.choose
      //formula: n!/((n-r)!*r!)
      //= numberOfTypesOfObject!/((numberOfTypesOfObject-numberOfObjectsChosen)!*numberOfObjectsChosen!)
      numeratorArray = toFactorialArray(args.numberOfTypesOfObject);

      denominatorArray = toFactorialArray(args.numberOfTypesOfObject - args.numberOfObjectsChosen);
      denominatorArray = denominatorArray.concat(toFactorialArray(args.numberOfObjectsChosen));
   }
   else
   {
      throw new Error('orderMatters and canRepeat properties are required');
   }

   reduceFactorialDivision(numeratorArray, denominatorArray);
   const numerator = factorialArrayToNumber(numeratorArray);
   const denominator = factorialArrayToNumber(denominatorArray);
   return numerator / denominator;

   /**
    * Returned array does not include 1 since there's no reason to multiply by 1.
    * Therefore 3=> [3,2], 2 => [2], 1 => [], 0 => []
    */
   function toFactorialArray(number)
   {
      const result = [];
      //no point to include 1 but needs to include number
      for(let i = 2; i <= number; ++i)
      {
         result.push(i);
      }
      return result;
   }

   /**
    * returns nothing because both inputs are modified
    */
   function reduceFactorialDivision(numeratorArray, denominatorArray)
   {
      //have to iterate backwards so that the array length can safely change without skipping
      for(let i = denominatorArray.length - 1; i >= 0; i--)
      {
         const sharedValue = denominatorArray[i];
         if(numeratorArray.contains(sharedValue))
         {
            /* removeElement removes the first matching element. if there's more than 1 then the current element will
             * be examined again next pass and thus not skipped over. if the element is unique
             * then the next pass will be the element before the removed one as normal. */
            numeratorArray.removeElement(sharedValue);
            denominatorArray.removeElement(sharedValue);
         }
      }
   }

   /**
    * An empty array correctly returns 1 (1! and 0! are both 1)
    */
   function factorialArrayToNumber(factorialArray)
   {
      let result = 1;
      for(let i = 0; i < factorialArray.length; ++i)
      {
         result *= factorialArray[i];
      }
      return result;
   }
};
/**
 * @param attempts the total number of events which is the maximum number of successes
 * @param successProb the probability of a single attempt succeeding
 * @returns {Array} array of objects with result (a number from 0 to attempts including both) and probability (chance of that result)
 * will always include every possible outcome even if precision loss has reduced the probability to 0.
 */
Combination.binomialDistribution = function(attempts, successProb)
{
   const result = [];
   //needs to be 0 to = attempts because those are every possible outcome
   for(let targetSuccessCount = 0; targetSuccessCount <= attempts; ++targetSuccessCount)
   {
      result.push({result: targetSuccessCount, probability: probabilityMassFunction(targetSuccessCount, attempts, successProb)});
   }
   return result;

   function probabilityMassFunction(targetSuccessCount, max, successProb)
   {
      const targetSuccessProb = Math.pow(successProb, targetSuccessCount);

      const failProb = (1 - successProb);
      const targetFailCount = (max - targetSuccessCount);
      const targetFailProb = Math.pow(failProb, targetFailCount);

      const numberOfWaysThisCanHappen = Combination.choose(max, targetSuccessCount);

      return numberOfWaysThisCanHappen * targetSuccessProb * targetFailProb;
   }
};
