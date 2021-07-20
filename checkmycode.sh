#!/bin/bash
set -e

[ ! -d "./node_modules" ] && echo "Please npm install first." && exit 1

GATEDIR=$(dirname "$0")/gates

sh "$GATEDIR/js-lint.sh"
sh "$GATEDIR/no-dups.sh" --ignore "**/*.json"
sh "$GATEDIR/js-test.sh"

echo Check Complete :\)
