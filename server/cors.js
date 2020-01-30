
module.exports = function (app) {
    app.use(function (req, res, next) {
        // Website you wish to allow to connect
        const allowedOrigins = [
            'http://localhost:1234',
            'http://localhost:5678',
        ]
        const origin = req.headers.origin
        res.setHeader("Access-Control-Allow-Origin", "*")     // Unrestricted Access
        res.setHeader('Cache-Control', 'no-cache')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
        res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization')
        res.setHeader('Access-Control-Allow-Credentials', true)
        //if (allowedOrigins.indexOf(origin) > -1)
        //    res.setHeader('Access-Control-Allow-Origin', origin)
        next()
    })
}