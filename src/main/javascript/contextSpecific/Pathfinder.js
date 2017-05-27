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
 * This function is used to roll initiative and sort the characters accordingly. It automatically handles ties.
 * @param characters an array of objects each with the key 'initiative' (which is the bonus not the rolled amount).
 *    This is not mutated. You will need some sort of way to indentify the objects (eg name) in order for the return value to be meaningful.
 * @param randomSource passed to Die.roll
 * @return an array of the characters in order. The initiative numbers aren't given: the characters are kept as-is.
 */
Pathfinder.RollInitiative = function(characters, randomSource)
{
   var d20 = new Die(20), characterIndex, wrappedCharacters = [];
   for (characterIndex = 0; characterIndex < characters.length; ++characterIndex)
   {
      var currentInitiative = (characters[characterIndex].initiative + d20.roll(randomSource)[0]);
      wrappedCharacters.push({currentInitiative: currentInitiative, character: characters[characterIndex]});
   }
   wrappedCharacters.sort(Pathfinder.RollInitiative._initiativeComparator);
   var newCharacterOrder = [];
   for (characterIndex = 0; characterIndex < wrappedCharacters.length;)  //the loop below will increment i
   {
      var tieArray = [wrappedCharacters[characterIndex]];
      var baseCharacter = wrappedCharacters[characterIndex];
      //starting with the next character search all remaining characters for ties.
      for (++characterIndex; characterIndex < wrappedCharacters.length; ++characterIndex)  //uses same index
      {
         if(0 === Pathfinder.RollInitiative._initiativeComparator(baseCharacter, wrappedCharacters[characterIndex])) tieArray.push(wrappedCharacters[characterIndex]);
         else break;  //because they are sorted we can stop looking for ties. the parent loop will handle this character next
      }
      var tieDie = new CustomDice.DeckOfCards(tieArray);
      for (var tieIndex = 0; tieIndex < tieArray.length; ++tieIndex)  //for each tied character
      {
         //of the tied characters randomly determine the order
         newCharacterOrder.push(tieDie.draw(randomSource).character);
      }
   }
   return newCharacterOrder;
};
/**
 * Used internally by Pathfinder.RollInitiative. It is a sort function that doesn't roll dice.
 * It expects each arg to be like this: {currentInitiative: 5, character: {initiative: 2}}
 */
Pathfinder.RollInitiative._initiativeComparator = function(first, second)
{
   if(first.currentInitiative > second.currentInitiative) return -1;
   if(first.currentInitiative < second.currentInitiative) return 1;

   if(first.character.initiative > second.character.initiative) return -1;
   if(first.character.initiative < second.character.initiative) return 1;

   return 0;
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
/**
 * Artifact "Deck of Many Things": http://paizo.com/pathfinderRPG/prd/ultimateEquipment/artifactsAndOthers/artifacts.html#deck-of-many-things
 */
Pathfinder.DeckOfManyThings = function()
{
   var deckValues = [
      {Plaque: 'Balance', Effect: 'Change alignment instantly.'},
      {Plaque: 'Comet', Effect: 'Defeat the next monster you meet to gain one level.'},
      {Plaque: 'Donjon', Effect: 'You are imprisoned.'},
      {Plaque: 'Eurayle', Effect: '-1 penalty on all saving throws henceforth.'},
      {Plaque: 'The Fates', Effect: 'Avoid any situation you choose, once.'},
      {Plaque: 'Flames', Effect: 'Enmity between you and an outsider.'},
      {Plaque: 'Fool', Effect: 'Lose 10,000 experience points and you must draw again.'},
      {Plaque: 'Gem', Effect: 'Gain your choice of 25 pieces of jewelry or 50 gems.'},
      {Plaque: 'Idiot', Effect: 'Lose 1d4+1 Intelligence. You may draw again.'},
      {Plaque: 'Jester', Effect: 'Gain 10,000 XP or two more draws from the deck.'},
      {Plaque: 'Key', Effect: 'Gain a major magic weapon.'},
      {Plaque: 'Knight', Effect: 'Gain the service of a 4th-level fighter.'},
      {Plaque: 'Moon', Effect: 'You are granted 1d4 wishes.'},
      {Plaque: 'Rogue', Effect: 'One of your friends turns against you.'},
      {Plaque: 'Ruin', Effect: 'Immediately lose all wealth and property.'},
      {Plaque: 'Skull', Effect: 'Defeat dread wraith or be forever destroyed.'},
      {Plaque: 'Star', Effect: 'Immediately gain a +2 inherent bonus to one ability score.'},
      {Plaque: 'Sun', Effect: 'Gain beneficial medium wondrous item and 50,000 XP.'},
      {Plaque: 'Talons', Effect: 'All magic items you possess disappear permanently.'},
      {Plaque: 'Throne', Effect: 'Gain a +6 bonus on Diplomacy checks plus a small castle.'},
      {Plaque: 'Vizier', Effect: 'Know the answer to your next dilemma.'},
      {Plaque: 'The Void', Effect: 'Body functions, but soul is trapped elsewhere.'}];
   var deck = new CustomDice.CustomDie(deckValues);
   /**
    * You may only draw 1 card at a time because certain effects affect your ability or desire to draw more (and thus will continue each hour if applicable).
    * However an array is always returned to account for the Fool, for all other cards the array will have 1 element.
    * The cards Fool and Jester will be removed if drawn.
    * Cards like Moon will not roll dice for you.
    * @return an array of 1-2 objects with the keys Plaque and Effect.
    */
   this.roll = function(randomSource)
   {
      var card = deck.roll(randomSource);
      if ('Fool' === card.Plaque)
      {
         deckValues.removeElement(card);
         deck = new CustomDice.CustomDie(deckValues);
         return [card, this.roll(randomSource)[0]];  //can't be the Fool again but can be the Jester
      }
      if ('Jester' === card.Plaque)
      {
         deckValues.removeElement(card);
         deck = new CustomDice.CustomDie(deckValues);
      }
      return [card];
   };
   /**
    * Alias for roll.
    */
   this.draw = this.roll;
};
/**
 * Artifact "Harrow Deck of Many Things": http://www.d20pfsrd.com/magic-items/artifacts/minor-artifacts/deck-of-many-things-harrow/
 * All cards are always replaced so there's no requirement to handle anything in a special way.
 * Which is why this object is already created. All cards are present.
 * No cards are handled in any special way so cards like The Joke will require you to call draw 3 more times (since the cards replace themselves you can get another 'The Joke' card).
 *
 * Note that each suit represents an ability
 * Hammer: Strength
 * Key: Dexterity
 * Shield: Constitution
 * Book: Intelligence
 * Star: Wisdom
 * Crown: Charisma
 *
 * @return (from calling draw) an object with the keys CardName, Alignment (either 'N' or a 2 letter code like 'LG'), Suit (eg 'Book' see above list), and Effect
 */
Pathfinder.HarrowDeckOfManyThings = new CustomDice.CustomDie([
   {CardName: 'The Avalanche', Alignment: 'LE', Suit: 'Key', Effect: 'The character becomes the focal point of an earthquake, as per the earthquake spell. In addition to saving versus this effect, the character must succeed at an additional Will save or be affected by the spell imprisonment.'},
   {CardName: 'The Bear', Alignment: 'N', Suit: 'Hammer', Effect: 'The character gains the lycanthrope template, becoming a werebear lycanthrope, and as such, remove disease and heal have no affect on this affliction.'},
   {CardName: 'The Beating', Alignment: 'NE', Suit: 'Hammer', Effect: 'While in combat, the character is always considered to be flanked. Attackers gain a +2 flanking bonus on attacks made against the character and may sneak attack him at will.'},
   {CardName: 'The Betrayal', Alignment: 'NE', Suit: 'Crown', Effect: 'The character\'s animal companion, familiar, cohort, or other NPC ally is alienated and forever after hostile. If the character has no such allies, the enmity of some powerful personage, community, or religious order can be substituted. This hatred remains a secret until such a time that it might be most dramatically and perilously revealed. Upon drawing this card, the character knows that someone or something will turn against him, but nothing more.'},
   {CardName: 'The Big Sky', Alignment: 'CG', Suit: 'Hammer', Effect: 'Once per day, the character can add +10 to his CMB or CMD for 1 round. When he does so, a piece of metal in close proximity shatters.'},
   {CardName: 'The Brass Dwarf', Alignment: 'LN', Suit: 'Shield', Effect: 'The character becomes immune to one energy type of his choice, but gains vulnerability to another energy type of the GM\'s choice.'},
   {CardName: 'The Carnival', Alignment: 'CN', Suit: 'Star', Effect: 'Upon drawing The Carnival, the card is set aside and the GM draws nine additional cards from the deck. These cards are laid face up for the character to view, then flipped over and shuffled by the GM. The player draws one card from the nine, taking that card\'s effects as normal.'},
   {CardName: 'The Courtesan', Alignment: 'CN', Suit: 'Crown', Effect: 'The character\'s favorite item—preferably a magic weapon—becomes intelligent. Use the rules for intelligent items to randomly generate the item\'s abilities. If the character has no items, an intelligent item soon falls into the character\'s possession.'},
   {CardName: 'The Cricket', Alignment: 'NG', Suit: 'Key', Effect: 'Upon drawing this card, the character may choose to draw up to three additional cards. In addition to those cards\' effects, the character\'s base land speed increases by +10 feet for each card he draws.'},
   {CardName: 'The Crows', Alignment: 'NE', Suit: 'Key', Effect: 'The character must choose between his most valuable item and a major ally of the GM\'s choice. Whichever is not selected is destroyed or slain and cannot be restored by mortal means. The character is made aware of the ramifications of this choice upon drawing the card.'},
   {CardName: 'The Cyclone', Alignment: 'CE', Suit: 'Hammer', Effect: 'An elder air elemental appears, and the character must fight it alone. If the character cannot defeat the elemental in 1d6+1 rounds, he is transported to the Plane of Air.'},
   {CardName: 'The Dance', Alignment: 'LG', Suit: 'Key', Effect: 'From this point on, whenever the character rolls initiative, he rolls twice and selects whichever result he prefers.'},
   {CardName: 'The Demon\'s Lantern', Alignment: 'CE', Suit: 'Key', Effect: 'The character\'s body disintegrates. All that remains are his items and a glowing gem containing his soul. This gem is worth an amount of gp equal to 2,500 × the character\'s level. A resurrection or stronger spell is required to restore the character, and doing so destroys the gem.'},
   {CardName: 'The Desert', Alignment: 'CG', Suit: 'Shield', Effect: 'This card grants the character the one-time ability to travel to any location on the same plane instantly, bringing with him up to 10 allies and 2,000 pounds of goods. The character must know exactly where he wishes to travel, such as a place he has been or a location on a map, but not a vague or hidden location, like the richest dungeon in the world or the Lost City of Ird. This transportation ignores all barriers against teleportation or other magical effects. The character may use this card\'s effect whenever he wishes, but only once.'},
   {CardName: 'The Fiend', Alignment: 'LE', Suit: 'Hammer', Effect: 'A powerful evil outsider takes notice of the character and sets plans in motion to destroy him.'},
   {CardName: 'The Foreign Trader', Alignment: 'N', Suit: 'Book', Effect: 'The mysterious entity known as the Foreign Trader appears and offers the character any treasure he wishes in return for years of his life. If the character accepts, he must choose to age a number of age categories. The character takes all the ability score penalties for his new age, but gains none of the benefits. For each age category he advances, however, he gains 20,000 gp worth of credit with the Foreign Trader, which can be spent on any non-unique magic items. Any credit a character does not spend is lost. After the character is done spending his credit, the Foreign Trader vanishes. Years taken by the Foreign Trader cannot be restored by any means. The Foreign Trader does not trade with characters who cannot die of old age. If the character is immortal, the Foreign Trader vanishes, leaving behind another card. If the character declines to bargain with the Foreign Trader, the trader disappears in a puff of acrid yellow smoke.'},
   {CardName: 'The Forge', Alignment: 'LN', Suit: 'Hammer', Effect: 'The character must choose one weapon or armor in his possession to be reforged into another weapon or armor of equal or lesser gp value. For example, should a character choose to have a +3 longsword (an 18,315 gp value) reforged, he could have it transformed into any one of hundreds of items, like a +1 axiomatic scimitar (also a 18,315 gp value) or a suit of +3 full-plate of silent moves (12,300 gp). Any gp value not spent is lost.'},
   {CardName: 'The Eclipse', Alignment: 'LE', Suit: 'Star', Effect: 'From the hours of dusk to dawn, the character is treated as being one level lower than normal. If the character has multiple classes, he must decide upon drawing this card which class is affected.'},
   {CardName: 'The Empty Throne', Alignment: 'LG', Suit: 'Crown', Effect: 'The character inherits a noble title and 15,000 gp soon after drawing this card. The GM decides the particulars of when and how this occurs.'},
   {CardName: 'The Hidden Truth', Alignment: 'LG', Suit: 'Book', Effect: 'This card grants the character the one-time ability to call upon an omniscient spirit to fully answer any question or solve any single puzzle. Whether the information revealed can be effectively acted upon is another question entirely. The character may use this card\'s effect whenever he wishes, but only once.'},
   {CardName: 'The Idiot', Alignment: 'NE', Suit: 'Book', Effect: 'The character\'s Charisma, Intelligence, and Wisdom scores are all reduced by 1d4 points. Roll individually for each ability score.'},
   {CardName: 'The Inquisitor', Alignment: 'LN', Suit: 'Book', Effect: 'This card grants the character the one-time ability to force another creature to answer a single question truthfully. The card does not grant the character or creature questioned any special insight, so a creature might still answer a question falsely if it believes the falsehood. If the creature is truly ignorant, it informs the character that it doesn\'t know the answer and this effect is wasted. The character may use this card\'s effect whenever he wishes, but only once.'},
   {CardName: 'The Joke', Alignment: 'CG', Suit: 'Book', Effect: 'Upon drawing this card, the character selects one of his allies. Three new cards are then drawn by the GM and made visible (the GM may choose whether or not to explain the cards\' effects). The character\'s ally must choose one of these cards and immediately gains the effects. The character then selects one of the remaining two cards and gains that card\'s effects. The final card is discarded.'},
   {CardName: 'The Juggler', Alignment: 'CG', Suit: 'Key', Effect: 'The character gains a +2 bonus to two ability scores of his choice, but must swap them with one another.'},
   {CardName: 'The Keep', Alignment: 'NG', Suit: 'Hammer', Effect: 'The character gains a personal demiplane, as per a permanent create demiplane spell.'},
   {CardName: 'The Liar', Alignment: 'CE', Suit: 'Crown', Effect: 'The character\'s most powerful, most valuable, or favorite magic item (GM\'s choice) manifests a curse. Roll on Table: Common Item Curses to generate this effect, rerolling results for specific items.'},
   {CardName: 'The Locksmith', Alignment: 'LN', Suit: 'Key', Effect: 'This card grants the character the ability to open any one door, lock, set of bindings, or other locked barrier. This includes magical gates or portals that have specific requirements to activate. The character may use this card\'s effect whenever he wishes, but only once. Once used, the card\'s effect ends.'},
   {CardName: 'The Lost', Alignment: 'CE', Suit: 'Star', Effect: 'The character cannot gain another level in whichever class he currently has the most levels. This effect can be circumvented if the character is killed and returned to life, but the next time he is restored to life he is affected as if by the spell reincarnate, regardless of what spell was cast.'},
   {CardName: 'The Marriage', Alignment: 'LN', Suit: 'Crown', Effect: 'A comely genie of the character\'s preferred gender appears and proposes marriage. Should the character accept, he must organize a lavish wedding ceremony by the end of the week and ever after be committed to this exotic outsider. If the character declines or breaks his wedding vow, the genie is heartbroken and returns to his or her home plane, provoking the ire of the associated elemental court. The genie\'s type, personality, actions, and possible retribution are determined by the GM.'},
   {CardName: 'The Midwife', Alignment: 'NG', Suit: 'Star', Effect: 'The character gains exactly enough experience to advance to the next level.'},
   {CardName: 'The Mountain Man', Alignment: 'CN', Suit: 'Shield', Effect: 'The character grows one size category, gaining all the benefits and penalties of increased size. His equipment does not increase in size.'},
   {CardName: 'The Mute Hag', Alignment: 'NE', Suit: 'Star', Effect: 'The character permanently loses one of his senses—sight, hearing, or speech—becoming blind, deaf, or mute (player\'s choice). This affliction cannot be cured by any effect short of a miracle or wish spell.'},
   {CardName: 'The Owl', Alignment: 'N', Suit: 'Star', Effect: 'This card grants the character the one-time ability to scry on any target anywhere for 1 minute. The target, however, is immediately aware that it is being scryed upon by the character. The character may use this card\'s effect whenever he wishes, but only once. Once used, the card\'s effect ends.'},
   {CardName: 'The Paladin', Alignment: 'LG', Suit: 'Hammer', Effect: 'The character is granted a holy avenger. This weapon has all the properties of a normal holy avenger, along with a special ability that can be used once. Upon being thrust into the ground by its bearer as a standard action, the weapon transforms into a paladin two levels higher than the wielder. This paladin possesses her own holy avenger and aids the character in any way her alignment permits for 30 minutes. Once this time is over, the paladin vanishes and the sword reappears, though it is forever reduced to a +2 cold iron longsword.'},
   {CardName: 'The Peacock', Alignment: 'N', Suit: 'Key', Effect: 'The character\'s skin hardens, becoming rigid and pebbled. He gains a permanent +2 bonus to his natural armor, but takes a -2 penalty to Dexterity.'},
   {CardName: 'The Publican', Alignment: 'CG', Suit: 'Star', Effect: 'The GM chooses one of the character\'s enemies. This enemy has a complete change of heart and now favors the character.'},
   {CardName: 'The Queen Mother', Alignment: 'LN', Suit: 'Star', Effect: 'When the character draws this card, 2d4 giant ants appear to serve the character until they are slain. These creatures eagerly seek to aid and protect the character. They understand the character\'s verbal commands, though they cannot respond.'},
   {CardName: 'The Rabbit Prince', Alignment: 'CN', Suit: 'Key', Effect: 'All attacks the character makes that threaten a critical hit are automatically confirmed. Likewise, all attacks made against the character that threaten a critical hit are also automatically confirmed.'},
   {CardName: 'The Rakshasa', Alignment: 'LE', Suit: 'Book', Effect: 'Anytime the character lies with the true intent to deceive, he turns into a random animal for 1 hour. Lying with the intent to trigger this effect never works.'},
   {CardName: 'The Sickness', Alignment: 'NE', Suit: 'Shield', Effect: 'The character becomes afflicted with incurable leprosy (or another disease of the GM\'s choice). While the disease cannot be cured by any effect short of a miracle or wish spell, the effects of the affliction can be negated through the use of spells like restoration.'},
   {CardName: 'The Snakebite', Alignment: 'CE', Suit: 'Book', Effect: 'Anyone who touches the character must succeed at a Fortitude save or be poisoned by greenblood oil. The save DC is equal to 10 + the character\'s Hit Dice + his Constitution modifier. This poison affects even those who touch the character to administer aid or healing magic.'},
   {CardName: 'The Survivor', Alignment: 'NG', Suit: 'Shield', Effect: 'The next time the character is reduced to -10 hit points, he is instantly restored to full hit points. If he is killed by an effect that slays him without dealing hit point damage (such as by disintegrate), the effect fails to kill him and he is restored to full hit points. If he is killed by a hostile environment (such as a lava flow or when teleporting to a dangerous plane), he is transported to his last safe location and restored to full hit points. This card does not save the character from effects that would permanently disable him, like petrification.'},
   {CardName: 'The Tangled Briar', Alignment: 'LE', Suit: 'Shield', Effect: 'Once per day, the character can communicate as per the spell speak with plants and have a plant truthfully answer any single question. Using this ability upsets the surrounding flora, however, causing 1d4+2 shambling mounds with the advanced template to erupt from the earth and attack the character, regardless of the surrounding terrain.'},
   {CardName: 'The Teamster', Alignment: 'N', Suit: 'Shield', Effect: 'When the character draws this card, a powerful being appears before the character and tasks him to undertake a dangerous quest. If the character proves resistant to undertaking the task, he is afflicted by geas/quest until the quest is completed. When the character completes the quest, the powerful being reappears, granting the character a lavish reward. The specifics of the quest, the powerful being\'s identity, and the character\'s reward are determined by the GM.'},
   {CardName: 'The Theater', Alignment: 'NG', Suit: 'Crown', Effect: 'The next time the character defeats a creature, he is granted a +2 bonus to the same ability score as the creature\'s highest ability score.'},
   {CardName: 'The Trumpet', Alignment: 'LG', Suit: 'Shield', Effect: 'This card grants the character the ability to summon an outsider of his alignment once per day. This outsider must be of a CR equal to or less than the character\'s level and serves for a number of rounds equal to the character\'s level.'},
   {CardName: 'The Twin', Alignment: 'N', Suit: 'Crown', Effect: 'The character physically becomes a member of the opposite gender.'},
   {CardName: 'The Tyrant', Alignment: 'LE', Suit: 'Crown', Effect: 'The character gains the one-time ability to issue a single command to any creature in the multiverse and have the order obeyed. The target is affected as if by the spell dominate monster, and even orders for the target to kill itself are followed. Any creature targeted by this effect knows that it is acting against its will, and knows the identity and location of the character. Immortal creatures cannot effectively kill themselves, and the act only causes them considerable but fleeting pain. Additionally, creatures with the ability to grant such boons typically also possess the power to revoke them, and do so as soon as the command releases them. The GM ultimately decides what this command can accomplish. The character may use this card\'s effect whenever he wishes, but may only use it once.'},
   {CardName: 'The Unicorn', Alignment: 'CG', Suit: 'Crown', Effect: 'This card grants the character the one-time ability to undo one past choice or regrettable action. The fabric of reality is unraveled and respun, potentially restoring creatures to life or altering the course of history, depending on how the character acted and how he wishes he would have acted. The player chooses what situation he would have acted differently in and the GM determines how reality changes to reflect that act. The change primarily affects the character, affecting others as little as possible. The character may use this card\'s effect whenever he wishes, but only once.'},
   {CardName: 'The Uprising', Alignment: 'CN', Suit: 'Hammer', Effect: 'Upon drawing this card, 3d6 unruly, accident-prone, 1st-level commoners appear to serve the character. If these followers are killed, the character takes the usual penalties on attracting further followers. Knowledge of these commoners\' mistreatment or death spreads far, with the GM determining any repercussions.'},
   {CardName: 'The Vision', Alignment: 'CN', Suit: 'Book', Effect: 'The character receives two visions and the knowledge that one vision is true and the other false, though he does not know which is which. The GM determines the specifics of these visions. The visions may be views of the past, present, or future; cryptic omens; or total fantasies.'},
   {CardName: 'The Wanderer', Alignment: 'NG', Suit: 'Book', Effect: 'One of the character\'s mundane possessions becomes a magical item worth 20,000 gp or less. The GM determines which item manifests magical properties and what those properties are.'},
   {CardName: 'The Waxworks', Alignment: 'CE', Suit: 'Shield', Effect: 'Upon drawing this card, 1d6 exact duplicates of the character appear within a 20-mile radius. These duplicates have the alignment opposite to that of the original character and oppose his goals.'},
   {CardName: 'The Winged Serpent', Alignment: 'LG', Suit: 'Star', Effect: 'The character is granted a single wish. This wish functions similarly to the spell wish when it comes to affecting rules and statistics, but can also change reality in ways outside the bounds of the spell\'s effects—such as rerouting a river or ending a war. The GM decides what the wish can and cannot accomplish.'}
]);
Pathfinder.HarrowDeckOfManyThings.draw = Pathfinder.HarrowDeckOfManyThings.roll;
