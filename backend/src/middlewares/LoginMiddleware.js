const database = require('../models');

const validateBody = async (req, res, next) => {
  const { email, password } = req.body;
  const isBodyValid = email && password;
  if (!isBodyValid) {
    return res.status(400).json({ message: 'Some required fields are missing' });
  }

  const username = await database.User.findOne({ where: { email } });
  
  if (!username || username.password !== password) {
    return res.status(400).json({ message: 'Invalid fields' }); 
  }

  next();
};

const userExists = async (req, res, next) => {
  const { username } = req.body;
  const userInUse = await database.User.findOne({ where: { username } });
  
  if (userInUse) {
    return res.status(409).json({ message: "this username is already in use" })
  }

  next();
};

module.exports = {
  validateBody,
  userExists
};