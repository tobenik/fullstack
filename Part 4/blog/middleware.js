const jwt = require('jsonwebtoken')
const logger = require('./utils/logger')

const userExtractor = async (request, response, next) => {
  if (request.token) {
    const decodedToken = jwt.verify(request.token, process.env.SECRET)
    request.user = decodedToken
  } else {
    logger.info('no request.token')
  }
  next()
}

const tokenExtractor = async (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  next()
}

module.exports = {
  userExtractor,
  tokenExtractor
}