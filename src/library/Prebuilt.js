'use strict';
var Prebuilt = {};
/**
 * This is prebuilt function for the Mistborn system, it rolls dice for a challenge roll type.
 * input (which may be mutated) is an object that contains:
 * diceCount: should be the raw number before the minium of 2 (or maximum of 10) is enforced because fewer dice is not the same as negative nudges
 * difficulty: optional, defaults to 1. must be 0 to 5. While a difficulty of 0 isn't possible for a challenge it is allowed so that this function can be used by a contest without difficulty.
 * nudges: optional, defaults to 0, must not be negative.
 * randomSource: optional, passed to DicePool.roll, see that for more info.
 *
 * output is an object that contains:
 * outcome: (using the highest result) will not be > 6 because no nudges are spent. Might be < -6 because rules are unclear what should happen in such cases (ditto for > 6)
 * nudges: 0+ none are spent
 * allResults: an array containing all results from highest to lowest (may be empty). returned because the rules allow choosing which one is used
 * {boolean} success: true if outcome isn't negative (nudges can't change a failure to a success)
 */
Prebuilt.MistbornChallenge = function(input)
{
   requireInteger(input.diceCount);
   //TODO: difficulty must be 0..5
   if(undefined === input.difficulty) input.difficulty = 1;
   requireInteger(input.difficulty);
   if(undefined === input.nudges) input.nudges = 0;
   //TODO: nudges must be 0+
   requireInteger(input.nudges);

   var outcomePenalty = 0;
   if (input.diceCount > 10)
   {
      input.nudges += (input.diceCount - 10);
      input.diceCount = 10;
   }
   else if (input.diceCount < 2)
   {
      outcomePenalty = (2 - input.diceCount);
      input.diceCount = 2;
   }

   var diceRolled = new DicePool(input.diceCount + 'd6').roll(input.randomSource);
   diceRolled.sort();
   diceRolled.reverse();

   //count nudges
   while (6 === diceRolled[0])
   {
      ++input.nudges;
      diceRolled.shift();
   }

   //remove first occurrence of each number
   for (var i = 1; i < 6; ++i)
   {
      if(diceRolled.contains(i)) diceRolled.removeElement(i);
   }
   var highestResult = 0;  //0 is used if there are no pairs
   if(0 !== diceRolled.length) highestResult = diceRolled[0];

   var output = {};
   output.allResults = [];
   for (var i = highestResult; i > 0; --i)  //No need to check for ones higher than highestResult. Counting down puts them in the right order too
   {
      if(diceRolled.contains(i)) output.allResults.push(i);  //3+ of a kind is the same as a pair so no need to count the occurrences
   }

   output.outcome = highestResult - input.difficulty - outcomePenalty;
   output.success = (output.outcome >= 0);

   output.nudges = input.nudges;
   return output;
};
/*
 * This is prebuilt function for the Mistborn system, it rolls dice for a contest roll type.
 * character1 and character2 are 2 objects that will each be passed to Prebuilt.MistbornChallenge (see function for details) however the difficulty (for each) defaults to 0.
 *
 * output is an object that contains:
 * winner which is either "Character 1", "Character 2", "Both failed", or "Tie"
 * outcome which is likely between s
 *
Prebuilt.MistbornContest = function(character1, character2)
{
   if(undefined === character1.difficulty) character1.difficulty = 0;
   var result1 = Prebuilt.MistbornChallenge(character1);
   if(undefined === character2.difficulty) character2.difficulty = 0;
   var result2 = Prebuilt.MistbornChallenge(character2);

   var output = {character1: {nudges: character1.nudges, success: result1.success}, character2: {nudges: character2.nudges, success: result2.success}};
   //if both pass then subtract results like normal
   //if both fail then that's a special kind of tie
   if (0 !== character1.difficulty && !result1.success && 0 !== character2.difficulty && !result2.success)
   {
      output.winner = 'Both failed';
      output.outcome = undefined;
      return output;
   }
   //if they both have difficulty and only 1 passes then he wins (subtract like normal)

   //if char1 has difficulty and passes (>= 0) and char2 has result >= 0 then subtract like normal (either could win)
   //if char1 has difficulty and fails (< 0) and char2 has result >= 0 then subtract like normal (char2 wins)
   //if char1 has difficulty and passes (>= 0) and char2 has result < 0 then subtract like normal (char1 wins)
   //if char1 has difficulty and fails (< 0) and char2 has result < 0. as per an example in the rules char2 can fail which must mean that the numbers are subtracted as normal
      //TODO: this is difficult to detect and I'm not sure what the outcome is

   if (result1.outcome > result2.outcome)
   {
      output.winner = 'Character 1';
      output.outcome = result1.outcome - result2.outcome;
   }
   else if (result1.outcome < result2.outcome)
   {
      output.winner = 'Character 2';
      output.outcome = result2.outcome - result1.outcome;
   }
   else if (result1.nudges > result2.nudges)
   {
      output.winner = 'Character 1';
      output.outcome = 0;
   }
   else if (result1.nudges < result2.nudges)
   {
      output.winner = 'Character 2';
      output.outcome = 0;
   }
   else
   {
      output.winner = 'Tie';
      output.outcome = undefined;
   }
   return output;
};
/*
No more Mistborn:
Extended contests just uses contest rules multiple times 2..5 (first one to X successes wins tie: nudges, tie: continue)
   tie can occur since they both act 1 per beat. output needs to say beats
   extended contest shouldn't be automated since there's supposed to be narrative each beat therefore just call contest multiple times manually
a contest of more than 2 people requires player input but uses contest rules
conflicts require player input
*/

/**
This is prebuilt function for rolling dice to attack in Pathfinder (the same rules probably apply to Dungeons and Dragons 3.5 and 3.0).

Simplified contract, given (input may be mutated):
{attackBonus, weapon: {minimumCritical, criticalMultiplier, damageString, flatDamageModifer, extraDamageDiceString}, opposingAc, damageReduction, randomSource}
returns:
{attack: 'Critical Miss'/'Miss'/'Hit'/'Critical Hit', damage: {nonLethal, lethal}}

Note that spells (with attacks) have crit 20/x2.
This function does not take into consideration:
missChances: spell failure, incorporeal, cover, concealment, spell resistance, spell DC, spells that provide miss changes
multiple attacks (attackBonus would be an array)
DR doesn't work on touch attacks, energy, etc
Combat maneuvers can't score threats (use a criticalMultiplier of 1)

It likewise assumes that the DR can be applied to all of the damage and applies DR to the lethal damage then the nonlethal damage (if any).
This function assumes the attack is lethal, nonlethal damage can only appear when the minimum damage is used.
*/
Prebuilt.PathfinderAttack = function(input)
{
   if(undefined === input.weapon) throw new Error("weapon object is required.");
   if(undefined === input.weapon.minimumCritical) input.weapon.minimumCritical = 20;
   else requireNaturalNumber(input.weapon.minimumCritical);
   if(input.weapon.minimumCritical > 20) throw new Error('Invalid weapon.minimumCritical. It was: ' + input.weapon.minimumCritical);
   if(undefined === input.weapon.criticalMultiplier) input.weapon.criticalMultiplier = 2;
   else requireNaturalNumber(input.weapon.criticalMultiplier);
   requireTypeOf('string', input.weapon.damageString);
   if(undefined === input.weapon.flatDamageModifer) input.weapon.flatDamageModifer = 0;
   else requireInteger(input.weapon.flatDamageModifer);
   if(undefined !== input.weapon.extraDamageDiceString) requireTypeOf('string', input.weapon.extraDamageDiceString);
   //TODO: move flatDamageModifer, extraDamageDiceString out of weapon (see next lines)
   //short: {offense: {attackBonus, flatDamageModifer, extraDamageDiceString, weapon: {minimumCritical, criticalMultiplier, damageString}},
      //targetDefense: {ac, damageReduction}, randomSource}
   //full: {offense: {attackBonus, flatDamageModifer, extraDamageDiceString, weapon: {minimumCritical, criticalMultiplier, damageString, attackBonus, flatDamageModifer, extraDamageDiceString}},
      //targetDefense: {ac, damageReduction}, randomSource}

   requireInteger(input.attackBonus);
   requireNaturalNumber(input.opposingAc);
   if(undefined === input.damageReduction) input.damageReduction = 0;
   else if(!Number.isInteger(input.damageReduction) || input.damageReduction < 0) throw new Error('Must be a non-negative integer but was ' + input.damageReduction);

   var output = {};
   output.toString = function(){return Stringifier.PathfinderAttack(this);};
   var d20 = new Die(20);
   var attackRolled = d20.roll(input.randomSource)[0];
   if(1 === attackRolled){output.attack = 'Critical Miss'; return output;}
   if(20 !== attackRolled && (input.attackBonus+attackRolled) < input.opposingAc){output.attack = 'Miss'; return output;}  //increased critical range doesn't increase auto-hits

   output.attack = 'Hit';
   var numberOfTimesToRollDamage = 1;
   if (attackRolled >= input.weapon.minimumCritical)
   {
      attackRolled = d20.roll(input.randomSource)[0];
      if ((input.attackBonus+attackRolled) >= input.opposingAc)  //a natural 20 on confirmation isn't special
      {
         output.attack = 'Critical Hit';
         numberOfTimesToRollDamage = input.weapon.criticalMultiplier;
      }
   }

   output.damage = {nonLethal: 0, lethal: 0};
   var damagePool = new DicePool(input.weapon.damageString);

   for (var i=0; i < numberOfTimesToRollDamage; ++i)
   {
      var sum = damagePool.sumRoll(input.randomSource);
      sum += input.weapon.flatDamageModifer;  //flat values like strength are always included in each damage
      if(sum < 1) ++output.damage.nonLethal;  //all damage has a minimum of 1 before DR. but becomes nonlethal
      else output.damage.lethal += sum;
   }
   //extra dice damage like sneak attack are always included only once
   if(undefined !== input.weapon.extraDamageDiceString) output.damage.lethal += new DicePool(input.weapon.extraDamageDiceString).sumRoll(input.randomSource);

   var damageToReduce = input.damageReduction;
   if (output.damage.lethal >= damageToReduce)
   {
      output.damage.lethal -= damageToReduce;
      //leave output.damage.nonLethal
      damageToReduce = 0;
   }
   else
   {
      damageToReduce -= output.damage.lethal;
      output.damage.lethal = 0;
      if(output.damage.nonLethal > damageToReduce) output.damage.nonLethal -= damageToReduce;
      else output.damage.nonLethal = 0;
   }

   return output;
};
/**
This is prebuilt function for rolling dice in the game Legend of the Five Rings (L5R).
Input's circumstanceBonus, numberOfRaises, and randomSource are optional.
Input's circumstanceBonus can also be negative to represent a penalty.
Note that the numberOfRaises will raise the targetNumber so don't pass in any free raises.
Likewise if a free raise was used to increase the result then instead add 5 to circumstanceBonus.

Simplified contract, given:
{?circumstanceBonus, ?numberOfRaises, targetNumber, diceRolled, diceKept, ?hasEmphasis, ?randomSource}
returns:
{valuesKept[], totalValue, voidPointsRecovered, valuesDropped[], success}

@param {object} input (which may be mutated) with: {?number: integer}circumstanceBonus, {?number: natural}numberOfRaises,
   {number: natural}targetNumber, {number: natural}diceRolled, {number: natural}diceKept,
   {?boolean}hasEmphasis, {?function}randomSource (see Die.roll)
@returns {object} with: {number[]: natural}valuesKept, {number: integer}totalValue, {number: integer}voidPointsRecovered,
   {number[]: natural}valuesDropped, {boolean}success
*/
//TODO: consider how to improve doc (for all functions)
Prebuilt.L5RGeneralRoll = function(input)
{
   if(undefined === input.circumstanceBonus) input.circumstanceBonus = 0;
   else if(!Number.isInteger(input.circumstanceBonus)) throw new Error('Must be an integer but was ' + input.circumstanceBonus);
   if(undefined === input.numberOfRaises) input.numberOfRaises = 0;
   else if(!Number.isInteger(input.numberOfRaises) || input.numberOfRaises < 0) throw new Error('Must be a non-negative integer but was ' + input.numberOfRaises);
   requireNaturalNumber(input.targetNumber);
   requireNaturalNumber(input.diceRolled);
   if(input.diceRolled > 10) throw new Error('It\'s never possible to roll more than 10 dice. input was: ' + input.diceRolled);
   requireNaturalNumber(input.diceKept);
   if(input.diceKept > input.diceRolled) throw new Error('diceKept (' + input.diceKept + ') is more than diceRolled (' + input.diceRolled + ')');
      //below doesn't use DicePool's KeepHighest therefore I must validate diceKept myself
   if(true !== input.hasEmphasis) input.hasEmphasis = false;

   input.targetNumber += (input.numberOfRaises * 5);  //increase difficulty

   var output = {valuesKept: [], totalValue: 0, voidPointsRecovered: 0, valuesDropped: [], success: undefined};
   output.toString = function(){return Stringifier.L5RGeneralRoll(this);};
   var dicePool = new DicePool(input.diceRolled + 'd10!!' + (input.hasEmphasis ? 'r1' : ''));

   var allValues = dicePool.roll(input.randomSource);
   allValues.sort(Number.ascending);

   //start with the highest number and count down until there's no explosion
   for (var i = allValues.length - 1; i >= 0 && allValues[i] >= 10; --i)
   {
      output.voidPointsRecovered += Math.floor(allValues[i] / 10);  //for each explode. most dice don't recover void
      //void points are recovered even for dice that are dropped
   }
   output.voidPointsRecovered = Math.floor(output.voidPointsRecovered / 2);  //every other explode

   var dropCount = (allValues.length - input.diceKept);
   output.valuesDropped = allValues.splice(0, dropCount);
   output.valuesKept = allValues;  //rename allValues since it has been mutated
   output.totalValue = Math.summation(output.valuesKept) + input.circumstanceBonus;  //circumstanceBonus may be negative

   output.success = (output.totalValue >= input.targetNumber);

   return output;
};
//There's no Prebuilt.WarhammerAttackWithTemplate because I don't know how they work (although I do know how scatter dice works)
/**
This is prebuilt function for Warhammer for when a unit attacks a unit.
This doesn't account for things like Helfrost or instant death.
Input's saveValue, reanimateOrNoPainValue, and randomSource are optional.
Output's wounded and unsavedWounds might not be present.

@param {object} (which may be mutated) with: diceCount, maxWounds, toHitValue, toWoundValue, ?saveValue, ?reanimateOrNoPainValue, ?randomSource
@returns {object} with: hit, ?wounded, ?unsavedWounds
*/
Prebuilt.WarhammerAttackUnit = function(input)
{
   Prebuilt.WarhammerAttackUnit._validateInput(input);
   //randomSource not validated because die will validate it

   var d6 = new Die();
   function rollD6Pool(name, count){return new DicePool(name, [{die: d6, dieCount: count}]).roll(input.randomSource);}
   var output = {};
   output.toString = function(){return Stringifier.WarhammerAttackUnit(this);};

   var attackRolled = rollD6Pool('hits', input.diceCount);
   output.hit = 0;
   for (var i = 0; i < attackRolled.length; ++i)
   {
      if(attackRolled[i] >= input.toHitValue) ++output.hit;
   }
   if(0 === output.hit) return output;

   attackRolled = rollD6Pool('wounds', output.hit);
   output.wounded = 0;
   for (var i = 0; i < attackRolled.length; ++i)
   {
      if(attackRolled[i] >= input.toWoundValue) ++output.wounded;
   }
   if(0 === output.wounded) return output;

   var savesRolled = rollD6Pool('saves', output.wounded);
   //all saves are rolled now then reanimateOrNoPainValue might be rolled. only a test would care about this order
   output.unsavedWounds = 0;
   for (var i = 0; i < savesRolled.length && input.maxWounds > output.unsavedWounds; ++i)
   {
      if (savesRolled[i] < input.saveValue)  //save failed
      {
         //the if > 6 check prevents an unneeded roll but is really to make testing easier
         if (input.reanimateOrNoPainValue > 6 || d6.roll(input.randomSource)[0] < input.reanimateOrNoPainValue)
         {
            ++output.unsavedWounds;
            //lost knowledge: last value of i (might not be savesRolled.length)
            //the game doesn't care about excessive wounds
         }
      }
   }
   return output;
};
/**Given valid input for Prebuilt.WarhammerAttackUnit, this function calculates the
chances of the number of wounds.
@param {object} (which may be mutated) with: diceCount, maxWounds, toHitValue, toWoundValue, ?saveValue, ?reanimateOrNoPainValue
@returns {object[]} a statistics object where the result is the number of wounds
*/
Prebuilt.WarhammerAttackUnit.Statistics = function(input)
{
   Prebuilt.WarhammerAttackUnit._validateInput(input);
   //randomSource isn't used in this function so ignore it

   var d6 = new Die();
   var workingStats = [{result: input.diceCount, probability: 1}];

   //the if statements are to avoid unnecessary calculations (that will ultimately multiply by 1)
   //TODO: validate doesn't allow toHitValue of 0 etc
   if(input.toHitValue > 1) workingStats = nextPhase(workingStats, '>=' + input.toHitValue);
   if(input.toWoundValue > 1) workingStats = nextPhase(workingStats, '>=' + input.toWoundValue);
   if(input.saveValue < 7) workingStats = nextPhase(workingStats, '<' + input.saveValue);
   if(input.reanimateOrNoPainValue < 7) workingStats = nextPhase(workingStats, '<' + input.reanimateOrNoPainValue);

   processWoundMax(input.maxWounds, workingStats);

   return workingStats;

   /**Rolling to hit and rolling to wound are 2 phases that would each call this function.*/
   function nextPhase(previousStats, passCriteria)
   {
      var workingExpression = new DiceExpression([{coefficient: 1, exponent: 1}], true);
      workingExpression.addTerm({coefficient: -1, exponent: 1});  //it is now empty
      for (var i = 0; i < previousStats.length; ++i)
      {
         if (0 === previousStats[i].result)  //i = 0 is the only one that might have a result of 0
         {
            //all dice failed
            workingExpression.addTerm({coefficient: previousStats[i].probability, exponent: previousStats[i].result});
            continue;  //must continue because Statistics.passFailBinomial won't take 0 trials
         }
         var newStats = Statistics.passFailBinomial(d6, previousStats[i].result, passCriteria);
         Statistics.determineProbability(newStats);
         /*previousStats was the results of the previous phase.
         workingExpression will be the results of this phase.
         newStats is the results that came from a single result of the previous phase.
         newStats must be ANDed with the preconditions which is previousStats[i].probability.

         For example: if this phase is rolling to wound then previousStats are the results of rolling
         to hit. If i is 3 then newStats is the stats for all possible wounds if there are 3 hits.
         workingExpression is the running total of all ways to get each wound count.*/
         combinePhase(workingExpression, newStats, previousStats[i].probability);
      }
      return workingExpression.toDiceResults();
   }
   /**All of the newStats are combined into the workingExpression after being ANDed by multiplier.*/
   function combinePhase(workingExpression, newStats, multiplier)
   {
      for (var i = 0; i < newStats.length; ++i)
      {
         newStats[i].probability *= multiplier;
         workingExpression.addTerm({coefficient: newStats[i].probability, exponent: newStats[i].result});
      }
   }
   /**This function combines all results above the maximum wounds ORing together the probability.*/
   function processWoundMax(maxWounds, stats)
   {
      //already validated that maxWounds was a natural number so we don't need && stats.length > 1
      while (stats.last().result > maxWounds)  //too many wounds
      {
         stats[stats.length-2].probability += stats[stats.length-1].probability;
         stats.pop();  //then remove the last
      }
   }
};
/**This is an internal function called by Prebuilt.WarhammerAttackUnit and Prebuilt.WarhammerAttackUnit.Statistics
it isn't intended to be called directly. All it does is default values and throw.*/
Prebuilt.WarhammerAttackUnit._validateInput = function(input)
{
   requireNaturalNumber(input.diceCount);
   requireNaturalNumber(input.maxWounds);
   //TODO: toHitValue and toWoundValue must be 1-6... can an attack ever ignore these?
   requireNaturalNumber(input.toHitValue);
   requireNaturalNumber(input.toWoundValue);

   //saveValue is optional because some attacks ignore saves
   if(undefined === input.saveValue) input.saveValue = 7;  //an impossible number
   requireNaturalNumber(input.saveValue);

   //Reanimation Protocol states that if the unit also has Feel No Pain then you must choose only 1 of them to use.
   //most units have neither
   if(undefined === input.reanimateOrNoPainValue) input.reanimateOrNoPainValue = 7;
   requireNaturalNumber(input.reanimateOrNoPainValue);

   //randomSource is not validated because die will validate it
};
