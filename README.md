# SMS Supabase project

* Prod - www.svenskamarvelsamlare.se 
* GitHub - https://github.com/JoakimJohnsson/smssupabase
* Supabase - https://app.supabase.com/projects 

## Setup
Create a file called .env.local and copy contents of .env.dist. Ask admin for url and anon key. This is needed to communicate with Supabase.

Be aware! There is no dev DB. 

## Deployment

On push to main - project will automatically be built and deployed to www.svenskamarvelsamlare.se.

Edit .github/workflows/main.yml to make changes in the GitHub Action script.

Please run `npm version <major> <minor> <patch>` before to update version information.

### Workflow
https://github.com/JoakimJohnsson/smssupabase/issues
* When an issue is complete - push changes to develop (directly or via pull request), or other feature branch. 
  * If on a feature branch - make a pull request to develop first.
* Admin will merge pull requests and decide when to make a "release" pull request to main branch.

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
