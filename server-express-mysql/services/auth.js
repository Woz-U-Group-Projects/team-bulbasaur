const jwt = require('jsonwebtoken')
const models = require('../models')
var bcrypt = require('bcryptjs')

var authService = {
  signUser: function (user) {
    const token = jwt.sign({
      UserId: user.UserId,
      FullName: user.FullName,
      Admin: user.Admin
    }, 'secretKey',
    {
      expiresIn: '4h'
    })

    return token
  },
  verifyUser: function(token){
    try{
      let decoded = jwt.verify(token, 'secretKey')
      return models.users.findByPk(decoded.UserId)
    } catch(err){
      if(err instanceof jwt.TokenExpiredError){
        return err
        console.log(err)
      }
      console.log(err)
      return null
    }
  },
  hashPassword: function(plainTextPassword){
    let salt = bcrypt.genSaltSync(10)
    let hash = bcrypt.hashSync(plainTextPassword, salt)
    return hash
  },
  comparePassword: function(plainTextPassword, hashedPassowrd){
    return bcrypt.compareSync(plainTextPassword, hashedPassowrd)
  }
}

module.exports = authService