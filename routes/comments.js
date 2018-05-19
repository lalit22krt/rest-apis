const { sanitizeBody } = require('express-validator/filter');
const { body,validationResult } = require('express-validator/check');

exports.getComments = (req, res) => {
    if(req.params.id && req.store.posts[req.params.id] == undefined){
        return res.status(404).json({ errors: 'Post with id:'+req.params.id+' does not exists.' });
    }
    let comments = req.store.posts[req.params.id].comments
    res.status(200)
    if(comments.length == 0){
        res.send("There are no comments on this post yet. Feel free to add few!")    
    }
    else{
        res.json(comments)
    }
}

exports.addComment = [
    body('text', "Comment can't be empty.").isLength({ min: 1 }).trim().not().isEmpty(),
    (req, res) => {
        if(req.params.id && req.store.posts[req.params.id] == undefined){
            return res.status(404).json({ errors: 'Post with id:'+req.params.id+' does not exists.' });
        }
        var newComment = {
                text: req.body.text
        }
        let cid = req.store.posts[req.params.id].comments.length
        req.store.posts[req.params.id].comments.push(newComment)
        res.status(201).send({commentId: cid})
    }
]

exports.updateComment = [
    body('text', "Comment can't be empty.").isLength({ min: 1 }).trim().not().isEmpty(),
    (req, res) => {
        if(req.params.id && req.store.posts[req.params.id] == undefined){
            return res.status(404).json({ errors: 'Post with id:'+req.params.id+' does not exists.' });
        }
        if(req.params.commentId && req.store.posts[req.params.id].comments[req.params.commentId] == undefined){
                return res.status(404).json({ errors: 'Comment with id:'+req.params.commentId+' does not exists.' });
        }
        var newComment = {
                text: req.body.text
        }
        req.store.posts[req.params.id].comments[req.params.commentId] = newComment
        res.status(201)
        res.json(req.store.posts[req.params.id].comments[req.params.commentId])
    }
]

exports.deleteComment = (req, res) => {
    if(req.params.id && req.store.posts[req.params.id] == undefined){
        return res.status(404).json({ errors: 'Post with id:'+req.params.id+' does not exists.' });
    }
    if(req.params.commentId && req.store.posts[req.params.id].comments[req.params.commentId] == undefined){
                return res.status(404).json({ errors: 'Comment with id:'+req.params.commentId+' does not exists.' });
    }
    req.store.posts[req.params.id].comments.splice(req.params.commentId, 1)
    res.status(204).send()
}
    
module.exports