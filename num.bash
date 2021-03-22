#!/bin/bash
swipl -q \
      -g 'consult(out).' \
      -g 'consult(num).' \
      -g 'main.' \
      -g 'halt.'
