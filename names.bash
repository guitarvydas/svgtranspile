#!/bin/bash
swipl -q \
      -g 'consult(fb).' \
      -g 'consult(names).' \
      -g 'main.' \
      -g 'halt.'
