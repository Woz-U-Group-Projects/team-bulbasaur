//Routers
const router = require("express").Router();
const friendsRouter = require("./friends");
// Database Controllers
const UserController = require("../controllers/UserContoller");

router.route('/').get(UserController.getUsers);

router.route('/:userId').get(UserController.getUserById);

router.use('/friends', friendsRouter);

module.exports = router;
