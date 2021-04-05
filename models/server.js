const express = require('express');
const cors = require('cors');
const { dbConn } = require('../db/config');

require('dotenv').config();


class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.userApiPath = process.env.USERAPIPATH;

        // Conectar DB
        this.connDb();

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }
    
    async connDb(){
        await dbConn();
    }

    middlewares() {
        // CORS
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );
        // Directorio Publico
        this.app.use( express.static('./public') );
    }

    routes() {
        this.app.use( this.userApiPath, require('../routes/users') )
    }

    listen() {

        this.app.listen(this.port, () => {
            console.log("Rest Server, Puerto: ", this.port);
        })
    }
}


module.exports = Server;