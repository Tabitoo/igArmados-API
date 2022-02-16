require('dotenv').config();

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
          title: 'IG-Armados',
          version: '0.0.1',
          description:
            'This is a CRUD API application made with Express and documented with Swagger for IG-Armados',
        },
        servers: [
          {
            url: `http://localhost:${process.env.PORT || 3000}`,
            description: 'Development server',
          },
        ],
      },
      apis: ['./docs/*'],
}

module.exports = options;
