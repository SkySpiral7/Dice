'use strict';

var fileNames = ['DiceExpression', 'DicePool', 'Die', 'GenerateHtml', 'Parser', 'Prebuilt', 'prototypes',
   'Statistics', 'Stringifier',
   'GameSpecific', 'Testing Util',  //must be last
   'beta/StackExchangeWhuber'];  //beta: ignore
//includePath was defined in src/library/include.js

TestConfig.defaultDelta = Number.EPSILON;  //since this program only deals with natural numbers and statistics

for (var i = 0; i < fileNames.length; ++i)
{
   document.write('<script type="text/javaScript" src="' + includePath + fileNames[i] + '.js"></script>');
}
