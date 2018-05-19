const { sanitizeBody } = require('express-validator/filter');
const { body,validationResult } = require('express-validator/check');

exports.getPosts = (req, res) => {
    res.status(200)
    res.send(req.store.posts)
}

exports.getPost = (req, res) => {
    if(req.params.id && req.store.posts[req.params.id] == undefined){
        return res.status(404).json({ errors: 'Post with id:'+req.params.id+' does not exists.' });
    }
    res.status(200).json(req.store.posts[req.params.id])
}

exports.addPost = [
    body('name', 'Name required').isLength({ min: 1 }).trim().not().isEmpty(),
    body('url', 'URL required').isLength({ min: 1 }).trim().isURL().not().isEmpty(),
    body('text', 'Text required').trim(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        let newPost = {}
        newPost.name = req.body.name
        newPost.url = req.body.url
        newPost.text = req.body.text
        newPost.comments = []
        let id = req.store.posts.length
        req.store.posts.push(newPost)
        res.status(201).send({postId: id})
    }
]

exports.updatePost = [
    body('name', 'Name required').isLength({ min: 1 }).trim().not().isEmpty(),
    body('url', 'URL required').isLength({ min: 1 }).trim().isURL().not().isEmpty(),
    body('text', 'Text required').trim(),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        if(req.params.id && req.store.posts[req.params.id] == undefined){
            return res.status(404).json({ errors: 'Post with id:'+req.params.id+' does not exists.' });
        }
        let newPost = {}
        newPost.name = req.body.name
        newPost.url = req.body.url
        newPost.text = req.body.text
        console.log(req.store.posts[req.params.id].comments)
        console.log(req.store.posts[req.params.id].comments.length)
        if(req.store.posts[req.params.id].comments.length != 0)
            newPost.comments = req.store.posts[req.params.id].comments
        else 
            newPost.comments = []
        req.store.posts[req.params.id] = newPost
        res.status(200)
        res.json(req.store.posts[req.params.id])
    }
]

exports.deletePost = (req, res) => {
    if(req.params.id && req.store.posts[req.params.id] == undefined){
        return res.status(404).json({ errors: 'Post with id:'+req.params.id+' does not exists.' });
    }
    req.store.posts.splice(req.params.id, 1)
    res.status(204).send()
}

module.exports