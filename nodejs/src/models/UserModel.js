const UserModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      username: DataTypes.STRING,
      platform: DataTypes.STRING,
      avatar: DataTypes.STRING,
      token: DataTypes.STRING,
  },
  { 
    timestamps: false 
  });

  return User;
};

module.exports = UserModel;