//Routers
const router = require("express").Router();
// Database Controllers
const MembershipController = require("../controllers/MembershipController");

router.get('/', (req, res) => {
  res.send("Welcome to the API");
});

router.post('/join/:groupId', MembershipController.joinGroup);

router.delete('/remove/:groupId/:userId', MembershipController.removeUser);

router.put('/promote/:groupId/:userId', MembershipController.updateRole);

router.put('/demote/:groupId/:userId', MembershipController.updateRole);

router.put('/transfer/:groupId/:userId', MembershipController.transferOwnership);

module.exports = router;
