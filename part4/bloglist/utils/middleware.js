const logger = require('./logger')
const morgan = require('morgan')

const requestLogger = (request, response, next) => {
  morgan((tokens, req, res) => {
    morgan.token('data-sent', (req) => JSON.stringify(req.body))
    logger.info([
      'Method: ', tokens.method(req, res), '\n',
      'Path: ', tokens.url(req, res), '\n',
      'Status: ', tokens.status(res, res), '\n',
      'Content length: ', tokens.res(req, res, 'content-length'), '-', '\n',
      'Response time: ', tokens['response-time'](req, res), 'ms', '\n',
      'Body: ', tokens['data-sent'](req, res), '\n',
      '---'
    ].join(''))
  })
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
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}
