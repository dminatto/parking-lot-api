import { Router, Request, Response } from 'express'
import ParkingCreateRequest from '../../application/dtos/parkingCreateRequest.dto'
import ParkingController from '../controllers/parking.controller'

const routes = Router()

const controller = new ParkingController()

routes.get('/healthcheck', (req: Request, res: Response) => {
  res.json({ message: 'Healthcheck running' })
})

routes.get('/parking/:plate', (req: Request, res: Response) => {
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
*/
  var body = req.body as unknown as ParkingCreateRequest
  controller.create(body, res)
})

routes.put('/parking/:id/out', (req: Request, res: Response) => {
  var id = req.params.id as unknown as number
  // controller.exit(id, res)
})

routes.put('/parking/:id/pay', (req: Request, res: Response) => {
  res.json({ message: 'Wow! parking pay' })
})

export default routes
