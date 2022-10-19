# This is the backend part of our mini app (todo list)

This project uses NodeJS runtime and **@ts-united/node**

## Technologies

-   NodeJS
-   **@ts-united/node**
-   lowdb
-   fastify

## Guide

Try to start the project using `npm start` command. As you can see in [package.json](https://github.com/R-Mielamud/TsUnited/blob/main/example/backend/package.json) file, the start is done using `tsu-node` binary. It reads configuration from the [ts-united.config.js](https://github.com/R-Mielamud/TsUnited/blob/main/example/backend/ts-united.config.js) file, registers TS United services and runs any file you pass to it. You can see validation schemas imported from shared project in action by calling `POST /todo` endpoint (see project API documentation below)

Also, you can build the project using `npm run build` command. It uses `tsu-node-compile` binary, which builds the project using it's `tsconfig.json`, replaces path aliases with corresponding relative paths and generates a merged `package.json` file which has all projects' dependencies. Related projects are also built and put into `.united_projects` folder inside the root project's output folder.

Now let's check the TS United configuration. Open the [ts-united.config.js](https://github.com/R-Mielamud/TsUnited/blob/main/example/backend/ts-united.config.js) file. All options are explained in details by comments in code.

Also, you can see that the `~shared` path alias in [tsconfig.json](https://github.com/R-Mielamud/TsUnited/blob/main/example/backend/tsconfig.json) points to the shared project. The shared project is imported from `./src/server.ts` file.

## Project API documentation

-   `POST /`

    Creates a todo

    Body:

    ```
    {
        "text": "<your todo text>"
    }
    ```

    Response:

    ```
    {
        "id": <number, id of your todo>,
        "done": false,
        "text": "<your todo text>"
    }
    ```

-   `PATCH /done/:id`

    Marks todo as done/not done

    Body:

    ```
    {
        "done": <boolean, mark todo as done or not done>
    }
    ```

    Response:

    ```
    {
          "id": <id of your todo>,
          "done": <the value you sent>,
          "text": "<your todo text>"
    }
    ```

-   `GET /?onlyUndone=<boolean (not required), whether to return only undone todos or all of them>`

    Gets all or only undone todos

    Response:

    ```
    [
        {
            "id": <id of todo>,
            "done": <done or not>,
            "text": "<todo text>"
        },
        ...other todos
    ]
    ```
