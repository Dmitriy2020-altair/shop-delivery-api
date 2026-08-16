import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import swaggerUi from 'swagger-ui-express';

import { env } from './config/env.js';
import { swaggerSpec } from './config/swagger/index.js';
import { errorHandler } from './middlewares/errorHandler.js';
import healthRouter from './routes/health.routes.js';
import productsRouter from './routes/products.routes.js';
import ordersRouter from './routes/orders.routes.js';
import authRoutes from './routes/auth.routes.js';
import usersRoutes from './routes/users.routes.js';

const app = express();

app.use(
  cors({
    origin: env.frontendUrl,
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.get('/openapi.json', (_req, res) => {
  res.json(swaggerSpec);
});
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/health', healthRouter);
app.use('/api/v1/products', productsRouter);
app.use('/api/v1/orders', ordersRouter);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', usersRoutes);

app.use(errorHandler);

export default app;
