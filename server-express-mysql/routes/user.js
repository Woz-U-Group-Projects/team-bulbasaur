var express = require("express");
var router = express.Router();
var models = require("../models");

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
      Password: req.body.password,
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

module.exports = router