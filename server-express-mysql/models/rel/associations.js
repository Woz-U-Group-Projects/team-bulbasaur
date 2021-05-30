module.exports = associations = (models) => {
  models.users.hasMany(models.posts, {
    foreignKey: 'UserId'
  })
  models.posts.belongsTo(models.users, {
    foreignKey: 'UserId'
  })

  models.users.hasMany(models.comments, {
    foreignKey: 'UserId'
  })
  models.comments.belongsTo(models.users, {
    foreignKey: 'UserId'
  })

  models.posts.hasMany(models.comments, {
    foreignKey: 'PostId'
  })
  models.comments.belongsTo(models.posts, {
    foreignKey: 'PostId'
  })
}