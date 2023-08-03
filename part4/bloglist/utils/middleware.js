const logger = require('./logger')
const morgan = require('morgan')

// const requestLogger = (request, response, next) => {
//   logger.info('Method:', request.method)
//   logger.info('Path:', request.path)
//   logger.info('Body:', request.body)
//   logger.info('Status', request.status)
//   logger.info('---')
//   next()
// }

const requestLogger = morgan((tokens, req, res) => {
  morgan.token('data-sent', (req) => JSON.stringify(req.body))
  return [
    'Method: ', tokens.method(req, res), '\n',
    'Path: ', tokens.url(req, res), '\n',
    'Status: ', tokens.status(res, res), '\n',
    'Content length: ', tokens.res(req, res, 'content-length'), '-', '\n',
    'Response time: ', tokens['response-time'](req, res), 'ms', '\n',
    'Body: ', tokens['data-sent'](req, res), '\n',
    '---'
  ].join('')
})

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
