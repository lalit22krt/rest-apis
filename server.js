const bodyParser = require('body-parser')
const logger = require('morgan')
const indexRouter = require('./routes')
const express = require('express')

var app = express()
const store = {}
store.posts = []

app.use(logger('dev'));
app.use(bodyParser.json())
app.use((req, res, next) => {
    req.store = store
    next()
})
app.use('/', indexRouter)

app.listen(3000)