const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

/**
 * @typedef {Object} tokenData
 * @property {number} userId
 * @property {string} email
 * @property {string} password
 * @property {number} admin
 */

var authService = {
  /**
   * creates a JSON Web Token using the givin data from user object
   * @param {tokenData} user 
   * @returns {string} JSON Web Token
   */
  signUser: (user) => (jwt.sign({ ...user }, 'secretKey', { expiresIn: '4h' })),
  /**
   * verifies the given token using secret key and returns the decoded token
   * @param {string} token 
   * @returns {(string | import('jsonwebtoken').JwtPayload)} JSON Web Token | Decoded Token (jwt.JwtPayload)
   */
  verifyUser: (token) => (jwt.verify(token, 'secretKey')),
  /**
   * creates a hashed password using bcrypt
   * @param {string} plainTextPassword 
   * @returns {string} Hashed Password
   */
  hashPassword: (plainTextPassword) => (bcrypt.hashSync(plainTextPassword, bcrypt.genSaltSync(10))),
  /**
   * compares the given plain text password with the saved hashed password
   * @param {string} plainTextPassword 
   * @param {string} hashedPassowrd 
   * @returns {boolean} if given password matches the saved hashed password
   */
  comparePassword: (plainTextPassword, hashedPassowrd) => (bcrypt.compareSync(plainTextPassword, hashedPassowrd))
}

module.exports = authService