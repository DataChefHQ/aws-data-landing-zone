#!/bin/bash

# TODO: See how we can optimize this, probably ship the headless browser for OS with
npx playwright install
# npx playwright install-deps Cloudflare complains in build logs but it works fine without this

if [ "$CF_PAGES_BRANCH" = "main" ]; then
  npm run "build:production"
else
  npm run "build:development"
fi