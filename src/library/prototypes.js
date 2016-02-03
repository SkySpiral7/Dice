if(Array.prototype.indexOf == undefined){  //just like native version
   Array.prototype.indexOf = function (obj, fromIndex) {  //overrides not overloads
       if(fromIndex==null) fromIndex = 0;  //if none provided. same as: arguments.length < 2 || fromIndex==undefined || fromIndex==null
       else if(fromIndex < 0) fromIndex = Math.max(0, this.length + fromIndex);  //can index from end
      for(var i = fromIndex; i < this.length; i++){
          if(this[i] === obj) return i;
      }
       return -1;
   };
}
/*if(Array.prototype.replaceAllLiteral == undefined){Array.prototype.replaceAllLiteral = function(oldValue, newValue){
   for(var i=0; i < this.length; i++)
       if(this[i]==oldValue) this[i]=newValue;
   return this;
}}*/
if(Array.prototype.toSource == undefined){Array.prototype.toSource = function(){  //not standard but is out there
    var results='[';
   for(var i=0; i < this.length; i++)
   {
       if(this[i] instanceof Array) results+=this[i].toSource();
       else results+=''+this[i];  //can't call toString() due to undefined etc
       if(i+1 < this.length) results+=', ';
   }
    return (results+']');
}};
/*if(Array.prototype.applyToAll == undefined){Array.prototype.applyToAll = function(functionGiven, parametersBefore, parametersAfter){
    if(typeof(functionGiven)!="function" && typeof(functionGiven)!="object") return;  //do nothing and return undefined
   for(var i=0; i < this.length; i++)
       this[i]=functionGiven(each parametersBefore, this[i], each parametersAfter);  //not deep and not the same as a new object
   return this;
}}*/
if(Array.prototype.removeIndex == undefined){Array.prototype.removeIndex = function(index){return this.splice(index, 1);}}  //remove from array and return removed element
if(Array.prototype.removeElement == undefined){Array.prototype.removeElement = function(obj){
    var foundIndex=this.indexOf(obj);
    this.removeIndex(foundIndex);
    return foundIndex;
}}
if(Array.prototype.summation == undefined){
   Array.prototype.summation = function () {
       var total=0;
      for (var i=0; i < this.length; i++)
      {
          if(this[i] instanceof Array) total+=this[i].summation();  //is deep
         else
         {
             var thisValue=Number(this[i]);  //catches empty string, null, undefined and NaN. although a few of those return 0 but that's fine too (does the same thing)
             if(!isNaN(thisValue)) total+=thisValue;
         }
      }
       return total;
   };
}
if(String.prototype.contains == undefined){String.prototype.contains=function(substring){return (this.indexOf(substring) !== -1);};}
if(String.prototype.trim == undefined){String.prototype.trim=function(){return this.replace(/^\s+|\s+$/g, '');};}
if(String.prototype.endsWith == undefined){String.prototype.endsWith = function(suffix) {
    return (this.indexOf(suffix, this.length - suffix.length) !== -1);
};}
if(String.prototype.startsWith == undefined){String.prototype.startsWith = function(prefix) {
    return (this.indexOf(prefix) === 0);
};}
Array.prototype.contains=function(obj){
   for(var i = 0; i < this.length; i++){
       if(this[i] == obj) return true;
   }
    return false;
};
Array.prototype.containsExact=function(obj){  //same as indexOf() !== -1
   for(var i = 0; i < this.length; i++){
       if(this[i] === obj) return true;
   }
    return false;
};
if(Math.factorial == undefined){Math.factorial = function(numberGiven){  //do not use recursion. this is important!
    //Math doesn't have a .prototype which is funny because I can add to it anyway
    //prototype adds it to instances of it but Math is static so it can't have it
    if(typeof(numberGiven)!='number') return NaN;  //it does not attempt to type convert
    if(numberGiven < 0 || Math.floor(numberGiven)!=numberGiven) return undefined;
    //factorial is actually defined for both of these cases but I do not know how to calculate them
    if(numberGiven == Infinity) return Infinity;  //to prevent getting stuck in the loop
    var result=1;  //starts as 1 so that any number can be multiplied into it
    for(var i=2; i <= numberGiven; i++) result*=i;  //start at 2 because it is pointless to mutliple by 1
   return result;  //if numberGiven is 1 or 0 then return 1
}}
