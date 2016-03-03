'use strict';

var fileNames = ['DiceExpression', 'DicePool', 'Die', 'GenerateHtml', 'Prebuilt', 'prototypes', 'Statistics', 'Stringifier', 'Testing Util'];
//includePath was defined in src/library/include.js but I need tests/
includePath = includePath.replace('src/library', 'tests');

for (var i = 0; i < fileNames.length; ++i)
{
   document.write('<script type="text/javaScript" src="' + includePath + fileNames[i] + '.js"></script>');
}
