/** 
 * @typedef {Object} models
 * @property {import('sequelize').ModelStatic<any>} user
 * @property {import('sequelize').ModelStatic<any>} relationship
 * @property {import('sequelize').ModelStatic<any>} group
 * @property {import('sequelize').ModelStatic<any>} membership
 * @property {import('sequelize').ModelStatic<any>} post
 * @property {import('sequelize').ModelStatic<any>} comment
 * @property {import('sequelize').ModelStatic<any>} rection
 * 
 * 
 * @param {models} models 
 */
module.exports = associations = (models) => {

  models.user.hasMany(models.group, { as: 'groups', foreignKey: 'ownerId' });
  models.group.belongsTo(models.user, { as: 'owner', foreignKey: 'ownerId' });

  // user group membership association
  models.user.belongsToMany(models.group, {
    through: models.membership,
    as: 'memberships',
    foreignKey: 'userId',
    otherKey: 'groupId'
  });
  models.group.belongsToMany(models.user, {
    through: {
      model: models.membership,
      scope: { role: 'member' }
    },
    as: 'members',
    foreignKey: 'groupId',
    otherKey: 'userId'
  });
  models.group.belongsToMany(models.user, {
    through: {
      model: models.membership,
      scope: { role: 'admin' }
    },
    as: 'admins',
    foreignKey: 'groupId',
    otherKey: 'userId'
  });

  // =========================================

  // group posts association
  models.group.hasMany(models.post, { foreignKey: 'groupId' });
  models.post.belongsTo(models.group, { foreignKey: 'groupId' });

  // =========================================

  // user relationships association
  models.user.belongsToMany(models.user, {
    through: {
      model: models.relationship,
      scope: { status: ['pending', 'accepted', 'rejected'] }
    },
    as: 'incoming',
    foreignKey: 'registerId',
    otherKey: 'addresseeId',
  });
  models.user.belongsToMany(models.user, {
    through: {
      model: models.relationship,
      scope: { status: ['friends'] }
    },
    as: 'friends',
    foreignKey: 'registerId',
    otherKey: 'addresseeId',
  });
  models.user.belongsToMany(models.user, {
    through: {
      model: models.relationship,
      scope: { status: ['pending', 'denied'] }
    },
    as: 'outgoing',
    foreignKey: 'addresseeId',
    otherKey: 'registerId',
  });
  models.user.belongsToMany(models.user, {
    through: {
      model: models.relationship,
      scope: { status: ['denied'] }
    },
    as: 'denied',
    foreignKey: 'addresseeId',
    otherKey: 'registerId',
  });
  models.user.belongsToMany(models.user, {
    through: {
      model: models.relationship,
      scope: { status: ['blocked'] }
    },
    as: 'blocked',
    foreignKey: 'addresseeId',
    otherKey: 'registerId',
  });

  // =========================================

  // user posts association
  models.user.hasMany(models.post, { as: 'posts', foreignKey: 'authorId' });
  models.post.belongsTo(models.user, { as: 'author', foreignKey: 'authorId', });

  // =========================================

  // user comments association
  models.user.hasMany(models.comment, { as: 'comments', foreignKey: 'authorId' });
  models.comment.belongsTo(models.user, { as: 'author', foreignKey: 'authorId' });

  // =========================================

  // post comments association
  models.post.hasMany(models.comment, { as: 'comments', foreignKey: 'postId' });
  models.comment.belongsTo(models.post, { as: 'post', foreignKey: 'postId' });
}