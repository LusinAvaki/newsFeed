import { hash as _hash } from 'bcrypt';

import { Schema as _Schema, model } from 'mongoose';
const Schema = _Schema;

import setModelMethods from './methods/index.js';

const UsersSchema = new Schema({
    firstName: String,
    lastName: String,
    userName: String,
    password: {
      type: String,
      required: true
    },
    email: {
      type: String,
      unique: true,
      index: true
    },
    token: {
      type: String,
      index: true
    }
  })
;

UsersSchema.pre('save', function (next) {
  const self = this;
  
  if (self.isModified('password') === true) {
    _hash(self.password, 10)
      .then((hash) => {
        self.password = hash;
        next();
      })
      .catch(next)
  } else {
    next()
  }
  
});


const Users = model('Users', UsersSchema);

setModelMethods(Users);

export default Users;