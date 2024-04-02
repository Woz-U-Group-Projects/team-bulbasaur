/**
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns {import("sequelize").ModelStatic<any>}
 */
module.exports = (sequelize, DataTypes) => sequelize.define('membership', {
  groupId: {
    type: DataTypes.INTEGER(5).ZEROFILL,
    allowNull: false,
    references: {
      model: 'group',
      key: 'groupId'
    }
  },
  userId: {
    type: DataTypes.INTEGER(5).ZEROFILL,
    allowNull: false,
    references: {
      model: 'user',
      key: 'userId'
    }
  },
  role: {
    type: DataTypes.ENUM('owner', 'admin', 'member'),
    allowNull: false,
    defaultValue: 'member'
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
}, { tableName: 'membership', timestamps: true, underscored: true, primaryKey: false });