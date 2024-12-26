import { Router, Request, Response } from 'express'

const routes = Router()

routes.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Wow! My first project in TypeScript!!!' })
})

routes.get('/parking/:plate', (req: Request, res: Response) => {
  res.json({ message: 'Wow! parking' + req.params.plate })
})

export default routes
