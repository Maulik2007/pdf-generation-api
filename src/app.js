const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const rapidapiAuth = require('./middleware/rapidapi');
const errorHandler = require('./middleware/errorHandler');
const pdfRoutes = require('./routes/pdf');

const app = express();

app.use(helmet());
app.use(express.json({ limit: '5mb' }));
app.use(express.text({ limit: '5mb', type: 'text/*' }));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use(rapidapiAuth);
app.use(rateLimit({ windowMs: 60 * 1000, max: 60 }));
app.use('/api/v1/pdf', pdfRoutes);

app.use(errorHandler);

module.exports = app;
