/**
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns {import("sequelize").ModelStatic<any>}
 */
module.exports = (sequelize, DataTypes) => sequelize.define('comment', {
  commentId: {
    type: DataTypes.INTEGER(5).ZEROFILL,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  authorId: {
    type: DataTypes.INTEGER(5).ZEROFILL,
    allowNull: false,
    references: {
      model: 'user',
      key: 'userId'
    }
  },
  postId: {
    type: DataTypes.INTEGER(5).ZEROFILL,
    allowNull: false,
    references: {
      model: 'post',
      key: 'postId'
    }
  },
  body: {
    type: DataTypes.STRING(500),
    allowNull: false
  },
  edited: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: '0',
  },
  likes: {
    type: DataTypes.INTEGER(5).UNSIGNED.ZEROFILL,
    allowNull: false,
    defaultValue: '00000'
  },
  dislikes: {
    type: DataTypes.INTEGER(5).UNSIGNED.ZEROFILL,
    allowNull: false,
    defaultValue: '00000'
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
}, { tableName: 'comment', timestamps: true, underscored: true });