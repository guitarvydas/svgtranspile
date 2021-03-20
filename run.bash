#!/bin/bash
node ../glue/glue.js <svg2p.glue >_temp.js  
cat svg2p1.js _temp.js svg2p2.js foreign.js >svg2p.js
node svg2p <test.svg >_temp.pl
awk '{gsub(/^[ \t]+/,"",$0); print($0);}' <_temp.pl >_temp2.pl
sort <_temp2.pl >out.pl
cat out.pl
echo
