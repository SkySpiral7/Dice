/*
http://home.windstream.net/fcsi/Penetratinghits.txt
http://www.pryderockindustries.com/downloads/gameaids/tables_bt_bmrr_tw_grey.pdf
http://www.sarna.net/wiki/CBT_Tables
? http://mwomercs.com/forums/topic/5855-internal-structure-and-critical-hits/
*/
function OneRollEngine(numberOfDice){  //TODO more dice: Expert, hard, wiggle, Awesome, trump
    //http://en.wikipedia.org/wiki/One-Roll_Engine for details on other dice types
    if(typeof(numberOfDice)!="number") throw new Error("OneRollEngine("+numberOfDice+") parameter must be a number type");
    var diceResults=new DicePool(numberOfDice+"d10sa").roll();  //sorted ascending
    var engineResults=[];
   for (var i=0; i < diceResults.length;)  //incrementing done in nested loop
   {
       var count=0;
       for(var thisValue=diceResults[i]; i < diceResults.length && diceResults[i]==thisValue; i++){count++;}
       engineResults.push(count+'x'+thisValue);  //results are still in order of Height ascending
   }
    return engineResults;
}
const AlwaysScatter = true;  //for below
function ScatterPool(alwaysScatter){
    if(alwaysScatter!=true) alwaysScatter=false;
    var myPool=new DicePool("2d6");  //each created only once
    var myScatterDie=new ScatterDie(alwaysScatter);
    //this.roll = function(){return myPool.roll();}  //avoids this function to show the difference
   this.scatter = function(balisticSkill, isSilent){
       if(isNaN(balisticSkill)) balisticSkill=0;
       var distance=(myPool.sumRoll(isSilent)-balisticSkill);  //silent default is handled by sumRoll
       var myScatter=myScatterDie.roll();  //get the result of the scatter die
       //TODO if !isSilent then write myScatter
       if(distance <= 0 || myScatter=='Direct Hit') return 'Direct Hit';
       return myScatter+', '+distance+' inches away';
   }
    if(this instanceof ScatterPool) return this;  //if this is an object instead of being called as a function
    myPool.addDie(myScatterDie);
    return myPool;  //as a function this returns the created DicePool
};
function ScatterDie(alwaysScatter){
    if(alwaysScatter!=true) alwaysScatter=false;
   this.roll = function(){  //pretends to be a named die
       var output="";
       if(!alwaysScatter && silentRollDice("1d3")==3) output+="Direct Hit";
       else output+=("Scatter Direction: "+silentRollDice("1z360")+" degrees");
       return output;
   }
    this.isFudge = function(){return false;};  //these are needed so that it can pose as a Die
    this.getSides = function(){return 360;};
   this.getStats = function(){
       var returnObject={};
       returnObject.nameArray=[];
       returnObject.isDieNegative=false;
       returnObject.doesUseZero=true;
       returnObject.isFudgeDie=false;
       returnObject.sideCount=360;
       returnObject.doesExplode=false;
       returnObject.doesPenetrate=false;
       returnObject.doesCompoundExplode=false;
       //so that these will be undefined
       //returnObject.rerollCriteria=rerollCriteria;
       //returnObject.explodeValue=explodeValue;
       returnObject.constantModifier=0;
       //returnObject.dieName=dieName;
       return returnObject;
   };
   this.getName = function(){
       return 'ScatterDie('+alwaysScatter+')';
   }
    return this.roll();  //if called as a function it returns the result of the roll
};
