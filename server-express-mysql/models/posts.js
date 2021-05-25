/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('posts', {
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    PostHead: {
      type: DataTypes.STRING(200),
      allowNull: false
    },
    PostBody: {
      type: DataTypes.STRING(500),
      allowNull: false
    },
    Likes: {
      type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
      allowNull: false
    },
    Dislikes: {
      type: DataTypes.INTEGER(10).UNSIGNED.ZEROFILL,
      allowNull: false
    },
    LastUpdated: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    tableName: 'posts'
  });
};
