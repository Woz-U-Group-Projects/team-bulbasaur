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
      MemberShip: 'Member'
    }
  }).spread((result, created) => {
    if (created) {
      models.groups.findOne({
        where: { GroupId: req.body.groupId },
        include: [
          {
            model: models.users,
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

router.delete('/api/leave/:groupId/:userId', (req, res, next) => {
  let token = req.cookies.jwt
  if (token) {
    authService.verifyUser(token).then(user => {
      if (parseInt(user.UserId) === parseInt(req.params.userId)) {
        models.grouped_users.destroy({
          where: {
            [Op.and]: [
              { GroupId: parseInt(req.params.groupId) },
              { UserId: parseInt(req.params.userId) }
            ]
          }
        }).then(result => {
          if (result) {
            models.groups.findOne({
              where: { GroupId: parseInt(req.params.groupId) },
              include: {
                model: models.users
              }
            }).then(group => {
              res.header('Content-Type', 'application/json')
              res.send(JSON.stringify(group))
            })
          } else {
            res.header('Content-Type', 'application/json')
            res.send(JSON.stringify({ message: 'could not retrieve data' }))
          }
        })
      } else {
        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify({ message: 'something went wrong' }))
      }
    })
  } else {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify({ message: 'You must be logged in' }))
  }
})

router.put('/api/discription', (req, res, next) => {
  let token = req.cookies.jwt
  if (token) {
    authService.verifyUser(token).then(user => {
      models.grouped_users.findOne({
        where: { [Op.and]: [
          { GroupId: parseInt(req.body.groupId) },
          { UserId: parseInt(user.UserId)}
        ]}
      }).then(result => {
        if (result.MemberShip === 'Owner') {
          models.groups.update(
            { Discription: req.body.discription },
            { where: { GroupId: parseInt(req.body.groupId) } }
          ).then(edited => {
            if (edited) {
              models.groups.findOne({
                where: { GroupId: parseInt(req.body.groupId) },
                include: {
                  model: models.users
                }
              }).then(group => {
                res.header('Content-Type', 'application/json')
                res.send(JSON.stringify(group))
              })
            } else {
              res.header('Content-Type', 'application/json')
              res.send(JSON.stringify({ message: 'edit was unsuccessful' }))
            }
          })
        } else {
          res.header('Content-Type', 'application/json')
          res.send(JSON.stringify({ message: 'you cannot edit this' }))
        }
      })
    })
  } else {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify({ message: 'you must be logged in' }))
  }
})

router.delete('/api/disband/:groupId', (req, res, next) => {
  let token = req.cookies.jwt
  if (token) {
    authService.verifyUser(token).then(user => {
      models.grouped_users.findOne({
        where: {
          [Op.and]: [
            { GroupId: parseInt(req.params.groupId) },
            { UserId: user.UserId }
          ]
        }
      }).then(relation => {
        if (relation.MemberShip === 'Owner') {
          models.groups.destroy({
            where: { GroupId: parseInt(req.params.groupId) }
          }).then(success => {
            if (success) {
              models.grouped_users.destroy({
                where: { GroupId: parseInt(req.params.groupId) }
              }).then(deleted => {
                if (deleted) {
                  models.posts.destroy({
                    where: { GroupId: parseInt(req.params.groupId) }
                  }).then(result => {
                    if (result) {
                      res.header('Content-Type', 'application/json')
                      res.send(JSON.stringify({ status: true }))
                    }
                  })
                } else {
                  res.header('Content-Type', 'application/json')
                  res.send(JSON.stringify({ message: 'something went wrong' }))
                }
              })
            } else {
              res.header('Content-Type', 'application/json')
              res.send(JSON.stringify({ message: 'group was not deleted' }))
            }
          })
        } else {
          res.header('Content-Type', 'application/json')
          res.send(JSON.stringify({ message: 'You must be the owner' }))
        }
      })
    })
  } else {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify({ message: 'You must be logged in' }))
  }
})

router.put('/api/groupPage/votes', (req, res, next) => {
  if (req.body.type === 'likes') {
    models.groups.update(
      { Likes: parseInt(req.body.likes + 1) },
      { where: { GroupId: parseInt(req.body.groupId) } }
    ).then(() => {
      return models.groups.findOne({
        where: { GroupId: parseInt(req.body.groupId) },
        include: {
          model: models.users
        }
      })
    }).then(group => {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify(group))
    })
  }
  if (req.body.type === 'dislikes') {
    models.groups.update(
      { Dislikes: parseInt(req.body.dislikes + 1) },
      { where: { GroupId: parseInt(req.body.groupId) } }
    ).then(() => {
      return models.groups.findOne({
        where: { GroupId: parseInt(req.body.groupId) },
        include: {
          model: models.users
        }
      })
    }).then(group => {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify(group))
    })
  }
})

router.delete('/api/remove/:groupId/:userId', (req, res, next) => {
  let token = req.cookies.jwt
  if(token){
    authService.verifyUser(token).then(user => {
      models.grouped_users.findOne({
        where: {[Op.and]: [
          { GroupId: parseInt(req.params.groupId) },
          { UserId: parseInt(user.UserId) }
        ]}
      }).then(relation => {
        if(relation.MemberShip === 'Owner'){
          models.grouped_users.destroy({
            where: {[Op.and]: [
              { GroupId: parseInt(req.params.groupId) },
              { UserId: parseInt(req.params.userId) }
            ]}
          }).then(deleted => {
            if(deleted){
              models.groups.findOne({
                where: { GroupId: parseInt(req.params.groupId) },
                include: {
                  model: models.users
                }
              }).then(group => {
                res.header('Content-Type', 'application/json')
                res.send(JSON.stringify({status: true, message: '', data: group}))
              })
            } else {
              res.header('Content-Type', 'application/json')
              res.send(JSON.stringify({status: false, message: '', data: undefined}))
            }
          })
        } else {
          res.header('Content-Type', 'application/json')
          res.send(JSON.stringify({status: false, message: '', data: undefined}))
        }
      })
    })
  } else {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify({status: false, message: '', data: undefined}))
  }
})

router.put('/api/groups/groupAdmin', (req, res, next) => {
  let token = req.cookies.jwt
  if(token){
    authService.verifyUser(token).then(user => {
      models.grouped_users.findOne({
        where: {[Op.and]: [
          { GroupId: parseInt(req.body.groupId) },
          { UserId: parseInt(user.UserId) }
        ]}
      }).then(relation => {
        if(relation.MemberShip === 'Owner'){
          models.grouped_users.update({
            MemberShip: 'Admin'
          },{
            where: {[Op.and]: [
              { GroupId: parseInt(req.body.groupId) },
              { UserId: parseInt(req.body.userId) }
            ]}
          }).then(() => {
            return models.groups.findOne({
              where: { GroupId: parseInt(req.body.groupId) },
              include: {
                model: models.users
              }
            })
          }).then(group => {
            res.header('Content-Type', 'application/json')
            res.send(JSON.stringify({status: true, message: '', data: group}))
          })
        } else {
          res.header('Content-Type', 'application/json')
          res.send(JSON.stringify({status: false, message: '', data: undefined}))
        }
      })
    })
  } else {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify({status: false, message: '', data: undefined}))
  }
})

router.put('/api/groups/remove/admin', (req, res, next) => {
  let token = req.cookies.jwt
  if(token){
    authService.verifyUser(token).then(user => {
      models.grouped_users.findOne({
        where: {[Op.and]: [
          { GroupId: parseInt(req.body.groupId) },
          { UserId: parseInt(user.UserId) }
        ]}
      }).then(relation => {
        if(relation.MemberShip === 'Owner'){
          models.grouped_users.update({
            MemberShip: 'Member'
          },{
            where: {[Op.and]: [
              { GroupId: parseInt(req.body.groupId) },
              { UserId: parseInt(req.body.userId) }
            ]}
          }).then(() => {
            return models.groups.findOne({
              where: { GroupId: parseInt(req.body.groupId) },
              include: {
                model: models.users
              }
            })
          }).then(group => {
            res.header('Content-Type', 'application/json')
            res.send(JSON.stringify({status: true, message: '', data: group}))
          })
        } else {
          res.header('Content-Type', 'application/json')
          res.send(JSON.stringify({status: false, message: '', data: undefined}))
        }
      })
    })
  } else {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify({status: false, message: '', data: undefined}))
  }
})

router.put('/api/groups/make/owner', (req, res, next) => {
  let token = req.cookies.jwt
  if(token){
    authService.verifyUser(token).then(user => {
      models.grouped_users.findOne({
        where: {[Op.and]: [
          { GroupId: parseInt(req.body.groupId) },
          { UserId: parseInt(user.UserId) }
        ]}
      }).then(relation => {
        if(relation.MemberShip === 'Owner'){
          models.grouped_users.update({
            MemberShip: 'Owner'
          },{
            where: {[Op.and]: [
              { GroupId: parseInt(req.body.groupId) },
              { UserId: parseInt(req.body.userId) }
            ]}
          }).then(() => {
            models.grouped_users.update({
              MemberShip: 'Admin'
            },{
              where: {[Op.and]: [
                { GroupId: parseInt(req.body.groupId) },
                { UserId: parseInt(user.UserId) }
              ]}
            }).then(() => {
              return models.groups.findOne({
                where: { GroupId: parseInt(req.body.groupId) },
                include: {
                  model: models.users
                }
              })
            }).then(group => {
              res.header('Content-Type', 'application/json')
              res.send(JSON.stringify({status: true, message: '', data: group}))
            })
          })
        } else {
          res.header('Content-Type', 'application/json')
          res.send(JSON.stringify({status: false, message: '', data: undefined}))
        }
      })
    })
  } else {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify({status: false, message: '', data: undefined}))
  }
})

module.exports = router