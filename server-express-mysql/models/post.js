/* jshint indent: 2 */

/**
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns {import("sequelize").ModelStatic<any>}
 */
module.exports = (sequelize, DataTypes) => sequelize.define('post', {
  postId: {
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
  groupId: {
    type: DataTypes.INTEGER(5).ZEROFILL,
    allowNull: true,
    references: {
      model: 'group',
      key: 'groupId'
    }
  },
  title: {
    type: DataTypes.STRING(200),
    allowNull: false
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
  private: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: '0',
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: sequelize.literal('CURRENT_TIMESTAMP')
  }
}, { tableName: 'post', timestamps: true, underscored: true });
