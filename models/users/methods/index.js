import { createHash } from 'crypto';

import { compare } from 'bcrypt';
import pkg from 'bluebird';
const { reject } = pkg;

import ErrorsUtil from '../../../util/errors.util.js';

const { InvalidInputError } = ErrorsUtil;

export default (Users) => {
  /**
   * @description List all users.
   */
  Users.listAllUsers = () => {
    return Users.find({}, {password: false, token: false});
  };
  
  /**
   * @param {string} token
   * @description get users.
   */
  Users.getUserByToken = (token) => {
    return Users.findOne({token}, {password: false})
  };
  
  /**
   * @param {string} userId
   * @description get users.
   */
  Users.getUserById = (userId) => {
    return Users.findOne({_id: userId}, {password: false, token: false})
  };
  
  /**
   * @param {Object} userData
   * @param {string} userData.email
   * @description create users.
   */
  Users.createUser = (userData) => {
    return Users.create(userData);
  };
  
  /**
   * @description remove users.
   */
  Users.removeUserById = (userId) => {
    return Users.findOneAndDelete({_id: userId});
  };
  
  /**
   * @description update users.
   */
  Users.updateUserById = (userId, updateData) => {
    return Users.findOneAndUpdate({_id: userId}, updateData, {new: true});
  };
  
  /**
   * @param {Object} signInData
   * @param {string} signInData.email
   * @param {string} signInData.password
   * @returns {Promise}
   */

  Users.signInUser = (signInData) => {
    const {email, password} = signInData;
    let user;
    
    return Users.findOne({email})
      .then((_user) => {
        if (!_user) {
          return reject(new InvalidInputError)
        }
        user = _user;
        
        return compare(password, user.password);
      })
      .then((result) => {
        if (!result) {
          return reject(new InvalidInputError)
        }
        
        user.token = createHash('sha1').update(email + Date.now()).digest('hex');
        
        return user.save()
      })
  };

  return Users;
};

