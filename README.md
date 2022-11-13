# TS United

<br>
<div align="center">
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

Sounds great? **Choose the edition that you need:**

-   [**@ts-united/node**](https://www.npmjs.com/package/@ts-united/node) - compatible with NodeJS runtimes (e.g. NodeJS, Mocha testing framework). Handles both running and building your code.
-   [**@ts-united/webpack**](https://www.npmjs.com/package/@ts-united/webpack) - compatible with Webpack and frontend frameworks that use it (e.g. Angular, Vue).
-   [**@ts-united/cra**](https://www.npmjs.com/package/@ts-united/cra) - is a wrapper for Webpack edition, which allows you to use it in Create React App projects without ejecting.
-   [**@ts-united/metro**](https://www.npmjs.com/package/@ts-united/metro) - compatible with Metro bundler, which is used in React Native projects.

If you need some good usage examples, check out the [example](https://github.com/R-Mielamud/TsUnited/tree/main/example) folder
