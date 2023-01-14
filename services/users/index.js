import UsersModel from '../../models/users/index.js';
import news from '../news/index.js';

import { handleList, handleGet, handleCreate, handleUpdate, handleDelete } from '../../util/success-handler.util.js';
import ErrorsUtil from '../../util/errors.util.js';

import method from '../../models/users/methods/index.js';
const userMethods = method(UsersModel);

const { UserNotCreatedError, UserNotFoundError, UserNotUpdatedError } = ErrorsUtil;

export function listUsers(req, res, next) {
  const users = UsersModel.listAllUsers()
  handleList(res, users)
}

export function getUser(req, res, next) {
  const {userId} = req.params;
  
  const user = UsersModel.getUserById(userId)
  if (!user) {
    return Promise.reject(new UserNotFoundError('User not found.'))
  }
  handleGet(res, user)
}

export function addUser(req, res, next) {
  const {firstName, lastName, email, username, password} = req.body;
  
  const createData = {firstName, lastName, email, username, password};
  
  const result = userMethods.createUser(createData)
  if (!result) {
    return Promise.reject(new UserNotCreatedError('User not created.'))
  }
  
  news.getNewsFeed();
  return handleCreate(res, {userId: result._id})
}

export async function updateUser(req, res, next) {
  const {userId} = req.params;
  
  const {email, firstName, lastName, username, password} = req.body;
  
  const user = await UsersModel.updateUserById(userId, {email, firstName, lastName, username, password})
  if (!user) {
    return Promise.reject(new UserNotUpdatedError('User not updated.'))
  }
  handleUpdate(res, user);
}

export function removeUser(req, res, next) {
  const {userId} = req.params;
  
  const user = UsersModel.removeUserById(userId);
  if (!user) {
    return Promise.reject(new UserNotFoundError('User not found.'))
  }
  handleDelete(res, {userId: user._id});
}

export async function signInUser(req, res, next) {
  const {email, password} = req.body;
  
  const result = UsersModel.signInUser({email, password})
  const newsData = await news.listNews();
  handleGet(res, {token: result.token, newsData});
}