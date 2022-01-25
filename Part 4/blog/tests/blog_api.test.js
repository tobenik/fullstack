const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(helper.initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(helper.initialBlogs[1])
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific blog is within the returned blogs', async () => {
  const response = await api.get('/api/blogs')

  const contents = response.body.map(r => r.title)

  expect(contents).toContain(
    'HTML is easy'
  )
})

test('the identifier property is named correctly', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined();
})

test('a blog is added correctly', async () => {
  const newBlog = {
    title: "refactor your code!",
    author: "Steve Jobs",
    url: "apple.com/refactor",
    likes: 1440
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).toContain(
    'refactor your code!'
  )
})

test('adding a blog w/o likes attribute defaults value to zero', async () => {
  const newBlog = {
    title: "my first blog post",
    author: "Larry Page",
    url: "google.com/blogs",
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

  const addedBlog = blogsAtEnd.find(n => n.title === 'my first blog post')
  expect(addedBlog.likes).toBe(0)
})

test('adding a blog w/o title or url results in status 400', async () => {
  const noTitle = {
    author: "Larry Page",
    url: "google.com/blogs",
  }

  const noUrl = {
    title: "refactor your code!",
    author: "Larry Page",
  }

  await api
    .post('/api/blogs')
    .send(noTitle)
    .expect(400)

  await api
    .post('/api/blogs')
    .send(noUrl)
    .expect(400)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
})

test('deleting a blog responds with 204 and deletes document', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const toBeDeleted = blogsAtStart.find(b => b.title === 'HTML is easy')

  await api
    .delete(`/api/blogs/${toBeDeleted.id}`)
    .expect(204)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

  const contents = blogsAtEnd.map(n => n.title)
  expect(contents).not.toContain(
    'HTML is easy'
  )
})

test('updating likes of blog works', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const toBeUpdated = blogsAtStart.find(b => b.title === 'Browser can execute only Javascript')

  const updatedBlog = {
    title: 'Browser can execute only Javascript',
    author: "Fireship",
    url: "fireship.io/js",
    likes: 187
  }

  await api
    .put(`/api/blogs/${toBeUpdated.id}`)
    .send(updatedBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

  const content = blogsAtEnd.find(n => n.title === 'Browser can execute only Javascript')
  expect(content.likes).toBe(updatedBlog.likes)
})

afterAll(() => {
  mongoose.connection.close()
})