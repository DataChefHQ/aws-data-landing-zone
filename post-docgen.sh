#!/bin/bash
# Copy the API.md file to the docs and add frontmatter

{
  echo "---";
  echo "title: API";
  echo "description: Reference - API";
  echo "---";
  cat API.md;
} > temp_file && mv temp_file docs/src/content/docs/reference/api.md