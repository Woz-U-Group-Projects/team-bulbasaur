/**
 * @typedef {Object} group
 * @property {number} groupId
 * @property {string} name
 * @property {string} description
 * @property {number} likes
 * @property {number} dislikes
 * @property {boolean} private
 * @property {Date} createdAt
 * @property {Date} updatedAt
 */

const { groupAssociations } = require('./associationObjs');

module.exports = class GroupController {
  static #model = require('../models/index').group;

  /**
   * 
   * @param {group} group 
   * @returns 
   */
  static #createGroup = async (group) => await this.#model.create(group);

  /**
   * @property {group} [filters]
   * @returns {Promise<group[]>}
   */
  static #getAll = async (filters = {}, populate = false) => await this.#model.findAll({
    where: { ...filters },
    include: populate ? groupAssociations : []
  });

  /**
   * @param {group} filter
   * @returns {Promise<group[]>}
   */
  static #getOne = async (filters = {}, populate = false) => await this.#model.find({
    where: { ...filters },
    include: populate ? groupAssociations : []
  });

  /**
   * @param {number} id 
   * @returns {Promise<group>}
   */
  static #getById = async (id, populate = false) => await this.#model.findByPk(id, {
    include: populate ? groupAssociations : []
  });

  /**
   * 
   * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
   * @param {import("express").Response<any, Record<string, any>, number>} res 
   * @param {import("express").NextFunction} next 
   */
  static async createGroup(req, res, next) {
    if (!req.token) next({ error: new Error("Token not found") });
    try {
      const group = await GroupController.#createGroup({
        ...req.body,
        ownerId: req.token.userId
      });

      const owner = await group.getOwner();
      const admins = await group.getAdmins();
      const members = await group.getMembers();

      if (!group) throw new Error("Group not created");

      res.hasHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ group: { ...group.dataValues, owner, admins, members } }));
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
  static async getAllGroups(req, res, next) {
    if (!req.token) next({ error: new Error("Token not found") });
    try {
      const groups = await GroupController.#getAll({}, true);

      if (!groups) throw new Error("Groups not found");

      res.hasHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ groups }));
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
  static async getGroup(req, res, next) {
    if (!req.token) next({ error: new Error("Token not found") });
    try {
      const group = await GroupController.#getById(req.params.groupId, true);

      if (!group) throw new Error("Group not found");

      res.hasHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ group }));
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
  static async updateGroup(req, res, next) {
    if (!req.token) next({ error: new Error("Token not found") });
    try {
      const group = await GroupController.#getById(req.params.groupId);
      if (group.ownerId !== req.token.userId) throw new Error("Unauthorized");
      
      const updatedGroup = await group.update(req.body);

      if (!updatedGroup) throw new Error("Group not updated");

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
  static async deleteGroup(req, res, next) {
    if (!req.token) next({ error: new Error("Token not found") });
    try {
      const group = await GroupController.#getById(req.params.groupId);
      if (group.ownerId !== req.token.userId) throw new Error("Unauthorized");

      const deletedGroup = await group.destroy();

      if (!deletedGroup) throw new Error("Group not deleted");

      res.status(200).send();
    } catch (error) {
      next({ error });
    }
  }
}