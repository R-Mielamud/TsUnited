# This folder shows how to use all editions of TS United on a small todo list project

At first, install all dependencies for all projects using `npm run install:all` command.

If you don't want to install dependences for all projects, install shared's dependencies with `npm run install:shared` and then use the following commands for separate projects:

-   [backend](https://github.com/R-Mielamud/TsUnited/tree/main/example/backend) - `npm run install:backend`
-   [webpack-frontend](https://github.com/R-Mielamud/TsUnited/tree/main/example/webpack-frontend) - `npm run install:webpack-frontend`
-   [cra-frontend](https://github.com/R-Mielamud/TsUnited/tree/main/example/cra-frontend) - `npm run install:cra-frontend`
-   [react-native-mobile](https://github.com/R-Mielamud/TsUnited/tree/main/example/react-native-mobile) - `npm run install:react-native-mobile`
-   [mocha-tests](https://github.com/R-Mielamud/TsUnited/tree/main/example/mocha-tests) - `npm run install:mocha-tests` ([mocha-tests](https://github.com/R-Mielamud/TsUnited/tree/main/example/mocha-tests) project references [backend](https://github.com/R-Mielamud/TsUnited/tree/main/example/backend) project, so the command will also install backend's dependencies)

Check every example project's `README.md` for guides.

It's recommended to start with [backend](https://github.com/R-Mielamud/TsUnited/tree/main/example/backend) example and then check out [mocha-tests](https://github.com/R-Mielamud/TsUnited/tree/main/example/mocha-tests) example because it shows the case when a project references more than one other project.
