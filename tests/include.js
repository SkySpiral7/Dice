'use strict';

var fileNames = ['DiceExpression', 'DicePool', 'Die', 'GenerateHtml', 'JsonReviver', 'Parser', 'Prebuilt', 'prototypes',
   'Statistics', 'Stringifier',
   'Misc', 'Testing Util'];  //must be last
//includePath was defined in src/library/include.js

for (var i = 0; i < fileNames.length; ++i)
{
   document.write('<script type="text/javaScript" src="' + includePath + fileNames[i] + '.js"></script>');
}
