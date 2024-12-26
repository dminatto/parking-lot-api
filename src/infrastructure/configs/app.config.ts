/*const express = require('express');
const routes = require('../../presentation/routes/index.routes');

module.exports.start = () => {

    require("dotenv").config();

    const app = express();
    app.use(express.json());
    app.use(
        express.urlencoded({
            extended: false,
        }),
    );

    app.use(routes);

    app.listen( process.env.PORT || 3000, () => console.log('Server ON'));

}
*/
import express from 'express';
import database from './../database/database.config';
//import controller from './controller';
import * as bodyparser from 'body-parser';
import routes from '../../presentation/routes/index.routes'
require('dotenv').config()

class App {
    public app: express.Application;
    private database: database;
 //   private controller: controller;


    constructor() {

        this.app = express();
        this.middleware();
        this.database = new database();
        this.database.createConnection();
        this.routes();
    }

    middleware() {
        this.app.use(bodyparser.json());
        this.app.use(bodyparser.urlencoded({extended: true}))
    }

    routes() {
        this.app.use(routes);
    }
}

export default new App();
