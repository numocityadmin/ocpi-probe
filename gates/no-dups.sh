#!/bin/bash
set -e

npx jscpd --min-lines 3 --min-tokens 25 --threshold 0 --gitignore "$@"
