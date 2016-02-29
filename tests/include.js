'use strict';

var fileNames = ['DiceExpression', 'DicePool', 'Die', 'GenerateHtml', 'Prebuilt', 'prototypes', 'Statistics', 'Stringifier', 'Testing Util'];
if(undefined === this['includePath']) this.includePath = '';

for (var i = 0; i < fileNames.length; ++i)
{
   document.write('<script type="text/javaScript" src="' + includePath + fileNames[i] + '.js"></script>');
}
