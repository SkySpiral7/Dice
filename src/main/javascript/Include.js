'use strict';

//TODO: allow a way to say include "core", "statistics", "all"?
var fileNames = ['core/DicePool', 'core/Die', 'core/Parser', 'core/Prototypes', 'core/Validation']
.concat(['statistics/DiceExpression', 'statistics/Draw', 'statistics/GenerateHtml', 'statistics/Main', 'statistics/Misc'])
.concat(['gameSpecific/L5R', 'gameSpecific/Mistborn', 'gameSpecific/Pathfinder', 'gameSpecific/Warhammer']);

var includePath;  //this doesn't delete a pre-existing value.
//I could loop over document.getElementsByTagName('script') but that's too much work and equal assumption
if(null !== document.getElementById('DiceInclude')) includePath = document.getElementById('DiceInclude').src.replace('Include.js', '');
else if(undefined === includePath) includePath = '';

for (var i = 0; i < fileNames.length; ++i)
{
   document.write('<script type="text/javaScript" src="' + includePath + fileNames[i] + '.js"></script>');
}

//change this here so that the test/javascript/include.js can be passed a specific includePath
includePath = includePath.replace('main/', 'test/');
