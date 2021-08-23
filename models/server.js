const express = require('express');
const path = require('path');
const cors = require('cors');
const routerApi = require('../routes/api.routes');
const routerAuth = require('../routes/auth.routes');
const routerProducts = require('../routes/products.routes');
const routerCategory = require('../routes/categories.routes');
const routerSearch = require('../routes/search.routes');
const routerFiles = require('../routes/files.routes')
const { dbConnection } = require('../db/config');

class Server {
  constructor(port, dirname) {
    this.app = express();
    this.dirname = dirname;
    this.port = port || 3050;

    // Conexión a la base de datos
    this.connectDB();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  start() {
    this.app.listen(this.port, () => {
      console.log('running on port ' + this.port);
    });
  }

  middlewares() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.static(path.join(this.dirname, 'public')));
  }

  routes() {
    this.app.use('/api', routerApi);
    this.app.use('/auth', routerAuth);
    this.app.use('/products', routerProducts)
    this.app.use('/cat', routerCategory);
    this.app.use('/search', routerSearch);
    this.app.use('/api/upload', routerFiles)
    this.app.get('/', (req, res) => {
      res.sendFile(this.dirname + '/public/index.html');
    });
  }

  async connectDB() {
    await dbConnection();
  }
}

module.exports = Server;
