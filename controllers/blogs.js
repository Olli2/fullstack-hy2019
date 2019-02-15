const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const bodyParser = require('body-parser')
const User = require('../models/user')

blogsRouter.use(bodyParser.json())

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
    user = await User.findById(body.userId)
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    response.status(201).json(savedBlog)
    await user.save()
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