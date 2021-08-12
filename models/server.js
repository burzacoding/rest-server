const express = require("express");
const path = require("path");
const cors = require("cors");
const router = require("../routes/user.routes");

class Server {
  constructor(port, dirname) {
    this.app = express();
    this.dirname = dirname;
    this.port = port || 3050;

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  start() {
    this.app.listen(this.port, () => {
      console.log("running on port " + this.port);
    });
  }

  middlewares() {
    this.app.use(express.json())
    this.app.use(cors())
    this.app.use(express.static(path.join(this.dirname, 'public')));
    console.log("Middlewares started");
  }

  routes() {
    this.app.use('/api', router)
    this.app.get("/", (req, res) => {
      res.sendFile(this.dirname + "/public/index.html");
    });
  }
}

module.exports = Server;
