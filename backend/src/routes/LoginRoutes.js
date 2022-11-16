const { Router } = require('express');
const LoginController = require('../controllers/LoginController');
const { validateBody, userExists } = require('../middlewares/LoginMiddleware');

const router = Router();
router
  .post('/signin', userExists, LoginController.signin)
  .post('/login', LoginController.login)
  .post('/user', LoginController.userExists)
  .post('/email', LoginController.emailExists);

module.exports = router;