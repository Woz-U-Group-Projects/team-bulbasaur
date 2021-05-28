/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comments', {
    CommentId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
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
