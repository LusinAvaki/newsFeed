import pkg from 'body-parser';
const { urlencoded, json } = pkg;
import express from 'express';
import morgan from 'morgan';

import rts from './routes/index.js';
const {newsRoutes, usersRoutes, publicRoutes} = rts;

import { handleError } from './middleware/error-handler.js';
import ErrorsUtil from './util/errors.util.js';
const {PathNotFoundError} = ErrorsUtil;

const app = express();

app.use(morgan('dev'));

/**
 * @description Middleware - body parser:
 * 1. Parses the text as URL encoded data (limit 5 mb).
 * 2. Parses the text as JSON & exposes the resulting object on req.body (limit 5 mb).
 */
app.use(urlencoded({limit: '5mb', extended: false}));
app.use(json({limit: '5mb'}));

app.use('/', publicRoutes);
app.use('/news', newsRoutes);
app.use('/users', usersRoutes);

app.use((req, res, next) => next(new PathNotFoundError('The specified resource path does not exist.')));

app.use(handleError);

export default app;