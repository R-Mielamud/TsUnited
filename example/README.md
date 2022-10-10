# This folder shows how to use all editions of TS United on a small todo-list project

At first, install all dependencies for all projects using `npm run install:all`.

If you don't want to install dependences for all projects, install shared's dependencies `npm run install:shared` and then use the following commands for separate projects:

-   backend - `npm run install:backend`
-   webpack-frontend - `npm run install:webpack-frontend`
-   cra-frontend - `npm run install:cra-frontend`
-   react-native-mobile - `npm run install:react-native-mobile`
-   mocha-tests - `npm run install:mocha-tests` (mocha-tests project references backend project, so the command will also install backend's dependencies)

Check every example project's README.md for guides.
