'use strict';

var fileNames = ['core/CustomDie', 'core/DicePool', 'core/Die', 'core/Parser', 'core/Prototypes', 'core/Validation']
.concat(['statistics/DiceExpression', 'statistics/Draw', 'statistics/GenerateHtml', 'statistics/Main', 'statistics/Misc'])
//don't include gameSpecific since the client likely only wants 1 or 0

var includePath = document.getElementById('DiceInclude').src.replace('Include.js', '');

function addScripts()
{
   for (var i = 0; i < fileNames.length; ++i)
   {
      document.write('<script type="text/javaScript" src="' + includePath + fileNames[i] + '.js"></script>');
   }
}
addScripts();
