#!/bin/bash

# convert SVG diagram to factbase (fb) in prolog format (fb.pl)
## use glue (PEG) tool to generate "semantic" code for Ohm-JS (PEG)
node glue.js <svg2p.glue >_temp.js
## use Ohm-JS to read SVG and output fb.pl
cat svg2p1.js _temp.js svg2p2.js foreign.js >svg2p.js
node svg2p <test.svg >_temp.pl
awk '{gsub(/^[ \t]+/,"",$0); print($0);}' <_temp.pl >_temp2.pl
sed -e '/^$/d' <_temp2.pl >_temp3.pl
./delblanklines.bash <_temp2.pl >_temp3.pl
sort <_temp3.pl >fb.pl

## use PROLOG to convert strings to numbers
./num.bash >fb1.pl
cat out.pl fb1.pl >fb.pl

# calculate bounding boxes for rects
./bb.bash >fb2.pl
cat fb.pl fb2.pl | sort >temp.pl
mv temp.pl fb.pl

# assign names to each rect
./names.bash >fb3.pl
cat fb.pl fb3.pl | sort >temp.pl
mv temp.pl fb.pl

# design check (aka type check) - flag any names that are not
# assigned to rects
./uncontainednames.bash

