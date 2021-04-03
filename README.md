I show how to transpile (compile) a very, very simple SVG diagram into code.

I choose to target PROLOG (swipl), but any language would do.

PROLOG gives me pattern matching — exhaustive pattern matching with a simple syntax.  This can be done with loops-within-loops or with CPS.  This can be done in assembler, too.

I plan to use PEG — my glue tool[1] — to transpile the SVG.  There is no magic here, the glue tool just makes it easier for me to think about and to explain.

￼
[1] https://guitarvydas.github.io/2021/03/18/Little-Language.html

-------------------------------------------------------------------------------

I put this SVG code in https://www.w3schools.com/graphics/tryit.asp?filename=trysvg_rect

```
<!DOCTYPE html>
<html>
<body>

<svg width="400" height="110">
  <rect width="300" height="100" style="fill:yellow" style="stroke-width:1;stroke:rgb(0,0,0)" >invisible</rect>
    <text x="100" y="55" fill="black">This is Text!</text>

  Sorry, your browser does not support inline SVG.  
</svg>
 
</body>
</html>
```

The above SVG contains two useful elements (a rect and a text) and an error message.

-------------------------------------------------------------------------------

