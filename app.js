require('dotenv').config()

const Server = require('./models/server');


const srv = new Server();
 

srv.listen();
