'use strict';
var Stringifier = {};
/**
@param {!object} rollResults the results of Prebuilt.PathfinderAttack
@returns {!string} a human readable description of those results
*/
Stringifier.PathfinderAttack = function(attackResults)
{
   if(undefined === attackResults.damage) return attackResults.attack + '.';
   if(0 === attackResults.damage.lethal && 0 === attackResults.damage.nonLethal) return attackResults.attack + ' but damage reduction has reduced it all.';
   var output = attackResults.attack + ' dealing ';
   if(0 !== attackResults.damage.lethal) output += attackResults.damage.lethal + ' points of damage';
   if(0 !== attackResults.damage.lethal && 0 !== attackResults.damage.nonLethal) output += ' and ';
   if(0 !== attackResults.damage.nonLethal) output += attackResults.damage.nonLethal + ' points of non-lethal damage';
   output = output.replace(/ 1 points/g, ' 1 point');
   return output + '.';
};
/**
@param {!object} rollResults the results of Prebuilt.L5RGeneralRoll
@returns {!string} a human readable description of those results
*/
Stringifier.L5RGeneralRoll = function(rollResults)
{
   {  //block of first output line
      var output;
      if(rollResults.valuesDropped.length > 0) output = 'Values kept: ';
      else output = 'Values: ';

      output += rollResults.valuesKept.toString().replace(/,/g, '+');
      var keptSum = Math.summation(rollResults.valuesKept);
      output += ' = ' + keptSum;

      if (keptSum !== rollResults.totalValue)
      {
         //it's ok to reverse engineer the circumstanceBonus because it's easy to do
         //and it would be silly to have circumstanceBonus in the output of the Prebuilt
         if(keptSum < rollResults.totalValue) output += '+';
         output += '' + (rollResults.totalValue - keptSum);
         output += ' = ' + rollResults.totalValue;
      }
      output += '\n';
   }

   output += 'Void points recovered: ' + rollResults.voidPointsRecovered + '. ';
   output += 'Result: ' + (rollResults.success ? 'Success' : 'Failure') + '\n';

   if(rollResults.valuesDropped.length > 0) output += 'Values dropped: ' + rollResults.valuesDropped.toString() + '\n';

   return output;
};
/**
@param {!object} attackResults the results of Prebuilt.WarhammerAttackUnit
@returns {!string} a human readable description of those results
*/
Stringifier.WarhammerAttackUnit = function(attackResults)
{
   if(0 === attackResults.hit) return 'None hit.';
   var output = 'Number hit: ' + attackResults.hit + '. ';

   if(0 === attackResults.wounded) return output + 'None wounded.';
   output += 'Number wounded: ' + attackResults.wounded + '. ';

   if(0 === attackResults.unsavedWounds) return output + 'All Saved.';
   output += 'Unsaved Wounds: ' + attackResults.unsavedWounds + '.';

   return output;
};
