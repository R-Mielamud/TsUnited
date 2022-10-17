# This is the mobile part of our mini app (todo list), built using Create React App

This project uses React Native, Metro bundler and **@ts-united/metro**

## Technologies

-   React Native
-   Metro
-   **@ts-united/metro**

## Guide

First, run `npm start` command to start Metro server, which will put the TypeScript code into native Android and iOS versions of the app in real-time.

Then try to start the project (in a separate terminal) for Android using `npm run android` command or for iOS using `npm run ios`. Note, that for iOS you'll need to install XCode app and CocoaPods dependencies.

Now let's see, how does it work. TS United config is located in Metro config file. Check out the [metro.config.js](https://github.com/R-Mielamud/TsUnited/blob/main/example/react-native-mobile/metro.config.js) file. The comments inside the file explain every TS United config option and every step to register `@ts-united/metro` in details.

Also, you can see that the `~shared` path alias in [tsconfig.json](https://github.com/R-Mielamud/TsUnited/blob/main/example/react-native-mobile/tsconfig.json) points to the shared project. The shared project is imported from [./src/components/app/index.tsx](https://github.com/R-Mielamud/TsUnited/blob/main/example/react-native-mobile/src/components/app/index.tsx) and [./src/components/new-todo-form/index.tsx](https://github.com/R-Mielamud/TsUnited/blob/main/example/react-native-mobile/src/components/new-todo-form/index.tsx) files.
