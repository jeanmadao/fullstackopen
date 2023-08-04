const totalLikes = blogs => blogs.reduce((acc, curr) => curr.likes + acc, 0)

const favoriteBlog = blogs => blogs.reduce((max, curr) => (!max || curr.likes > max.likes) ? curr : max, null)

module.exports = {
  totalLikes,
  favoriteBlog
}
