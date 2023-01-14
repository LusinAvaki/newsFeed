import mongoose from 'mongoose';

import setModelMethods from './methods/index.js';

const NewsSchema = new mongoose.Schema({
  public: {
    type: Boolean,
    default: true,
    enum: [true, false]
  },
  title: String,
  link: String,
  description: String
});

const News = mongoose.model("News", NewsSchema)

setModelMethods(News);

export default News;