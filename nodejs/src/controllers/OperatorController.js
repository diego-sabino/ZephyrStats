const database = require('../models');

class OperatorController {
  static async findAll(req, res) {
    try {
      const allOperators = await database.Operator.findAll()
      console.log(req.headers.authorization);
      res.status(200).json(allOperators);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async findDefenders(req, res) {
    try {
      const allOperators = await database.Operator.scope("defender").findAll()
      console.log(req.headers.authorization);
      res.status(200).json(allOperators);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async findAttackers(req, res) {
    try {
      const allOperators = await database.Operator.scope("attacker").findAll()
      console.log(req.headers.authorization);
      res.status(200).json(allOperators);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  static async findById(req, res) {
    const { id } = req.params;
    const operatorById = await database.Operator.findByPk(id)
    if (operatorById) {
      return res.status(200).json([operatorById]);
    }
     res.status(404).json({ message: 'operator not found' });
  }

  static async findByName(req, res) {
    const { name } = req.params;
    const operatorByName = await database.Operator.findAll({ where: { name }})
    const result = Object.values(operatorByName)[0]
    if (operatorByName) {
      return res.status(200).json(result);
    }
     res.status(404).json({ message: 'operator not found' });
  }

  static async deleteById(req, res) {
    const { id } = req.params;
    const operatorByName = await database.Operator.findByPk(id)
    const deletedOperator = await database.Operator.destroy({ where: { id }})
    if (operatorById) {
      return res.status(200).json([deletedOperator]);
    }
     res.status(404).json({ message: 'operator not found' });
  }

  static async updateById(req, res) {
    const { id } = req.params;
    const { name, health, speed, img } = req.body;
    const operatorById = await database.Operator.findByPk(id)
    await database.Operator.update(
      { name, health, speed, img },
      ({ where: { id }}));
    if (operatorById) {
      return res.status(200).json({ message: "operator updated successfully"});
    }
     res.status(404).json({ message: 'operator not found' });
  }

  static async createOperator(req, res) {
    const { name, health, speed, img } = req.body;
    const deletedOperator = await database.Operator.create(
      { name, health, speed, img })
    res.status(201).json([deletedOperator]);
  }
}

module.exports = OperatorController;