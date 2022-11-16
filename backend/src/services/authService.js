const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const jwtConfig = {
  expiresIn: '30d',
  algorithm: 'HS256',
};

const createToken = (user, email) => {
  const newToken = jwt.sign({ data: [user, email] }, secret, jwtConfig);
 
  return newToken;
};

const validateToken = async (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Token not found' });
  }

  try {
    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verifyToken;
  } catch (_error) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
  
  next();
};

module.exports = {
  validateToken,
  createToken,
};