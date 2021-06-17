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


router.get('/api/groups/:groupId', (req, res, next) => {
  models.groups.findOne({
    where: { GroupId: req.params.groupId },
    include: {
      model: models.users
    }
  }).then(groups => {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify(groups))
  })
})


router.post('/api/create', (req, res, next) => {
  models.groups.findOrCreate({
    where: { GroupId: 0 },
    defaults: {
      GroupName: req.body.groupName,
      Discription: req.body.discription,
      Likes: 0,
      Dislikes: 0,
      IsPrivate: true ? 0 : 1
    }
  }).spread((result, created) => {
    if (created) {
      models.grouped_users.findOrCreate({
        where: {
          [Op.and]: [
            { UserId: parseInt(req.body.userId) },
            { GroupId: parseInt(result.GroupId) }
          ]
        },
        defaults: {
          GroupId: result.GroupId,
          UserId: req.body.userId,
          MemberShip: 'Owner'
        }
      }).spread((result2, created2) => {
        if (created2) {
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
        } else {
          res.header('Content-Type', 'application/json')
          res.send(JSON.stringify({ message: 'something went wrong' }))
        }
      })
    } else {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify({ message: 'something went wrong' }))
    }
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
        res.send(JSON.stringify({ result: true, data: groups }))
      })
    } else {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify({ message: 'you are already in this group' }))
    }
  })
})

module.exports = router