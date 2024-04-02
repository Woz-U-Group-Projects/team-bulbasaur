'use strict';

const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];

const associations = require('./rel/associations');
const db = {};


const usermodel = require('./user');
const relationshipModel = require('./relationship');
const groupModel = require('./group');
const membershipModel = require('./membership');
const postModel = require('./post');
const commentModel = require('./comment');

/** @type {Sequelize} */
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.user = usermodel(sequelize, Sequelize.DataTypes);
db.relationship = relationshipModel(sequelize, Sequelize.DataTypes);
db.group = groupModel(sequelize, Sequelize.DataTypes);
db.membership = membershipModel(sequelize, Sequelize.DataTypes);
db.post = postModel(sequelize, Sequelize.DataTypes);
db.comment = commentModel(sequelize, Sequelize.DataTypes);

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

associations(db)

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
