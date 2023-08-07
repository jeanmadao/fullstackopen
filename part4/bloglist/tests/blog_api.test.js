const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const bcrypt = require('bcrypt')
const Blog = require('../models/blog')
const User = require('../models/user')
const helper = require('./test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  for (let blog of helper.initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
}, 100000)

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 100000)

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
}, 100000)

test('all blogs has "id" property', async () => {
  const response = await api.get('/api/blogs')

  for (let blog of response.body) {
    expect(blog.id).toBeDefined()
    expect(blog._id).not.toBeDefined()
    expect(blog.__v).not.toBeDefined()
  }
}, 100000)

test('POST request returns a json', async () => {
  const newBlog = {
    title: "I'm cold",
    author: "Feilong",
    url: "https://google.com/",
    likes: 7,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(blog => `${blog.title} - ${blog.author}: ${blog.url}, likes:${blog.likes}`)
  expect(contents).toContain(`I'm cold - Feilong: https://google.com/, likes:7`)

}, 100000)

test('POST request missing "likes" property set it to 0 by default and save it', async () => {
  const newBlog = {
    title: "I'm cold",
    author: "Feilong",
    url: "https://google.com/",
  }

  const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  expect(response.body.likes).toBeDefined()
  expect(response.body.likes).toBe(0)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

}, 100000)

test('POST request missing "title" or "url" properties denies saving it to the DB and send bad request', async () => {
  const badBlogObject = {
    url: "https://google.com/",
    likes: 14,
  }

  await api
    .post('/api/blogs')
    .send(badBlogObject)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
}, 100000)

describe('Deletion of a blog', () => {
  test('Delete one specific note', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const contents = blogsAtEnd.map(blog => blog.id)
    expect(contents).not.toContain(blogToDelete.id)
  }, 100000)
})

describe('Updating a blog', () => {
  test('Updates a blog\'s likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToUpdate = blogsAtStart[0]
    const updatedBlog = {
      title: blogToUpdate.title,
      author: blogToUpdate.author,
      url: blogToUpdate.url,
      likes: blogToUpdate.likes + 100
    }

    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(updatedBlog)
      .expect(201)

    const receivedBlog = await helper.blogById(blogToUpdate.id)
    expect(receivedBlog.likes).toBe(blogToUpdate.likes + 100)
  }, 100000)
})

describe('when there is initially one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('salut', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })

  test('users are returned as json', async () => {
    await api
      .get('/api/users')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  }, 100000)

  test('creation succeeds with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'jeanmadao',
      name: 'Jean Huynh',
      password: 'doubidou'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  }, 100000)
})

afterAll(async () => {
  await mongoose.connection.close()
})
