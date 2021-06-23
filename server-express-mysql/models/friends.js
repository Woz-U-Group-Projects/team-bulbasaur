/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('friends', {
    FriendshipId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    UserId1: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'UserId'
      }
    },
    UserId2: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'UserId'
      }
    },
    status: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'friends'
  });
};
