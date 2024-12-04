# SMS Supabase project

* Prod - www.svenskamarvelsamlare.se
* GitHub - https://github.com/JoakimJohnsson/smssupabase
* Supabase - https://app.supabase.com/projects

<!-- TOC -->
* [SMS Supabase project](#sms-supabase-project)
  * [Setup and packages](#setup-and-packages)
    * [Local files - Git ignored](#local-files---git-ignored)
      * [Font Awesome](#font-awesome)
      * [Local Environment file](#local-environment-file)
    * [Environment variables - Secrets](#environment-variables---secrets)
    * [Packages](#packages)
      * [Update packages](#update-packages)
      * [Recharts](#recharts)
      * [Yet another react lightbox](#yet-another-react-lightbox)
    * [Maps](#maps)
      * [Documentation](#documentation)
  * [Development](#development)
    * [Workflow](#workflow)
    * [GitHub Actions for development](#github-actions-for-development)
    * [Supabase](#supabase)
      * [Database Functions](#database-functions)
  * [Deployment](#deployment)
    * [GitHub Actions for deployment](#github-actions-for-deployment)
    * [Versioning](#versioning)
      * [NPM Version](#npm-version)
    * [Available Scripts](#available-scripts)
      * [Start](#start)
    * [Test](#test)
<!-- TOC -->

## Setup and packages

Create a file called .env.local and copy contents of .env.dist. Ask admin for url and anon key. This is needed to
communicate with Supabase.

Be aware! There is no dev DB.

### Local files - Git ignored

#### Font Awesome

A Pro version of Font Awesome is used. Add a file called .npmrc in root folder. It should have the following properties:

```
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=< Ask Admin for token >
```

Just add the correct token. Otherwise, you might get this error when doing `npm install`:

```
npm error Incorrect or missing password.
```

#### Local Environment file

Add a file called .env.local in root folder. Copy properties from .env.dist and ask Admin for keys and urls.

### Environment variables - Secrets

Locally, properties are fetched from `.env.local` - see above.

Secrets, like API keys, are stored on GitHub and used for deployment in workflow `main.yml`.

New properties must be added on these locations:

1. GitHub - Secrets and variables - Actions.
2. `.env.local` - Local secret.
3. `.env.dist` - Placeholder.
4. `main.yml` - Or other workflow where the variable is used.

### Packages

#### Update packages

Update packages via npm commands:

* `npm outdated` to show available and recommended updates.
* `npm update` to update packages.
* `npm outdated` should now show a clean slate.
* `npm install` and `npm run build` to see if everything is OK. Fix any issues and repeat process until fixed.

Commit and push.

Other useful npm commands:

* `npm audit --omit=dev` will omit devDependencies from audit.

#### Recharts

The app uses Recharts components for visual representation of statistics.

* https://recharts.org/en-US
* https://recharts.org/en-US/api
* https://recharts.org/en-US/storybook

#### Yet another react lightbox

The app uses Yet another react lightbox for image viewing. CSS is copied from package to _lightbox.scss. This file also
handles conversion between
SASS variables and Yarl variables.

Please update CSS when upgrading package.

* https://yet-another-react-lightbox.com

### Maps

The app uses different Google Maps API:s, map id's and map styles.

Ask Admin for api keys and id's.

#### Documentation

See also inline comments for information.

* [Vis.gl - React google maps - docs](https://visgl.github.io/react-google-maps/docs/)
* [React google maps - guides](https://visgl.github.io/react-google-maps/docs/guides/interacting-with-google-maps-api)
* [Reference](https://developers.google.com/maps/documentation/javascript/reference)
* [Reference - map](https://developers.google.com/maps/documentation/javascript/reference/map)
* [Reference - map options](https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions)
* [Google maps package docs](https://primefaces.github.io/primefaces/jsdocs/modules/node_modules__types_google_maps.google.maps.html)
  * Information about DirectionsRenderer and PolyLineOptions.

## Development

### Workflow

https://github.com/JoakimJohnsson/smssupabase/issues

* Use your own development branch - like <Your Initials>-develop - for development work.
* When an issue is complete - make a pull request to develop branch, or other feature branch.
  * The pull request will automatically be reviewed by PR Agent and/or Admin.
* When develop is ready for deploy - Admin will:
  * Change version.
  * Merge into a release branch (release-x.x.x).
  * Git tags (`git push --tags`).
* A pull request is made from the release branch.
* Admin will review and merge.
* The action script will run tests and deploy to www.svenskamarvelsamlare.se.

### GitHub Actions for development

Edit .github/workflows/pr-agent.yml to make changes in the GitHub Action script for PR Agent.

### Supabase

https://app.supabase.com/projects

#### Database Functions

We try to use Supabase Database Functions where we can. See `databaseFunctions.js` for details.

Use the SQL Editor to create or update database functions.

## Deployment

On push to main (merging release<x.x.x> into main) - project will automatically be built and deployed
to www.svenskamarvelsamlare.se.

### GitHub Actions for deployment

Edit .github/workflows/main.yml to make changes in the GitHub Action script for Deployment.

### Versioning

Before merging develop to release-<x.x.x> - Please run `npm version <major> <minor> <patch>` (see below) to update
version information.

Then do `git push` and `git push --tags`. A new tag will appear in
gitHub - https://github.com/JoakimJohnsson/smssupabase/tags (only used for archive
purposes at the moment).

#### NPM Version

https://docs.npmjs.com/updating-your-published-package-version-number

- $ npm version major --> X.x.x
- $ npm version minor --> x.X.x
- $ npm version patch --> x.x.X

### Available Scripts

In the project directory, you can run:

#### Start

`npm run dev`
`npm run dev:debug`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### Test

`npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.
