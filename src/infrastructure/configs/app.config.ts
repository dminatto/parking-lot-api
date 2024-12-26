import express from 'express'
import database from './../database/database.config'
import * as bodyparser from 'body-parser'
import swaggerUi from 'swagger-ui-express'
import routes from '../../presentation/routes/index.routes'
import dotenv from 'dotenv'
import cors from 'cors'

import swaggerOutput from './../configs/swagger_output.json'
class App {
  public app: express.Application
  private database: database

  constructor() {
    dotenv.config()
    this.app = express()
    this.middleware()
    this.database = new database()
    this.database.createConnection()
    this.routes()
  }

  middleware() {
    this.app.use(bodyparser.json())
    this.app.use(bodyparser.urlencoded({ extended: true }))
    this.app.use(cors())
  }

  routes() {
    this.app.use(routes)
    this.app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput))
  }
}

export default new App()
//ts-node src/infrastructure/configs/swagger.config.ts
