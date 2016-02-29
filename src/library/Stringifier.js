'use strict';
var Stringifier = {};
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
