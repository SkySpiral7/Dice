'use strict';

var fileNames = ['DiceExpression', 'DicePool', 'Die', 'GenerateHtml', 'Parser', 'Prebuilt', 'prototypes', 'Statistics', 'Stringifier', 'Testing Util'];
//includePath was defined in src/library/include.js

for (var i = 0; i < fileNames.length; ++i)
{
   document.write('<script type="text/javaScript" src="' + includePath + fileNames[i] + '.js"></script>');
}
