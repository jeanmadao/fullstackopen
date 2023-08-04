const _ = require('lodash')

const totalLikes = blogs => blogs.reduce((acc, curr) => curr.likes + acc, 0)

const favoriteBlog = blogs => blogs.reduce((max, curr) => (!max || curr.likes > max.likes) ? _.pick(curr, ['title', 'author', 'likes']) : max, null)

// const mostBlogs = blogs => _.reduce(_.countBy(blogs, 'author'), (max, val, key) => (!max || val > max.blogs) ? { author: key, blogs: val } : max, null)

const mostBlogs = blogs => _.reduce(_.countBy(blogs, 'author'), (max, val, key) => (!max || val > max.blogs) ? { author: key, blogs: val } : max, null)



module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs
}
