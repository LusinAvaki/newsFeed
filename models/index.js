import { connect } from 'mongoose';

import NewsModel from './news/index.js';
import UsersModel from './users/index.js';

const models = {};

connect('mongodb://localhost/NMS')
    .then(() => console.log('Connected to mongo.'))
    .catch(console.log);

models.UsersModel = UsersModel;
models.NewsModel = NewsModel;

export default models;