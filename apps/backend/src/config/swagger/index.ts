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
    tags: [
      { name: 'Health', description: 'Service health' },
      { name: 'Auth', description: 'Authentication and session cookies' },
      { name: 'Users', description: 'User management' },
      { name: 'Products', description: 'Product catalog' },
      { name: 'Orders', description: 'Order creation' },
    ],
  },
  apis: [
    path.join(__dirname, './schemas/**/*.{ts,js}'),
    path.join(__dirname, './responses/**/*.{ts,js}'),
    path.join(__dirname, '../../routes/**/*.{ts,js}'),
  ],
};

export const swaggerSpec = swaggerJsdoc(options);
