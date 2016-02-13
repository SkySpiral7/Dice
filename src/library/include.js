'use strict';

//next: GenerateHtml
var fileNames = ['DicePool', 'Die', 'Polynomial', 'prototypes', 'Statistics'];
if(undefined === this['includePath']) this.includePath = '';

for (var i = 0; i < fileNames.length; ++i)
{
   document.write('<script type="text/javaScript" src="' + includePath + fileNames[i] + '.js"></script>');
}
