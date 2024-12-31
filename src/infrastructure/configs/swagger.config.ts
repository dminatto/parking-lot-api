import swaggerAutogen from 'swagger-autogen'
import dotenv from 'dotenv'

dotenv.config()

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'Parking API',
    description: 'Implementation of Swagger with TypeScript'
  },
  servers: [
    {
      url: `${process.env.API_URL}`,
      description: ''
    }
  ],
  components: {
    schemas: {
      parkingCreateRequest: {
        plate: 'string'
      },
      parkingCreateResponse: {
        id: 'string',
        plate: 'string',
        entranceDate: 'date'
      },
      parkingInfoResponse: {
        id: 'string',
        plate: 'string',
        time: 'string',
        paid: 'boolean',
        left: 'boolean'
      },
      parkingListResponse: {
        data: [
          {
            id: 'string',
            plate: 'string',
            time: 'string',
            paid: 'boolean',
            left: 'boolean'
          }
        ]
      },
      errorResponse: {
        name: 'string',
        message: 'string'
      }
    }
  }
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/presentation/routes/index.routes.ts']

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc)
