'use strict';

var fileNames = ['DicePool', 'Die', 'GenerateHtml', 'Prebuilt', 'prototypes', 'Statistics', 'Testing Util', 'DiceExpression'];
if(undefined === this['includePath']) this.includePath = '';

for (var i = 0; i < fileNames.length; ++i)
{
   document.write('<script type="text/javaScript" src="' + includePath + fileNames[i] + '.js"></script>');
}
