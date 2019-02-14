const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
  })
  
blogsRouter.post('/', (request, response) => {
    const blog = new Blog(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
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