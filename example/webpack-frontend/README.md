# This is the frontend part of our mini app (todo-list), built using Webpack

This project uses Webpack runtime and **@ts-united/webpack**

## Technologies

-   Webpack
-   **@ts-united/webpack**

## Guide

Try to start the project using `npm start` command. It will start Webpack Dev Server using the configuration in `webpack.config.js`.

Also, you can build the project using `npm run build` command, which creates a production bundle in `public` folder using `webpack` command.

In Webpack edition TS United config is passed to TS United as a JS object inside `webpack.config.js`. To connect TS United you'll need to register TS United loader, TS United resolver plugin, and, if you want, United Fork TS Checker Plugin, which moves TypeScript checks **of every project** to a separate process.

Every TS United config option and every step to register TS United in Webpack config is explained in details by comments in the `webpack.config.js` file. Check it out!

Also, you can see that the `~shared` path alias in `tsconfig.json` points to the shared project. The shared project is imported from `./src/app.ts` file.
