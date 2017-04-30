'use strict';
TestConfig.betweenEach=function(){randomSource = undefined;};
TestSuite.client = {Pathfinder: {}};
TestSuite.client.Pathfinder.createCharacterOptions = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [];

   try{
   randomSource = dieResultsToNonRandomGenerator(20, [2, 1]);
   document.getElementById('characterData').value = JSON.stringify([{name: 'Alice', initiative: 0, attacks: []}, {name: 'Bob', initiative: 0, attacks: []}]);
   document.getElementById('parseCharacterButton').onclick();

   testResults.push({Expected: document.getElementById('attacker').innerHTML, Actual: document.getElementById('target').innerHTML, Description: 'Attacker and target options match'});
   testResults.push({Expected: 'Alice', Actual: document.getElementById('attacker').options[0].text, Description: 'Character.Option[0].text'});
   testResults.push({Expected: '0', Actual: document.getElementById('attacker').options[0].value, Description: 'Character.Option[0].value'});
   testResults.push({Expected: 'Bob', Actual: document.getElementById('attacker').options[1].text, Description: 'Character.Option[1].text'});
   testResults.push({Expected: '1', Actual: document.getElementById('attacker').options[1].value, Description: 'Character.Option[1].value'});
   } catch(e){testResults.push({Error: e, Description: 'parseCharacterButton'});}

   try{
   randomSource = dieResultsToNonRandomGenerator(20, [2, 1]);
   document.getElementById('characterData').value = '[{name: "Alice", initiative: 0, attacks: []}, {name: \'Bob\', initiative: 0, attacks: []}]';
   document.getElementById('parseCharacterButton').onclick();
   testResults.push({Expected: 'Alice', Actual: document.getElementById('attacker').options[0].text, Description: 'Parsing is more forgiving than JSON'});
   } catch(e){testResults.push({Error: e, Description: 'Parsing is more forgiving than JSON'});}

   return TestRunner.displayResults('Pathfinder.html createCharacterOptions', testResults, isFirst);
};
TestSuite.client.Pathfinder.createAttackOptions = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [];

   try{
   randomSource = dieResultsToNonRandomGenerator(20, [2, 1]);
   document.getElementById('characterData').value = JSON.stringify([{name: 'Alice', initiative: 0, attacks: [{name: 'Punch'}, {name: 'Kick'}]},
      {name: 'Bob', initiative: 0, attacks: [{name: 'Stab'}, {name: 'Slash'}]}]);
   document.getElementById('parseCharacterButton').onclick();

   testResults.push({Expected: 'Punch', Actual: document.getElementById('attackUsed').options[0].text, Description: 'parseCharacterButton: Attack.Option[0].text'});
   testResults.push({Expected: '0', Actual: document.getElementById('attackUsed').options[0].value, Description: 'parseCharacterButton: Attack.Option[0].value'});
   testResults.push({Expected: 'Kick', Actual: document.getElementById('attackUsed').options[1].text, Description: 'parseCharacterButton: Attack.Option[1].text'});
   testResults.push({Expected: '1', Actual: document.getElementById('attackUsed').options[1].value, Description: 'parseCharacterButton: Attack.Option[1].value'});
   } catch(e){testResults.push({Error: e, Description: 'parseCharacterButton'});}

   try{
   document.getElementById('attacker').selectedIndex = 1;
   document.getElementById('attacker').onchange();

   testResults.push({Expected: 'Stab', Actual: document.getElementById('attackUsed').options[0].text, Description: 'attacker onchange: Attack.Option[0].text'});
   testResults.push({Expected: '0', Actual: document.getElementById('attackUsed').options[0].value, Description: 'attacker onchange: Attack.Option[0].value'});
   testResults.push({Expected: 'Slash', Actual: document.getElementById('attackUsed').options[1].text, Description: 'attacker onchange: Attack.Option[1].text'});
   testResults.push({Expected: '1', Actual: document.getElementById('attackUsed').options[1].value, Description: 'attacker onchange: Attack.Option[1].value'});
   } catch(e){testResults.push({Error: e, Description: 'attacker onchange'});}

   return TestRunner.displayResults('Pathfinder.html createAttackOptions', testResults, isFirst);
};
TestSuite.client.Pathfinder.attack = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [];

   try{
   randomSource = dieResultsToNonRandomGenerator(20, [2, 1]);
   document.getElementById('characterData').value = JSON.stringify([
      {name: 'Alice', initiative: 0, attacks: [
         {name: 'Punch', attackBonus: 1, minimumCritical: 18, criticalMultiplier: 2, damageString: '1d8', flatDamageModifer: 1, extraDamageDiceString: '1d6', isTouchAttack: false}
      ]},
      {name: 'Bob', initiative: 0, armorClass: {
         normal: 17, flat: 17, touch: 10, flatTouch: 10
      }, damageReduction: 2, attacks: []}
   ]);
   document.getElementById('parseCharacterButton').onclick();
   document.getElementById('target').selectedIndex = 1;  //target is Bob

   randomSource = dieResultsToNonRandomGenerator(20, [1]);
   document.getElementById('result').value = '';
   document.getElementById('attackButton').onclick();

   testResults.push({Expected: false, Actual: '' === document.getElementById('result').innerHTML, Description: 'All values attack didn\'t throw'});
   } catch(e){testResults.push({Error: e, Description: 'attackButton'});}

   return TestRunner.displayResults('Pathfinder.html attack', testResults, isFirst);
};
TestSuite.client.Pathfinder.createAttackInput = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], expected, actual;

   try{
   randomSource = dieResultsToNonRandomGenerator(20, [2, 1]);
   var weapon = {name: 'Punch', attackBonus: 'attackBonus', weapon: 'weapon'};
   document.getElementById('characterData').value = JSON.stringify([
      {name: 'Alice', initiative: 0, attacks: [
         weapon
      ]},
      {name: 'Bob', initiative: 0, armorClass: {
         normal: 'normal ac'
      }, damageReduction: 'damageReduction', attacks: []}
   ]);
   document.getElementById('parseCharacterButton').onclick();
   document.getElementById('target').selectedIndex = 1;  //target is Bob
   document.getElementById('flatFooted').checked = false;

   expected = {opposingAc: 'normal ac', attackBonus: 'attackBonus', weapon: weapon, damageReduction: 'damageReduction'};
   actual = createAttackInput();
   delete actual.randomSource;
   testResults.push({Expected: expected, Actual: actual, Description: 'Normal AC and optionals'});
   } catch(e){testResults.push({Error: e, Description: 'Normal AC'});}

   try{
   randomSource = dieResultsToNonRandomGenerator(20, [2, 1]);
   document.getElementById('characterData').value = JSON.stringify([
      {name: 'Alice', initiative: 0, attacks: [
         {name: 'Punch', isTouchAttack: true}
      ]},
      {name: 'Bob', initiative: 0, armorClass: {
         touch: 2
      }, attacks: []}
   ]);
   document.getElementById('parseCharacterButton').onclick();
   document.getElementById('target').selectedIndex = 1;  //target is Bob
   document.getElementById('flatFooted').checked = false;

   actual = createAttackInput();
   testResults.push({Expected: 2, Actual: actual.opposingAc, Description: 'Touch attack'});
   } catch(e){testResults.push({Error: e, Description: 'Touch attack'});}

   try{
   randomSource = dieResultsToNonRandomGenerator(20, [2, 1]);
   document.getElementById('characterData').value = JSON.stringify([
      {name: 'Alice', initiative: 0, attacks: [
         {name: 'Punch', isTouchAttack: false}
      ]},
      {name: 'Bob', initiative: 0, armorClass: {
         flat: 3
      }, attacks: []}
   ]);
   document.getElementById('parseCharacterButton').onclick();
   document.getElementById('target').selectedIndex = 1;  //target is Bob
   document.getElementById('flatFooted').checked = true;

   actual = createAttackInput();
   testResults.push({Expected: 3, Actual: actual.opposingAc, Description: 'Flat-footed'});
   } catch(e){testResults.push({Error: e, Description: 'Flat-footed'});}

   try{
   randomSource = dieResultsToNonRandomGenerator(20, [2, 1]);
   document.getElementById('characterData').value = JSON.stringify([
      {name: 'Alice', initiative: 0, attacks: [
         {name: 'Punch', isTouchAttack: true}
      ]},
      {name: 'Bob', initiative: 0, armorClass: {
         flatTouch: 4
      }, attacks: []}
   ]);
   document.getElementById('parseCharacterButton').onclick();
   document.getElementById('target').selectedIndex = 1;  //target is Bob
   document.getElementById('flatFooted').checked = true;

   actual = createAttackInput();
   testResults.push({Expected: 4, Actual: actual.opposingAc, Description: 'Flat-footed touch attack'});
   } catch(e){testResults.push({Error: e, Description: 'Flat-footed touch attack'});}

   return TestRunner.displayResults('Pathfinder.html createAttackInput', testResults, isFirst);
};
TestSuite.client.Pathfinder.initiative = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [];

   try{
   document.getElementById('characterData').value = JSON.stringify([{name: 'Alice', initiative: 0, attacks: []}, {name: 'Bob', initiative: 1, attacks: []}]);
   randomSource = dieResultsToNonRandomGenerator(20, [5, 15]);
   document.getElementById('parseCharacterButton').onclick();

   testResults.push({Expected: 'Bob', Actual: document.getElementById('attacker').options[0].text, Description: 'parseCharacterButton initiative: Character.Option[0].text'});
   testResults.push({Expected: 'Alice', Actual: document.getElementById('attacker').options[1].text, Description: 'parseCharacterButton initiative: Character.Option[1].text'});

   randomSource = dieResultsToNonRandomGenerator(20, [5, 15]);
   document.getElementById('initiativeButton').onclick();

   testResults.push({Expected: 'Alice', Actual: document.getElementById('attacker').options[0].text, Description: 'initiativeButton: Character.Option[0].text'});
   testResults.push({Expected: 'Bob', Actual: document.getElementById('attacker').options[1].text, Description: 'initiativeButton: Character.Option[1].text'});
   } catch(e){testResults.push({Error: e, Description: 'initiative'});}

   return TestRunner.displayResults('Pathfinder.html initiative', testResults, isFirst);
};
