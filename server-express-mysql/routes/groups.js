//Routers
const router = require("express").Router();
const membershipRouter = require("./membership");
// Database Controllers
const GroupController = require("../controllers/GroupController");

router.route('/')
  .get(GroupController.getAllGroups)
  .post(GroupController.createGroup);

router.route('/:groupId')
.get(GroupController.getGroup)
.put(GroupController.updateGroup)
.delete(GroupController.deleteGroup);

router.use('/membership', membershipRouter);

module.exports = router;