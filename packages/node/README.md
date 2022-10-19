# TS United: Node Edition

<br>
<div align="center">
    <a href="https://npmjs.com/package/@ts-united/node">
        <img src="https://badgen.net/npm/v/@ts-united/node">
    </a>
    <img src="https://badgen.net/packagephobia/install/@ts-united/node">
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

**Note:** Node Edition is compatible with NodeJS runtimes (e.g. NodeJS, Mocha testing framework). If you're using another runtime, [go to the list of editions](https://github.com/R-Mielamud/TsUnited#readme) and choose the edition you need.

Node Edition handles both running and building your code. Non-main projects are put into a special folder in main project's output folder. Also, TS United handles path aliases, set in `tsconfig.json` and merges `package.json` files of all projects, thus creating a ready deploy package.

**Sounds great? Let's get started!**

## Adding TS United to your NodeJS project

**Step one:** Install the **@ts-united/node** package from NPM into your **main** (aka root) project. Root project is the project you'll run `npm start` in when starting the whole app. For example, the backend part of your NodeJS app will be a root project.

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

**Step three:** Use TS United binaries for starting and building your code

In root project's `package.json` file use `tsu-node` binary to start your code and `tsu-node-compile` binary to build your code.

Example:

```json
{
    // ...regular package.json
    "scripts": {
        "start": "tsu-node ./path/to/my/index.ts",
        "build": "tsu-node-compile"
        // ...some other scripts
    }
}
```

See the [Binaries](#binaries) section below for detailed documentation of the binaries

---

That's all! Now your project uses TS United!

**Also you can see a complete example project on GitHub:** [https://github.com/R-Mielamud/TsUnited/tree/main/example/backend](https://github.com/R-Mielamud/TsUnited/tree/main/example/backend)

## Usage as a service

But sometimes you can't use `tsu-node` binary. For example, in Mocha testing framework you need to use `mocha` binary.

For such case TS United supports usage as a service. You can tell Mocha to import `@ts-united/node/register` file before running the tests like this: `mocha -r "@ts-united/node/register"`. `@ts-united/node/register`, once imported, will inject TS United services into runtime and voila! Mocha will be able to import TypeScript files and use tsconfig path aliases!

TS United can be used as a service not only with Mocha. For example, with `node` binary. NodeJS binary also can execute TypeScript files and use tsconfig aliases after importing `@ts-united/node/register` like this: `node -r "@ts-united/node/register" file.ts`

And, you can import `@ts-united/node/register` right in a source file like this:

```javascript
// myfile.js

// Here I can't import TypeScript and use tsconfig path aliases

require("@ts-united/node/register"); // But after this line...

// ...I can!

// For example:

const server = require("~/server.ts");

server.start();
```

**Complete example mocha project on GitHub:** [https://github.com/R-Mielamud/TsUnited/tree/main/example/mocha-tests](https://github.com/R-Mielamud/TsUnited/tree/main/example/mocha-tests)

## <a id="config-options"></a>Config options

| Option            | Data type                    | Default value                                 | Description                                                                                                                                                                               |
| ----------------- | ---------------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cwd`             | `string(path)?`              | `path.dirname(path_of_ts_united_config_file)` | CWD is a base directory for all other directories in config. It can be either absolute or relative. If it's relative, it'll be relative to `path.dirname(path_of_ts_united_config_file)`. |
| `unitedFolder`    | `string(filename)?`          | `.united_projects`                            | United folder is a folder in root project's output folder, that will contain built related projects.                                                                                      |
| `rootProject`     | [`Project`](#project-schema) |                                               | Root project's info (see [Project schema](#project-schema) below).                                                                                                                        |
| `relatedProjects` | `Array<Project>?`            | `[]`                                          | Array containing related projects' info. If empty, no projects will be considered related.                                                                                                |

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
    |---backend - the root project
        |--- ...
        |---ts-united.config.js
        |---tsconfig.json
    |---tsconfig.base.json
```

```javascript
// /myproject/backend/ts-united.config.js
// path.dirname("/myproject/backend/ts-united.config.js") === "/myproject/backend"

module.exports = {
    cwd: "../", // /myproject
    unitedFolder: ".united_projects", // Set to default value
    rootProject: {
        name: "backend",
        path: "./backend", // /myproject/backend
    },
    relatedProjects: [
        {
            name: "shared",
            path: "./shared", // /myproject/shared
        },
    ],
};
```

## <a id="binaries"></a>Binaries

-   ### `tsu-node`

    Usage: `tsu-node ./path/to/my/index.ts`. Note, that the `.ts` extension after file name is mandatory.

    The binary currently has no other command-line options.

-   ### `tsu-node-compile`

    Usage: `tsu-node-compile [options]`

    Options:

    -   `--no-merged-package-json` aka `--noMergedPackageJson` - If this flag is present, the merged `package.json` file will not be generated.
