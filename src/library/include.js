'use strict';

var fileNames = ['DicePool', 'Die', 'Draw', 'examples', 'numberGroup', 'main', 'Polynomial', 'prototypes', 'special dice', 'stats util'];
if(undefined === this['includePath']) this.includePath = '';

for (var i = 0; i < fileNames.length; ++i)
{
   document.write('<script type="text/javaScript" src="' + includePath + fileNames[i] + '.js"></script>');
}
