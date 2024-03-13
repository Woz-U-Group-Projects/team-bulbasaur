/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grouped_users', {
    GroupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'groups',
        key: 'GroupId'
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'users',
        key: 'UserId'
      }
    },
    MemberShip: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    groupGroupId: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    userUserId: {
      type: DataTypes.INTEGER,
      allowNull: true
    }
  }, {
    tableName: 'grouped_users'
  });
};
