const { Router } = require('express')
const OperatorController = require('../controllers/OperatorController');
const { validateToken } = require('../services/authService');

const router = Router()

router
  .get('/operators', validateToken, OperatorController.findAll)
  .get('/operators/attackers', validateToken, OperatorController.findAttackers)
  .get('/operators/defenders', validateToken, OperatorController.findDefenders)
  .get('/operators/:id', validateToken, OperatorController.findById)
  .delete('/operators/:id', validateToken, OperatorController.deleteById)
  .put('/operators/:id', validateToken, OperatorController.updateById)
  .post('/operators', validateToken, OperatorController.createOperator)

module.exports = router;