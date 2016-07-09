'use strict';

var fileNames = ['DiceExpression', 'DicePool', 'Die', 'Draw', 'GenerateHtml', 'Parser', 'Prebuilt',
   'prototypes', 'Statistics', 'Stringifier',
   'GameSpecific', 'Misc',  //must be last. Misc currently doesn't need to be
   'StackExchange'];  //beta: ignore
var includePath;  //this doesn't delete a pre-existing value.
//I could loop over document.getElementsByTagName('script') but that's too much work and equal assumption
if(null !== document.getElementById('DiceInclude')) includePath = document.getElementById('DiceInclude').src.replace('include.js', '');
else if(undefined === includePath) includePath = '';

for (var i = 0; i < fileNames.length; ++i)
{
   document.write('<script type="text/javaScript" src="' + includePath + fileNames[i] + '.js"></script>');
}

//change this here so that the tests/include.js can be passed a specific includePath
includePath = includePath.replace('src/library', 'tests');
