'use strict';

//addScripts, fileNames, includePath are defined in main/javascript/Include.js
//since I'm testing everything I need to include every file
var allCoreFiles = fileNames;  //don't include the core prod files again but save them for the core tests
fileNames = ['contextSpecific/GURPS', 'contextSpecific/Ironclaw', 'contextSpecific/L5R', 'contextSpecific/Mistborn', 'contextSpecific/Pathfinder',
   'contextSpecific/RealWorld', 'contextSpecific/Warhammer'];
addScripts();

{
fileNames = allCoreFiles.concat(fileNames);
includePath = includePath.replace('main/', 'test/');

//these have no tests
fileNames.removeElement('core/Validation');
fileNames.removeElement('statistics/Combination');
fileNames.removeElement('statistics/Draw');

//need this in order to test
fileNames.push('Testing Util');

addScripts();
}

//another tool needed for testing
includePath = '../../../../Miscellaneous/src/main/javascript/';
fileNames = ['unstableSort']
addScripts();

TestConfig.defaultDelta = Number.EPSILON;  //since this program only deals with integers and statistics
