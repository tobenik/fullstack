const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

describe('Blog GET requests', () => {

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
})

describe('Blog requests requiring authorization', () => {
  let token = ""

  beforeEach(async () => {
    //Initializing blogs
    await Blog.deleteMany({})

    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()

    blogObject = new Blog(helper.initialBlogs[1])
    await blogObject.save()

    //Initializing users
    await User.deleteMany({})

    const password = "apple123"
    const passwordHash = await bcrypt.hash(password, 5)

    const userObject = new User({
      username: "stevieboi",
      name: "Steve Jobs",
      passwordHash: passwordHash
    })

    await userObject.save()

    const result = await api
      .post('/api/login')
      .send({ username: "stevieboi", password: "apple123" })
      .expect(200)

    token = 'bearer '.concat(result.body.token)
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
      .set("Authorization", token)
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
      .set("Authorization", token)
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
      .set("Authorization", token)
      .send(noTitle)
      .expect(400)

    await api
      .post('/api/blogs')
      .set("Authorization", token)
      .send(noUrl)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('Adding a blog w/o token fails and responds with 401', async () => {
    const newBlog = {
      title: "refactoring is wack!",
      author: "Ada Lovelace",
      url: "reliableblogs.net",
      likes: 6
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(401)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })

  test('deleting a blog responds with 204 and deletes document', async () => {
    const blogsAtStart = await helper.blogsInDb()
    let toBeDeleted = blogsAtStart.find(b => b.title === 'HTML is easy')

    // Add user to blog (toBeDeleted)
    const decodedToken = jwt.verify(token.substring(7), process.env.SECRET)
    const user = await User.findById(decodedToken.id)

    toBeDeleted.user = user._id
    toBeDeleted = await Blog.findByIdAndUpdate(toBeDeleted.id, toBeDeleted, { new: true })

    await api
      .delete(`/api/blogs/${toBeDeleted.id}`)
      .set("Authorization", token)
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
})