const { signUser, verifyUser } = require("../services/auth");

module.exports = {
  /**
  * 
  * @param {{ error: Error, user: import("../controllers/UserContoller").user }} passedObjs
  * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
  * @param {import("express").Response<any, Record<string, any>, number>} res 
  * @param {import("express").NextFunction} next 
  */
  signToken: ({ error, user }, req, res, next) => {
    if (error) next({ error });
    try {
      const { userId, email, password, admin } = user;
      const token = signUser({ userId, email, password, admin });
      if (!token) throw new Error("Token not created");

      delete user.password;

      res.cookie('jwt', token);
      res.status(200).send({ user });
    } catch (error) {
      next({ error });
    }
  },
  /**
  * 
  * @param {import("express").Request<{}, any, any, qs.ParsedQs, Record<string, any>>} req 
  * @param {import("express").Response<any, Record<string, any>, number>} res 
  * @param {import("express").NextFunction} next 
  */
  decodeToken: (req, res, next) => {
    try {
      const cookie = req.cookies.jwt
      if (!cookie) throw new Error("Token not found");

      const token = verifyUser(cookie);
      if (!token) throw new Error("Invalid Token");

      req.token = token;
      next();
    } catch (error) {
      next({ error });
    }
  }
}