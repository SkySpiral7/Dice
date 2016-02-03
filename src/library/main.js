//TODO: this method of include assumes relative location
document.write('<script type="text/javaScript" src="library/DicePool.js"></script>');
document.write('<script type="text/javaScript" src="library/Die.js"></script>');
document.write('<script type="text/javaScript" src="library/Draw.js"></script>');
document.write('<script type="text/javaScript" src="library/examples.js"></script>');
document.write('<script type="text/javaScript" src="library/numberGroup.js"></script>');
document.write('<script type="text/javaScript" src="library/Polynomial.js"></script>');
document.write('<script type="text/javaScript" src="library/prototypes.js"></script>');
document.write('<script type="text/javaScript" src="library/special dice.js"></script>');
document.write('<script type="text/javaScript" src="library/stats util.js"></script>');

const Silent = true;

function combineRegex(regex1, regex2){
    var string1=(regex1+'').trim();  //convert them to strings
    var string2=(regex2+'').trim();
    if(string1.endsWith('\\\\/')) string1=string1.substring(0, string1.length-1);  //if ends with "\\/" then chop off trailing slash
    else if(string1.endsWith('/') && !string1.endsWith('\\/')) string1=string1.substring(0, string1.length-1);  //chop off trailing slash
    if(string2.charAt(0)=='/') string2=string2.substring(1);  //chop off leading slash
    return eval(string1+string2);  //returned as a regex object
};
function rollDice(holder){  //short cut. also needed for those that don't know javascript
    return new DicePool(holder, argumentsToArray(arguments, 1)).sumRoll(!Silent);  //DicePool will validate
};
function silentRollDice(holder){  //short cut like above
    return new DicePool(holder, argumentsToArray(arguments, 1)).sumRoll(Silent);  //DicePool will validate
};
function isBotch(numberArray, botchValue){
    if(botchValue==undefined) botchValue=1;  //this means that the botch value can't be undefined
    if(typeof(numberArray)=="number") return (numberArray==botchValue);
    if(!(numberArray instanceof Array)) throw new Error("isBotch("+numberArray+", ~) the first parameter must be an array or a number");
   for (var i=0; i < numberArray.length; i++)
   {
       if(numberArray[i]!=botchValue) return false;
   }
    return true;
};
function argumentsToArray(argumentsGiven, fromIndex){
    if(argumentsGiven==undefined) return undefined;
    if(fromIndex==undefined) fromIndex=0;
    if((argumentsGiven.length-fromIndex)==1 && (argumentsGiven[fromIndex] instanceof Array)) return argumentsGiven[fromIndex];
       //if the last argument is the only one to be looked at and it is an array then return it so to prevent returning an array array
    var returnArray=[];
    for(var i=fromIndex; i < argumentsGiven.length; i++){if(argumentsGiven[i]!=undefined) returnArray.push(argumentsGiven[i]);}
    if(returnArray.length==0) return undefined;  //indicate that there are no defined values from that index
    return returnArray;
};

function alphaNumAscending(a, b){
    if(!isNaN(a) && !isNaN(b)) return (a-b);
    if(!isNaN(a) && isNaN(b)) return -1;
    if(isNaN(a) && !isNaN(b)) return 1;
    if(a > b) return 1;
    if(a < b) return -1;
    return 0;
}
function alphaNumDescending(a, b){
    if(!isNaN(a) && !isNaN(b)) return (b-a);
    if(!isNaN(a) && isNaN(b)) return -1;
    if(isNaN(a) && !isNaN(b)) return 1;
    if(a > b) return -1;
    if(a < b) return 1;
    return 0;
}
function sumAscending(a,b){return a[0]-b[0];}
