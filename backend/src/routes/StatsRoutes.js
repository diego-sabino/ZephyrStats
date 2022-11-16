const { Router } = require('express')
const OperatorController = require('../controllers/OperatorController');
const StatsController = require('../controllers/StatsController');
const { validateToken } = require('../services/authService');

const router = Router()

router
  .put('/stats', validateToken, StatsController.findByUsername)
  .put('/stats/general', validateToken, StatsController.getGeneralStats)
  .put('/stats/avatar', validateToken, StatsController.getAvatar)
  .put('/stats/rank', validateToken, StatsController.getRankStats)
  .put('/stats/operator/:id', validateToken, StatsController.getStatsByOperator)

module.exports = router;