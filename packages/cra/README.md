# TS United: CRA Edition

> Building shared code and reinstalling it into all parts of a monorepo (backend, frontend, mobile)? Incrementing version and publishing shared code to NPM on every small change? Wasting time? **Forget about it with TS United!**

TS United helps one TypeScript project (folder containing a `tsconfig.json` file) import TypeScript/JavaScript code from any other project, while checking each project's code and resolving imports in each project using **that project's** tsconfig.json.

**Note:** CRA Edition is a wrapper around Webpack Edition (**@ts-united/webpack**), which injects the Webpack Edition into `react-scripts`'s underlying Webpack config and helps you avoid ejecting. If you've ejected your app or are using another runtime, [go to the list of editions](https://github.com/R-Mielamud/TsUnited#readme) and choose the edition you need.

**Sounds great? Let's get started!**

## Adding TS United to your Create React App project

**Step one:** Install the **@ts-united/cra** package from NPM into your **main** (aka root) project. Root project is the project you'll run `npm start` in when starting the whole app. For example, the frontend part of your app will be a root project.

---

**Step two:** Create a configuration file for TS United in your root project's base directory

Config file can be in either JS or JSON format and can have the following file names:

-   `ts-united.config.{js,json}`
-   `ts-united.{js,json}`
-   `.tsunitedrc.{js,json}`
-   `.unitedrc.{js,json}`

Example - `ts-united.config.js`

**See the [Config options](#config-options) section below for complete explanation of config options. It also shows an example config file.**

---

**Step three:** Use TS United binary for starting and building your code

In root project's `package.json` file use `tsu-cra` binary to start, build and test your code.

**Note: Testing is currently not supported, because it uses Jest runtime, which needs it's own edition. Jest Edition will be added soon!**

Example:

```json
{
    // ...regular package.json
    "scripts": {
        "start": "tsu-cra start",
        "build": "tsu-cra build",
        "test": "tsu-cra test"
        // ...some other scripts
    }
}
```

`tsu-cra` binary usage: `tsu-cra <one of react scripts: start, build or test>`

---

That's all! Now your project uses TS United!

**Also you can see a complete example project on GitHub:** [https://github.com/R-Mielamud/TsUnited/tree/main/example/cra-frontend](https://github.com/R-Mielamud/TsUnited/tree/main/example/cra-frontend)

## <a id="config-options"></a>Config options

| Option            | Data type                        | Default value                                 | Description                                                                                                                                                                               |
| ----------------- | -------------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cwd`             | `string(path)?`                  | `path.dirname(path_of_ts_united_config_file)` | CWD is a base directory for all other directories in config. It can be either absolute or relative. If it's relative, it'll be relative to `path.dirname(path_of_ts_united_config_file)`. |
| `extensions`      | `Array<string(file extension)>?` | `[".js", ".jsx", ".ts", ".tsx", ".json"]`     | Array of extensions path aliases will be implicitly resolved to.                                                                                                                          |
| `rootProject`     | [`Project`](#project-schema)     |                                               | Root project's info (see [Project schema](#project-schema) below).                                                                                                                        |
| `relatedProjects` | `Array<Project>?`                | `[]`                                          | Array containing related projects' info. If empty, no projects will be considered related.                                                                                                |

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
        |---ts-united.config.js
        |---tsconfig.json
    |---tsconfig.base.json
```

```javascript
// /myproject/frontend/ts-united.config.js
// path.dirname("/myproject/frontend/ts-united.config.js") === "/myproject/frontend"

module.exports = {
    cwd: "../", // /myproject
    extensions: [".ts", ".tsx"], // `~/myfile` can become either `./myfile.ts` or `./myfile.tsx`
    rootProject: {
        name: "frontend",
        path: "./frontend", // /myproject/frontend
        extensions: [".ts", ".tsx"], // Set to default value
    },
    relatedProjects: [
        {
            name: "shared",
            path: "./shared", // /myproject/shared
        },
    ],
};
```
