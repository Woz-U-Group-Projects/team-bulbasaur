var express = require("express");
var router = express.Router();
var models = require("../models");
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var authService = require("../services/auth")

router.get('/api/groups', (req, res, next) => {
  models.groups.findAll({
    include: [
      {
        model: models.users,
        attributes: ['UserId', 'UserName']
      },
      {
        model: models.posts,
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
      }
    ]
  }).then(groups => {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify(groups))
  })
})

router.post('/api/join', (req, res, next) => {
  models.grouped_users.findOrCreate({
    where: {
      [Op.and]: [
        { UserId: req.body.userId },
        { GroupId: req.body.groupId }
      ]
    },
    defaults: {
      GroupId: req.body.groupId,
      UserId: req.body.userId,
      MemberShip: 'member'
    }
  }).spread((result, created) => {
    if (created) {
      models.groups.findAll({
        include: [
          {
            model: models.users,
            attributes: ['UserId', 'UserName']
          },
          {
            model: models.posts,
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
          }
        ]
      }).then(groups => {
        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify({result: true, data: groups}))
      })
    } else {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify({ message: 'you are already in this group' }))
    }
  })
})

module.exports = router