# SMS Supabase project

* Prod - www.svenskamarvelsamlare.se
* GitHub - https://github.com/JoakimJohnsson/smssupabase
* Supabase - https://app.supabase.com/projects

## Setup

Create a file called .env.local and copy contents of .env.dist. Ask admin for url and anon key. This is needed to communicate with Supabase.

Be aware! There is no dev DB.

### Update packages
Update packages via npm commands:
* `npm outdated` to show available and recommended updates.
* `npm update` to update packages.
* `npm outdated` should now show a clean slate. 
* `npm install` and `npm run build` to see if everything is OK. Fix any issues and repeat process until fixed.

Commit and push.

### Local files - Git ignored

#### Font Awesome

A Pro version of Font Awesome is used. Add a file called .npmrc in root folder. It should have the following properties:

```
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=< Ask Admin for token >
```

#### Local Env

Add a file called .env.local in root folder. Copy properties from .env.dist and ask Admin for keys and urls.

## Recharts

The app uses Recharts components for visual representation of statistics.

* https://recharts.org/en-US
* https://recharts.org/en-US/api
* https://recharts.org/en-US/storybook

## Yet another react lightbox

The app uses Yet another react lightbox for image viewing. CSS is copied from package to _lightbox.scss. This file also handles conversion between
SASS variables and Yarl variables.

Please update CSS when upgrading package.

* https://yet-another-react-lightbox.com

## Deployment

On push to main (merging release<x.x.x> into main) - project will automatically be built and deployed to www.svenskamarvelsamlare.se.

### Action script

Edit .github/workflows/main.yml to make changes in the GitHub Action script.

### Versioning

Before merging develop to release-<x.x.x> - Please run `npm version <major> <minor> <patch>` (see below) to update version information.

Then do `git push` and `git push --tags`. A new tag will appear in gitHub - https://github.com/JoakimJohnsson/smssupabase/tags (only used for archive
purposes at the moment).

#### NPM version

https://docs.npmjs.com/updating-your-published-package-version-number

- $ npm version major --> X.x.x
- $ npm version minor --> x.X.x
- $ npm version patch --> x.x.X

### Workflow

https://github.com/JoakimJohnsson/smssupabase/issues

* When an issue is complete - push changes to develop (directly or via pull request), or other feature branch.
    * If on a feature branch - make a pull request to develop first.
* When develop is ready for deploy - Admin will:
    * Change version.
    * Merge into a release branch (release-x.x.x).
    * Git tags (`git push --tags`).
* A pull request is made from the release branch.
* Admin will review and merge.
* The action script will run tests and deploy to www.svenskamarvelsamlare.se.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
