const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const Blog = require('./models/blog')
const blogsRouter = require('./controllers/blogs')
const config = require('./utils/config')

console.log('asdasdasd')
console.log(config.mongoUrl)

mongoose.connect(config.mongoUrl, { useNewUrlParser: true })

app.use(express.static('build'))
app.use(cors())
app.use(bodyParser.json())
app.use('/api/blogs', blogsRouter)

module.exports = app