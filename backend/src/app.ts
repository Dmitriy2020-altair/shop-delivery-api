import express from 'express';

import { errorHandler } from './middlewares/errorHandler.js';
import healthRouter from './routes/health.routes.js';
import productsRouter from './routes/products.routes.js';
import ordersRouter from './routes/orders.routes.js';
import authRoutes from './routes/auth.routes.js';
const app = express();

app.use(express.json());

app.use('/health', healthRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/auth', authRoutes);

app.use(errorHandler);

export default app;
