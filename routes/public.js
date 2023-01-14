import express from 'express';
const router = express.Router();

import { addUser, signInUser } from '../services/users/index.js';
import { validateRegisterUser, validateSignInUser } from '../middleware/validation/users/index.js';

router.post('/sign-up',
  validateRegisterUser,
  addUser
);

router.post('/sign-in',
  validateSignInUser,
  signInUser
);

export default router;