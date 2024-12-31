import swaggerAutogen from 'swagger-autogen'

const doc = {
  info: {
    version: 'v1.0.0',
    title: 'Parking API',
    description: 'Implementation of Swagger with TypeScript'
  },
  servers: [
    {
      url: `http://localhost:2400`,
      description: ''
    }
  ],
  components: {
    schemas: {
      parkingCreateRequest: {
        plate: 'string'
      }
    }
  }
}

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/presentation/routes/index.routes.ts']

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc)
