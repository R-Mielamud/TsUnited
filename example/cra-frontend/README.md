# This is the frontend part of our mini app (todo-list), built using Create Rect App

This project uses Create React App (which uses Webpack runtime under the hood) and **@ts-united/cra**

## Technologies

-   Create React App
-   Webpack
-   **@ts-united/cra**

## Guide

Try to start the project using `npm start` command. It will start Webpack Dev Server using the default Webpack configuration provided by `react-scripts` package and patched by `@ts-united/cra`.

Also, you can build the project using `npm run build` command, which creates a production bundle in `build` folder.

Mow let's see, how does it work. Every TS United config option is explained in details by comments in the `ts-united.config.js` file. Check it out! Also, as you can see in the `package.json` file, start and build is done using `tsu-cra` command, which reads TS United config from `ts-united.config.js` file and injects `@ts-united/webpack` into the default `react-scripts`'s Webpack config (registers TS United loader and plugins, so that Webpack can build and type-check multiple projects).

You can see that the `~shared` path alias in `tsconfig.json` points to the shared project. The shared project is imported from `./src/components/app/index.tsx` and `./src/components/new-todo-form/index.tsx` files.
