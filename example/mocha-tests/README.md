# This project contains tests for the backend part of our mini app (todo list)

This project uses NodeJS runtime and **@ts-united/node**. Also it shows the case when a project references more than one other project.

## Technologies

-   NodeJS
-   Mocha testing framework
-   **@ts-united/node**
-   chai

## Guide

Try to run the tests using `npm test` command.

The tests will import the server instance from backend project (in `./src/specs/todo.spec.ts` file), start it on any free port, run the tests and stop the server. You don't need to start the server in a separate process! Isn't this cool? It makes CI workflows a lot simplier!

Now let's see how does it work. Comments in the `ts-united.config.js` explain every config option. In `mocha.config.js` file we tell mocha to import `@ts-united/node/register` module, which automatically registers TS United services when imported (see comments in the `mocha.config.js` file).
