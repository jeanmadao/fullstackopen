const _ = require('lodash')

const totalLikes = blogs => _.sumBy(blogs, blog => blog.likes)

const favoriteBlog = blogs => _.reduce(blogs, (max, curr) => (!max || curr.likes > max.likes) ? _.pick(curr, ['title', 'author', 'likes']) : max, null)
//const favoriteBlog = blogs => _.pick(_.maxBy(blogs, blog => blog.likes), ['title', 'author', 'likes'])

const mostBlogs = blogs => _.reduce(_.countBy(blogs, 'author'), (max, val, key) => (!max || val > max.blogs) ? { author: key, blogs: val } : max, null)

const mostLikes = blogs => _.reduce(_.groupBy(blogs, 'author'), (max, val, key) => {
    const authorTotalLikes = totalLikes(val)
    if (!max || authorTotalLikes > max.likes) {
      return { author: key, likes: authorTotalLikes }
    } else {
      return max
    }
  }, null)

module.exports = {
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}
