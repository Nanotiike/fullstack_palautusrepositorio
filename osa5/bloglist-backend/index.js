// basic configurations, server setup and app start
const { app, connectToDatabase } = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

// Connect to database first, then start server
connectToDatabase().then((connected) => {
  if (connected) {
    // server start
    app.listen(config.PORT, () => {
      logger.info(`Server running on port ${config.PORT}`)
    })
  } else {
    logger.error('Failed to connect to database. Server not started.')
    process.exit(1)
  }
})