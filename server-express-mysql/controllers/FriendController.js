/**
 * @typedef {Object} relationships
 * @property {number} registerId
 * @property {number} addresseeId
 * @property {string} status
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

module.exports = class FriendController {
  static #model = require('../models/index').relationship;

  static async #getAll(filters = {}) {
    return await FriendController.#model.findAll({ where: filters });
  }

  static async #getOne(filters = {}) {
    return await FriendController.#model.findOne({ where: filters });
  }

  static async #createOne(relation) {
    return await FriendController.#model.create(relation);
  }

  static async #createMany(relations) {
    return await FriendController.#model.bulkCreate(relations);
  }

  static async #updateOne(relation, filters) {
    return await FriendController.#model.update(relation, { where: filters });
  }

  static async #deleteOne(filters) {
    return await FriendController.#model.destroy({ where: filters });
  }



  /**
   * 
   * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
   * @param {import("express").Response<any, Record<string, any>, number>} res 
   * @param {import("express").NextFunction} next 
   */
  static async addFriend(req, res, next) {
    if (!req.token) next({ error: new Error("Token not found") });
    try {
      const relationships = await FriendController.#createMany([
        { registerId: req.token.userId, addresseeId: req.params.addresseeId, status: 'requested' },
        { registerId: req.params.addresseeId, addresseeId: req.token.userId, status: 'pending' }
      ]);;
      if (!relationships || relationships.length > 2) throw new Error('Friend request not sent');
      res.status(200).send();
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
  static async acceptFriendship(req, res, next) {
    if (!req.token) next({ error: new Error("Token not found") });
    try {
      const friend = await FriendController.#updateOne(
        { status: 'friends' },
        { registerId: req.token.userId, addresseeId: req.params.addresseeId }
      )
      const accept = await FriendController.#updateOne(
        { status: 'accepted' },
        { registerId: req.params.addresseeId, addresseeId: req.token.userId }
      )

      if (!friend || !accept) throw new Error('Friend request not accepted');
      res.status(200).send();
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
  static async confirmAcceptance(req, res, next) {
    if (!req.token) next({ error: new Error("Token not found") });
    try {
      const friend = await FriendController.#updateOne(
        { status: 'friends', active: 0 },
        { registerId: req.token.userId, addresseeId: req.params.addresseeId }
      )
      const accept = await FriendController.#updateOne(
        { active: 0 },
        { registerId: req.params.addresseeId, addresseeId: req.token.userId }
      )

      if (!friend || !accept) throw new Error('Friend request not accepted');
      res.status(200).send();
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
  static async rejectFriendship(req, res, next) {
    if (!req.token) next({ error: new Error("Token not found") });
    try {
      const friend = await FriendController.#updateOne(
        { status: 'denied' },
        { registerId: req.token.userId, addresseeId: req.params.addresseeId }
      )
      const accept = await FriendController.#updateOne(
        { status: 'rejected' },
        { registerId: req.params.addresseeId, addresseeId: req.token.userId }
      )

      if (!friend || !accept) throw new Error('Friend request not rejected');
      res.status(200).send();
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
  static async confirmRejected(req, res, next) {
    if (!req.token) next({ error: new Error("Token not found") });
    try {
      const friend = await FriendController.#updateOne(
        { status: 'denied', active: 0 },
        { registerId: req.token.userId, addresseeId: req.params.addresseeId }
      )
      const accept = await FriendController.#updateOne(
        { status: 'denied', active: 0 },
        { registerId: req.params.addresseeId, addresseeId: req.token.userId }
      )

      if (!friend || !accept) throw new Error('Friend request not rejected');
      res.status(200).send();
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
  static async deleteFriendship(req, res, next) {
    if (!req.token) next({ error: new Error("Token not found") });
    try {
      const friend = await FriendController.#deleteOne(
        { registerId: req.token.userId, addresseeId: req.params.addresseeId }
      )
      const accept = await FriendController.#deleteOne(
        { registerId: req.params.addresseeId, addresseeId: req.token.userId }
      )

      if (!friend || !accept) throw new Error('Friend request not rejected');
      res.status(200).send();
    } catch (error) {
      next({ error });
    }
  }
}