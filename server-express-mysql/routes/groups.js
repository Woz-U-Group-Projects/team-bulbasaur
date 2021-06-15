var express = require("express");
var router = express.Router();
var models = require("../models");
var authService = require("../services/auth")

router.get('/api/groups', (req, res, next) => {
  models.groups.findAll({
    include: [
      {
        model: models.users
      },
      {
        model: models.posts
      }
    ]
  }).then( groups => {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify(groups))
  })
})

module.exports = router