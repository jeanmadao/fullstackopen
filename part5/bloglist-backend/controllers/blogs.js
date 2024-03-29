const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const user = request.user

  const body = request.body
  const blog = new Blog({
    url: body.url,
    title: body.title,
    author: body.author,
    user: user.id,
    likes: body.likes || 0,
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(await savedBlog.populate('user', { username: 1, name: 1 }))
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'deletion denied' })
  }
  await blog.deleteOne()
  user.blogs = user.blogs.filter(current => current._id.toString() !== blog._id.toString())
  await user.save()

  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    url: body.url,
    title: body.title,
    author: body.author,
    user: body.user,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true }).populate('user', { username: 1, name: 1 })

  response.status(201).json(updatedBlog)
})

module.exports = blogsRouter
