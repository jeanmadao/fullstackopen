const logger = require('./logger')
const morgan = require('morgan')

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

const requestLogger = morgan(
  "Method: :method\n" +
  "Path: :url\n" +
  "Status: :status\n" +
  "Res: :res[content-length] - :response-time ms\n" +
  "Body: :body\n" +
  "---",
  {
    stream: {
      write: (str) => {
        logger.info(str)
      }
    }
  })

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.startsWith('Bearer ')) {
    request.token = authorization.replace('Bearer ', '')
  } else {
    request.token = null
  }
  next()
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({ error: error.message })
  } else if (error.name === 'TokenExpiredError') {
    return response.status(401).json({ error: 'token expired' })
  }

  next(error)
}


module.exports = {
  requestLogger,
  tokenExtractor,
  unknownEndpoint,
  errorHandler
}
