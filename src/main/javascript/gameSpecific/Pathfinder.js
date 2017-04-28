'use strict';
var Pathfinder = {};
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
Pathfinder.Attack = function(input)
{
   if(undefined === input.weapon) throw new Error("weapon object is required.");
   if(undefined === input.weapon.minimumCritical) input.weapon.minimumCritical = 20;
   else Validation.requireNaturalNumber(input.weapon.minimumCritical);
   if(input.weapon.minimumCritical > 20) throw new Error('Invalid weapon.minimumCritical. It was: ' + input.weapon.minimumCritical);
   if(undefined === input.weapon.criticalMultiplier) input.weapon.criticalMultiplier = 2;
   else Validation.requireNaturalNumber(input.weapon.criticalMultiplier);
   Validation.requireTypeOf('string', input.weapon.damageString);
   if(undefined === input.weapon.flatDamageModifer) input.weapon.flatDamageModifer = 0;
   else Validation.requireInteger(input.weapon.flatDamageModifer);
   if(undefined !== input.weapon.extraDamageDiceString) Validation.requireTypeOf('string', input.weapon.extraDamageDiceString);
   //TODO: move flatDamageModifer, extraDamageDiceString out of weapon (see next lines)
   //short: {offense: {attackBonus, flatDamageModifer, extraDamageDiceString, weapon: {minimumCritical, criticalMultiplier, damageString}},
      //targetDefense: {ac, damageReduction}, randomSource}
   //full: {offense: {attackBonus, flatDamageModifer, extraDamageDiceString, weapon: {minimumCritical, criticalMultiplier, damageString, attackBonus, flatDamageModifer, extraDamageDiceString}},
      //targetDefense: {ac, damageReduction}, randomSource}

   Validation.requireInteger(input.attackBonus);
   Validation.requireNaturalNumber(input.opposingAc);
   if(undefined === input.damageReduction) input.damageReduction = 0;
   else if(!Number.isInteger(input.damageReduction) || input.damageReduction < 0) throw new Error('Must be a non-negative integer but was ' + input.damageReduction);

   var output = {};
   output.toString = function(){return Pathfinder.Attack.Stringifier(this);};
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
@param {!object} rollResults the results of Pathfinder.Attack
@returns {!string} a human readable description of those results
*/
Pathfinder.Attack.Stringifier = function(attackResults)
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
 * Wonderous Item "Deck of Illusions": http://paizo.com/pathfinderRPG/prd/coreRulebook/magicItems/wondrousItems.html#deck-of-illusions
 * Each card is only used once. No special rules (see website for details).
 * @param allowRandomlyMissing if true there's a 10% chance of 1d20 cards missing. if false (the default) then all cards will be present.
 * @param randomSource will be passed to Die.roll()
 */
Pathfinder.DeckOfIllusions = function(allowRandomlyMissing, randomSource)
{
   var deck = new CustomDice.DeckOfCards([
      'Red dragon',
      'Male human fighter and four guards',
      'Female human wizard',
      'Male human druid',
      'Cloud giant',
      'Ettin',
      'Bugbear',
      'Goblin',
      'Glabrezu (demon)',
      'Male elf wizard and female apprentice',
      'Half-elf ranger',
      'Harpy',
      'Male half-orc barbarian',
      'Ogre mage',
      'Gnoll',
      'Kobold',
      'Lich',
      'Three human clerics',
      'Medusa',
      'Male dwarf paladin',
      'Frost giant',
      'Troll',
      'Hobgoblin',
      'Goblin',
      'Iron golem',
      'Three halfling rogues',
      'Pixies',
      'Half-elf bard',
      'Hill giant',
      'Ogre',
      'Orc',
      'Kobold',
      'Illusion of deck\'s owner',
      'Illusion of deck\'s owner (sex reversed)']);
   if (true === allowRandomlyMissing && 1 === new Die(10).roll(randomSource)[0])  //10% of some missing
   {
      var numberMissing = new Die(20).roll(randomSource)[0];  //1d20 cards missing
      while (numberMissing > 0)
      {
         deck.draw(randomSource);
         --numberMissing;
      }
   }
   return deck;
};
//TODO: add below decks to Pathfinder
/*
Deck of Many Things, Harrow: http://www.d20pfsrd.com/magic-items/artifacts/minor-artifacts/deck-of-many-things-harrow/
*/
/*
Deck of Many Things:
http://paizo.com/pathfinderRPG/prd/ultimateEquipment/artifactsAndOthers/artifacts.html#deck-of-many-things
http://www.d20pfsrd.com/magic-items/artifacts/minor-artifacts/deck-of-many-things/
*/
