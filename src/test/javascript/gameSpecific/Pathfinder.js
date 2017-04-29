'use strict';
TestSuite.Pathfinder = {};
TestSuite.Pathfinder.Attack = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], input, expected, actual, actualStringValue;

   try{
   input = {attackBonus: 4, weapon: {damageString: '1d8', flatDamageModifer: 3}, opposingAc: 12};
   input.randomSource = nonRandomNumberGenerator(dieResultsToNonRandomArray(20, [19]).concat(dieResultsToNonRandomArray(8, [5])));
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
   input.randomSource = dieResultsToNonRandomGenerator(20, [1]);
   actual = Pathfinder.Attack(input);
   actualStringValue = actual.toString();
   delete actual.toString;
   expected = {attack: 'Critical Miss'};
   testResults.push({Expected: expected, Actual: actual, Description: 'Critical Miss, return value'});
   testResults.push({Expected: Pathfinder.Attack.Stringifier(expected), Actual: actualStringValue, Description: 'Critical Miss, string value'});
   } catch(e){testResults.push({Error: e, Description: 'Critical Miss'});}

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d8'}, opposingAc: 100};
   input.randomSource = nonRandomNumberGenerator(dieResultsToNonRandomArray(20, [20, 1]).concat(dieResultsToNonRandomArray(8, [5])));
   actual = Pathfinder.Attack(input);
   delete actual.toString;
   expected = {attack: 'Hit', damage: {nonLethal: 0, lethal: 5}};
   testResults.push({Expected: expected, Actual: actual, Description: 'Natural 20 auto hits'});
   } catch(e){testResults.push({Error: e, Description: 'Natural 20 auto hits'});}

   try{
   input = {attackBonus: 1, weapon: {minimumCritical: 15, damageString: '1d8'}, opposingAc: 100};
   input.randomSource = dieResultsToNonRandomGenerator(20, [16]);
   actual = Pathfinder.Attack(input);
   actualStringValue = actual.toString();
   delete actual.toString;
   expected = {attack: 'Miss'};
   testResults.push({Expected: expected, Actual: actual, Description: 'Increased threat range doesn\'t auto hit'});
   testResults.push({Expected: Pathfinder.Attack.Stringifier(expected), Actual: actualStringValue, Description: 'Miss, string value'});
   } catch(e){testResults.push({Error: e, Description: 'Increased threat range doesn\'t auto hit'});}

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d8'}, opposingAc: 100};
   input.randomSource = nonRandomNumberGenerator(dieResultsToNonRandomArray(20, [20, 20]).concat(dieResultsToNonRandomArray(8, [5])));
   actual = Pathfinder.Attack(input);
   delete actual.toString;
   expected = {attack: 'Hit', damage: {nonLethal: 0, lethal: 5}};
   testResults.push({Expected: expected, Actual: actual, Description: 'Confirm with natural 20 isn\'t special'});
   } catch(e){testResults.push({Error: e, Description: 'Confirm with natural 20 isn\'t special'});}

   try{
   input = {attackBonus: 1, weapon: {minimumCritical: 18, damageString: '1d8'}, opposingAc: 11};
   input.randomSource = nonRandomNumberGenerator(dieResultsToNonRandomArray(20, [18, 11]).concat(dieResultsToNonRandomArray(8, [5, 3])));
   actual = Pathfinder.Attack(input);
   delete actual.toString;
   expected = {attack: 'Critical Hit', damage: {nonLethal: 0, lethal: 8}};
   testResults.push({Expected: expected, Actual: actual, Description: 'Increased critical range. Damage rolled twice.'});
   } catch(e){testResults.push({Error: e, Description: 'Increased critical range. Damage rolled twice.'});}

   try{
   input = {attackBonus: 1, weapon: {criticalMultiplier: 3, damageString: '1d8', flatDamageModifer: 2, extraDamageDiceString: '1d6'}, opposingAc: 11};
   input.randomSource = nonRandomNumberGenerator(dieResultsToNonRandomArray(20, [20, 20]).concat(dieResultsToNonRandomArray(8, [5, 7, 6])).concat(dieResultsToNonRandomArray(6, [5])));
   actual = Pathfinder.Attack(input);
   delete actual.toString;
   //29 === (5+2)+(7+2)+(6+2)+5
   expected = {attack: 'Critical Hit', damage: {nonLethal: 0, lethal: 29}};
   testResults.push({Expected: expected, Actual: actual, Description: 'x3 includes flat mod but not dice'});
   } catch(e){testResults.push({Error: e, Description: 'x3 includes flat mod but not dice'});}

   try{
   input = {attackBonus: 1, weapon: {criticalMultiplier: 3, damageString: '1d8', flatDamageModifer: -2}, opposingAc: 11};
   input.randomSource = nonRandomNumberGenerator(dieResultsToNonRandomArray(20, [20, 20]).concat(dieResultsToNonRandomArray(8, [1, 2, 3])));
   actual = Pathfinder.Attack(input);
   delete actual.toString;
   expected = {attack: 'Critical Hit', damage: {nonLethal: 2, lethal: 1}};
   testResults.push({Expected: expected, Actual: actual, Description: 'Minimum damage is nonlethal and applies to each'});
   } catch(e){testResults.push({Error: e, Description: 'Minimum damage is nonlethal and applies to each'});}

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d8', flatDamageModifer: -1}, opposingAc: 11, damageReduction: 5};
   input.randomSource = nonRandomNumberGenerator(dieResultsToNonRandomArray(20, [20, 10]).concat(dieResultsToNonRandomArray(8, [8, 1])));
   actual = Pathfinder.Attack(input);
   delete actual.toString;
   expected = {attack: 'Critical Hit', damage: {nonLethal: 1, lethal: 2}};
   testResults.push({Expected: expected, Actual: actual, Description: 'lethal damage > DR'});
   } catch(e){testResults.push({Error: e, Description: 'lethal damage > DR'});}

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d8'}, opposingAc: 11, damageReduction: 5};
   input.randomSource = nonRandomNumberGenerator(dieResultsToNonRandomArray(20, [10]).concat(dieResultsToNonRandomArray(8, [5])));
   actual = Pathfinder.Attack(input);
   delete actual.toString;
   expected = {attack: 'Hit', damage: {nonLethal: 0, lethal: 0}};
   testResults.push({Expected: expected, Actual: actual, Description: 'lethal damage === DR'});
   } catch(e){testResults.push({Error: e, Description: 'lethal damage === DR'});}

   try{
   input = {attackBonus: 1, weapon: {damageString: '1d8'}, opposingAc: 11, damageReduction: 5};
   input.randomSource = nonRandomNumberGenerator(dieResultsToNonRandomArray(20, [10]).concat(dieResultsToNonRandomArray(8, [3])));
   actual = Pathfinder.Attack(input);
   delete actual.toString;
   expected = {attack: 'Hit', damage: {nonLethal: 0, lethal: 0}};
   testResults.push({Expected: expected, Actual: actual, Description: 'lethal damage < DR'});
   } catch(e){testResults.push({Error: e, Description: 'lethal damage < DR'});}

   try{
   input = {attackBonus: 1, weapon: {criticalMultiplier: 3, damageString: '1d8', flatDamageModifer: -1}, opposingAc: 11, damageReduction: 3};
   input.randomSource = nonRandomNumberGenerator(dieResultsToNonRandomArray(20, [20, 10]).concat(dieResultsToNonRandomArray(8, [1, 1, 3])));
   actual = Pathfinder.Attack(input);
   delete actual.toString;
   expected = {attack: 'Critical Hit', damage: {nonLethal: 1, lethal: 0}};
   testResults.push({Expected: expected, Actual: actual, Description: 'DR for lethal then non'});
   } catch(e){testResults.push({Error: e, Description: 'DR for lethal then non'});}

   try{
   input = {attackBonus: 1, weapon: {criticalMultiplier: 3, damageString: '1d8', flatDamageModifer: -1}, opposingAc: 11, damageReduction: 5};
   input.randomSource = nonRandomNumberGenerator(dieResultsToNonRandomArray(20, [20, 10]).concat(dieResultsToNonRandomArray(8, [1, 1, 3])));
   actual = Pathfinder.Attack(input);
   delete actual.toString;
   expected = {attack: 'Critical Hit', damage: {nonLethal: 0, lethal: 0}};
   testResults.push({Expected: expected, Actual: actual, Description: 'DR for both'});
   } catch(e){testResults.push({Error: e, Description: 'DR for both'});}

   return TestRunner.displayResults('Pathfinder Pathfinder.Attack', testResults, isFirst);
};
TestSuite.Pathfinder.Attack_Stringifier = function(isFirst)
{
   TestRunner.clearResults(isFirst);

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

   return TestRunner.displayResults('Pathfinder Pathfinder.Attack.Stringifier', testResults, isFirst);
};
TestSuite.Pathfinder.DeckOfIllusions = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], nonRandomGenerator, deck;

   try{
   nonRandomGenerator = dieResultsToNonRandomGenerator(34, [34]);
   deck = new Pathfinder.DeckOfIllusions(false, nonRandomGenerator);
   testResults.push({Expected: 'Illusion of deck\'s owner (sex reversed)', Actual: deck.draw(nonRandomGenerator), Description: 'Happy path: keep all cards'});
   nonRandomGenerator = dieResultsToNonRandomGenerator(34, [34]);
   deck = new Pathfinder.DeckOfIllusions();
   testResults.push({Expected: 'Illusion of deck\'s owner (sex reversed)', Actual: deck.draw(nonRandomGenerator), Description: 'Keep all cards is default'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   nonRandomGenerator = dieResultsToNonRandomGenerator(10, [2]);
   deck = new Pathfinder.DeckOfIllusions(true, nonRandomGenerator);
   nonRandomGenerator = dieResultsToNonRandomGenerator(34, [34]);
   testResults.push({Expected: 'Illusion of deck\'s owner (sex reversed)', Actual: deck.draw(nonRandomGenerator), Description: 'Randomly kept all cards'});

   nonRandomGenerator = nonRandomNumberGenerator(dieResultsToNonRandomArray(10, [1]).concat(dieResultsToNonRandomArray(20, [2]))  //remove 2 cards
   .concat(dieResultsToNonRandomArray(34, [1])).concat(dieResultsToNonRandomArray(33, [33])));  //remove first then last
   deck = new Pathfinder.DeckOfIllusions(true, nonRandomGenerator);
   nonRandomGenerator = nonRandomNumberGenerator(dieResultsToNonRandomArray(32, [1]).concat(dieResultsToNonRandomArray(31, [31])));  //draw new first then last
   testResults.push({Expected: 'Male human fighter and four guards', Actual: deck.draw(nonRandomGenerator), Description: 'Removed first card'});
   testResults.push({Expected: 'Illusion of deck\'s owner', Actual: deck.draw(nonRandomGenerator), Description: 'Removed last card'});
   } catch(e){testResults.push({Error: e, Description: 'allowRandomlyMissing'});}

   return TestRunner.displayResults('Pathfinder Pathfinder.DeckOfIllusions', testResults, isFirst);
};
TestSuite.Pathfinder.DeckOfManyThings = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], nonRandomGenerator, deck, actual, expected;

   try{
   deck = new Pathfinder.DeckOfManyThings();
   nonRandomGenerator = dieResultsToNonRandomGenerator(22, [1]);
   testResults.push({Expected: [{Plaque: 'Balance', Effect: 'Change alignment instantly.'}], Actual: deck.draw(nonRandomGenerator), Description: 'Happy path'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   try{
   deck = new Pathfinder.DeckOfManyThings();
   nonRandomGenerator = dieResultsToNonRandomGenerator(22, [1, 1]);
   actual = [deck.draw(nonRandomGenerator)[0].Plaque, deck.draw(nonRandomGenerator)[0].Plaque];
   testResults.push({Expected: ['Balance', 'Balance'], Actual: actual, Description: 'Can draw same card again'});
   } catch(e){testResults.push({Error: e, Description: 'Can draw same card again'});}

   try{
   deck = new Pathfinder.DeckOfManyThings();
   nonRandomGenerator = nonRandomNumberGenerator(dieResultsToNonRandomArray(22, [10]).concat(dieResultsToNonRandomArray(21, [10])));
   testResults.push({Expected: ['Jester', 'Key'], Actual: [deck.draw(nonRandomGenerator)[0].Plaque, deck.draw(nonRandomGenerator)[0].Plaque], Description: 'Jester gets removed'});
   } catch(e){testResults.push({Error: e, Description: 'Jester gets removed'});}

   try{
   deck = new Pathfinder.DeckOfManyThings();
   nonRandomGenerator = nonRandomNumberGenerator(dieResultsToNonRandomArray(22, [7]).concat(dieResultsToNonRandomArray(21, [7])));
   expected = [{Plaque: 'Fool', Effect: 'Lose 10,000 experience points and you must draw again.'},
      {Plaque: 'Gem', Effect: 'Gain your choice of 25 pieces of jewelry or 50 gems.'}]
   actual = deck.draw(nonRandomGenerator);
   testResults.push({Expected: expected, Actual: actual, Description: 'Fool gets removed and draws again'});
   nonRandomGenerator = dieResultsToNonRandomGenerator(21, [7]);
   testResults.push({Expected: 'Gem', Actual: deck.draw(nonRandomGenerator)[0].Plaque, Description: 'Is actually removed'});
   } catch(e){testResults.push({Error: e, Description: 'Fool gets removed and draws again'});}

   try{
   deck = new Pathfinder.DeckOfManyThings();
   nonRandomGenerator = nonRandomNumberGenerator(dieResultsToNonRandomArray(22, [7]).concat(dieResultsToNonRandomArray(21, [9])));
   expected = [{Plaque: 'Fool', Effect: 'Lose 10,000 experience points and you must draw again.'},
      {Plaque: 'Jester', Effect: 'Gain 10,000 XP or two more draws from the deck.'}]
   actual = deck.draw(nonRandomGenerator);
   testResults.push({Expected: expected, Actual: actual, Description: 'Edge case: Fool can draw Jester'});

   nonRandomGenerator = dieResultsToNonRandomGenerator(20, [9]);
   testResults.push({Expected: 'Key', Actual: deck.draw(nonRandomGenerator)[0].Plaque, Description: 'And both are removed'});
   } catch(e){testResults.push({Error: e, Description: 'Edge case: Fool can draw Jester'});}

   return TestRunner.displayResults('Pathfinder Pathfinder.DeckOfManyThings', testResults, isFirst);
};
TestSuite.Pathfinder.HarrowDeckOfManyThings = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], nonRandomGenerator, expected;

   try{
   nonRandomGenerator = dieResultsToNonRandomGenerator(54, [47]);
   expected = {CardName: 'The Twin', Alignment: 'N', Effect: 'The character physically becomes a member of the opposite gender.'};
   testResults.push({Expected: expected, Actual: Pathfinder.HarrowDeckOfManyThings.draw(nonRandomGenerator), Description: 'Happy path'});
   } catch(e){testResults.push({Error: e, Description: 'Happy path'});}

   return TestRunner.displayResults('Pathfinder Pathfinder.HarrowDeckOfManyThings', testResults, isFirst);
};
