'use strict';
//this isn't included by Include.js because it is under html
/**For this reason don't make these tests async*/
TestConfig.betweenEach=function(){randomSource = undefined;};
TestSuite.client = {Pathfinder: {}};
TestSuite.client.Pathfinder.parseCharacterData = function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [];

   try{
   randomSource = numberGenerator.dice(20, [2, 1]);
   document.getElementById('characterData').value = '[{name: "Alice", initiative: 0, attacks: []}, {name: \'Bob\', initiative: 0, attacks: []}]';
   //don't test an object with getter/setter or anything crazy because while it is allowed it isn't intentionally supported
   document.getElementById('parseCharacterButton').onclick();
   assertions.push({Expected: 'Alice', Actual: document.getElementById('attacker').options[0].text, Description: 'Parsing is more forgiving than JSON'});
   } catch(e){assertions.push({Error: e, Description: 'Parsing is more forgiving than JSON'});}

   try{
   randomSource = numberGenerator.dice(20, [2, 1]);
   document.getElementById('characterData').value = JSON.stringify([{name: 'Alice', initiative: 0, attacks: []}, {name: 'Bob', notes: 'Is noteworthy', initiative: 0, attacks: []}]);
   document.getElementById('parseCharacterButton').onclick();
   assertions.push({Expected: '', Actual: characters[0].notes, Description: 'Defaults notes to ""'});
   assertions.push({Expected: 'Is noteworthy', Actual: characters[1].notes, Description: 'Without destroying notes'});
   } catch(e){assertions.push({Error: e, Description: 'Notes default to ""'});}

   return TestRunner.displayResults('Pathfinder.html parseCharacterData', assertions, testState);
};
TestSuite.client.Pathfinder.initiative = function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [];

   try{
   document.getElementById('characterData').value = JSON.stringify([{name: 'Alice', initiative: 0, attacks: []}, {name: 'Bob', initiative: 1, attacks: []}]);
   randomSource = numberGenerator.dice(20, [5, 15]);
   document.getElementById('parseCharacterButton').onclick();

   assertions.push({Expected: 'Bob', Actual: document.getElementById('attacker').options[0].text, Description: 'parseCharacterButton initiative: Character.Option[0].text'});
   assertions.push({Expected: 'Alice', Actual: document.getElementById('attacker').options[1].text, Description: 'parseCharacterButton initiative: Character.Option[1].text'});

   randomSource = numberGenerator.dice(20, [5, 15]);
   document.getElementById('initiativeButton').onclick();

   assertions.push({Expected: 'Alice', Actual: document.getElementById('attacker').options[0].text, Description: 'initiativeButton: Character.Option[0].text'});
   assertions.push({Expected: 'Bob', Actual: document.getElementById('attacker').options[1].text, Description: 'initiativeButton: Character.Option[1].text'});
   } catch(e){assertions.push({Error: e, Description: 'initiative'});}

   return TestRunner.displayResults('Pathfinder.html initiative', assertions, testState);
};
TestSuite.client.Pathfinder.createCharacterOptions = function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [];

   try{
   randomSource = numberGenerator.dice(20, [2, 1]);
   document.getElementById('characterData').value = JSON.stringify([{name: 'Alice', notes: 'Is noteworthy', initiative: 0, attacks: []}, {name: 'Bob', initiative: 0, attacks: []}]);
   document.getElementById('parseCharacterButton').onclick();

   assertions.push({Expected: document.getElementById('attacker').innerHTML, Actual: document.getElementById('target').innerHTML, Description: 'Attacker and target options match'});
   assertions.push({Expected: 0, Actual: document.getElementById('attacker').selectedIndex, Description: 'Attacker defaults to character[0]'});
   assertions.push({Expected: 'Alice', Actual: document.getElementById('attacker').options[0].text, Description: 'Character.Option[0].text'});
   assertions.push({Expected: '0', Actual: document.getElementById('attacker').options[0].value, Description: 'Character.Option[0].value'});
   assertions.push({Expected: 'Is noteworthy', Actual: document.getElementById('attackerNotes').value, Description: 'attackerNotes.value'});
   assertions.push({Expected: 0, Actual: document.getElementById('target').selectedIndex, Description: 'Target defaults to character[0]'});
   assertions.push({Expected: 'Bob', Actual: document.getElementById('attacker').options[1].text, Description: 'Character.Option[1].text'});
   assertions.push({Expected: '1', Actual: document.getElementById('attacker').options[1].value, Description: 'Character.Option[1].value'});
   assertions.push({Expected: 'Is noteworthy', Actual: document.getElementById('targetNotes').value, Description: 'targetNotes.value'});
   } catch(e){assertions.push({Error: e, Description: 'parseCharacterButton'});}

   return TestRunner.displayResults('Pathfinder.html createCharacterOptions', assertions, testState);
};
TestSuite.client.Pathfinder.createAttackOptions = function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [];

   try{
   randomSource = numberGenerator.dice(20, [2, 1]);
   document.getElementById('characterData').value = JSON.stringify([{name: 'Alice', notes: 'Starts with A', initiative: 0, attacks: [{name: 'Punch'}, {name: 'Kick'}]},
      {name: 'Bob', notes: 'Ends with B', initiative: 0, attacks: [{name: 'Stab'}, {name: 'Slash'}]}]);
   document.getElementById('parseCharacterButton').onclick();

   assertions.push({Expected: 'Alice', Actual: document.getElementById('attacker').selectedOptions[0].text, Description: 'parseCharacterButton: Assert attacker is Alice'});
   assertions.push({Expected: 'Punch', Actual: document.getElementById('attackUsed').options[0].text, Description: 'parseCharacterButton: Attack.Option[0].text'});
   assertions.push({Expected: '0', Actual: document.getElementById('attackUsed').options[0].value, Description: 'parseCharacterButton: Attack.Option[0].value'});
   assertions.push({Expected: 'Kick', Actual: document.getElementById('attackUsed').options[1].text, Description: 'parseCharacterButton: Attack.Option[1].text'});
   assertions.push({Expected: '1', Actual: document.getElementById('attackUsed').options[1].value, Description: 'parseCharacterButton: Attack.Option[1].value'});
   assertions.push({Expected: 'Starts with A', Actual: document.getElementById('attackerNotes').value, Description: 'parseCharacterButton: attackerNotes'});
   } catch(e){assertions.push({Error: e, Description: 'parseCharacterButton'});}

   try{
   document.getElementById('attacker').selectedIndex = 1;
   document.getElementById('attacker').onchange();

   assertions.push({Expected: 'Bob', Actual: document.getElementById('attacker').selectedOptions[0].text, Description: 'parseCharacterButton: Assert attacker is Bob'});
   assertions.push({Expected: 'Stab', Actual: document.getElementById('attackUsed').options[0].text, Description: 'attacker onchange: Attack.Option[0].text'});
   assertions.push({Expected: '0', Actual: document.getElementById('attackUsed').options[0].value, Description: 'attacker onchange: Attack.Option[0].value'});
   assertions.push({Expected: 'Slash', Actual: document.getElementById('attackUsed').options[1].text, Description: 'attacker onchange: Attack.Option[1].text'});
   assertions.push({Expected: '1', Actual: document.getElementById('attackUsed').options[1].value, Description: 'attacker onchange: Attack.Option[1].value'});
   assertions.push({Expected: 'Ends with B', Actual: document.getElementById('attackerNotes').value, Description: 'attacker onchange: attackerNotes'});
   } catch(e){assertions.push({Error: e, Description: 'attacker onchange'});}

   return TestRunner.displayResults('Pathfinder.html createAttackOptions', assertions, testState);
};
TestSuite.client.Pathfinder.displayNotes = function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [];

   try{
   randomSource = numberGenerator.dice(20, [2, 1]);
   document.getElementById('characterData').value = JSON.stringify([{name: 'Alice', notes: 'Starts with A', initiative: 0, attacks: []},
      {name: 'Bob', notes: 'Ends with B', initiative: 0, attacks: []}]);
   document.getElementById('parseCharacterButton').onclick();

   assertions.push({Expected: 'Alice', Actual: document.getElementById('attacker').selectedOptions[0].text, Description: 'Assert attacker is Alice'});
   assertions.push({Expected: 'Starts with A', Actual: document.getElementById('attackerNotes').value, Description: 'attackerNotes.value'});
   assertions.push({Expected: 'Alice', Actual: document.getElementById('target').selectedOptions[0].text, Description: 'Assert target is Alice'});
   assertions.push({Expected: 'Starts with A', Actual: document.getElementById('targetNotes').value, Description: 'targetNotes.value'});
   } catch(e){assertions.push({Error: e, Description: 'Initial'});}

   try{
   document.getElementById('target').selectedIndex = 1;
   document.getElementById('target').onchange();

   assertions.push({Expected: 'Bob', Actual: document.getElementById('target').selectedOptions[0].text, Description: 'Assert target is Bob'});
   assertions.push({Expected: 'Ends with B', Actual: document.getElementById('targetNotes').value, Description: 'targetNotes.value changed'});
   } catch(e){assertions.push({Error: e, Description: 'target onchange'});}

   return TestRunner.displayResults('Pathfinder.html displayNotes', assertions, testState);
};
TestSuite.client.Pathfinder.updateNotes = function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [];

   try{
   randomSource = numberGenerator.dice(20, [2, 1]);
   document.getElementById('characterData').value = JSON.stringify([{name: 'Alice', initiative: 0, attacks: []}, {name: 'Bob', initiative: 0, attacks: []}]);
   document.getElementById('parseCharacterButton').onclick();
   document.getElementById('target').selectedIndex = 1;
   document.getElementById('target').onchange();

   assertions.push({Expected: 'Alice', Actual: document.getElementById('attacker').selectedOptions[0].text, Description: 'Different characters: Assert attacker is Alice'});
   assertions.push({Expected: '', Actual: document.getElementById('attackerNotes').value, Description: 'Different characters: initial attackerNotes.value'});
   assertions.push({Expected: 'Bob', Actual: document.getElementById('target').selectedOptions[0].text, Description: 'Different characters: Assert target is Bob'});
   assertions.push({Expected: '', Actual: document.getElementById('targetNotes').value, Description: 'Different characters: initial targetNotes.value'});

   document.getElementById('attackerNotes').value = 'Starts with A';
   document.getElementById('attackerNotes').onchange();

   assertions.push({Expected: 'Starts with A', Actual: document.getElementById('attackerNotes').value, Description: 'Different characters, change attackerNotes: new attackerNotes.value'});
   assertions.push({Expected: '', Actual: document.getElementById('targetNotes').value, Description: 'Different characters, change attackerNotes: same targetNotes.value'});

   document.getElementById('targetNotes').value = 'Ends with B';
   document.getElementById('targetNotes').onchange();

   assertions.push({Expected: 'Starts with A', Actual: document.getElementById('attackerNotes').value, Description: 'Different characters, change targetNotes: same attackerNotes.value'});
   assertions.push({Expected: 'Ends with B', Actual: document.getElementById('targetNotes').value, Description: 'Different characters, change targetNotes: new targetNotes.value'});
   } catch(e){assertions.push({Error: e, Description: 'Different characters'});}

   try{
   randomSource = numberGenerator.dice(20, [2, 1]);
   document.getElementById('characterData').value = JSON.stringify([{name: 'Alice', initiative: 0, attacks: []}]);
   document.getElementById('parseCharacterButton').onclick();

   assertions.push({Expected: 'Alice', Actual: document.getElementById('attacker').selectedOptions[0].text, Description: 'Same character: Assert attacker is Alice'});
   assertions.push({Expected: '', Actual: document.getElementById('attackerNotes').value, Description: 'Same character: initial attackerNotes.value'});
   assertions.push({Expected: 'Alice', Actual: document.getElementById('target').selectedOptions[0].text, Description: 'Same character: Assert target is Alice'});
   assertions.push({Expected: '', Actual: document.getElementById('targetNotes').value, Description: 'Same character: initial targetNotes.value'});

   document.getElementById('attackerNotes').value = 'Starts with A';
   document.getElementById('attackerNotes').onchange();

   assertions.push({Expected: 'Starts with A', Actual: document.getElementById('attackerNotes').value, Description: 'Same character, change attackerNotes: new attackerNotes.value'});
   assertions.push({Expected: 'Starts with A', Actual: document.getElementById('targetNotes').value, Description: 'Same character, change attackerNotes: new targetNotes.value'});

   document.getElementById('targetNotes').value = 'Ends with B';
   document.getElementById('targetNotes').onchange();

   assertions.push({Expected: 'Ends with B', Actual: document.getElementById('attackerNotes').value, Description: 'Same character, change targetNotes: new attackerNotes.value'});
   assertions.push({Expected: 'Ends with B', Actual: document.getElementById('targetNotes').value, Description: 'Same character, change targetNotes: new targetNotes.value'});
   } catch(e){assertions.push({Error: e, Description: 'Same character'});}

   return TestRunner.displayResults('Pathfinder.html updateNotes', assertions, testState);
};
TestSuite.client.Pathfinder.attack = function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [];

   try{
   randomSource = numberGenerator.dice(20, [2, 1]);
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

   randomSource = numberGenerator.dice(20, [1]);
   document.getElementById('result').value = '';
   document.getElementById('attackButton').onclick();

   assertions.push({Expected: false, Actual: '' === document.getElementById('result').innerHTML, Description: 'All values attack didn\'t throw'});
   } catch(e){assertions.push({Error: e, Description: 'attackButton'});}

   return TestRunner.displayResults('Pathfinder.html attack', assertions, testState);
};
TestSuite.client.Pathfinder.createAttackInput = function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], expected, actual;

   try{
   randomSource = numberGenerator.dice(20, [2, 1]);
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
   assertions.push({Expected: expected, Actual: actual, Description: 'Normal AC and optionals'});
   } catch(e){assertions.push({Error: e, Description: 'Normal AC'});}

   try{
   randomSource = numberGenerator.dice(20, [2, 1]);
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
   assertions.push({Expected: 2, Actual: actual.opposingAc, Description: 'Touch attack'});
   } catch(e){assertions.push({Error: e, Description: 'Touch attack'});}

   try{
   randomSource = numberGenerator.dice(20, [2, 1]);
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
   assertions.push({Expected: 3, Actual: actual.opposingAc, Description: 'Flat-footed'});
   } catch(e){assertions.push({Error: e, Description: 'Flat-footed'});}

   try{
   randomSource = numberGenerator.dice(20, [2, 1]);
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
   assertions.push({Expected: 4, Actual: actual.opposingAc, Description: 'Flat-footed touch attack'});
   } catch(e){assertions.push({Error: e, Description: 'Flat-footed touch attack'});}

   return TestRunner.displayResults('Pathfinder.html createAttackInput', assertions, testState);
};
