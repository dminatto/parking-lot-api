import { Router, Request, Response } from 'express'
import ParkingController from '../controllers/parking.controller'

const routes = Router()

const controller = new ParkingController()

routes.get('/healthcheck', (req: Request, res: Response) => {
  res.json({ message: 'Healthcheck running' })
})

routes.get('/parking/:plate', (req: Request, res: Response) => {
  res.json({ message: 'Wow! parking list' })
})

routes.post('/parking', (req: Request, res: Response) => {
  res.json({ message: 'Wow! parking post' })
})

routes.put('/parking/:id/out', (req: Request, res: Response) => {
  var id = req.params.id as unknown as number
  controller.exit(id, res)
})

routes.put('/parking/:id/pay', (req: Request, res: Response) => {
  res.json({ message: 'Wow! parking pay' })
})

export default routes
