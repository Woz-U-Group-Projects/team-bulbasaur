/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posts', {
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'UserId'
      }
    },
    GroupId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    PostHead: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    PostBody: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    Edit: {
      type: DataTypes.STRING(500),
      allowNull: true
    },
    Likes: {
      type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
      allowNull: false
    },
    Dislikes: {
      type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
      allowNull: false
    },
    Visible: {
      type: DataTypes.INTEGER.ZEROFILL,
      allowNull: false
    },
    LastUpdated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    },
    userUserId: {
      type: DataTypes.INTEGER(10).UNSIGNED
    }
  }, {
    tableName: 'posts'
  });
};
