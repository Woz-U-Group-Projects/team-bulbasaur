// routers for the API
const router = require("express").Router();
const userRouter = require("./users");
const groupRouter = require("./groups");
const postRouter = require("./posts");

// DB Controllers
const UserController = require("../controllers/UserContoller");
// middleware
const middleware = require("../middleware");

router.post('/signup', UserController.signupUser, middleware.signToken);

router.post('/login', UserController.loginUser, middleware.signToken);

router.get('/verify', middleware.decodeToken, UserController.verifyUser);

router.get('/logout', (req, res, next) => {
  res.cookie('jwt', "", { expires: new Date(0) })
  res.status(200).end("Logged Out");
});

router.use("/users", middleware.decodeToken, userRouter);
router.use("/groups", middleware.decodeToken, groupRouter);
router.use("/posts", middleware.decodeToken, postRouter);

module.exports = router;