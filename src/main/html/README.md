File descriptions
=================
## L5R.html
A simple web interface for rolling dice for the game Legend of the Five Rings.

It is hooked up to the dice library and is therefore an example use case.

**Inputs**: TN, circumstance bonus, number of (non-free) raises, XkY, Emphasis

**Outputs**: list of each kept die sorted, list of each dropped die sorted, total of the dice kept, result, void points recovered,
and a drawn distribution curve with min, max, average, and standard deviation.


## Pathfinder.html
A simple web interface for attacking characters in Pathfinder.

It is hooked up to the dice library and is therefore an example use case.
The user form is very simple (after providing the character data).

**Inputs**: Character data, Attacker, attack used, Target, is target flat-footed?

**Outputs**: the results of the attack


## tabletopDice.html
A general purpose html that's hooked up to the dice rolling library. It has a textarea
which eval is called on so that you may write small programs on the fly.

The functional documentation is old and will be removed after all of them have been copied into jsDoc comments (as needed).

**Inputs**: (open file for documentation) a textarea for eval

**Outputs**: (open file for documentation) a textarea for output and a div for graphed results.


## Warhammer.html
A simple web interface for drawing a distribution curve of the dice for the game Warhammer 40k. And
for rolling random values using the inputs to know the results of an attack.

It is hooked up to the dice library and is therefore an example use case.
The user form has been greatly simplified and only supports Warhammer.

**Inputs**: Number of Dice, Number of Wounds Possible, To Hit Value, To Wound Value, To Save Value, Reanimation or Feel No Pain, (and Custom Column)

**Outputs**: the results of a random roll using the numbers given, min, max, average, standard deviation, and a drawn distribution curve (using divs)
