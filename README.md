# Data Landing Zone

..TODO

## Testing the package locally

### TypeScript

Add a script to the `package.json` file in the root of the project:

```json
...
  "scripts": {
    "npm-link-manual-rehan": "npm uninstall recipes_data-landing-zone_data && ln -s /Users/rehanvandermerwe/DataChef/Projects/recipes_data-landing-zone_data-landing-zone /Users/rehanvandermerwe/DataChef/Projects/recipes_data-landing-zone_data-landing-zone-sandbox/node_modules"
}
...
```

It is NOT needed to run this script everytime a change is made, only when the package is first installed.

### Python

Create a bash script in the root of the project called `install-locally.sh` with the following content, replacing 
with your correct paths:

```bash
npm run compile --prefix /Users/rehanvandermerwe/DataChef/Projects/recipes_data-landing-zone_data-landing-zone
npm run package:python --prefix /Users/rehanvandermerwe/DataChef/Projects/recipes_data-landing-zone_data-landing-zone
tar -xf /Users/rehanvandermerwe/DataChef/Projects/recipes_data-landing-zone_data-landing-zone/dist/python/recipes_dlz-0.0.0.tar.gz
python3 -m pip install -e recipes_dlz-0.0.0
```

Note that `recipes_dlz` ia thE name we specified in the `projenrc.ts` file.

This needs to be run everytime a change is made and it is needed to test in Python.