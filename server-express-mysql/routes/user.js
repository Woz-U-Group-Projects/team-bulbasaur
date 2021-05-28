var express = require("express");
var router = express.Router();
var models = require("../models");
var authService = require("../services/auth")

router.get('/api', (req, res, next) => {
  models.users.findAll({})
  .then(users => {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify(users))
  })
})

router.post('/api/signup', (req, res, next) => {
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
      res.send(JSON.stringify({ result: true, message: 'you have successfully signed up' }))
    } else {
      res.header('Content-Type', 'application/json')
      res.send({ result: false, message: 'user already exists' })
    }
  })
})

router.post('/api/login', (req, res, next) => {
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

router.get('/api/profile', (req, res, next) => {
  let token = req.cookies.jwt
  if(token){
    authService.verifyUser(token)
    .then( user => {
      if(user){
        models.users.findOne({
          where: { Email: user.Email },
          attributes: ['FullName', 'UserName', 'Email']
        })
        .then( result => {
          res.header('Content-Type', 'application/json') 
          res.send(JSON.stringify({ result: true, data: result}))
        })
      } else {
        res.send(JSON.stringify({ result: false, message: 'must be logged in'}))
      }
    })
  } else {
    res.send(JSON.stringify({ result: false, message: 'must be logged in'}))
  }
})

router.get('/api/profile/:id', (req, res, next) => {
  let token = req.cookies.jwt
  if(token){
    authService.verifyUser(token)
    .then( user => {
      if(user){
        models.users.findOne({
          where: { Email: user.Email },
          attributes: ['FullName', 'UserName', 'Email']
        })
        .then( result => {
          res.header('Content-Type', 'application/json') 
          res.send(JSON.stringify({ result: true, data: result}))
        })
      } else {
        res.send(JSON.stringify({ result: false }))
      }
    })
  } else {
    models.users.findOne({
      where: { UserId: req.body.id },
      attributes: ['FullName', 'UserName']
    })
    .then( user => {
      res.header('Content-Type', 'application/json') 
      res.send(JSON.stringify({ result: false, data: user}))
    })
  }
})

router.get('/api/logout', function (req, res, next) {
  res.cookie('jwt', "", { expires: new Date(0) })
  res.send(JSON.stringify({ message: 'logged out'}))
})

module.exports = router