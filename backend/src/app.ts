import express from 'express';

import { errorHandler } from './middlewares/errorHandler.js';
import healthRouter from './routes/health.routes.js';
import productsRouter from './routes/products.routes.js';

const app = express();

app.use(express.json());

app.use('/health', healthRouter);
app.use('/products', productsRouter);

app.use(errorHandler);

export default app;
