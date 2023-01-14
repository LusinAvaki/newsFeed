import express from 'express';
const router = express.Router();

import news from '../services/news/index.js';

router.get('/',
    news.listNews
);

export default router;