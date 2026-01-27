// basic configurations and server setup
const config = require('./utils/config')
const logger = require('./utils/logger')

// express app setup
const express = require('express')
const app = express()

// Enable CORS
const cors = require('cors')
app.use(cors())

// Set up middleware
app.use(express.static('dist'))
app.use(express.json())
const middleware = require('./utils/middleware')
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

// MongoDB connection
const mongoose = require('mongoose')
logger.info('connecting to', config.MONGODB_URI)

const connectToDatabase = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI, { family: 4 })
    logger.info('connected to MongoDB')
    
    // routes - set up after successful connection
    const blogsRouter = require('./controllers/blogs')
    const usersRouter = require('./controllers/users')
    const loginRouter = require('./controllers/login')
    app.use('/api/login', loginRouter)
    app.use('/api/blogs', blogsRouter)
    app.use('/api/users', usersRouter)
    
    // Unknown endpoint and error handler
    app.use(middleware.unknownEndpoint)
    app.use(middleware.errorHandler)
    
    return true
  } catch (error) {
    logger.error('error connection to MongoDB:', error.message)
    return false
  }
}

module.exports = { app, connectToDatabase }