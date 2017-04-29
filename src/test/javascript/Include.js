'use strict';

//since I'm testing everything I need to include every file
fileNames = fileNames.concat(['gameSpecific/L5R', 'gameSpecific/Mistborn', 'gameSpecific/Pathfinder', 'gameSpecific/RealWorld', 'gameSpecific/Warhammer']);
addScripts();

//addScripts, fileNames, includePath are defined in main/javascript/Include.js
includePath = includePath.replace('main/', 'test/');

//these have no tests
fileNames.removeElement('core/Validation');
fileNames.removeElement('statistics/Combination');
fileNames.removeElement('statistics/Draw');

//need this in order to test
fileNames.push('Testing Util');

addScripts();

TestConfig.defaultDelta = Number.EPSILON;  //since this program only deals with natural numbers and statistics
