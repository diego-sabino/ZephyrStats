const bodyParser = require('body-parser');
const OperatorRoutes = require('./OperatorRoutes');
const userRoutes = require('./UserRoutes');
const StatsRoutes = require('./StatsRoutes')
const LoginRoutes = require('./LoginRoutes');
const cors = require('cors');
  
module.exports = app => {
  app.use(cors({
    origin: '*'
  }));
  app.use(bodyParser.json());
  app.use(OperatorRoutes);
  app.use(LoginRoutes);
  app.use(userRoutes);
  app.use(StatsRoutes);
}