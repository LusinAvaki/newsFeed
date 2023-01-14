import pkg from 'joi';
const { validate, string } = pkg;

export function validateSignInUser(req, res, next) {
  const singInSchema = pkg.object({
    body: {
      email: pkg.string().required().email(),
      password: pkg.string().required().min(8)
    }
  });
  const { error } = singInSchema.validate({ body: req.body });

  if (error) {
    res.status(400).json({ name: error.name, message: error.details[0].message });
  }
  next();
}

export function validateGetUser(req, res, next) {
  validate({ params: req.params }, {
    params: {
      userId: string().length(24).required()
    }
  });

  if (error) {
    res.status(400).json({ name: error.name, message: error.details[0].message });
  }
  next();
}

export function validateRegisterUser(req, res, next) {
  const schema = pkg.object({
    body: {
      firstName: pkg.string().required(),
      lastName: pkg.string().required(),
      email: pkg.string().required().email(),
      password: pkg.string().required().min(8)
    }
  })
  const { error } = schema.validate({ body: req.body });

  if (error) {
    res.status(400).json({ name: error.name, message: error.details[0].message });
  }
  next();
}

export function validateRemoveUser(req, res, next) {
  validate({ params: req.params }, {
    params: {
      userId: string().required().length(24)
    }
  });

  if (error) {
    res.status(400).json({ name: error.name, message: error.details[0].message });
  }
  next();
}