import pkg from 'bluebird';
const { reject } = pkg;
import UsersModel from '../models/index.js';

import ErrorsUtil from '../util/errors.util.js';
const {UserNotAuthorizedError, UserNotResourceOwnerError} = ErrorsUtil;

export function isOwner(req, res, next) {
  const { token } = req.headers;
  const { userId } = req.params;

  UsersModel.getUserByToken(token)
    .then((user) => {
      if (!user) {
        return reject(new UserNotAuthorizedError('Invalid authorization token.'));
      }

      if (user._id.toString() !== userId) {
        return reject(new UserNotResourceOwnerError('Not valid operation'));
      }

      next();
    })
    .catch(next);
}