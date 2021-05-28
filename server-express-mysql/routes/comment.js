var express = require("express");
var router = express.Router();
var models = require("../models");
var authService = require("../services/auth")

router.get('/api', (req, res, next) => {
  models.comments.findAll({})
  .then( comments => {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify(comments))
  })
})

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
  })
  .spread((result, created) => {
    if(created){
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify(result))
    } else {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify({ result: false, message: 'Something Went Wrong' }))
    }
  })
})

module.exports = router