var express = require("express");
var router = express.Router();
var models = require("../models");
var Sequelize = require('sequelize');
var Op = Sequelize.Op;
var authService = require("../services/auth")

//inUse
router.get('/api', (req, res, next) => {
  models.posts.findAll({
    where: {[Op.and]: [
      { Visible: 0 },
      { GroupId: 0 }
    ]},
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
    res.send(JSON.stringify(posts))
  })
})

//inUse
router.post('/api', (req, res, next) => {
  let token = req.cookies.jwt
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user) {
        models.posts.findOrCreate({
          where: { PostId: 0 },
          defaults: {
            UserId: user.UserId,
            GroupId: req.body.groupId === undefined ? 0 : req.body.groupId,
            PostHead: req.body.title,
            PostBody: req.body.body,
            Likes: 0,
            Dislikes: 0,
            Visible: req.body.isHidden === false ? 0 : 1
          }
        }).spread((result, created) => {
          if (created) {
            models.posts.findAll({
              where: {[Op.and]: [
                { Visible: 0 },
                { GroupId: 0 }
              ]},
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

//inUse
router.put('/api/:type/:postId', (req, res, next) => {
  if (req.params.type == 'likes') {
    models.posts.update(
      { Likes: parseInt(req.body.likes) + 1 },
      { where: { PostId: parseInt(req.params.postId) } }
    ).then(() => {
      return models.posts.findAll({
        where: {[Op.and]: [
          { Visible: 0 },
          { GroupId: 0 }
        ]},
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
    }).then(post => {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify(post))
    })
  }
  if (req.params.type == 'dislikes') {
    models.posts.update(
      { Dislikes: parseInt(req.body.dislikes) + 1 },
      { where: { PostId: parseInt(req.params.postId) } }
    ).then(() => {
      return models.posts.findAll({
        where: {[Op.and]: [
          { Visible: 0 },
          { GroupId: 0 }
        ]},
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
    }).then(post => {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify(post))
    })
  }
})

//inUse
router.put('/api/edit', (req, res, next) => {
  console.log('start')
  let token = req.cookies.jwt
  if (token) {
    authService.verifyUser(token).then(user => {
      models.posts.findOne({
        where: { PostId: parseInt(req.body.postId) }
      }).then(post => {
        if (parseInt(user.UserId) === parseInt(post.UserId)) {
          models.posts.update(
            { PostBody: req.body.body },
            { where: { PostId: parseInt(req.body.postId) } }
          ).then(() => {
            return models.posts.findAll({
              where: {[Op.and]: [
                { Visible: 0 },
                { GroupId: 0 }
              ]},
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
        } else {
          res.header('Content-Type', 'application/json')
          res.send(JSON.stringify({ ststus: false, message: 'Something Went Wrong', data: null }))
        }
      })
    })
  } else {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify({ ststus: false, message: 'Must Be Logged In', data: null }))
  }
})

//inUse
router.delete('/api/:postId', (req, res, next) => {
  let token = req.cookies.jwt
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user) {
        models.posts.findOne({ where: { PostId: req.params.postId } }).then(post => {
          if (user.UserId == post.UserId || user.Admin == 1) {
            models.posts.destroy({ where: { PostId: req.params.postId } }).then(result => {
              if (result) {
                models.posts.findAll({
                  where: {[Op.and]: [
                    { Visible: 0 },
                    { GroupId: 0 }
                  ]},
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
                  res.send(JSON.stringify({ status: true, message: 'Post Was Deleted Successfully', data: posts }))
                })
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

//inUse
router.get('/api/:id', (req, res, next) => {
  let token = req.cookies.jwt
  if (token) {
    authService.verifyUser(token).then(user => {
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
        }).then(posts => {
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
        }).then(posts => {
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
    }).then(posts => {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify(posts))
    })
  }
})

//inUse
router.post('/api/:id', (req, res, next) => {
  let token = req.cookies.jwt
  if (token) {
    authService.verifyUser(token).then(user => {
      if (user) {
        models.posts.findOrCreate({
          where: { PostId: 0 },
          defaults: {
            UserId: user.UserId,
            GroupId: req.body.groupId === undefined ? 0 : req.body.groupId,
            PostHead: req.body.title,
            PostBody: req.body.body,
            Likes: 0,
            Dislikes: 0,
            Visible: req.body.isHidden === false ? 0 : 1
          }
        }).spread((result, created) => {
          if (created) {
            models.posts.findAll({
              where: { UserId: parseInt(req.body.userId)},
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

//inUse
router.put('/api/:id', (req, res, next) => {
  let token = req.cookies.jwt
  if(token){
    authService.verifyUser(token).then( user => {
      if(parseInt(user.UserId) === parseInt(req.body.userId)){
        models.posts.update(
          { PostBody: req.body.body},
          { where: { PostId: parseInt(req.body.postId)} }
        ).then( () => {
          return models.posts.findAll({
            where: { UserId: parseInt(user.UserId) },
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
            res.send(JSON.stringify({ status: true, message: 'edit successful', data: posts }))
          })
        })
      } else {
        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify({ status: false, message: 'Something Went wrong', data: null }))
      }
    })
  } else {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify({ status: false, message: 'not logged in', data: null }))
  }
})

//inUse
router.put('/api/user/profile/votes', (req, res, next) => {
  if (req.body.type == 'likes') {
    console.log('startOne')
    models.posts.update(
      { Likes: parseInt(req.body.likes) + 1 },
      { where: { PostId: parseInt(req.body.postId) } }
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
    }).then(post => {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify(post))
    })
  }
  if (req.body.type == 'dislikes') {
    console.log('startTwo')
    models.posts.update(
      { Dislikes: parseInt(req.body.dislikes) + 1 },
      { where: { PostId: parseInt(req.body.postId) } }
    ).then(() => {
      return models.posts.findAll({
        where: { UserId: parseInt(req.body.userId) },
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
    }).then(post => {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify(post))
    })
  }
})

//inUse
router.delete('/api/:postId/:userId', (req, res, next) => {
  let token = req.cookies.jwt
  if(token){
    authService.verifyUser(token).then( user => {
      if(parseInt(user.UserId) === parseInt(req.params.userId || user.Admin === 1)){
        models.posts.destroy({
          where: { PostId: req.params.postId }
        }).then(() => {
          return models.posts.findAll({ 
            where: { UserId: req.params.userId },
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
          res.send(JSON.stringify({ status: true, message: 'the post was deleted', data: posts }))
        })
      } else {
        res.header('Content-Type', 'application/json')
        res.send(JSON.stringify({ status: false, message: 'something went wrong', data: null }))
      }
    })
  } else {
    res.header('Content-Type', 'application/json')
    res.send(JSON.stringify({ status: false, message: 'not logged in', data: null }))
  }
})

//inUse
router.get('/api/groupPost/:groupId', (req, res, next) => {
  models.posts.findAll({ 
    where: { GroupId: req.params.groupId },
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
    res.send(JSON.stringify(posts))
  })
})

router.post('/api/groupPosts/create', (req, res, next) => {
  models.posts.findOrCreate({
    where: { postId: 0 },
    defaults: {
      GroupId: req.body.groupId,
      UserId: req.body.userId,
      PostHead: req.body.title,
      PostBody: req.body.body,
      Likes: 0,
      Dislikes: 0,
      Visible: req.body.isHidden === false ? 0 : 1
    }
  }).spread((result, created) => {
    if(created){
      models.posts.findAll({
        where: { GroupId: req.body.groupId },
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
        res.send(JSON.stringify(posts))
      })
    } else {
      res.header('Content-Type', 'application/json')
      res.send(JSON.stringify({message: 'something went wrong'}))
    }
  })
})

router.delete('/api/groupPost/:groupId/:postId', (req, res, next) => {
  let token = req.cookies.jwt
  if(token){
    authService.verifyUser(token).then(user => {
      models.grouped_users.findOne({
        where: { [Op.and]: [
          { GroupId: parseInt(req.params.groupId) },
          { UserId: parseInt(user.UserId) }
        ]}
      }).then(relation => {
        models.posts.findOne({
          where: { PostId: parseInt(req.params.postId)}
        }).then(post => {
          if(user.Admin === 1||post.UserId===user.UserId||relation.MemberShip==='Owner'){
            models.posts.destroy({
              where: {PostId: parseInt(req.params.postId)}
            }).then(result => {
              if(result){
                models.posts.findAll({
                  where: { GroupId: parseInt(req.params.groupId)},
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
                  res.send(JSON.stringify({message:'successful', data:posts}))
                })
              }
            })
          }
        })
      })
    })
  } else {

  }
})

router.put('/api/groupPost/edit/post', (req, res, next) => {
  let token = req.cookies.jwt
  if(token){
    authService.verifyUser(token).then(user => {
      models.posts.findOne({
        where: { PostId: parseInt(req.body.postId) }
      }).then(post => {
        if(parseInt(post.UserId) === parseInt(user.UserId)){
          models.posts.update(
            { PostBody: req.body.body },
            { where: { PostId: parseInt(req.body.postId) }}
          ).then(() => {
            return models.posts.findAll({
              where: { GroupId: parseInt(req.body.groupId) },
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
            res.send(JSON.stringify({message:'successful', data:posts}))
          })
        }
      })
    })
  }
})

router.put('/api/groupPost/edit/votes', (req, res, next) => {
  if(req.body.type==='likes'){
    models.posts.update({ Likes: parseInt(req.body.likes + 1) },{
      where: { PostId: parseInt(req.body.postId) }
    }).then(() => {
      return models.posts.findAll({
        where: { GroupId: parseInt(req.body.groupId) },
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
      res.send(JSON.stringify({message:'successful', data:posts}))
    })
  }
  if(req.body.type==='dislikes'){
    models.posts.update({ Dislikes: parseInt(req.body.dislikes + 1) },{
      where: { PostId: parseInt(req.body.postId) }
    }).then(() => {
      return models.posts.findAll({
        where: { GroupId: parseInt(req.body.groupId) },
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
      res.send(JSON.stringify({message:'successful', data:posts}))
    })
  }
})

module.exports = router