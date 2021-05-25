module.exports = associations = (models) => {
  models.users.hasMany(models.posts, {
    foreignKey: 'UserId'
  })
  models.posts.belongsTo(models.users)

  models.posts.hasMany(models.comments, {
    foreignKey: 'PostId'
  })
  models.comments.belongsTo(models.posts)
}