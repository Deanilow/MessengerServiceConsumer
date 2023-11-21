const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'Documentation Api Prosegur Message Wsp',
    version: '1.0.1',
  },
  servers:
        [
          {
            url: 'http://localhost:3003/api',
          },
        ],
  components: {
    // securitySchemes: {
    //     bearerAuth: {
    //         type: "http",
    //         scheme: "bearer"
    //     }
    // },
    schemas: {
      // authLogin: {
      //     type: "object",
      //     required: ["email", "password"],
      //     properties: {
      //         email: {
      //             type: "string",
      //         },
      //         password: {
      //             type: "string",
      //         },
      //     },
      // },
      // authRegister: {
      //     type: "object",
      //     required: ["email", "password", "age", "name"],
      //     properties: {
      //         name: {
      //             type: "string",
      //         },
      //         age: {
      //             type: "integer",
      //         },
      //         email: {
      //             type: "string",
      //         },
      //         password: {
      //             type: "string",
      //         },
      //     },
      // },
      message: {
        type: 'object',
        properties: {
          to: {
            type: 'string',
          },
          from: {
            type: 'string',
          },
          body: {
            type: 'string',
          },
          files: {
            type: 'string',
          },
          createdBy: {
            type: 'string',
          },
        },
      },
    },
  },
};

const Options = {
  swaggerDefinition,
  apis: [
    './routes/*.js',
  ],
};

const openApiConfigurations = swaggerJSDoc(Options);

module.exports = openApiConfigurations;
