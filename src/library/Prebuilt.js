'use strict';
var Prebuilt = {};
/**
This is prebuilt function for rolling dice to attack in Pathfinder (the same rules probably applies to Dungeons and Dragons 3.5 and 3.0).

Simplified contract, given:
{attackBonus, weapon: {minimumCritical, criticalMultiplier, damageString, flatDamageModifer, extraDamageDiceString}, opposingAc, damageReduction, randomSource}
returns:
{attack: 'Critical Miss'/'Miss'/'Hit'/'Critical Hit', damage: {nonLethal, lethal}}

This function does not take into consideration:
missChances: spell failure, incorporeal, cover, concealment, spell resistance, spell DC, mirror spells
multiple attacks (attackBonus would be an array)
DR doesn't work on touch attacks, energy, etc
Combat maneuvers can't score threats (use a criticalMultiplier of 1)
spells (with attacks) have crit 20 x2

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

   requireInteger(input.attackBonus);
   requireNaturalNumber(input.opposingAc);
   if(undefined === input.damageReduction) input.damageReduction = 0;
   else if(!Number.isInteger(input.damageReduction) || input.damageReduction < 0) throw new Error('Must be a non-negative integer but was ' + input.damageReduction);

   var d20 = new Die(20);
   var attackRolled = d20.roll(input.randomSource)[0];
   if(1 === attackRolled) return {attack: 'Critical Miss'};
   if(20 !== attackRolled && (input.attackBonus+attackRolled) < input.opposingAc) return {attack: 'Miss'};  //increased critical range doesn't increase auto-hits

   var isCriticalHit = false;
   if (attackRolled >= input.weapon.minimumCritical)
   {
      attackRolled = d20.roll(input.randomSource)[0];
      if((input.attackBonus+attackRolled) >= input.opposingAc) isCriticalHit = true;  //a natural 20 on confirmation isn't special
   }

   var output = {attack: 'Hit', damage:{nonLethal: 0, lethal: 0}};
   var damagePool = new DicePool(input.weapon.damageString);
   var numberOfTimesToRollDamage = 1;

   if (isCriticalHit)
   {
      output.attack = 'Critical Hit';
      numberOfTimesToRollDamage = input.weapon.criticalMultiplier;
   }
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

@param {object} input with: {?number: integer}circumstanceBonus, {?number: natural}numberOfRaises,
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
/**
This is prebuilt function for Warhammer for when a unit attacks a unit.
This doesn't account for things like Helfrost or instant death.
Input's saveValue, reanimateOrNoPainValue, and randomSource are optional.
Output's wounded and unsavedWounds might not be present.

@param {object} with: diceCount, maxWounds, toHitValue, toWoundValue, ?saveValue, ?reanimateOrNoPainValue, ?randomSource
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
@param {object} with: diceCount, maxWounds, toHitValue, toWoundValue, ?saveValue, ?reanimateOrNoPainValue
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
