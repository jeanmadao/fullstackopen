const totalLikes = blogs => blogs.reduce((acc, curr) => curr.likes + acc, 0)

module.exports = {
  totalLikes
}
