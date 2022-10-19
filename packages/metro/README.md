# TS United: Metro (React Native) Edition

> Building shared code and reinstalling it into all parts of a monorepo (backend, frontend, mobile)? Incrementing version and publishing shared code to NPM on every small change? Wasting time? **Forget about it with TS United!**

TS United helps one TypeScript project (folder containing a `tsconfig.json` file) import TypeScript/JavaScript code from any other project, while checking each project's code and resolving imports in each project using **that project's** tsconfig.json.

**Note:** Metro Edition is compatible with Metro bundler's runtime (used in React Native). If you're using another runtime, [go to the list of editions](https://github.com/R-Mielamud/TsUnited#readme) and choose the edition you need.

Metro Edition provides a resolver that allows Metro to import Typescript/JavaScript code from other projects.

**Sounds great? Let's get started!**

## Adding TS United to your React Native project

**Step one:** Install the **@ts-united/metro** package from NPM into your **main** (aka root) project. Root project is the project you'll run `npm start` in when starting the whole app. For example, the mobile part of your app will be a root project.

---

**Step two:** Create a TS United config object inside your `metro.config.js` like this:

```javascript
const TS_UNITED_CONFIG = {
    // ...config
};

module.exports = {
    // ...metro config
};
```

See the [Config options](#config-options) section below for complete explanation of config options. It also shows an example config.

---

**Step three:** Register TS United resolver in Metro config file.

```javascript
const { UnitedMetroResolver } = require("@ts-united/metro");

const TS_UNITED_CONFIG = {
    // ...config
};

const unitedResolver = new UnitedMetroResolver(TS_UNITED_CONFIG);

module.exports = {
    // ...metro config
    watchFolders: unitedResolver.watchFolders,
    resolver: {
        resolveRequest: unitedResolver.resolver,
    },
};
```

---

That's all! Now your project uses TS United!

**Also you can see a complete example project on GitHub:** [https://github.com/R-Mielamud/TsUnited/tree/main/example/react-native-mobile](https://github.com/R-Mielamud/TsUnited/tree/main/example/react-native-mobile)

## <a id="config-options"></a>Config options

| Option            | Data type                    | Default value   | Description                                                                                                                                                 |
| ----------------- | ---------------------------- | --------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cwd`             | `string(path)?`              | `process.cwd()` | CWD is a base directory for all other directories in config. It can be either absolute or relative. If it's relative, it'll be relative to `process.cwd()`. |
| `rootProject`     | [`Project`](#project-schema) |                 | Root project's info (see [Project schema](#project-schema) below).                                                                                          |
| `relatedProjects` | `Array<Project>?`            | `[]`            | Array containing related projects' info. If empty, no projects will be considered related.                                                                  |

### <a id="project-schema"></a>Project schema

| Option | Data type        | Default value | Description                                                                                                                                                                  |
| ------ | ---------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name` | `string, unique` |               | Any **unique** project name (id).                                                                                                                                            |
| `path` | `string(path)`   |               | The path tsconfig.json file is located in or any child path. Importing files that are outside all projects' paths is forbidden. The path can be absolute or relative to CWD. |

**Example folder structure and config:**

```
|---myproject
    |---shared
        |--- ...
        |---tsconfig.json
    |---mobile - the root project
        |--- ...
        |---metro.config.js
        |---tsconfig.json
    |---tsconfig.base.json
```

```javascript
// /myproject/mobile/metro.config.js

const TS_UNITED_CONFIG = {
    cwd: "../", // /myproject
    rootProject: {
        name: "mobile",
        path: "./mobile", // /myproject/mobile
    },
    relatedProjects: [
        {
            name: "shared",
            path: "./shared", // /myproject/shared
        },
    ],
};

module.exports = {
    // ...metro config
};
```
