#!/bin/bash
set -e

npm test

npx nyc --reporter=html --reporter=text npm run test
npx nyc check-coverage --functions 100
npx nyc check-coverage --branches 100
npx nyc check-coverage --lines 100

npx stryker run --mutate ./*.js,\!.eslintrc.js,\!stryker.conf.js
