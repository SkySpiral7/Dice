'use strict';

var fileNames = ['DiceExpression', 'DicePool', 'Die', 'Draw', 'GenerateHtml', 'Prebuilt', 'prototypes', 'Statistics', 'Stringifier', 'Misc'];
var includePath;  //this doesn't delete a pre-existing value.
//I could loop over document.getElementsByTagName('script') but that's too much work and equal assumption
if(null !== document.getElementById('DiceInclude')) includePath = document.getElementById('DiceInclude').src.replace('include.js', '');
else if(undefined === includePath) includePath = '';

for (var i = 0; i < fileNames.length; ++i)
{
   document.write('<script type="text/javaScript" src="' + includePath + fileNames[i] + '.js"></script>');
}
