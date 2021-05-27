var express = require("express");
var router = express.Router();
var models = require("../models");
var authService = require("../services/auth")

router.get('/', (req, res, next) => {
  models.users.findAll({})
  .then(users => {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify(users))
  })
})

router.post('/signup', (req, res, next) => {
  models.users.findOrCreate({
    where: { Email: req.body.email },
    defaults: {
      FullName: req.body.name,
      Email: req.body.email,
      UserName: req.body.userName,
      Password: authService.hashPassword(req.body.password),
      Admin: 0
    }
  })
  .spread((result, created) => {
    if(created){
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify(result))
    } else {
      res.send('user already exists')
    }
  })
})

router.post('/login', (req, res, next) => {
  models.users.findOne({
    where: { Email: req.body.email }
  })
  .then(user => {
    if(!user){
      res.send('user not found')
    } else {
      let passwordMatch = authService.comparePassword(req.body.password, user.Password)
      if(passwordMatch){
        let token = authService.signUser(user)
        res.cookie('jwt', token)
        res.header('Content-Type', 'application/json')  
        res.send(JSON.stringify(user))
      } else {
        res.send('incorrect password')
      }
    }
  })
})

module.exports = router