import 'dotenv/config';
import 'express-async-errors';
import express from 'express';

import errorHandler from './middlewares/error-handler.middleware.js';
import notFound from './middlewares/not-found.middleware.js';

import * as paypalController from './paypal.controller.js';

const app = express();

app.use(express.json());
app.use(express.static('dist'));

app.post('/api/v1/orders', paypalController.createOrderHandler);

app.get(
  '/api/v1/orders/:orderID/capture',
  paypalController.captureOrderHandler
);

app.use(notFound);
app.use(errorHandler);

export default app;
