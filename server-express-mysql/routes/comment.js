var express = require("express");
var router = express.Router();
var models = require("../models");
var authService = require("../services/auth")

router.get('/api/:postId', (req, res, next) => {
  models.comments.findAll({
    where: { PostId: req.params.postId }
  }).then(comments => {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify(comments))
  })
})

//inUse
router.post('/api', (req, res, next) => {
  models.comments.findOrCreate({
    where: { CommentId: 0 },
    defaults: {
      PostId: req.body.postId,
      UserId: req.body.userId,
      CommentBody: req.body.body,
      Likes: 0,
      Dislikes: 0
    }
  }).spread((result, created) => {
    if (created) {
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
      }).then(posts => {
        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify({ result: true, data: posts }))
      })
    } else {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify({ result: false, message: 'Something Went Wrong' }))
    }
  })
})

router.delete('/api/:commentId', (req, res, next) => {
  models.comments.destroy({
    where: { CommentId: req.params.commentId }
  }).then(result => {
    if (result) {
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
      }).then( posts => {
        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify({ status: true, message: 'comment was deleted', data: posts }))
      })
    } else {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify({ status: false, message: 'something whent worng' }))
    }
  })
})

//inUse
router.put('/api/:type/:commentId', (req, res, next) => {
  if (req.params.type == 'likes') {
    models.comments.update(
      { Likes: parseInt(req.body.likes + 1) },
      { where: { CommentId: parseInt(req.params.commentId) } }
    ).then(() => {
      return models.posts.findAll({
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
    }).then(posts => {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify({ status: true, message: 'Edit was Successful', data: posts }))
    })
  }
  if (req.params.type == 'dislikes') {
    models.comments.update(
      { Dislikes: parseInt(req.body.dislikes + 1) },
      { where: { CommentId: parseInt(req.params.commentId) } }
    ).then(() => {
      return models.posts.findAll({
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
    }).then(posts => {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify({ status: true, message: 'Edit was Successful', data: posts }))
    })
  }
})

//inUse
router.post('/api/:userId', (req, res, next) => {
  models.comments.findOrCreate({
    where: { CommentId: 0 },
    defaults: {
      PostId: req.body.postId,
      UserId: req.body.userId,
      CommentBody: req.body.body,
      Likes: 0,
      Dislikes: 0
    }
  }).spread((result, created) => {
    if (created) {
      models.posts.findAll({
        where: { UserId: parseInt(req.body.profileId) },
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
      }).then(posts => {
        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify({ result: true, data: posts }))
      })
    } else {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify({ result: false, message: 'Something Went Wrong' }))
    }
  })
})

//inUse
router.put('/api/update/votes/:commentId', (req, res, next) => {
  if (req.body.type == 'likes') {
    models.comments.update(
      { Likes: parseInt(req.body.likes + 1) },
      { where: { CommentId: parseInt(req.params.commentId) } }
    ).then(() => {
      return models.posts.findAll({
        where: { UserId: parseInt(req.body.userId) },
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
    }).then(posts => {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify({ status: true, message: 'Edit was Successful', data: posts }))
    })
  }
  if (req.body.type == 'dislikes') {
    models.comments.update(
      { Dislikes: parseInt(req.body.dislikes + 1) },
      { where: { CommentId: parseInt(req.params.commentId) } }
    ).then(() => {
      return models.posts.findAll({
        where: { UserId: parseInt(req.body.userId) },
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
    }).then(posts => {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify({ status: true, message: 'Edit was Successful', data: posts }))
    })
  }
})

//inUse
router.delete('/api/:commentId/:userId', (req, res, next) => {
  models.comments.destroy({
    where: { CommentId: req.params.commentId }
  }).then(result => {
    if (result) {
      models.posts.findAll({
        where: { UserId: parseInt(req.params.userId) },
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
      }).then( posts => {
        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify({ status: true, message: 'comment was deleted', data: posts }))
      })
    } else {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify({ status: false, message: 'something whent worng' }))
    }
  })
})

module.exports = router