/**
 * @param {import("sequelize").Sequelize} sequelize 
 * @param {import("sequelize").DataTypes} DataTypes 
 * @returns {import("sequelize").ModelStatic<any>}
 */
module.exports = (sequelize, DataTypes) => sequelize.define('relationship', {
  registerId: {
    type: DataTypes.INTEGER(5).ZEROFILL,
    allowNull: false,
    references: {
      model: 'user',
      key: 'userId'
    }
  },
  addresseeId: {
    type: DataTypes.INTEGER(5).ZEROFILL,
    allowNull: false,
    references: {
      model: 'user',
      key: 'userId'
    }
  },
  status: {
    type: DataTypes.ENUM('requested', 'accepted', 'friends', 'rejected', 'blocked'),
    allowNull: false,
    defaultValue: 'requested'
  },
  active: {
    type: DataTypes.TINYINT(1),
    allowNull: false,
    defaultValue: '1'
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
}, { tableName: 'relationship', timestamps: true, underscored: true, primaryKey: false });