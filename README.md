# base-web-app
A base web app build system.

## Overview

This project is meant to serve as a template to build from when creating new web applications. Standardizing the build and test system helps developers move between projects without having to learn a completely new system each time.

Additionally we can pull changes from this project into other projects to apply updates easily.

## Build System

The `src` folder is compiled using webpack. `ts` and `tsx` files are compiled into javascript and `css` files are parsed and included properly. The `src` path is aliased such that it can be used in an absolute fashion (and should be).

The files are compiled for ES5 compatibility into a single bundle and then put into an inline script tag in a generated `index.html` file. The web app should be served from a single file.

## Scripts

- `start` - Starts the webpack development server on port 3000
- `build` - Builds the javascript bundle and packages it into `static/index.html`
- `build:production` - Builds the javascript bundle and minfiies it into `static/index.html`
- `lint` - Lints the project

## Linting

Uses the [`@eventology/eslint-config`](https://github.com/eventology/javascript/tree/master/packages/eslint-config) linting rules.
