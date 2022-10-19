# TS United: Webpack Edition

<br>
<div align="center">
    <a href="https://npmjs.com/package/@ts-united/webpack">
        <img src="https://badgen.net/npm/v/@ts-united/webpack">
    </a>
    <img src="https://badgen.net/packagephobia/install/@ts-united/webpack">
    <img src="https://badgen.net/badge/type%20declarations/included/blue?icon=typescript">
    <a href="https://github.com/R-Mielamud/TsUnited/blob/main/LICENSE">
        <img src="https://badgen.net/github/license/R-Mielamud/TsUnited">
    </a>
    <a href="https://github.com/R-Mielamud/TsUnited">
        <img src="https://badgen.net/badge/PRs/welcome!/green?icon=git">
    </a>
</div>
<br>

> Building shared code and reinstalling it into all parts of a monorepo (backend, frontend, mobile)? Incrementing version and publishing shared code to NPM on every small change? Wasting time? **Forget about it with TS United!**

TS United helps one TypeScript project (folder containing a `tsconfig.json` file) import TypeScript/JavaScript code from any other project, while checking each project's code and resolving imports in each project using **that project's** tsconfig.json.

**Note:** Webpack Edition is compatible with Webpack bundler's runtime. If you're using another runtime, [go to the list of editions](https://github.com/R-Mielamud/TsUnited#readme) and choose the edition you need.

Webpack Edition provides a loader and plugins that allow Webpack to import Typescript/JavaScript code from other projects.

**Sounds great? Let's get started!**

## Adding TS United to your Webpack project

**Step one:** Install the **@ts-united/webpack** package from NPM into your **main** (aka root) project. Root project is the project you'll run `npm start` in when starting the whole app. For example, the frontend part of your app will be a root project.

---

**Step two:** Create a TS United config object inside your `webpack.config.js` like this:

```javascript
const TS_UNITED_CONFIG = {
    // ...config
};

module.exports = {
    // ...webpack config
};
```

See the [Config options](#config-options) section below for complete explanation of config options. It also shows an example config.

---

**Step three:** Register TS United loader, resolver plugin and, if you want, `UnitedForkTsCheckerPlugin` which moves TypeScript checks into another thread and speeds up your compilations. Pass the TS United config to them as options.

`UnitedForkTsCheckerPlugin` also accepts additional [`ForkTsCheckerWebpackPlugin` options](https://www.npmjs.com/package/fork-ts-checker-webpack-plugin#options), applied to all projects.

```javascript
const {
    UnitedPlugin,
    UnitedForkTsCheckerPlugin,
} = require("@ts-united/webpack");

const TS_UNITED_CONFIG = {
    // ...config
};

module.exports = {
    // ...webpack config
    resolve: {
        plugins: [
            // ...
            new UnitedPlugin(TS_UNITED_CONFIG),
            // ...
        ],
    },
    plugins: [
        // ...
        new UnitedForkTsCheckerPlugin(TS_UNITED_CONFIG, {
            // Here you can set additional ForkTsCheckerWebpackPlugin options
        }),
        // ...
    ],
    module: {
        rules: [
            // ...
            {
                test: /\.[jt]sx?$/,
                use: {
                    loader: "@ts-united/webpack",
                    options: TS_UNITED_CONFIG,
                },
            },
            // ...
        ],
    },
};
```

---

That's all! Now your project uses TS United!

**Also you can see a complete example project on GitHub:** [https://github.com/R-Mielamud/TsUnited/tree/main/example/webpack-frontend](https://github.com/R-Mielamud/TsUnited/tree/main/example/webpack-frontend)

## <a id="config-options"></a>Config options

| Option       | Data type                           | Default value                             | Description                                                                                                                                                 |
| ------------ | ----------------------------------- | ----------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cwd`        | `string(path)?`                     | `process.cwd()`                           | CWD is a base directory for all other directories in config. It can be either absolute or relative. If it's relative, it'll be relative to `process.cwd()`. |
| `extensions` | `Array<string(file extension)>?`    | `[".js", ".jsx", ".ts", ".tsx", ".json"]` | Array of extensions path aliases will be implicitly resolved to.                                                                                            |
| `projects`   | [`Array<Project>`](#project-schema) |                                           | Array containing **all** projects info, including main aka root project (see [Project schema](#project-schema)                                              |

### <a id="project-schema"></a>Project schema

| Option       | Data type                        | Default value                     | Description                                                                                                                                                                  |
| ------------ | -------------------------------- | --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`       | `string, unique`                 |                                   | Any **unique** project name (id).                                                                                                                                            |
| `path`       | `string(path)`                   |                                   | The path tsconfig.json file is located in or any child path. Importing files that are outside all projects' paths is forbidden. The path can be absolute or relative to CWD. |
| `extensions` | `Array<string(file extension)>?` | The top-level `extensions` option | Array of extensions path aliases **of this project** will be implicitly resolved to. Each extension must begin with a dot.                                                   |

**Example folder structure and config:**

```
|---myproject
    |---shared
        |--- ...
        |---tsconfig.json
    |---frontend - the root project
        |--- ...
        |---webpack.config.js
        |---tsconfig.json
    |---tsconfig.base.json
```

```javascript
// /myproject/frontend/webpack.config.js

const TS_UNITED_CONFIG = {
    cwd: "../", // /myproject
    extensions: [".ts", ".tsx"], // `~/myfile` can become either `./myfile.ts` or `./myfile.tsx`
    projects: [
        {
            // The root project
            name: "frontend",
            path: "./frontend", // /myproject/frontend
            extensions: [".ts", ".tsx"], // Set to default value
        },
        {
            name: "shared",
            path: "./shared", // /myproject/shared
        },
    ],
};

module.exports = {
    // ...webpack config
};
```

## Compatibility

-   This package is completely incompatible with `ModuleScopePlugin`. The're trying to solve the same problem - importing files from outside the root project, while `ModuleScopePlugin` just forbids to do it, but TS United actually solves the problem.
-   Use `@ts-united/webpack` instead of `ts-loader`/`babel-loader` and `UnitedForkTsCheckerPlugin` instead of `ForkTsCheckerWebpackPlugin`
