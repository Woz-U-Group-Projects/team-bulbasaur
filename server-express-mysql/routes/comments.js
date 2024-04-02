//Routers
const router = require("express").Router();
// Database Controllers
const CommentController = require("../controllers/CommentController");

router.route("/").post(CommentController.createComment);

router.route("/:commentId").delete(CommentController.deleteComment);

module.exports = router;
