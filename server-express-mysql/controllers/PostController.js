/**
 * @typedef {import('../../types').PostData} postData
 * @typedef {import('../../types').PostObject} post
 */

const { postAssociations } = require('./associationObjs');

module.exports = class PostController {
  static #model = require('../models/index').post;

  /**
   * 
   * @param {*} id 
   * @param {*} populate 
   * @returns 
   */
  static async #getPostById(id, populate = false) {
    return await PostController.#model.findByPk(id,
      populate ? { include: postAssociations } : {}
    );
  }

  static async #getAllPosts(filters = {}, populate = false) {
    return await PostController.#model.findAll({
      where: filters,
      include: populate ? postAssociations : []
    });
  }

  /**
   * 
   * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
   * @param {import("express").Response<any, Record<string, any>, number>} res 
   * @param {import("express").NextFunction} next 
   */
  static async getPublicPosts(req, res, next) {
    if (!req.token) next({ error: new Error("Token not found") });
    try {
      const posts = await PostController.#getAllPosts({ private: false }, true);
      res.hasHeader('Content-Type', 'application/json');
      res.send(JSON.stringify({ posts }));
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
  static async createPost(req, res, next) {
    if (!req.token) next({ error: new Error("Token not found") });
    try {
      const { groupId, title, body, private: isPrivate } = req.body;
      const post = await PostController.#model.create({ authorId: req.token.userId, groupId, title, body, private: isPrivate });
      const author = await post.getAuthor();
      const comments = await post.getComments();

      if (!post) throw new Error('Post not created');

      res.status(201).send({ post: { ...post.dataValues, author, comments } });
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
  static async editPostBody(req, res, next) {
    if (!req.token) next({ error: new Error("Token not found") });
    try {
      const post = await PostController.#getPostById(req.params.postId, true);
      if (!post) throw new Error('Post not found');
      if (post.authorId !== token.userId) throw new Error('Unauthorized');

      const { body } = req.body;
      post.body = body;
      post.edited = true;
      await post.save();

      res.status(200).send({ post });
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
  static async deletePost(req, res, next) {
    if (!req.token) next({ error: new Error("Token not found") });
    try {
      const post = await PostController.#getPostById(req.params.postId);
      if (!post) throw new Error('Post not found');
      if (post.authorId !== token.userId) throw new Error('Unauthorized');

      await post.destroy();
      res.status(200).end();
    } catch (error) {
      next({ error });
    }
  }
}