const Blog = require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: "Arto Hellas",
    url: "arto.fi/html",
    likes: 11
  },
  {
    title: 'Browser can execute only Javascript',
    author: "Fireship",
    url: "fireship.io/js",
    likes: 143
  }
]

const nonExistingId = async () => {
  const blog = new Blog({ title: 'willremovethissoon', author: "MJ", url: "goat.com", likes: 24 })
  await blog.save()
  await blog.remove()

  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

const usersInDb = async () => {
  const users = await User.find({})
  return users.map(u => u.toJSON())
}

module.exports = {
  initialBlogs, 
  nonExistingId, 
  blogsInDb,
  usersInDb
}