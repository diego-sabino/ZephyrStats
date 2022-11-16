require('dotenv/config');
const { createToken } = require('../services/authService');
const database = require('../models');

class LoginController {
  static async signin(req, res) {
    const { email, username, password } = req.body;

    const newUser = await database.User.create({ email, username, password });
    res.status(201).json({ newUser });
  };

  static async emailExists(req, res) {
    const { email } = req.body;
    const emailInUse = await database.User.findOne({ where: { email } });

    if (emailInUse) {
      return res.status(409).json({ message: "this email is already in use" })
    }

    res.status(200).json({ message: "this email is not in use" })
  }

  static async userExists(req, res) {
    const { username } = req.body;
    const userInUse = await database.User.findOne({ where: { username } });
    
    if (userInUse) {
      return res.status(409).json({ message: "this username is already in use" })
    }

    res.status(200).json({ message: "this username is not in use" })
  }

  static async login(req, res) {
    const { email, password } = req.body;
    const user = await database.User.findOne({ where: { email, password } });
    if (!user) {
      return res.status(401).json({ message: "user not found" });
    }

    const token = createToken(email, email); 
    await database.User.update({ token: token }, { where: { email, password }})

    res.status(200).json({ token });
  };
  
}


module.exports = LoginController;
