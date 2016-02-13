'use strict';

//next: Polynomial, GenerateHtml, Statistics
var fileNames = ['DicePool', 'Die', 'prototypes'];
if(undefined === this['includePath']) this.includePath = '';

for (var i = 0; i < fileNames.length; ++i)
{
   document.write('<script type="text/javaScript" src="' + includePath + fileNames[i] + '.js"></script>');
}
