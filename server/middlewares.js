const express = require('express')
const helmet = require('helmet')
const rateLimit = require('express-rate-limit')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express')
const apiSpec = require('./swagger.json')
const swStats = require('swagger-stats')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')
const hpp = require('hpp')
const favicon = require('serve-favicon')


const limiter = rateLimit({
    max: 100,                           // limit each IP to 100 requests per windowMs
    windowMs: 1 * 60 * 1000,            // 1 minute
    message: 'Too Many Request from this IP, please try again in a minute'
})

module.exports = function (app) {
    /* General */
    app.use(favicon('./server/favicon.ico'))
    app.use(bodyParser.json())
    app.use(express.urlencoded({ extended: false }))
    app.use(express.json())

    /* Swagger and Swagger-stats */
    app.use('/doc', swaggerUi.serve, swaggerUi.setup(apiSpec))      // Path to Swagger
    if (process.env.JEST_IGNORE)
        app.use(swStats.getMiddleware({ swaggerSpec: apiSpec }))        // Swagger-stats

    /* Security */
    app.use(helmet())                                               // Set security HTTP headers setting various headers
    app.use('/api', limiter)                                        // Limit request from the same API 
    app.use(express.json({ limit: '10kb' }))                        // Limit data from body
    app.use(mongoSanitize())                                        // Prevent MongoDB Operator Injection.
    app.use(xss())                                                  // Sanitize untrusted HTML (to prevent XSS) with a configuration specified by a Whitelist
    app.use(hpp())                                                  // Protect against HTTP Parameter Pollution attacks
}