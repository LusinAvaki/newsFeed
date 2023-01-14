import express from 'express';
const router = express.Router();

import { validateGetUser, validateRegisterUser, validateRemoveUser } from '../middleware/validation/users/index.js';
import { listUsers, getUser, addUser, updateUser, removeUser } from '../services/users/index.js';

import { isOwner } from '../middleware/users.js';

router.get('/',
  listUsers
);

router.get('/:userId',
  validateGetUser,
  getUser
);

router.post('/',
  validateRegisterUser,
  addUser
);

router.patch('/:userId',
  isOwner,
  updateUser
);

router.delete('/:userId',
  validateRemoveUser,
  isOwner,
  removeUser
);


export default router;