'use strict';

fileNames.removeElement('core/Validation');
fileNames.removeElement('statistics/Draw');
fileNames.removeElement('statistics/Misc');
fileNames.push('Testing Util');

//includePath was defined in main/javascript/include.js

TestConfig.defaultDelta = Number.EPSILON;  //since this program only deals with natural numbers and statistics

for (var i = 0; i < fileNames.length; ++i)
{
   document.write('<script type="text/javaScript" src="' + includePath + fileNames[i] + '.js"></script>');
}
