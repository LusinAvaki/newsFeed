class UserNotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name
    }
  }
  
class UserNotCreatedError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name
    }
}
  
class UserNotUpdatedError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name
    }
}
  
class UserNotAuthorizedError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name
    }
}
  
class UserNotResourceOwnerError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name
    }
}
  
class InvalidInputError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name
    }
}
  
class PathNotFoundError extends Error {
    constructor(message) {
      super(message);
      this.name = this.constructor.name
    }
}
  
  
export default {
    InvalidInputError,
    PathNotFoundError,
    UserNotCreatedError,
    UserNotFoundError,
    UserNotUpdatedError,
    UserNotAuthorizedError,
    UserNotResourceOwnerError
};