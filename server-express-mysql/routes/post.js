var express = require("express");
var router = express.Router();
var models = require("../models");
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var authService = require("../services/auth")

router.get('/api', (req, res, next) => {
  models.posts.findAll({
    where: {Visible: 0}
  })
    .then(posts => {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify(posts))
    })
})

router.post('/api', (req, res, next) => {
  let token = req.cookies.jwt
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          models.posts.findOrCreate({
            where: { UserId: 0 },
            defaults: {
              UserId: user.UserId,
              PostHead: req.body.head,
              PostBody: req.body.body,
              Likes: 0,
              Dislikes: 0,
              Visible: 0
            }
          })
            .spread((result, created) => {
              if (created) {
                res.header('Content-Type', 'application/json')
                res.send(JSON.stringify({ status: true, data: result }))
              } else {
                res.header('Content-Type', 'application/json')
                res.send(JSON.stringify({ status: false, message: 'something went wrong' }))
              }
            })
        } else {
          res.send('boo')
        }
      })
  } else {
    models.posts.findOrCreate({
      where: { UserId: 0 },
      defaults: {
        UserId: 1,
        PostHead: req.body.head,
        PostBody: req.body.body,
        Likes: 0,
        Dislikes: 0,
        Visible: 0
      }
    })
      .spread((result, created) => {
        if (created) {
          res.header('Content-Type', 'application/json')
          res.send(JSON.stringify({ status: true, data: result }))
        } else {
          res.header('Content-Type', 'application/json')
          res.send(JSON.stringify({ status: false, message: 'something went wrong' }))
        }
      })
  }
})

router.get('/api/:id', (req, res, next) => {
  let token = req.cookies.jwt
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user.UserId == req.params.id) {
          models.posts.findAll({
            where: {
              UserId: req.params.id
            }
          })
            .then(posts => {
              res.header('Content-Type', 'application/json')
              res.send(JSON.stringify(posts))
            })
        } else {
          models.posts.findAll({
            where: {
              [Op.and]: [
                { UserId: req.params.id },
                { visible: 0 }
              ]
            }
          })
            .then(posts => {
              res.header('Content-Type', 'application/json')
              res.send(JSON.stringify(posts))
            })
        }
      })
  } else {
    models.posts.findAll({
      where: {
        [Op.and]: [
          { UserId: req.params.id },
          { visible: 0 }
        ]
      }
    })
      .then(posts => {
        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify(posts))
      })
  }
})

module.exports = router