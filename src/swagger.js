const swaggerAutogen = require('swagger-autogen')()

const doc = {
    info: {
      title: 'expenedores api',
      description: 'Description',
    },
    host: 'localhost:3000',
    schemes: ['http'],
  };

const outputFile = './swagger_output.json'
const endpointsFiles = ['src/index.js', 'src/v1/routes/productRoutes']

swaggerAutogen(outputFile, endpointsFiles, doc)