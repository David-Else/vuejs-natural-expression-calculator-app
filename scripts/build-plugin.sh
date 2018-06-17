#!/bin/bash

# Create basic JS wordpress plugin for uploading

# The "cp -t" switch tells cp that the file (or directory) name directly after -t is the target, which is where all of the file(s) listed, are to be copied to
cp -t ./natural-expression-generator-plugin ./dist/bundle.js ./dist/bundle.css ./src/ne-calc.php

zip -r natural-expression-generator-plugin.zip natural-expression-generator-plugin
