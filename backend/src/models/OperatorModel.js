const OperatorModel = (sequelize, DataTypes) => {
  const Operator = sequelize.define('Operator', {
      name: DataTypes.STRING,
      speed: DataTypes.STRING,
      health: DataTypes.NUMBER,
      team: DataTypes.STRING,
      img: DataTypes.STRING
  }, {
    timestamps: false,
    scopes: {
      attacker: { 
        where: { team: "ATTACKER" } 
      },
      defender: { 
        where: { team: "DEFENDER" } 
      }
    }
  }
  );

  return Operator;
};

module.exports = OperatorModel;