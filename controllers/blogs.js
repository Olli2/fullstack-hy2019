const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const bodyParser = require('body-parser')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.use(bodyParser.json())

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer ')) {
      return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog
      .find({}).populate('user', {username: 1, name: 1, _id: 0})
    response.json(blogs)
  })
  
blogsRouter.post('/', async (request, response) => {
  try {
    const body = request.body
    if(body === undefined) {
      return response.status(400).json({error: 'there is no content!'})
    }

    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    if(!token || !decodedToken.id) {
      return response.status(401).json({
        error: 'no token!'
      })
    }

    user = await User.findById(decodedToken.id)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    response.status(201).json(savedBlog)

  } catch(exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  try {
    await Blog
      .findByIdAndDelete(request.params.id)
    response.status(204).end()
  } catch(e) {
    console.log('Error: ', e);
    response.status(500).json({ error: 'There was an error.' })
  }
      
})

module.exports = blogsRouter