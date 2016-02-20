'use strict';

var fileNames = ['DicePool', 'Die', 'Draw', 'GenerateHtml', 'Polynomial', 'Prebuilt', 'prototypes', 'Statistics'];
if(undefined === this['includePath']) this.includePath = '';

for (var i = 0; i < fileNames.length; ++i)
{
   document.write('<script type="text/javaScript" src="' + includePath + fileNames[i] + '.js"></script>');
}
