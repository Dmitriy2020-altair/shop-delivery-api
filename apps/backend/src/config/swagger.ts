import path from 'node:path';
import { fileURLToPath } from 'node:url';
import swaggerJsdoc from 'swagger-jsdoc';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.3',
    info: {
      title: 'Shop Delivery API',
      version: '1.0.0',
      description: 'OpenAPI documentation for the Shop Delivery Express API',
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Local development',
      },
    ],
  },
  apis: [path.join(__dirname, '../routes/**/*.{ts,js}')],
};

export const swaggerSpec = swaggerJsdoc(options);
