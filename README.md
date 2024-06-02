# SMS Supabase project

* Prod - www.svenskamarvelsamlare.se
* GitHub - https://github.com/JoakimJohnsson/smssupabase
* Supabase - https://app.supabase.com/projects

**TABLE OF CONTENTS**
* [Setup and Packages](#setup)
  * [Local files - Git ignored](#local)
    * [Font Awesome](#fontawesome)
    * [Local Environment file](#localenv)
  * [Environment variables - Secrets](#environment)
  * [Packages](#packages)
    * [Update packages](#updatepackages)
    * [Recharts](#recharts)
    * [Yet another react lightbox](#lightbox)
  * [Maps](#googlemaps)
* [Development](#development)
  * [Workflow](#workflow)
* [Deployment](#deployment)
  * [GitHub Actions](#actions)
  * [Versioning](#versioning)
    * [NPM Version](#npmversion)
  * [Available Scripts](#scripts)
    * [Start](#start)
    * [Test](#test)

## <a id="setup"></a> Setup and packages

Create a file called .env.local and copy contents of .env.dist. Ask admin for url and anon key. This is needed to communicate with Supabase.

Be aware! There is no dev DB.

### <a id="local"></a> Local files - Git ignored

#### <a id="fontawesome"></a> Font Awesome

A Pro version of Font Awesome is used. Add a file called .npmrc in root folder. It should have the following properties:

```
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=< Ask Admin for token >
```

#### <a id="localenv"></a> Local Environment file

Add a file called .env.local in root folder. Copy properties from .env.dist and ask Admin for keys and urls.

### <a id="environment"></a> Environment variables - Secrets

Locally, properties are fetched from `.env.local` - see above. 

Secrets, like API keys, are stored on GitHub and used for deployment in workflow `main.yml`.

New properties must be added on these locations:

1. GitHub - Secrets and variables - Actions.
2. `.env.local` - Local secret.
3. `.env.dist` - Placeholder.
4. `main.yml` - Or other workflow where the variable is used.

### <a id="packages"></a> Packages

#### <a id="updatepackages"></a> Update packages
Update packages via npm commands:
* `npm outdated` to show available and recommended updates.
* `npm update` to update packages.
* `npm outdated` should now show a clean slate.
* `npm install` and `npm run build` to see if everything is OK. Fix any issues and repeat process until fixed.

Commit and push.

Other useful npm commands:
* `npm audit --omit=dev` will omit devDependencies from audit.

#### <a id="recharts"></a> Recharts

The app uses Recharts components for visual representation of statistics.

* https://recharts.org/en-US
* https://recharts.org/en-US/api
* https://recharts.org/en-US/storybook

#### <a id="lightbox"></a> Yet another react lightbox

The app uses Yet another react lightbox for image viewing. CSS is copied from package to _lightbox.scss. This file also handles conversion between
SASS variables and Yarl variables.

Please update CSS when upgrading package.

* https://yet-another-react-lightbox.com

### <a id="googlemaps"></a> Maps

The app uses different Google Maps API:s, map id's and map styles. 

Ask Admin for api keys and id's.

#### Documentation

See also inline comments for information.

* https://www.npmjs.com/package/@vis.gl/react-google-maps
* https://visgl.github.io/react-google-maps/docs/
* https://visgl.github.io/react-google-maps/docs/guides/interacting-with-google-maps-api#hooks
* https://developers.google.com/maps/documentation/javascript/reference/map
* https://developers.google.com/maps/documentation/javascript/reference/map#MapOptions

## <a id="development"></a> Development

### <a id="workflow"></a> Workflow

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

### <a id="actions"></a> GitHub Actions

Edit .github/workflows/pr-agent.yml to make changes in the GitHub Action script for PR Agent.

## <a id="deployment"></a> Deployment

On push to main (merging release<x.x.x> into main) - project will automatically be built and deployed to www.svenskamarvelsamlare.se.

### <a id="actions"></a> GitHub Actions

Edit .github/workflows/main.yml to make changes in the GitHub Action script for Deployment.

### <a id="versioning"></a> Versioning

Before merging develop to release-<x.x.x> - Please run `npm version <major> <minor> <patch>` (see below) to update version information.

Then do `git push` and `git push --tags`. A new tag will appear in gitHub - https://github.com/JoakimJohnsson/smssupabase/tags (only used for archive
purposes at the moment).

#### <a id="npmversion"></a> NPM Version

https://docs.npmjs.com/updating-your-published-package-version-number

- $ npm version major --> X.x.x
- $ npm version minor --> x.X.x
- $ npm version patch --> x.x.X

### <a id="scripts"></a> Available Scripts

In the project directory, you can run:
#### <a id="start"></a> Start
`npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
### <a id="test"></a> Test
`npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
