/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comments', {
    CommentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'posts',
        key: 'PostId'
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    CommentBody: {
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
    }
  }, {
    tableName: 'comments'
  });
};
