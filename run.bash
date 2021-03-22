#!/bin/bash
node ../glue/glue.js <svg2p.glue >_temp.js  
cat svg2p1.js _temp.js svg2p2.js foreign.js >svg2p.js
node svg2p <test.svg >_temp.pl
awk '{gsub(/^[ \t]+/,"",$0); print($0);}' <_temp.pl >_temp2.pl
sed -e '/^$/d' <_temp2.pl >_temp3.pl
./delblanklines.bash <_temp2.pl >_temp3.pl
sort <_temp3.pl >out.pl
./num.bash >fb1.pl
cat out.pl fb1.pl >fb.pl
./bb.bash >fb2.pl
cat fb.pl fb2.pl | sort >temp.pl
mv temp.pl fb.pl

./names.bash >fb3.pl
cat fb.pl fb3.pl | sort >temp.pl
mv temp.pl fb.pl

