# Contributing

This project uses a standard [Projen](https://projen.io/) setup. The only additions are:
- `husky` to run the git hooks on committing
- Documentation in the `docs` folder powered by Astro and the Starlight theme

## Getting started

Install packages and husky to run the git hooks on committing:
```
npm install
husky install
cd docs && npm install
```

Husky runs following command **before committing** to check if your changed code passes the linter, prettier, tsc, 
jsii compilation checks and tests:
```
npm run eslint
npm run default
npm run build
git add .
```

## Making a PR

1. Create an issue then indicate that you are working on it by:
    - Commenting on the issue you created
    - Assigning yourself to the issue
    - Create a draft PR
2. This is to keep an accurate [roadmap](https://github.com/orgs/DataChefHQ/projects/4) and ensure that
   no one is working on the same thing at the same time.
3. Create a fork form of the repository
4. Create a branch of the `main` branch with a meaningful name
5. Make your changes on your branch
6. Update the documentation if necessary
7. Write tests for your changes
8. Push your changes to your branch
9. Create a PR from your branch to the `main` branch of the original repository. PR names must follow the
[Conventional Commits](https://gist.github.com/Zekfad/f51cb06ac76e2457f11c80ed705c95a3) standard
    Available PR name types:
    - feat
    - fix
    - docs
    - ci
    - chore
10. Add a good description of your changes in the PR, and link the issue you are working on.


