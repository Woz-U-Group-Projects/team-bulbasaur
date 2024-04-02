//Routers
const router = require("express").Router();
const commentsRouter = require("./comments");
// Database Controllers
const PostController = require("../controllers/Postcontroller");

// router.all();

router.route('/')
  .get(PostController.getPublicPosts)
  .post(PostController.createPost);

router.route('/:postId')
  .put(PostController.editPostBody)
  .delete(PostController.deletePost)

router.use("/comments", commentsRouter);

module.exports = router;
