#!/bin/bash
swipl -q \
      -g 'consult(fb).' \
      -g 'consult(bb).' \
      -g 'main.' \
      -g 'halt.'
