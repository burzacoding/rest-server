require('dotenv').config();

const port = process.env.PORT || 3000;

const Server = require('./models/server');

const app = new Server(port, __dirname);

app.start();