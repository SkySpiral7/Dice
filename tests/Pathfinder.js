'use strict';
TestSuite.client = {Pathfinder: {}};
TestSuite.client.Pathfinder.createCharacterOptions = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [];

   try{
   document.getElementById('characterData').value = JSON.stringify([{name: "Alice", attacks: []}, {name: "Bob", attacks: []}]);
   document.getElementById('parseCharacterButton').onclick();

   testResults.push({Expected: document.getElementById('attacker').innerHTML, Actual: document.getElementById('target').innerHTML, Description: 'Attacker and target options match'});
   testResults.push({Expected: 'Alice', Actual: document.getElementById('attacker').options[0].text, Description: 'Character.Option[0].text'});
   testResults.push({Expected: '0', Actual: document.getElementById('attacker').options[0].value, Description: 'Character.Option[0].value'});
   testResults.push({Expected: 'Bob', Actual: document.getElementById('attacker').options[1].text, Description: 'Character.Option[1].text'});
   testResults.push({Expected: '1', Actual: document.getElementById('attacker').options[1].value, Description: 'Character.Option[1].value'});
   } catch(e){testResults.push({Error: e, Description: 'parseCharacterButton'});}

   return TestRunner.displayResults('Pathfinder createCharacterOptions', testResults, isFirst);
};
TestSuite.client.Pathfinder.createAttackOptions = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [];

   try{
   document.getElementById('characterData').value = JSON.stringify([{name: "Alice", attacks: [{name: "Punch"}, {name: "Kick"}]}, {name: "Bob", attacks: [{name: "Stab"}, {name: "Slash"}]}]);
   document.getElementById('parseCharacterButton').onclick();

   testResults.push({Expected: 'Punch', Actual: document.getElementById('attackUsed').options[0].text, Description: 'Attack.Option[0].text'});
   testResults.push({Expected: '0', Actual: document.getElementById('attackUsed').options[0].value, Description: 'Attack.Option[0].value'});
   testResults.push({Expected: 'Kick', Actual: document.getElementById('attackUsed').options[1].text, Description: 'Attack.Option[1].text'});
   testResults.push({Expected: '1', Actual: document.getElementById('attackUsed').options[1].value, Description: 'Attack.Option[1].value'});
   } catch(e){testResults.push({Error: e, Description: 'parseCharacterButton'});}

   try{
   document.getElementById('attacker').selectedIndex = 1;
   document.getElementById('attacker').onchange();

   testResults.push({Expected: 'Stab', Actual: document.getElementById('attackUsed').options[0].text, Description: 'Attack.Option[0].text'});
   testResults.push({Expected: '0', Actual: document.getElementById('attackUsed').options[0].value, Description: 'Attack.Option[0].value'});
   testResults.push({Expected: 'Slash', Actual: document.getElementById('attackUsed').options[1].text, Description: 'Attack.Option[1].text'});
   testResults.push({Expected: '1', Actual: document.getElementById('attackUsed').options[1].value, Description: 'Attack.Option[1].value'});
   } catch(e){testResults.push({Error: e, Description: 'attacker onchange'});}

   return TestRunner.displayResults('Pathfinder createAttackOptions', testResults, isFirst);
};
TestSuite.client.Pathfinder.attack = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [];

   try{
   document.getElementById('characterData').value = JSON.stringify([
      {name: "Alice", attacks: [
         {name: "Punch", attackBonus: 1, minimumCritical: 18, criticalMultiplier: 2, damageString: '1d8', flatDamageModifer: 1, extraDamageDiceString: '1d6', isTouchAttack: false}
      ]},
      {name: "Bob", armorClass: {
         normal: 17, flat: 17, touch: 10, flatTouch: 10
      }, damageReduction: 2, attacks: []}
   ]);
   document.getElementById('parseCharacterButton').onclick();
   document.getElementById('target').selectedIndex = 1;  //target is Bob

   document.getElementById('result').value = '';
   document.getElementById('attackButton').onclick();

   testResults.push({Expected: false, Actual: '' === document.getElementById('result').value, Description: 'All values attack didn\'t throw'});
   } catch(e){testResults.push({Error: e, Description: 'attackButton'});}

   return TestRunner.displayResults('Pathfinder attack', testResults, isFirst);
};
TestSuite.client.Pathfinder.createAttackInput = function(isFirst)
{
   TestRunner.clearResults(isFirst);

   var testResults = [], expected, actual;

   try{
   var weapon = {name: "Punch", attackBonus: 'attackBonus', weapon: 'weapon'};
   document.getElementById('characterData').value = JSON.stringify([
      {name: "Alice", attacks: [
         weapon
      ]},
      {name: "Bob", armorClass: {
         normal: 'normal ac'
      }, damageReduction: 'damageReduction', attacks: []}
   ]);
   document.getElementById('parseCharacterButton').onclick();
   document.getElementById('target').selectedIndex = 1;  //target is Bob
   document.getElementById('flatFooted').checked = false;

   expected = {opposingAc: 'normal ac', attackBonus: 'attackBonus', weapon: weapon, damageReduction: 'damageReduction'};
   actual = createAttackInput();
   testResults.push({Expected: expected, Actual: actual, Description: 'Normal AC and optionals'});
   } catch(e){testResults.push({Error: e, Description: 'Normal AC'});}

   try{
   document.getElementById('characterData').value = JSON.stringify([
      {name: "Alice", attacks: [
         {name: "Punch", isTouchAttack: true}
      ]},
      {name: "Bob", armorClass: {
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
   document.getElementById('characterData').value = JSON.stringify([
      {name: "Alice", attacks: [
         {name: "Punch", isTouchAttack: false}
      ]},
      {name: "Bob", armorClass: {
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
   document.getElementById('characterData').value = JSON.stringify([
      {name: "Alice", attacks: [
         {name: "Punch", isTouchAttack: true}
      ]},
      {name: "Bob", armorClass: {
         flatTouch: 4
      }, attacks: []}
   ]);
   document.getElementById('parseCharacterButton').onclick();
   document.getElementById('target').selectedIndex = 1;  //target is Bob
   document.getElementById('flatFooted').checked = true;

   actual = createAttackInput();
   testResults.push({Expected: 4, Actual: actual.opposingAc, Description: 'Flat-footed touch attack'});
   } catch(e){testResults.push({Error: e, Description: 'Flat-footed touch attack'});}

   return TestRunner.displayResults('Pathfinder createAttackInput', testResults, isFirst);
};
