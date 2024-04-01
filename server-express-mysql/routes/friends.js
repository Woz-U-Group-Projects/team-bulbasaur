//Routers
const router = require("express").Router();
// Database Controllers
const FriendController = require("../controllers/FriendController");

router.get('/', (req, res) => {
  res.send("Welcome to the API");
});

router.get('/add/:addresseeId', FriendController.addFriend);

router.get('/accept/:addresseeId', FriendController.acceptFriendship);

router.get('/confirm/accepted/:addresseeId', FriendController.confirmAcceptance);

router.get('/reject/:addresseeId', FriendController.rejectFriendship);

router.get('/confirm/rejected/:addresseeId', FriendController.confirmRejected);

router.get('/delete/:addresseeId', FriendController.deleteFriendship);

module.exports = router;
