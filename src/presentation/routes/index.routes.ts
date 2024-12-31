import { Router, Request, Response } from 'express'
import ParkingCreateRequest from '../../application/dtos/parkingCreateRequest.dto'
import ParkingController from '../controllers/parking.controller'

const routes = Router()

const controller = new ParkingController()

routes.get('/', function (req, res) {
  res.redirect('/docs')
})

routes.get('/healthcheck', (req: Request, res: Response) => {
  /*
  #swagger.tags = ['Healthcheck']
  #swagger.summary = 'runs healthcheck for api'
  */
  res.json({ message: 'Healthcheck running' })
})
routes.get('/parking/:plate', (req: Request, res: Response) => {
  /*
  #swagger.tags = ['Parking']
  #swagger.summary = 'List parking entrances by plate'
  #swagger.description = 'This endpoint will list all entrance registers in the parking lot'
  #swagger.responses[200] = {
                  description: "Return data for parking",
                  content: {
                      "application/json": {
                          schema:{
                              $ref: "#/components/schemas/parkingListResponse"
                          }
                      }
                  }
              }
*/
  var plate = req.params.plate as unknown as string
  controller.list(plate, res)
})

routes.post('/parking', (req: Request, res: Response) => {
  /*
  #swagger.tags = ['Parking']
  #swagger.summary = 'Create a entrance'
  #swagger.description = 'This endpoint will create a entrance in the parking lot'
  #swagger.requestBody = {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/parkingCreateRequest"
                        }
                    }
                }
            }
  #swagger.responses[200] = {
                  description: "Return the initial data for parking",
                  content: {
                      "application/json": {
                          schema:{
                              $ref: "#/components/schemas/parkingCreateResponse"
                          }
                      }
                  }
              }
*/
  var body = req.body as unknown as ParkingCreateRequest
  controller.create(body, res)
})

routes.put('/parking/:id/out', (req: Request, res: Response) => {
  /*
  #swagger.tags = ['Parking']
  #swagger.summary = 'Left parking lot'
  #swagger.description = 'This endpoint will register the exit in the parking lot'
  #swagger.responses[200] = {
                  description: "Return the data for parking",
                  content: {
                      "application/json": {
                          schema:{
                              $ref: "#/components/schemas/parkingInfoResponse"
                          }
                      }
                  }
              }
*/

  var id = req.params.id as unknown as string
  controller.exit(id, res)
})

routes.put('/parking/:id/pay', (req: Request, res: Response) => {
  /*
  #swagger.tags = ['Parking']
  #swagger.summary = 'Left parking lot'
  #swagger.description = 'This endpoint will pay the parking lot'
  #swagger.responses[200] = {
                  description: "Return the data for parking",
                  content: {
                      "application/json": {
                          schema:{
                              $ref: "#/components/schemas/parkingInfoResponse"
                          }
                      }
                  }
              }
*/
  var id = req.params.id as unknown as string
  controller.payment(id, res)
})

export default routes
