import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogList = () => {
  const blogs = useSelector(state => state.blog)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div>
      {blogs.sort((a, b) => (a.likes <= b.likes) ? 1 : -1).map(blog =>
        <div style={blogStyle} className='blogDiv' key={blog.id}>
          <Link to={`/blogs/${blog.id}`}>{blog.title}</Link> {blog.author}
        </div>
      )}
    </div>
  )
}

export default BlogList