const userRoutes = require('./userRoutes')
const booksRoutes = require('./booksRoutes')


module.exports = function (app) {
    app.use('/api/v1/user', userRoutes)
    app.use('/api/v1/books', booksRoutes)
}