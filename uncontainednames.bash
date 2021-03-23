#!/bin/bash
swipl -q \
      -g 'consult(fb).' \
      -g 'consult(uncontainednames).' \
      -g 'designRuleUncontainedNames.' \
      -g 'halt.'
