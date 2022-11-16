const database = require('../models');

class UserController {
  static async createUser(req, res) {
    const { email, password, username } = req.body;
    const newUser = await database.User.create(
      { email, password, username })
    res.status(201).json([newUser]);
  }


  static async getUser(req, res) {
    const { token } = req.body;
    console.log(`opa ${token}`);
    if (!token) {
      return res.status(404).json({ message: "token not found"});
    }
    const user = await database.User.findOne({ where: { token }})
    if (!user) {
      return res.status(404).json({ message: "user not found"});
    }
    res.status(200).json(user);
  }

  static async setMainAccount(req, res) {
    const { username, platform, avatar, token } = req.body;
    const newMainAcc = await database.User.update({ username, platform, avatar }, { where: { token }});
    
    res.status(201).json(newMainAcc);
  }
}

module.exports = UserController;