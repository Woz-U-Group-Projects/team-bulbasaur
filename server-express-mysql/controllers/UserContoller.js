// Dependencies
const Op = require('sequelize').Op;
// Errors
const { UsersNotFound } = require('../errors/DataBaseErrors');
// Services
const authService = require('../services/auth');
// Associations
const { userAssociations } = require('./associationObjs');

/** 
 * @typedef {Object} user
 * @property {number} userId
 * @property {string} fullName
 * @property {string} email
 * @property {string} userName
 * @property {string} password
 * @property {number} admin
 */

module.exports = class UserController {
  static #model = require('../models/index').user;
  static get model() { return UserController.#model; }

  // Private Methods
  /**
   * 
   * @param {*} filters 
   * @param {*} populate 
   * @returns 
   */
  static async #getAll(filters = {}, populate = false) {
    return await UserController.#model.findAll({
      where: filters,
      include: populate ? userAssociations : [userAssociations[userAssociations.length - 1]]
    });
  }

  /**
   * 
   * @param {*} filters 
   * @param {*} populate 
   * @returns 
   */
  static async #getOne(filters = {}, populate = false) {
    return await UserController.#model.findOne({
      where: filters,
      include: populate ? userAssociations : []
    });
  }

  /**
   * 
   * @param {*} id 
   * @param {*} populate 
   * @returns 
   */
  static async #getOneById(id, populate = false) {
    return await UserController.#model.findByPk(id,
      populate ? { include: userAssociations } : {}
    );
  }

  // MiddleWares
  /**
   * 
   * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
   * @param {import("express").Response<any, Record<string, any>, number>} res 
   * @param {import("express").NextFunction} next 
   */
  static async getUsers(req, res, next) {
    if (!req.token) next({ error: new Error('Unauthorized') });
    try {
      const users = await UserController.#getAll();

      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify({ users: users.map(user => ({ ...user.dataValues, password: undefined })) }));
    } catch (error) {
      next({ error });
    }
  }

  /**
   * 
   * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
   * @param {import("express").Response<any, Record<string, any>, number>} res 
   * @param {import("express").NextFunction} next 
   */
  static async getUserById(req, res, next) {
    if (!req.token) next({ error: new Error('Unauthorized') });
    try {
      const user = await UserController.#getOneById(req.params.userId, true);
      if (!user) throw new UsersNotFound();

      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify({ user: { ...user.dataValues, password: undefined } }));
    } catch (error) {
      next({ error });
    }
  }

  /**
   * 
   * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
   * @param {import("express").Response<any, Record<string, any>, number>} res 
   * @param {import("express").NextFunction} next 
   */
  static async verifyUser(req, res, next) {
    if (!req.token) next({ error: new Error("Token not found") });
    try {
      const user = await UserController.#getOneById(req.token.userId, true);
      if (!user) throw new UsersNotFound();
      if (user.password !== req.token.password) throw new Error('Invalid Token');

      delete user.dataValues.password;

      res.header('Content-Type', 'application/json');
      res.status(200).send({ user });
    } catch (error) {
      next({ error });
    }
  }

  /**
   * 
   * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
   * @param {import("express").Response<any, Record<string, any>, number>} res 
   * @param {import("express").NextFunction} next 
   */
  static async signupUser(req, res, next) {
    try {
      const [user, created] = await UserController.#model.findOrCreate({
        where: { email: req.body.user.email },
        defaults: { ...req.body.user, password: authService.hashPassword(req.body.user.password) },
      });
      if (!created) throw new Error('Email already in use');

      next({ user });
    } catch (error) {
      next({ error });
    }
  }

  /**
   * 
   * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
   * @param {import("express").Response<any, Record<string, any>, number>} res 
   * @param {import("express").NextFunction} next 
   */
  static async loginUser(req, res, next) {
    try {
      const { email, password } = req.body.user;
      const user = await UserController.#getOne({ email }, true);
      if (!user) throw new UsersNotFound();

      if (!authService.comparePassword(password, user.password)) throw new Error('Invalid Password');

      next({ user });
    } catch (error) {
      next({ error });
    }
  }
}


// models.users.findAll({
//   where: {
//     UserId: {
//       [Op.gt]: 1
//     }
//   },
//   attributes: ['UserId', 'FullName', 'UserName', 'Email', 'Admin'],
//   include: [
//     {
//       model: models.groups
//     },
//     {
//       model: models.posts,
//       include: [
//         {
//           model: models.users,
//           attributes: ['UserName']
//         },
//         {
//           model: models.comments,
//           include: {
//             model: models.users,
//             attributes: ['UserName']
//           }
//         }
//       ]
//     }
//   ],
// }).then(users => {
//   res.header('Content-Type', 'application/json')
//   res.send(JSON.stringify(users))
// });

// models.users.findOne({
//   where: { UserId: user.UserId },
//   include: [
//     {
//       model: models.users,
//       as: 'Friends'
//     },
//     {
//       model: models.users,
//       as: 'Requests'
//     },
//     {
//       model: models.groups
//     },
//     {
//       model: models.posts,
//       include: [
//         {
//           model: models.users,
//           attributes: ['UserName']
//         },
//         {
//           model: models.comments,
//           include: {
//             model: models.users,
//             attributes: ['UserName']
//           }
//         }
//       ]
//     }
//   ],
// })