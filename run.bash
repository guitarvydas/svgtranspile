#!/bin/bash
node ../glue/glue.js <svg2p.glue >_temp.js  
cat svg2p1.js _temp.js svg2p2.js >svg2p.js
node svg2p <test.svg >_out.svg


