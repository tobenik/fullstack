const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})


blogsRouter.get('/api/blogs', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogsRouter.post('/api/blogs', async (request, response) => {
  const body = request.body
  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  })

  const result = await blog.save()
  response.status(201).json(result)
})

blogsRouter.delete('/api/blogs/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/api/blogs/:id', async (request, response) => {
  const body = request.body
  
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const result = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(result)
})

module.exports = blogsRouter