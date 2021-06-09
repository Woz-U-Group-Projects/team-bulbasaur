var express = require("express");
var router = express.Router();
var models = require("../models");
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var authService = require("../services/auth")

router.get('/api', (req, res, next) => {
  models.posts.findAll({
    where: { Visible: 0 },
    include: [
      {
        model: models.users,
        attributes: ['UserName']
      },
      {
        model: models.comments,
        include: {
          model: models.users,
          attributes: ['UserName']
        }
      }
    ]
  })
    .then(posts => {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify(posts))
    })
})

router.post('/api', (req, res, next) => {
  console.log(req.body)
  let token = req.cookies.jwt
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          models.posts.findOrCreate({
            where: { PostId: 0 },
            defaults: {
              UserId: user.UserId,
              PostHead: req.body.title,
              PostBody: req.body.body,
              Likes: 0,
              Dislikes: 0,
              Visible: req.body.isHidden === false ? 0 : 1
            }
          })
            .spread((result, created) => {
              if (created) {
                models.posts.findAll({ 
                  where: { visible: 0 },
                  include: [{
                    model: models.users,
                    attributes: ['UserName']
                  },
                  {
                    model: models.comments,
                    include: {
                      model: models.users,
                      attributes: ['UserName']
                    }
                  }]
                })
                  .then(posts => {
                    res.header('Content-Type', 'application/json')
                    res.send(JSON.stringify({ status: true, message: 'post was successful', data: posts }))
                  })
              } else {
                res.header('Content-Type', 'application/json')
                res.send(JSON.stringify({ status: false, message: 'something went wrong', data: null }))
              }
            })
        } else {
          res.header('Content-Type', 'application/json')
          res.send(JSON.stringify({ status: false, message: 'Something Went Wrong', data: null }))
        }
      })
  } else {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify({ status: false, message: 'must be logged in to make a post', data: null }))
  }
})

router.get('/api/:id', (req, res, next) => {
  let token = req.cookies.jwt
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user.UserId == parseInt(req.params.id)) {
          models.posts.findAll({
            where: { UserId: parseInt(req.params.id) },
            include: [{
              model: models.users,
              attributes: ['UserName']
            },
            {
              model: models.comments,
              include: {
                model: models.users,
                attributes: ['UserName']
              }
            }]
          })
            .then(posts => {
              res.header('Content-Type', 'application/json')
              res.send(JSON.stringify(posts))
            })
        } else {
          models.posts.findAll({
            where: {
              [Op.and]: [
                { UserId: parseInt(req.params.id) },
                { visible: 0 }
              ]
            },
            include: [{
              model: models.users,
              attributes: ['UserName']
            },
            {
              model: models.comments,
              include: {
                model: models.users,
                attributes: ['UserName']
              }
            }]
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
          { UserId: parseInt(req.params.id) },
          { visible: 0 }
        ]
      },
      include: [{
        model: models.users,
        attributes: ['UserName']
      },
      {
        model: models.comments,
        include: {
          model: models.users,
          attributes: ['UserName']
        }
      }]
    })
      .then(posts => {
        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify(posts))
      })
  }
})

router.put('/api/:type/:postId', (req, res, next) => {
  if (req.params.type == 'likes') {
    models.posts.update(
      { Likes: parseInt(req.body.likes) + 1 },
      { where: { PostId: parseInt(req.params.postId) } }
    )
      .then(() => {
        return models.posts.findAll({
          where: { Visible: 0 },
          include: [{
            model: models.users
          },
          {
            model: models.comments,
            include: {
              model: models.users,
              attributes: ['UserName']
            }
          }]
        })
      })
      .then(post => {
        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify(post))
      })
  }
  if (req.params.type == 'dislikes') {
    models.posts.update(
      { Dislikes: parseInt(req.body.dislikes) + 1 },
      { where: { PostId: parseInt(req.params.postId) } }
    )
      .then(() => {
        return models.posts.findAll({
          where: { Visible: 0 },
          include: [{
            model: models.users
          },
          {
            model: models.comments,
            include: {
              model: models.users,
              attributes: ['UserName']
            }
          }]
        })
      })
      .then(post => {
        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify(post))
      })
  }
})

router.delete('/api/:postId', (req, res, next) => {
  let token = req.cookies.jwt
  if (token) {
    authService.verifyUser(token)
      .then(user => {
        if (user) {
          models.posts.findOne({ where: { PostId: req.params.postId } })
            .then(post => {
              if (user.UserId == post.UserId || user.Admin == 1) {
                models.posts.destroy({ where: { PostId: req.params.postId } })
                  .then(result => {
                    if (result) {
                      res.header('Content-Type', 'application/json')
                      res.send(JSON.stringify({ status: true, message: 'post was deleted' }))
                    } else {
                      res.header('Content-Type', 'application/json')
                      res.send(JSON.stringify({ status: false, message: 'something whent worng' }))
                    }
                  })
              } else {
                res.header('Content-Type', 'application/json')
                res.send(JSON.stringify({ status: false, id: [user.UserId, newPost[0].UserId] }))
              }
            })
        } else {
          res.header('Content-Type', 'application/json')
          res.send(JSON.stringify({ status: false, message: 'Guests are not allowed to delete posts' }))
        }
      })
  } else {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify({ status: false, message: 'Guests are not allowed to delete posts' }))
  }
})

module.exports = router