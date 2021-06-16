/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('groups', {
    GroupId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    GroupName: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Discription: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Likes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    Dislikes: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    IsPrivate: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    tableName: 'groups'
  });
};
