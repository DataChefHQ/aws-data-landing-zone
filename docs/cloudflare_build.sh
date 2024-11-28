#!/bin/bash

if [ "$CF_PAGES_BRANCH" = "main" ]; then
  npm run "build:production"
else
  npm run "build:development"
fi