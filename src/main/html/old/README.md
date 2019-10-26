File descriptions
=================
## Deprecated
This entire folder is deprecated and will be deleted later.

## L5R stats.html
**Deprecated** this will be deleted later. It only exists until I can compare performance.

A simple web interface for drawing a distribution curve of the dice for the game Legend of the Five Rings.

Based on an old "tabletopDice.html" which was then heavily stripped out in hopes of improving performance
(only for this one type of dice curve), it tragically did not help. Additionally the old tabletopDice was not entirely
correct so these results may also be wrong.

If all dice are kept it performs wonders and is able to do 3,300k3,300 within a minute. But if even
1 die is dropped the performance is rather unfortunate and crashes when attempting 4k3 (on the other
hand 3k1 the next slowest takes only 3 seconds).

If all dice are kept a formula is used that is very fast but otherwise it must find every possible
combination.

**Inputs**: XkY, Emphasis

**Outputs**: min, max (of the ones calculated), average, standard deviation, and a drawn distribution curve (using divs)
