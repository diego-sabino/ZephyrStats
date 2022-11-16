const { Router } = require('express')
const UserController = require('../controllers/UserController');
const { validateToken } = require('../services/authService');

const router = Router()

router
  .post('/username', UserController.getUser)
  .post('/user', UserController.createUser)
  .post('/setAccount', validateToken, UserController.setMainAccount)


module.exports = router;