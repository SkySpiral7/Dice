function numberGroup(diceStringGiven){  //TODO: rename. maybe add successes later
    var dropKeepSwitch="None";
    var lowHighSwitch="None";
    var dropKeepValue=0;
    var minMaxSwitch="None";
    var minMaxValue=0;
    var sortDirection="None";
   this.getStats = function(){
       var returnObject={};
       returnObject.dropKeepSwitch=dropKeepSwitch;
       returnObject.lowHighSwitch=lowHighSwitch;
       returnObject.dropKeepValue=dropKeepValue;
       returnObject.minMaxSwitch=minMaxSwitch;
       returnObject.minMaxValue=minMaxValue;
       returnObject.sortDirection=sortDirection;
       return returnObject;
   };
   function minMaxCounting(holder){  //doesn't need to know this
       if(minMaxSwitch!="None") throw new Error("More than one min/max criteria specified. This is not possible.");
      if (combineRegex(DicePool.minMaxRegexStart, /-?\d+/).test(holder))
      {
          if((/max/).test(holder)) minMaxSwitch="Max";  //contains the word max
          else minMaxSwitch="Min";
          holder=holder.replace(DicePool.minMaxRegexStart, "");  //chop off
          minMaxValue=parseInt(holder);  //to capture the number
          holder=holder.replace(/^-?\d+/, "");
      }
       return holder;
   };
   this.minMaxDoing = function(total){
       if(minMaxSwitch=="None") return total;
       if(minMaxSwitch=="Min" && total < minMaxValue) return minMaxValue;  //did not reach min
       else if(minMaxSwitch=="Max" && total > minMaxValue) return minMaxValue;  //exceeded max
       return total;
   };
   function dropCounting(holder, maxDrop){  //doesn't need to know this
       //first replace shorthand
       if(dropKeepValue!=0) throw new Error("More than one drop/keep criteria specified. This is not possible, instead add the numbers for a single criteria.");
      if (DicePool.dropKeepRegexShortHand.test(holder))
      {
          var replaceString=" ";
          if(holder.startsWith("d")) replaceString+="drop ";  //replace with words so I can use same code
          else replaceString+="keep ";
          if((/^[dk]h/).test(holder)) replaceString+="highest ";  //explict must be checked first
          else if((/^[dk]l/).test(holder)) replaceString+="lowest ";
          else if(holder.startsWith("d")) replaceString+="lowest ";  //defaults
          else replaceString+="highest ";
          if(!(/^[dk][hl]?\d+/).test(holder)) replaceString=" "+replaceString.trim();  //chop off trailing space unless it needs it for a #
          holder=holder.replace(/^[dk][hl]?/, replaceString);
      }
       if(holder.startsWith(' keep')) dropKeepSwitch='Keep';  //the word keep is the only way to keep drop on the other hands has synonyms
       else dropKeepSwitch='Drop';
       holder=holder.replace(combineRegex(DicePool.dropKeepRegexStart, /\s(?:the\s)?/), "");  //chop off
       if(holder.startsWith('low')) lowHighSwitch='Low';
       else lowHighSwitch='High';
       holder=holder.replace(/^(?:low|high)est/, "");  //will have one of those due to pre-processing checking (in main)
       if((/^\s\d+/).test(holder)) dropKeepValue=parseInt(holder);
       else dropKeepValue=1;
       if(dropKeepValue==0){dropKeepSwitch="None"; lowHighSwitch="None";}  //just ignore it
       holder=holder.replace(/^\s\d+/, "");  //delete
       return holder;
   };
   this.dropDoing = function(everyRoll){
       /*rolledValues.everyRoll=everyRoll;  //set for dropKeepValue==0. otherwise reset later
       rolledValues.droppedRolls=[];  //reset*/
       var droppedOnes=[];
      if (sortDirection!="None")
      {
          if(sortDirection=="a") everyRoll.sort(alphaNumAscending);
          else everyRoll.sort(alphaNumDescending);
      }
       if(dropKeepValue==0) return droppedOnes;  //save processing time and prevents a few problems. droppedOnes empty
       var numberedDiceRolled=[];
       var namedDiceRolled=[];
      for (var i=0; i < everyRoll.length; i++)
      {
          if(!isNaN(everyRoll[i])) numberedDiceRolled.push(everyRoll[i]);  //if the named die is a number it ends up here
          else namedDiceRolled.push(everyRoll[i]);
      }
       var effectiveDropCount=dropKeepValue;
       if(dropKeepSwitch=='Keep') effectiveDropCount=numberedDiceRolled.length-dropKeepValue;
       if(effectiveDropCount <= 0) return droppedOnes;  //save time. only possible if keeping too many. droppedOnes is empty
       if(effectiveDropCount > numberedDiceRolled.length) throw new Error("Number of values to ignore ("+dropKeepValue+") exceeds the number of values:\n"+numberedDiceRolled);
          //not enough values to drop

       var dropKeepDirection='Down';  //default sort descending
       if(dropKeepSwitch=='Keep' && lowHighSwitch=='High') dropKeepDirection="Up";  //"keep highest 3" sort ascending
       else if(dropKeepSwitch=='Drop' && lowHighSwitch=='Low') dropKeepDirection="Up";  //"drop lowest 3" sort ascending

       if(dropKeepDirection=="Up") numberedDiceRolled.sort(function(a, b){return a - b;});  //sort array. although ascending is default a function is needed due to below
       else numberedDiceRolled.sort(function(a, b){return b - a;});  //sort array descending
       for(var i=effectiveDropCount; i > 0; i--){droppedOnes.push(numberedDiceRolled.shift());}  //remove first numberedDiceRolled (pushing it on droppedOnes) until you drop the right number of them

       for(var i=0; i < droppedOnes.length; i++){everyRoll.removeElement(droppedOnes[i]);}  //of those that were dropped now remove them for real (instead of from the sorted copy)

       return droppedOnes;
   };
   function constructorCalled(diceStringGiven){
       var holder=diceStringGiven.toLowerCase().replace(/\s/g, ' ');  //replace all whitespace with space
      while (holder.length > 0)  //shorthand loop
      {
          if(DicePool.dropKeepRegexShortHand.test(holder)) holder=dropCounting(holder);
         else if ((/^s[ad]?/).test(holder))
         {
             if(sortDirection!="None") throw new Error("More than one sort direction specified. This is not possible.");
             holder=holder.substring(1);  //chop off 's'
             if((/^[ad]/).test(holder)){sortDirection=holder.charAt(0); holder=holder.substring(1);}  //store then chop off 'd' or 'a'
             else sortDirection="a";  //default
         }
          else break;
      }
      while (holder.length > 0)  //so that everything can be any order. longhands
      {
          if(combineRegex(DicePool.dropKeepRegexStart, /\s(?:the\s)?(?:low|high)est(?:\s\d+)?/).test(holder)) holder=dropCounting(holder);
              //= /^\s(?:drop(?:ping)?|remov(?:e|ing)|ignor(?:e|ing)|keep(?:ping)?)\s(?:the\s)?(?:low|high)est(?:\s\d+)?/
          else if(combineRegex(DicePool.minMaxRegexStart, /-?\d+/).test(holder)) holder=minMaxCounting(holder);
         else if ((/^\ssort(?:(?:\sthe)?\sdice)?(?:\s(?:a|de)scending)?(?:\sorder)?/).test(holder) || (/^\ssort(?:(?:\sthe)?\sdice)?\sin(?:\s(?:a|de)scending)?\sorder/).test(holder))
         {
             if(sortDirection!="None") throw new Error("More than one sort direction specified. This is not possible.");
             if((/(?:a|de)scending/).test(holder)) holder=holder.replace(/^\ssort(?:(?:\sthe)?\sdice)?(?:\sin)?\s(?:a|de)scending(?:\sorder)?/, (/(a|de)scending/).exec(holder)[1]);
             else holder=holder.replace(/^\ssort(?:(?:\sthe)?\sdice)?(?:\sin)?(?:\sorder)?/, '');  //remove the text
             if(holder.startsWith('de')){sortDirection='d'; holder=holder.substring(2);}  //store then chop off 'de'
             else if(holder.startsWith('a')){sortDirection='a'; holder=holder.substring(1);}  //store then chop off 'a'
             else sortDirection="a";  //default
         }
          else break;
          //holder=holder.trim();  //just in case there is extra whitespace... except that whitespace is required
      }
       return holder;
   }
    if(arguments.length==0 || diceStringGiven==undefined) return;
    //TODO validity check string and number
    if(typeof(diceStringGiven)!='string') throw new Error("numberGroup("+diceStringGiven+") the parameter must be a string type");
    return constructorCalled(diceStringGiven);
}
