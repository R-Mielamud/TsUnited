# This project contains code, that is used in all other example projects.

## Guide

First install all dependencies using `npm install` command.

This project is imported from all other projects, but it can't run alone, so you'll need to start any other example project to experiment with shared.

After you've started a project, try to change some type checking rules or path mapping in `tsconfig.json` and see the results. The updated config will only have effect for shared's files.

Also, this project has some dependencies and it's own `node_modules` folder. You can try to install more dependencies. This project's files will be able to import them, even if referenced from another project.
