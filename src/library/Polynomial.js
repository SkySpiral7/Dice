'use strict';
//mx^a. m: coefficient, x: variable (I won't use), a: degree (must be a natural number), mx^a: term
function Polynomial(die)
{
   var termArray;
   this.multiply = function()
   {
   };
   this.push = function(term)
   {
   };
   this._constructor = function()
   {
   };
   this._constructor();
}
/*Example API:
new Polynomial('7x^4 - x + 6x^3 + 2').toJSON():  //I won't support creation from string
[
{coefficient: 7, degree: 4},  //will be in this order (degree descending)
{coefficient: 6, degree: 3},
{coefficient: -1, degree: 1},
{coefficient: 2, degree: 0}
]
*/
