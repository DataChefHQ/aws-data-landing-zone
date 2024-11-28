#!/bin/bash

npx playwright install
npx playwright install-deps

if [ "$CF_PAGES_BRANCH" = "main" ]; then
  npm run "build:production"
else
  npm run "build:development"
fi