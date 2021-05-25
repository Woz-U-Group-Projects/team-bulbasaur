/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users', {
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    FullName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Email: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    UserName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Password: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Admin: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'users'
  });
};
