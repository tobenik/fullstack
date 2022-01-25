const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map(b => b.likes)
  return likes.reduce((sum, item) => sum + item, 0)
}

const favoriteBlog = (blogs) => {
  const fav = blogs.reduce((prev, curr) => (prev ? prev.likes > curr.likes : prev) ? prev : curr, null)
  return fav ? {
    title: fav.title,
    author: fav.author,
    likes: fav.likes
  } : null
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(b => b.author)
  const counts = _.countBy(authors)
  const index = _.indexOf(Object.values(counts), _.max(Object.values(counts)))

  return {
    author: Object.keys(counts)[index],
    blogs: Object.values(counts)[index]
  }
}

const mostLikes = (blogs) => {
  
  let counts = blogs.reduce((prev, curr) => {
    let count = prev.get(curr.author) || 0;
    prev.set(curr.author, curr.likes + count);
    return prev;
  }, new Map());

  let counts_array = [...counts].map(([author, likes]) => {
    return {author, likes}
  })
  
  if (!counts_array[0]) {return {}}

  const max = counts_array.reduce((prev, current) => (prev.likes > current.likes) ? prev : current)
  
  return {
    author: max.author,
    likes: max.likes
  }
}

module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}