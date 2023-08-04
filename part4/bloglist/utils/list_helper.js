const _ = require('lodash')

const totalLikes = blogs => blogs.reduce((acc, curr) => curr.likes + acc, 0)

const favoriteBlog = blogs => blogs.reduce((max, curr) => (!max || curr.likes > max.likes) ? _.pick(curr, ['title', 'author', 'likes']) : max, null)

// const mostBlogs = blogs => _.transform(_.countBy(blogs, 'author'), (max, val, key) => (!max || val > max.blogs) ? { author: key, blogs: val } : max, null)

const mostBlogs = blogs => _.transform(_.countBy(blogs, 'author'), (max, val, key) => {
  if (val > max.blogs) {
    max.author = key
    max.blogs = val
  }
}, { author: null, blogs: 0 })



module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs
}
