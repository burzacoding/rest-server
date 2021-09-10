# How I worked on this project

 - My goal was to create a good backend structure, to learn MongoDB, learn JWT and to write middlewares.
 - I tested the endpoints with a http client (Insomnia).

# How to navigate this project

 - The server is a class and it's initialization is run sequencially in the constructor : [Example code](https://github.com/burzacoding/rest-server/blob/master/models/server.js).
 - The database and server run with properties only found in environment variables: [Example code](https://github.com/burzacoding/rest-server/blob/master/db/config.js).
 - Some folders feature an index file for better readability of import statements: [Example code](https://github.com/burzacoding/rest-server/blob/master/middleware/index.js).

# If I had more time I would change this

 - I would improve the middlewares structure to make them more modular and reusable [as I did in this othe project](https://github.com/burzacoding/ts-rest-server-sql/blob/master/middlewares/testMiddleware.ts).
 - Create a frontend to better show this project.
 - Improve the overall structure of files for better quality of code and code readability.

# Available Scripts

Please remember to install the dependecies before trying to run the project `npm i`

In the project directory, you can run:
#### `npm run start`

Executes node on the `index.js` file.
