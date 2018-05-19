var express = require('express');
var router = express.Router();
var postsRouter = require('./posts')
var commentsRouter = require('./comments')

router.get('/posts', postsRouter.getPosts)
router.get('/posts/:id', postsRouter.getPost)
router.post('/posts', postsRouter.addPost)
router.put('/posts/:id', postsRouter.updatePost)
router.delete('/posts/:id', postsRouter.deletePost)

router.get('/posts/:id/comments', commentsRouter.getComments)
router.post('/posts/:id/comments', commentsRouter.addComment)
router.put('/posts/:id/comments/:commentId', commentsRouter.updateComment)
router.delete('/posts/:id/comments/:commentId', commentsRouter.deleteComment)

module.exports = router