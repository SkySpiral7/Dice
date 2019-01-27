'use strict';
TestSuite.Pathfinder = {};
TestSuite.Pathfinder.Attack = async function(testState={})
{
   TestRunner.clearResults(testState);

   var testResults = [], input, expected, actual, actualStringValue;

   try{
   input = {attackBonus: 4, weapon: {damageString: '1d8', flatDamageModifer: 3}, opposingAc: 12};
   input.randomSource = numberGenerator([{dieSides: 20, values: [19]}, {dieSides: 8, values: [5]}]);
   actual = Pathfinder.Attack(input);
   actualStringValue = actual.toString();
   delete actual.toString;
   expected = {attack: 'Hit', damage: {nonLethal: 0, lethal: 8}};
   testResults.push({Expected: expected, Actual: actual, Description: 'Happy path, return value'});
   testResults.push({Expected: Pathfinder.Attack.Stringifier(expected), Actual: actualStringValue, Description: 'Happy path, string value'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   input = {attackBonus: -5, weapon: {minimumCritical: 1, criticalMultiplier: 1, damageString: '1d2', flatDamageModifer: -5, extraDamageDiceString: '1d2'}, opposingAc: 5, damageReduction: 0};
   Pathfinder.Attack(input);
   testResults.push({Expected: true, Actual: true, Description: 'Minimum values don\'t throw'});
   } catch(e){testResults.push({Error: e, Description: 'Minimum values don\'t throw'});}

   try{
   input = {attackBonus: 1, opposingAc: 11};
   Pathfinder.Attack(input);
   TestRunner.failedToThrow(testResults, 'Missing weapon');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('weapon object is required.'),
         Actual: e, Description: 'Missing weapon'});
   }

   try{
   input = {attackBonus: 1, weapon: {minimumCritical: -1}, opposingAc: 11};
   Pathfinder.Attack(input);
   TestRunner.failedToThrow(testResults, 'Non natural minimumCritical');
   }
   catch(e)
   {
      testResults.push({Expected: getError(Validation.requireNaturalNumber, [input.weapon.minimumCritical]),
         Actual: e, Description: 'Non natural minimumCritical'});
   }

   try{
   input = {attackBonus: 1, weapon: {minimumCritical: 22}, opposingAc: 11};
   Pathfinder.Attack(input);
   TestRunner.failedToThrow(testResults, 'Too large minimumCritical');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('Invalid weapon.minimumCritical. It was: 22'),
         Actual: e, Description: 'Too large minimumCritical'});
   }

   try{
   input = {attackBonus: 1, weapon: {criticalMultiplier: -1}, opposingAc: 11};
   Pathfinder.Attack(input);
   TestRunner.failedToThrow(testResults, 'Non natural criticalMultiplier');
   }
   catch(e)
   {
      testResults.push({Expected: getError(Validation.requireNaturalNumber, [input.weapon.criticalMultiplier]),
         Actual: e, Description: 'Non natural criticalMultiplier'});
   }

   try{
   input = {attackBonus: 1, weapon: {damageString: -1}, opposingAc: 11};
   Pathfinder.Attack(input);
   TestRunner.failedToThrow(testResults, 'Invalid damageString');
   }
   catch(e)
   {
      testResults.push({Expected: getError(Validation.requireTypeOf, ['string', input.weapon.damageString]),
         Actual: e, Description: 'Invalid damageString'});
   }

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d2', flatDamageModifer: 1.2}, opposingAc: 11};
   Pathfinder.Attack(input);
   TestRunner.failedToThrow(testResults, 'Invalid flatDamageModifer');
   }
   catch(e)
   {
      testResults.push({Expected: getError(Validation.requireInteger, [input.weapon.flatDamageModifer]),
         Actual: e, Description: 'Invalid flatDamageModifer'});
   }

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d2', extraDamageDiceString: 1.2}, opposingAc: 11};
   Pathfinder.Attack(input);
   TestRunner.failedToThrow(testResults, 'Invalid extraDamageDiceString');
   }
   catch(e)
   {
      testResults.push({Expected: getError(Validation.requireTypeOf, ['string', input.weapon.extraDamageDiceString]),
         Actual: e, Description: 'Invalid extraDamageDiceString'});
   }

   try{
   input = {attackBonus: 1.5, weapon: {damageString: '1d2'}, opposingAc: 11};
   Pathfinder.Attack(input);
   TestRunner.failedToThrow(testResults, 'Invalid attackBonus');
   }
   catch(e)
   {
      testResults.push({Expected: getError(Validation.requireInteger, [input.attackBonus]),
         Actual: e, Description: 'Invalid attackBonus'});
   }

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d2'}, opposingAc: 'lp'};
   Pathfinder.Attack(input);
   TestRunner.failedToThrow(testResults, 'Invalid opposingAc');
   }
   catch(e)
   {
      testResults.push({Expected: getError(Validation.requireNaturalNumber, [input.opposingAc]),
         Actual: e, Description: 'Invalid opposingAc'});
   }

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d2'}, opposingAc: 12, damageReduction: 1.5};
   Pathfinder.Attack(input);
   TestRunner.failedToThrow(testResults, 'Invalid damageReduction');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('Must be a non-negative integer but was 1.5'),
         Actual: e, Description: 'Invalid damageReduction'});
   }

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d2'}, opposingAc: 12, damageReduction: -2};
   Pathfinder.Attack(input);
   TestRunner.failedToThrow(testResults, 'Negative damageReduction');
   }
   catch(e)
   {
      testResults.push({Expected: new Error('Must be a non-negative integer but was -2'),
         Actual: e, Description: 'Negative damageReduction'});
   }

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d8'}, opposingAc: 12};
   input.randomSource = numberGenerator.dice(20, [1]);
   actual = Pathfinder.Attack(input);
   actualStringValue = actual.toString();
   delete actual.toString;
   expected = {attack: 'Critical Miss'};
   testResults.push({Expected: expected, Actual: actual, Description: 'Critical Miss, return value'});
   testResults.push({Expected: Pathfinder.Attack.Stringifier(expected), Actual: actualStringValue, Description: 'Critical Miss, string value'});
   } catch(e){testResults.push({Error: e, Description: 'Critical Miss'});}

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d8'}, opposingAc: 100};
   input.randomSource = numberGenerator([{dieSides: 20, values: [20, 1]}, {dieSides: 8, values: [5]}]);
   actual = Pathfinder.Attack(input);
   delete actual.toString;
   expected = {attack: 'Hit', damage: {nonLethal: 0, lethal: 5}};
   testResults.push({Expected: expected, Actual: actual, Description: 'Natural 20 auto hits'});
   } catch(e){testResults.push({Error: e, Description: 'Natural 20 auto hits'});}

   try{
   input = {attackBonus: 1, weapon: {minimumCritical: 15, damageString: '1d8'}, opposingAc: 100};
   input.randomSource = numberGenerator.dice(20, [16]);
   actual = Pathfinder.Attack(input);
   actualStringValue = actual.toString();
   delete actual.toString;
   expected = {attack: 'Miss'};
   testResults.push({Expected: expected, Actual: actual, Description: 'Increased threat range doesn\'t auto hit'});
   testResults.push({Expected: Pathfinder.Attack.Stringifier(expected), Actual: actualStringValue, Description: 'Miss, string value'});
   } catch(e){testResults.push({Error: e, Description: 'Increased threat range doesn\'t auto hit'});}

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d8'}, opposingAc: 100};
   input.randomSource = numberGenerator([{dieSides: 20, values: [20, 20]}, {dieSides: 8, values: [5]}]);
   actual = Pathfinder.Attack(input);
   delete actual.toString;
   expected = {attack: 'Hit', damage: {nonLethal: 0, lethal: 5}};
   testResults.push({Expected: expected, Actual: actual, Description: 'Confirm with natural 20 isn\'t special'});
   } catch(e){testResults.push({Error: e, Description: 'Confirm with natural 20 isn\'t special'});}

   try{
   input = {attackBonus: 1, weapon: {minimumCritical: 18, damageString: '1d8'}, opposingAc: 11};
   input.randomSource = numberGenerator([{dieSides: 20, values: [18, 11]}, {dieSides: 8, values: [5, 3]}]);
   actual = Pathfinder.Attack(input);
   delete actual.toString;
   expected = {attack: 'Critical Hit', damage: {nonLethal: 0, lethal: 8}};
   testResults.push({Expected: expected, Actual: actual, Description: 'Increased critical range. Damage rolled twice.'});
   } catch(e){testResults.push({Error: e, Description: 'Increased critical range. Damage rolled twice.'});}

   try{
   input = {attackBonus: 1, weapon: {criticalMultiplier: 3, damageString: '1d8', flatDamageModifer: 2, extraDamageDiceString: '1d6'}, opposingAc: 11};
   input.randomSource = numberGenerator([{dieSides: 20, values: [20, 20]}, {dieSides: 8, values: [5, 7, 6]}, {dieSides: 6, values: [5]}]);
   actual = Pathfinder.Attack(input);
   delete actual.toString;
   //29 === (5+2)+(7+2)+(6+2)+5
   expected = {attack: 'Critical Hit', damage: {nonLethal: 0, lethal: 29}};
   testResults.push({Expected: expected, Actual: actual, Description: 'x3 includes flat mod but not dice'});
   } catch(e){testResults.push({Error: e, Description: 'x3 includes flat mod but not dice'});}

   try{
   input = {attackBonus: 1, weapon: {criticalMultiplier: 3, damageString: '1d8', flatDamageModifer: -2}, opposingAc: 11};
   input.randomSource = numberGenerator([{dieSides: 20, values: [20, 20]}, {dieSides: 8, values: [1, 2, 3]}]);
   actual = Pathfinder.Attack(input);
   delete actual.toString;
   expected = {attack: 'Critical Hit', damage: {nonLethal: 2, lethal: 1}};
   testResults.push({Expected: expected, Actual: actual, Description: 'Minimum damage is nonlethal and applies to each'});
   } catch(e){testResults.push({Error: e, Description: 'Minimum damage is nonlethal and applies to each'});}

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d8', flatDamageModifer: -1}, opposingAc: 11, damageReduction: 5};
   input.randomSource = numberGenerator([{dieSides: 20, values: [20, 10]}, {dieSides: 8, values: [8, 1]}]);
   actual = Pathfinder.Attack(input);
   delete actual.toString;
   expected = {attack: 'Critical Hit', damage: {nonLethal: 1, lethal: 2}};
   testResults.push({Expected: expected, Actual: actual, Description: 'lethal damage > DR'});
   } catch(e){testResults.push({Error: e, Description: 'lethal damage > DR'});}

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d8'}, opposingAc: 11, damageReduction: 5};
   input.randomSource = numberGenerator([{dieSides: 20, values: [10]}, {dieSides: 8, values: [5]}]);
   actual = Pathfinder.Attack(input);
   delete actual.toString;
   expected = {attack: 'Hit', damage: {nonLethal: 0, lethal: 0}};
   testResults.push({Expected: expected, Actual: actual, Description: 'lethal damage === DR'});
   } catch(e){testResults.push({Error: e, Description: 'lethal damage === DR'});}

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d8'}, opposingAc: 11, damageReduction: 5};
   input.randomSource = numberGenerator([{dieSides: 20, values: [10]}, {dieSides: 8, values: [3]}]);
   actual = Pathfinder.Attack(input);
   delete actual.toString;
   expected = {attack: 'Hit', damage: {nonLethal: 0, lethal: 0}};
   testResults.push({Expected: expected, Actual: actual, Description: 'lethal damage < DR'});
   } catch(e){testResults.push({Error: e, Description: 'lethal damage < DR'});}

   try{
   input = {attackBonus: 1, weapon: {criticalMultiplier: 3, damageString: '1d8', flatDamageModifer: -1}, opposingAc: 11, damageReduction: 3};
   input.randomSource = numberGenerator([{dieSides: 20, values: [20, 10]}, {dieSides: 8, values: [1, 1, 3]}]);
   actual = Pathfinder.Attack(input);
   delete actual.toString;
   expected = {attack: 'Critical Hit', damage: {nonLethal: 1, lethal: 0}};
   testResults.push({Expected: expected, Actual: actual, Description: 'DR for lethal then non'});
   } catch(e){testResults.push({Error: e, Description: 'DR for lethal then non'});}

   try{
   input = {attackBonus: 1, weapon: {criticalMultiplier: 3, damageString: '1d8', flatDamageModifer: -1}, opposingAc: 11, damageReduction: 5};
   input.randomSource = numberGenerator([{dieSides: 20, values: [20, 10]}, {dieSides: 8, values: [1, 1, 3]}]);
   actual = Pathfinder.Attack(input);
   delete actual.toString;
   expected = {attack: 'Critical Hit', damage: {nonLethal: 0, lethal: 0}};
   testResults.push({Expected: expected, Actual: actual, Description: 'DR for both'});
   } catch(e){testResults.push({Error: e, Description: 'DR for both'});}

   return TestRunner.displayResults('Pathfinder Pathfinder.Attack', testResults, testState);
};
TestSuite.Pathfinder.Attack_Stringifier = async function(testState={})
{
   TestRunner.clearResults(testState);

   var testResults = [], actual, expected;

   try{
   actual = Pathfinder.Attack.Stringifier({attack: 'Critical Miss'});
   expected  = 'Critical Miss.';
   testResults.push({Expected: expected, Actual: actual, Description: 'Critical Miss'});
   } catch(e){testResults.push({Error: e, Description: 'Critical Miss'});}

   try{
   actual = Pathfinder.Attack.Stringifier({attack: 'Miss'});
   expected  = 'Miss.';
   testResults.push({Expected: expected, Actual: actual, Description: 'Miss'});
   } catch(e){testResults.push({Error: e, Description: 'Miss'});}

   try{
   actual = Pathfinder.Attack.Stringifier({attack: 'Hit', damage: {nonLethal: 0, lethal: 0}});
   expected  = 'Hit but damage reduction has reduced it all.';
   testResults.push({Expected: expected, Actual: actual, Description: 'Hit no damage'});
   } catch(e){testResults.push({Error: e, Description: 'Hit no damage'});}

   try{
   actual = Pathfinder.Attack.Stringifier({attack: 'Hit', damage: {nonLethal: 0, lethal: 1}});
   expected  = 'Hit dealing 1 point of damage.';
   testResults.push({Expected: expected, Actual: actual, Description: 'Hit lethal'});
   } catch(e){testResults.push({Error: e, Description: 'Hit lethal'});}

   try{
   actual = Pathfinder.Attack.Stringifier({attack: 'Hit', damage: {nonLethal: 5, lethal: 0}});
   expected  = 'Hit dealing 5 points of non-lethal damage.';
   testResults.push({Expected: expected, Actual: actual, Description: 'Hit non-lethal'});
   } catch(e){testResults.push({Error: e, Description: 'Hit non-lethal'});}

   try{
   actual = Pathfinder.Attack.Stringifier({attack: 'Critical Hit', damage: {nonLethal: 5, lethal: 31}});
   expected  = 'Critical Hit dealing 31 points of damage and 5 points of non-lethal damage.';
   testResults.push({Expected: expected, Actual: actual, Description: 'Critical Hit both'});
   } catch(e){testResults.push({Error: e, Description: 'Critical Hit both'});}

   try{
   actual = Pathfinder.Attack.Stringifier({attack: 'Critical Hit', damage: {nonLethal: 1, lethal: 1}});
   expected  = 'Critical Hit dealing 1 point of damage and 1 point of non-lethal damage.';
   testResults.push({Expected: expected, Actual: actual, Description: 'Grammar'});
   } catch(e){testResults.push({Error: e, Description: 'Grammar'});}

   return TestRunner.displayResults('Pathfinder Pathfinder.Attack.Stringifier', testResults, testState);
};
TestSuite.Pathfinder.RollInitiative = async function(testState={})
{
   TestRunner.clearResults(testState);

   var testResults = [], actual, expected, randomSource;

   try{
   randomSource = numberGenerator.dice(20, [5, 15]);
   var characterInput = [{name: 'Alice', initiative: 0}, {name: 'Bob', initiative: 1}];
   actual = Pathfinder.RollInitiative(characterInput, randomSource);

   testResults.push({Expected: {name: 'Bob', initiative: 1}, Actual: actual[0], Description: 'Happy path: character[0]'});
   testResults.push({Expected: {name: 'Alice', initiative: 0}, Actual: actual[1], Description: 'Happy path: character[1]'});
   testResults.push({Expected: 'Alice', Actual: characterInput[0].name, Description: 'Happy path: Doesn\'t mutate input'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   randomSource = numberGenerator([{dieSides: 20, values: [15, 15, 2]}, {dieSides: 2, values: [2]}]);
   actual = Pathfinder.RollInitiative([{name: 'Alice', initiative: 1}, {name: 'Bob', initiative: 1}, {name: 'Clara', initiative: 1}], randomSource);

   testResults.push({Expected: 'Bob', Actual: actual[0].name, Description: 'Double tied initiative character[0]'});
   testResults.push({Expected: 'Alice', Actual: actual[1].name, Description: 'Double tied initiative character[1]'});
   testResults.push({Expected: 'Clara', Actual: actual[2].name, Description: 'Double tied initiative character[2]'});
   } catch(e){testResults.push({Error: e, Description: 'Double tied initiative'});}

   try{
   randomSource = numberGenerator([{dieSides: 20, values: [20, 15, 15, 15, 10, 10]},
      //all roll init but 3 tie at 16 and 2 tie at 11
      //the decks don't have a final 1 because d1 doesn't use randomSource
   {deckSize: 3, values: [2, 2]}, {deckSize: 2, values: [1]}]);
   actual = Pathfinder.RollInitiative([{name: 'Alice', initiative: 0},
      {name: 'Bob', initiative: 1}, {name: 'Clara', initiative: 1}, {name: 'Dan', initiative: 1},
      {name: 'Edward', initiative: 1}, {name: 'Frank', initiative: 1}], randomSource);

   testResults.push({Expected: 'Alice', Actual: actual[0].name, Description: 'Stress Double tied initiative character[0]'});
   testResults.push({Expected: 'Clara', Actual: actual[1].name, Description: 'Stress Double tied initiative character[1]'});
   testResults.push({Expected: 'Dan', Actual: actual[2].name, Description: 'Stress Double tied initiative character[2]'});
   testResults.push({Expected: 'Bob', Actual: actual[3].name, Description: 'Stress Double tied initiative character[3]'});
   testResults.push({Expected: 'Edward', Actual: actual[4].name, Description: 'Stress Double tied initiative character[4]'});
   testResults.push({Expected: 'Frank', Actual: actual[5].name, Description: 'Stress Double tied initiative character[5]'});
   } catch(e){testResults.push({Error: e, Description: 'Stress Double tied initiative'});}

   return TestRunner.displayResults('Pathfinder Pathfinder.RollInitiative', testResults, testState);
};
TestSuite.Pathfinder.RollInitiative_initiativeComparator = async function(testState={})
{
   TestRunner.clearResults(testState);

   var testResults = [], characters;

   try{
   characters = [{currentInitiative: 9, character: {name: 'Alice', initiative: 2}}, {currentInitiative: 15, character: {name: 'Bob', initiative: 2}},
      {currentInitiative: 3, character: {name: 'Clara', initiative: 2}}];
   stableSort(characters, Pathfinder.RollInitiative._initiativeComparator);

   testResults.push({Expected: 'Bob', Actual: characters[0].character.name, Description: 'highest total first'});
   testResults.push({Expected: 'Alice', Actual: characters[1].character.name, Description: 'then next'});
   testResults.push({Expected: 'Clara', Actual: characters[2].character.name, Description: 'lowest total last'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   characters = [{currentInitiative: 5, character: {name: 'Alice', initiative: 2}}, {currentInitiative: 5, character: {name: 'Bob', initiative: 3}},
      {currentInitiative: 5, character: {name: 'Clara', initiative: 1}}];
   stableSort(characters, Pathfinder.RollInitiative._initiativeComparator);

   testResults.push({Expected: 'Bob', Actual: characters[0].character.name, Description: 'tied initiative total: highest bonus first'});
   testResults.push({Expected: 'Alice', Actual: characters[1].character.name, Description: 'tied initiative total: then next'});
   testResults.push({Expected: 'Clara', Actual: characters[2].character.name, Description: 'tied initiative total: lowest bonus last'});
   } catch(e){testResults.push({Error: e, Description: 'tied initiative total'});}

   return TestRunner.displayResults('Pathfinder Pathfinder.RollInitiative._initiativeComparator', testResults, testState);
};
TestSuite.Pathfinder.DeckOfIllusions = async function(testState={})
{
   TestRunner.clearResults(testState);

   var testResults = [], randomSource, deck;

   try{
   randomSource = numberGenerator.dice(34, [34]);
   deck = new Pathfinder.DeckOfIllusions(false, randomSource);
   testResults.push({Expected: 'Illusion of deck\'s owner (sex reversed)', Actual: deck.draw(randomSource), Description: 'Happy path: keep all cards'});
   randomSource = numberGenerator.dice(34, [34]);
   deck = new Pathfinder.DeckOfIllusions();
   testResults.push({Expected: 'Illusion of deck\'s owner (sex reversed)', Actual: deck.draw(randomSource), Description: 'Keep all cards is default'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   randomSource = numberGenerator.dice(10, [2]);
   deck = new Pathfinder.DeckOfIllusions(true, randomSource);
   randomSource = numberGenerator.dice(34, [34]);
   testResults.push({Expected: 'Illusion of deck\'s owner (sex reversed)', Actual: deck.draw(randomSource), Description: 'Randomly kept all cards'});

   randomSource = numberGenerator([{dieSides: 10, values: [1]}, {dieSides: 20, values: [2]},  //2 cards will be removed
   {deckSize: 34, values: [1, 33]}]);  //remove first then last
   deck = new Pathfinder.DeckOfIllusions(true, randomSource);
   randomSource = numberGenerator.deck(32, [1,31]);  //draw new first then last
   testResults.push({Expected: 'Male human fighter and four guards', Actual: deck.draw(randomSource), Description: 'Removed first card'});
   testResults.push({Expected: 'Illusion of deck\'s owner', Actual: deck.draw(randomSource), Description: 'Removed last card'});
   } catch(e){testResults.push({Error: e, Description: 'allowRandomlyMissing'});}

   return TestRunner.displayResults('Pathfinder Pathfinder.DeckOfIllusions', testResults, testState);
};
TestSuite.Pathfinder.DeckOfManyThings = async function(testState={})
{
   TestRunner.clearResults(testState);

   var testResults = [], nonRandomGenerator, deck, actual, expected;

   try{
   deck = new Pathfinder.DeckOfManyThings();
   nonRandomGenerator = numberGenerator.dice(22, [1]);
   expected = [{Plaque: 'Balance', Effect: 'Change alignment instantly.', Clarification: 'The character must change to a radically different alignment. If the character fails to act according to the new alignment, she gains a negative level.'}];
   testResults.push({Expected: expected, Actual: deck.draw(nonRandomGenerator), Description: 'Happy path'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   deck = new Pathfinder.DeckOfManyThings();
   nonRandomGenerator = numberGenerator.dice(22, [1, 1]);
   actual = [deck.draw(nonRandomGenerator)[0].Plaque, deck.draw(nonRandomGenerator)[0].Plaque];
   testResults.push({Expected: ['Balance', 'Balance'], Actual: actual, Description: 'Can draw same card again'});
   } catch(e){testResults.push({Error: e, Description: 'Can draw same card again'});}

   try{
   deck = new Pathfinder.DeckOfManyThings();
   nonRandomGenerator = numberGenerator.deck(22, [10, 10]);
   testResults.push({Expected: ['Jester', 'Key'], Actual: [deck.draw(nonRandomGenerator)[0].Plaque, deck.draw(nonRandomGenerator)[0].Plaque], Description: 'Jester gets removed'});
   } catch(e){testResults.push({Error: e, Description: 'Jester gets removed'});}

   try{
   deck = new Pathfinder.DeckOfManyThings();
   nonRandomGenerator = numberGenerator.deck(22, [7, 7]);
   expected = [{Plaque: 'Fool', Effect: 'Lose 10,000 experience points and you must draw again.', Clarification: 'The payment of XP and the redraw are mandatory. This card is always discarded when drawn, unlike all others except the Jester.'},
      {Plaque: 'Gem', Effect: 'Gain your choice of 25 pieces of jewelry or 50 gems.', Clarification: 'This card indicates wealth. The jewelry is all gold set with gems, each piece worth 2,000 gp, and the gems are worth 1,000 gp each.'}]
   actual = deck.draw(nonRandomGenerator);
   testResults.push({Expected: expected, Actual: actual, Description: 'Fool gets removed and draws again'});
   nonRandomGenerator = numberGenerator.dice(21, [7]);
   testResults.push({Expected: 'Gem', Actual: deck.draw(nonRandomGenerator)[0].Plaque, Description: 'Is actually removed'});
   } catch(e){testResults.push({Error: e, Description: 'Fool gets removed and draws again'});}

   try{
   deck = new Pathfinder.DeckOfManyThings();
   nonRandomGenerator = numberGenerator.deck(22, [7, 9]);
   expected = [{Plaque: 'Fool', Effect: 'Lose 10,000 experience points and you must draw again.', Clarification: 'The payment of XP and the redraw are mandatory. This card is always discarded when drawn, unlike all others except the Jester.'},
      {Plaque: 'Jester', Effect: 'Gain 10,000 XP or two more draws from the deck.', Clarification: 'This card is always discarded when drawn, unlike all others except the Fool. The redraws are optional.'}]
   actual = deck.draw(nonRandomGenerator);
   testResults.push({Expected: expected, Actual: actual, Description: 'Edge case: Fool can draw Jester'});

   nonRandomGenerator = numberGenerator.dice(20, [9]);
   testResults.push({Expected: 'Key', Actual: deck.draw(nonRandomGenerator)[0].Plaque, Description: 'And both are removed'});
   } catch(e){testResults.push({Error: e, Description: 'Edge case: Fool can draw Jester'});}

   return TestRunner.displayResults('Pathfinder Pathfinder.DeckOfManyThings', testResults, testState);
};
TestSuite.Pathfinder.HarrowDeckOfManyThings = async function(testState={})
{
   TestRunner.clearResults(testState);

   var testResults = [], nonRandomGenerator, expected;

   try{
   nonRandomGenerator = numberGenerator.dice(54, [47]);
   expected = {CardName: 'The Twin', Alignment: 'N', Suit: 'Crown', Effect: 'The character physically becomes a member of the opposite gender.'};
   testResults.push({Expected: expected, Actual: Pathfinder.HarrowDeckOfManyThings.draw(nonRandomGenerator), Description: 'Happy path'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   return TestRunner.displayResults('Pathfinder Pathfinder.HarrowDeckOfManyThings', testResults, testState);
};
