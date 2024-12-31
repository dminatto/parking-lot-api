import request from 'supertest'
import App from '../src/infrastructure/configs/app.config'
import ParkingCreateRequest from '../src/application/dtos/parkingCreateRequest.dto'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from 'mongoose'

describe('Parking API Integration Tests', () => {
  let mongoServer: MongoMemoryServer

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()
    await mongoose.connect(uri)
  })

  afterAll(async () => {
    await mongoose.connection.dropDatabase()
    await mongoose.connection.close()
    await mongoServer.stop()
  })

  afterEach(async () => {
    const collections = mongoose.connection.collections
    for (const key in collections) {
      await collections[key].deleteMany({})
    }
  })

  it('should return healthcheck message', async () => {
    const res = await request(App.app).get('/healthcheck')

    expect(res.status).toBe(200)
    expect(res.body).toEqual({ message: 'Healthcheck running' })
  })

  it('should create a new parking entrance', async () => {
    const parkingData: ParkingCreateRequest = {
      plate: 'ABC-1234'
    }

    const res = await request(App.app)
      .post('/parking')
      .send(parkingData)
      .set('Accept', 'application/json')

    expect(res.status).toBe(200)
    expect(res.body.result).toHaveProperty('id')
    expect(res.body.result).toHaveProperty('plate', parkingData.plate)
    expect(res.body.result).toHaveProperty('entranceDate')
  })

  it('should list parking records for a given license plate', async () => {
    await request(App.app)
      .post('/parking')
      .send({
        plate: 'ABC-1234'
      })
      .set('Accept', 'application/json')

    const res = await request(App.app)
      .get('/parking/ABC-1234')
      .query({ page: 1, limit: 10 })

    expect(res.status).toBe(200)
    expect(res.body.result).toHaveProperty('page', '1')
    expect(res.body.result).toHaveProperty('data')
    expect(Array.isArray(res.body.result.data)).toBe(true)
    expect(res.body.result.data.length).toBeGreaterThan(0)
    expect(res.body.result.data[0]).toHaveProperty('plate', 'ABC-1234')
  })

  it('should not allow exit without payment', async () => {
    const parkingData: ParkingCreateRequest = {
      plate: 'DEF-5678'
    }

    const createRes = await request(App.app)
      .post('/parking')
      .send(parkingData)
      .set('Accept', 'application/json')

    const newParkingId = createRes.body.result.id

    const exitRes = await request(App.app).put(`/parking/${newParkingId}/out`)

    expect(exitRes.status).toBe(402)
    expect(exitRes.body).toHaveProperty('name', 'PARKING_NOT_PAID')
    expect(exitRes.body).toHaveProperty(
      'message',
      'Parking fee has not been paid.'
    )
  })
})
