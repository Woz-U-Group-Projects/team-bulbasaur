module.exports = associations = (models) => {
  models.users.hasMany(models.posts, {
    foreignKey: 'UserId'
  })
  models.posts.belongsTo(models.users, {
    foreignKey: 'UserId'
  })

  //=========================================

  models.users.hasMany(models.comments, {
    foreignKey: 'UserId'
  })
  models.comments.belongsTo(models.users, {
    foreignKey: 'UserId'
  })

  //=========================================

  models.posts.hasMany(models.comments, {
    foreignKey: 'PostId'
  })
  models.comments.belongsTo(models.posts, {
    foreignKey: 'PostId'
  })

  //=========================================

  models.posts.belongsTo(models.groups, {
    foreignKey: 'GroupId'
  })
  models.groups.hasMany(models.posts, {
    foreignKey: 'GroupId'
  })

  //=========================================

  models.groups.belongsToMany(models.users, {
    through: models.grouped_users,
    foreignKey: 'GroupId'
  })
  models.users.belongsToMany(models.groups, {
    through: models.grouped_users,
    foreignKey: 'UserId'
  })

  //=========================================
}