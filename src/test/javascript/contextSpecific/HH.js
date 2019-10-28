'use strict';
TestSuite.HH = {};
TestSuite.HH.Damage = async function(testState={})
{
   TestRunner.clearResults(testState);

   var assertions = [], input, expected, actual, actualStringValue, randomSource, rolls;

   try{
      input = {attacker: {damageRank: 2}, defender: {toughness: 1}};
      rolls = [1, 1, 0]  //damage
         .concat([1, 0, 0]);  //toughness
      randomSource = numberGenerator([{dieSides: 'F', values: rolls}]);
      actual = HH.Damage(input, randomSource);
      actualStringValue = actual.toString();
      delete actual.toString;
      expected = {attack: 'Hit', damage: 2};
      assertions.push({Expected: expected, Actual: actual, Description: 'Happy path: perception, no crits, success. return value'});
      assertions.push({Expected: '2 damage', Actual: actualStringValue, Description:
         'Happy path: perception, no crits, success. string value'});
   } catch(e){assertions.push({Error: e, Description: 'Happy path: perception, no crits, success.'});}

   try{
      input = {attacker: {attack: 0, damageRank: 1}, defender: {toughness: 0}};
      randomSource = numberGenerator([{dieSides: 'F', values: [-1, -1, -1]}]);
      actual = HH.Damage(input, randomSource);
      actualStringValue = actual.toString();
      delete actual.toString;
      expected = {attack: 'Critical Miss'};
      assertions.push({Expected: expected, Actual: actual, Description: 'Critical Miss, return value'});
      assertions.push({Expected: 'Critical Miss', Actual: actualStringValue, Description: 'Critical Miss, string value'});
   } catch(e){assertions.push({Error: e, Description: 'Critical Miss'});}

   try{
      input = {attacker: {attack: 0, damageRank: 1}, defender: {activeDefense: undefined, toughness: 0}};
      randomSource = numberGenerator([{dieSides: 'F', values: [-1, -1, 0]}]);
      actual = HH.Damage(input, randomSource);
      assertions.push({Expected: 'Miss', Actual: actual.attack, Description: 'Defenseless Miss'});
   } catch(e){assertions.push({Error: e, Description: 'Defenseless Miss'});}

   try{
      input = {attacker: {attack: 0, damageRank: 1}, defender: {activeDefense: 10, toughness: 0}};
      rolls = [0, 0, 0]  //attack
         .concat([-1, -1, -1])  //active defense (crit fail)
         .concat([0, 0, 0])  //damage
         .concat([0, 0, 0]);  //toughness
      randomSource = numberGenerator([{dieSides: 'F', values: rolls}]);
      actual = HH.Damage(input, randomSource);
      assertions.push({Expected: 'Hit', Actual: actual.attack, Description: 'Crit fail active defense, auto hits'});
   } catch(e){assertions.push({Error: e, Description: 'Crit fail active defense, auto hits'});}

   try{
      input = {attacker: {attack: 3, damageRank: 1}, defender: {activeDefense: 0, toughness: 0}};
      rolls = [0, 0, 0]  //attack
         .concat([1, 1, 1]);  //active defense (crit success)
      randomSource = numberGenerator([{dieSides: 'F', values: rolls}]);
      actual = HH.Damage(input, randomSource);
      assertions.push({Expected: 'Miss', Actual: actual.attack, Description: 'Crit success active defense with miss'});
   } catch(e){assertions.push({Error: e, Description: 'Crit success active defense with miss'});}

   try{
      input = {attacker: {attack: 5, damageRank: 1}, defender: {activeDefense: 0, toughness: 0}};
      rolls = [0, 0, 0]  //attack
         .concat([1, 1, 1])  //active defense (crit success)
         .concat([0, 0, 0])  //damage
         .concat([0, 0, 0]);  //toughness
      randomSource = numberGenerator([{dieSides: 'F', values: rolls}]);
      actual = HH.Damage(input, randomSource);
      assertions.push({Expected: 'Hit', Actual: actual.attack, Description: 'Crit success active defense with hit'});
   } catch(e){assertions.push({Error: e, Description: 'Crit success active defense with hit'});}

   try{
      input = {attacker: {attack: 5, damageRank: 1}, defender: {activeDefense: 10, toughness: 0}};
      rolls = [0, 0, 0]  //attack
         .concat([0, 0, 0]);  //active defense
      randomSource = numberGenerator([{dieSides: 'F', values: rolls}]);
      actual = HH.Damage(input, randomSource);
      actualStringValue = actual.toString();
      delete actual.toString;
      expected = {attack: 'Miss'};
      assertions.push({Expected: expected, Actual: actual, Description: 'Regular Miss, return value'});
      assertions.push({Expected: 'Miss', Actual: actualStringValue, Description: 'Regular Miss, string value'});
   } catch(e){assertions.push({Error: e, Description: 'Regular Miss'});}

   try{
      input = {attacker: {attack: 1, damageRank: 1}, defender: {activeDefense: 0, toughness: 0}};
      rolls = [0, 0, 0]  //attack
         .concat([0, 0, 0])  //active defense
         .concat([0, 0, 0])  //damage
         .concat([0, 0, 0]);  //toughness
      randomSource = numberGenerator([{dieSides: 'F', values: rolls}]);
      actual = HH.Damage(input, randomSource);
      assertions.push({Expected: 'Hit', Actual: actual.attack, Description: 'Regular hit'});
   } catch(e){assertions.push({Error: e, Description: 'Regular hit'});}

   try{
      input = {attacker: {attack: 0, damageRank: 1}, defender: {activeDefense: 0, toughness: 0}};
      rolls = [0, 0, 0]  //attack
         .concat([0, 0, 0])  //active defense
         .concat([0, 0, 0])  //damage
         .concat([0, 0, 0]);  //toughness
      randomSource = numberGenerator([{dieSides: 'F', values: rolls}]);
      actual = HH.Damage(input, randomSource);
      assertions.push({Expected: 'Hit', Actual: actual.attack, Description: 'Tie is hit'});
   } catch(e){assertions.push({Error: e, Description: 'Tie is hit'});}

   try{
      input = {attacker: {attack: 0, damageRank: 1}, defender: {activeDefense: 10, toughness: 0}};
      rolls = [1, 1, 1]  //attack (crit success)
         .concat([0, 0, 0])  //active defense
         .concat([0, 0, 0])  //damage
         .concat([0, 0, 0]);  //toughness
      randomSource = numberGenerator([{dieSides: 'F', values: rolls}]);
      actual = HH.Damage(input, randomSource);
      assertions.push({Expected: 'Hit', Actual: actual.attack, Description: 'Threat auto hits'});
   } catch(e){assertions.push({Error: e, Description: 'Threat auto hits'});}

   try{
      input = {attacker: {attack: 0, damageRank: 1}, defender: {activeDefense: 0, toughness: 0}};
      rolls = [1, 1, 1]  //attack (crit success)
         .concat([0, 0, 0])  //active defense
         .concat([0, 0, 0])  //damage
         .concat([0, 0, 0]);  //toughness
      randomSource = numberGenerator([{dieSides: 'F', values: rolls}]);
      actual = HH.Damage(input, randomSource);
      assertions.push({Expected: 'Critical Hit', Actual: actual.attack, Description: 'Critical hit, hits'});
   } catch(e){assertions.push({Error: e, Description: 'Critical hit, hits'});}

   try{
      input = {attacker: {damageRank: 1}, defender: {toughness: 3}};
      rolls = [1, 1, 1]  //damage (crit success)
         .concat([1, 0, 0]);  //toughness
      randomSource = numberGenerator([{dieSides: 'F', values: rolls}]);
      actual = HH.Damage(input, randomSource);
      delete actual.toString;
      expected = {attack: 'Hit', damage: 1};
      assertions.push({Expected: expected, Actual: actual, Description: 'Crit success damage'});
   } catch(e){assertions.push({Error: e, Description: 'Crit success damage'});}

   try{
      input = {attacker: {damageRank: 5}, defender: {toughness: 0}};
      rolls = [-1, -1, -1]  //damage (crit fail)
         .concat([0, 0, 0]);  //toughness
      randomSource = numberGenerator([{dieSides: 'F', values: rolls}]);
      actual = HH.Damage(input, randomSource);
      delete actual.toString;
      expected = {attack: 'Hit', damage: 1};
      assertions.push({Expected: expected, Actual: actual, Description: 'Crit fail damage'});
   } catch(e){assertions.push({Error: e, Description: 'Crit fail damage'});}

   try{
      input = {attacker: {attack: 0, damageRank: 1}, defender: {activeDefense: 0, toughness: 0}};
      rolls = [1, 1, 1]  //attack (crit success)
         .concat([0, 0, 0])  //active defense
         .concat([0, 0, 0])  //damage
         .concat([0, 0, 0]);  //toughness
      randomSource = numberGenerator([{dieSides: 'F', values: rolls}]);
      actual = HH.Damage(input, randomSource);
      actualStringValue = actual.toString();
      delete actual.toString;
      expected = {attack: 'Critical Hit', damage: 2};
      assertions.push({Expected: expected, Actual: actual, Description: 'Critical hit, +1 damage, return value'});
      assertions.push({Expected: '2 damage', Actual: actualStringValue, Description: 'Critical hit, +1 damage, string value'});
   } catch(e){assertions.push({Error: e, Description: 'Critical hit, +1 damage'});}

   try{
      input = {attacker: {damageRank: 10}, defender: {toughness: 0}};
      rolls = [0, 0, 0]  //damage
         .concat([1, 1, 1]);  //toughness (crit success)
      randomSource = numberGenerator([{dieSides: 'F', values: rolls}]);
      actual = HH.Damage(input, randomSource);
      delete actual.toString;
      expected = {attack: 'Hit', damage: 6};
      assertions.push({Expected: expected, Actual: actual, Description: 'Crit success toughness'});
   } catch(e){assertions.push({Error: e, Description: 'Crit success toughness'});}

   try{
      input = {attacker: {damageRank: 10}, defender: {toughness: 0}};
      rolls = [0, 0, 0]  //damage
         .concat([-1, -1, -1]);  //toughness (crit fail)
      randomSource = numberGenerator([{dieSides: 'F', values: rolls}]);
      actual = HH.Damage(input, randomSource);
      delete actual.toString;
      expected = {attack: 'Hit', damage: 14};
      assertions.push({Expected: expected, Actual: actual, Description: 'Crit fail toughness'});
   } catch(e){assertions.push({Error: e, Description: 'Crit fail toughness'});}

   try{
      input = {attacker: {damageRank: 1}, defender: {toughness: 10}};
      rolls = [0, 0, 0]  //damage
         .concat([0, 0, 0]);  //toughness
      randomSource = numberGenerator([{dieSides: 'F', values: rolls}]);
      actual = HH.Damage(input, randomSource);
      actualStringValue = actual.toString();
      delete actual.toString;
      expected = {attack: 'Hit'};
      assertions.push({Expected: expected, Actual: actual, Description: 'Damage failed with hit. return value'});
      assertions.push({Expected: 'Damage failed', Actual: actualStringValue, Description: 'Damage failed with hit. string value'});
   } catch(e){assertions.push({Error: e, Description: 'Damage failed with hit'});}

   try{
      input = {attacker: {attack: 0, damageRank: 1}, defender: {activeDefense: 0, toughness: 10}};
      rolls = [1, 1, 1]  //attack (crit success)
         .concat([0, 0, 0])  //active defense
         .concat([0, 0, 0])  //damage
         .concat([0, 0, 0]);  //toughness
      randomSource = numberGenerator([{dieSides: 'F', values: rolls}]);
      actual = HH.Damage(input, randomSource);
      actualStringValue = actual.toString();
      delete actual.toString;
      expected = {attack: 'Critical Hit'};
      assertions.push({Expected: expected, Actual: actual, Description: 'Damage failed with critical hit. return value'});
      assertions.push({Expected: 'Damage failed', Actual: actualStringValue, Description: 'Damage failed with critical hit. string value'});
   } catch(e){assertions.push({Error: e, Description: 'Damage failed with critical hit'});}

   try{
      input = {attacker: {damageRank: 1}, defender: {toughness: 1}};
      rolls = [0, 0, 0]  //damage
         .concat([0, 0, 0]);  //toughness
      randomSource = numberGenerator([{dieSides: 'F', values: rolls}]);
      actual = HH.Damage(input, randomSource);
      actualStringValue = actual.toString();
      delete actual.toString;
      expected = {attack: 'Hit', damage: 0};
      assertions.push({Expected: expected, Actual: actual, Description: '0 damage allowed. return value'});
      assertions.push({Expected: '0 damage', Actual: actualStringValue, Description: '0 damage allowed. string value'});
   } catch(e){assertions.push({Error: e, Description: '0 damage allowed'});}

   return TestRunner.displayResults('H&H HH.Damage', assertions, testState);
};
