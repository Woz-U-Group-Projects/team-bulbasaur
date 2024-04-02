module.exports = class CommentController {
  static #model = require('../models/index').comment;

  static async #getCommentById(id, populate = false) { }

  static async #getAllComments(filters = {}, populate = false) { }

  static async getAllComments(req, res, next) {
    if (!req.token) next({ error: new Error("Token not found") });
    try {
      const comments = await CommentController.#model.findAll();
      res.header('Content-Type', 'application/json');
      res.send(JSON.stringify({ comments }));
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
  static async createComment(req, res, next) {
    if (!req.token) next({ error: new Error("Token not found") });
    try {
      const { postId, body } = req.body;
      const comment = await CommentController.#model.create({ postId, authorId: req.token.userId, body });
      const author = await comment.getAuthor();
      res.status(201).send({ comment: { ...comment.dataValues, author } });
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
  static async deleteComment(req, res, next) {
    if (!req.token) next({ error: new Error("Token not found") });
    try {
      const comment = await CommentController.#model.findByPk(req.params.commentId);
      if (!comment) throw new Error('Comment not found');

      if (comment.authorId !== req.token.userId) throw new Error('Unauthorized');
      
      await comment.destroy();
      res.status(200).end();
    } catch (error) {
      next({ error });
    }
  }
}