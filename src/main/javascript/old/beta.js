function groupParser(groupString){  //TODO tons of testing. and make a loud option returned as the 2nd element
   //TODO have a before and after string but keep the rest as is (objects)
   //<a>You can sepperate multiple kinds of grand totals with ; or , each of which will be displayed in the same result box.</a><br />
   //<a>Note: Due to the use of parentheses there is no reason to affect the combination of each number sepperated by ; or , (which isn't totalled togther anyway).</a><br />
    if(!groupString.contains("{") || !groupString.contains("}")) return silentRollDice(groupString);
   while (groupString.contains("{"))
   {
       var parseArray=findFirstCompleteCurlyBrackets(groupString);
       if(parseArray == null) throw new Error('{} wasn\'t paired');  //TODO wrong bracket order
       var sendArray=parseInner(parseArray[1]);  //array of sums
       var outsource=new numberGroup(parseArray[2]);  //modifiers end at [,+{}]
       outsource.dropDoing(sendArray);  //sendArray is changed
       groupString=parseArray[0]+"["+outsource.minMaxDoing(sendArray.summation())+"]"+numberGroup(parseArray[2]);
       //TODO I want {1d20, 1d6, 1d4}dl1 to return an array.length==2 but then what? do I allow ({1d20, 1d6, 1d4}dl1).summation()?
   }
    return eval(groupString);  //so that it will be an array (or number) instead of string
   function parseInner(stringGiven){  //TODO have something like this for dicepool so it can have named dice in the constructor (typeof will say if such an object exists)
       var result=[];
      while (stringGiven.length>0)
      {
         if (stringGiven.charAt(0)=='[')
         {
             var arrayReturnValue=getArray(stringGiven);
             if(arrayReturnValue[1]==undefined) throw new Error('[] wasn\'t paired');  //TODO
             result.push(arrayReturnValue[1].summation());
             stringGiven=arrayReturnValue[0];
         }
         else
         {
             var firstPart=(/^.+?,/).exec(stringGiven)[0];  //convert to string
             if(firstPart=="null") firstPart=stringGiven;
             else firstPart=firstPart.substring(0, firstPart.length-1);
             result.push(silentRollDice(firstPart));
             stringGiven=stringGiven.substring(firstPart.length);
         }
          if(stringGiven.charAt(0)==',') stringGiven=stringGiven.substring(1);
          stringGiven=stringGiven.trim();
      }
       return result;
      function getArray(arrayStringGiven){
          if(arrayStringGiven.charAt(0)!='[') return [arrayStringGiven];  //[1] is undefined
          var bracketCount=1;
          var builtArray='[';
         for (var i=1; bracketCount>0 && i < arrayStringGiven.length; i++)
         {
             if(arrayStringGiven.charAt(i)=='[') bracketCount++;
             else if(arrayStringGiven.charAt(i)==']') bracketCount--;
             builtArray+=arrayStringGiven.charAt(i);
         }
          if(bracketCount>0) return [arrayStringGiven];  //[1] is undefined
          return [arrayStringGiven.substring(builtArray.length), eval(builtArray)];  //if(arrayStringGiven.length==builtArray.length) then [0] is the empty string
      };  //from string array get that array and return it and the remaining string
   }
}
function findFirstCompleteCurlyBrackets(totalString){
    if(!totalString.contains("{") || !totalString.contains("}")) return null;  //contains no groups
    if(!(/[{].*?[}]/).test(totalString)) return null;  //are not grouped correctly
    var innerText=(/^.*?[}]/).exec(totalString)[0];  //catch all up to the first close brace (including the brace itself)
    var afterText=totalString.substring(innerText.length);  //everything after
    innerText=innerText.substring(0, innerText.length-1);  //remove '}'
    var beforeText=innerText;  //copy for now
    innerText=(/[{].*?$/).exec(innerText)[0];  //catch all after the first open brace (including the brace itself)
    beforeText=beforeText.substring(0, (beforeText.length-innerText.length));  //from 0 to beforeText if it didn't have innerText. in order to remove it
    innerText=innerText.substring(1);  //remove '{'
    return [beforeText, innerText, afterText];  //innermost does not have {} which are gone
}

/**
This is prebuilt function for rolling a contested roll in the game Legend of the Five Rings (L5R).

@param {object} input with: ?circumstanceBonus, ?numberOfRaises, targetNumber, diceRolled, diceKept, ?hasEmphasis, ?randomSource
@returns {object} with: valuesKept[], totalValue, voidPointsRecovered, valuesDropped[], success
*/
Prebuilt.L5RContestedRoll = function(inputA, inputB, randomSource)
{
/*This was removed from prod because it turned out to be a requirements and implementation nightmare:
- A contested roll has a TN of your opponent unlike comparing rolls which has a TN for you both and then you
   compare your results
- errata: if both raise and 1 wins by 3 then both fail
- So if I don't take a raise but lose then my action still succeeds (although out-done)?
- Likewise the action of the loser auto-fails if he took any raises?
- If the difference is less than 5 then it was too close to tell who won.
- So if the roll results are 1 and 11 and B took a raise is the difference 10 or 5?

I don't know if comparing rolls is actually a thing and there are a few issues with that as well:
- Whether your action failed or succeeded is well established but:
- There's the same issue with difference: does it count the raises?
- "who succeeded more" is kind of impossible to tell. So is success only based on who took the most number
   of "do it faster" raises without failing?
*/
   var output = {};

   inputA.randomSource = inputB.randomSource = randomSource;

   //targetNumber is defaulted to effectively 0
   //++circumstanceBonus because targetNumber isn't normally allowed to be 0
   inputA.targetNumber = 1;
   if(undefined === inputA.circumstanceBonus) inputA.circumstanceBonus = 0;
   ++inputA.circumstanceBonus;

   //TN0 because the only way to fail the action of a contested roll is by taking raises
   inputB.targetNumber = 1;
   if(undefined === inputB.circumstanceBonus) inputB.circumstanceBonus = 0;
   ++inputB.circumstanceBonus;

   output.resultA = L5R.GeneralRoll(inputA);
   output.resultB = L5R.GeneralRoll(inputB);

   var effectiveATotal = output.resultA.totalValue + (inputB.numberOfRaises * 5);
   var effectiveBTotal = output.resultB.totalValue + (inputA.numberOfRaises * 5);

   //errata: if both raise and 1 wins by 3 then both fail
   output.resultA.success = (output.resultA.totalValue >= effectiveBTotal);
   output.resultB.success = (output.resultB.totalValue >= effectiveATotal);

   output.didTie = (!output.resultA.success && !output.resultA.success);  //if they both fail
   output.contestDifference = (effectiveATotal - effectiveBTotal);
   output.didTie = (output.didTie || Math.abs(output.contestDifference) < 5);  //or if too close

   return output;
};

TestSuite.Prebuilt.L5RContestedRoll = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], inputA, inputB, randomSource, resultA, resultB, expected, actual, stringValue;

   try{
   inputA = {circumstanceBonus: 1, numberOfRaises: 1, diceRolled: 2, diceKept: 1, hasEmphasis: true};
   //the die can't be optimized to 9 sided because of compound exploding:
   randomSource = numberGenerator.dice(10, [1, 10,10,3, 6, 2,  5, 6]);  //reroll, explosions, last is ignored
   resultA = {valuesKept: [6,23], totalValue: 30, voidPointsRecovered: 1, valuesDropped: [2], success: true};

   inputB = {diceRolled: 1, diceKept: 1};
   resultB = {valuesKept: [5], totalValue: 5, voidPointsRecovered: 0, valuesDropped: [], success: true};

   actual = Prebuilt.L5RContestedRoll(inputA, inputB, randomSource);
   expected = {resultA: resultA, resultB: resultB, didTie: false, contestDifference: 20};
   testResults.push({Expected: expected, Actual: actual, Description: 'Happy path, all values, clear winner'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   return TestRunner.displayResults('Prebuilt Prebuilt.L5RContestedRoll', testResults, isFirst);
};
