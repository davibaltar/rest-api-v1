
const express = require('express')
const https = require('https')
const http = require('http')
const fs = require('fs')
const app = express()


const httpPort = process.env.SERVER_PORT_HTTP || 3000
const httpsPort = process.env.SERVER_PORT_HTTPS || 3001

let privateKey = null
let certificate = null

if (process.platform === "win32") {     // Windows
    if (fs.existsSync('certificates\\' + process.env.CERT_KEYFILE) && fs.existsSync('certificates\\' + process.env.CERT_CERFILE)) {
        privateKey = fs.readFileSync('certificates\\' + process.env.CERT_KEYFILE)
        certificate = fs.readFileSync('certificates\\' + process.env.CERT_CERFILE)
    }
} else {                                // Linux, MAC, FreeBSD
    if (fs.existsSync('certificates/' + process.env.CERT_KEYFILE) && fs.existsSync('certificates/' + process.env.CERT_CERFILE)) {
        privateKey = fs.readFileSync('certificates/' + process.env.CERT_KEYFILE)
        certificate = fs.readFileSync('certificates/' + process.env.CERT_CERFILE)
    }
}

// HTTPS
if (privateKey && certificate && process.env.JEST_IGNORE) {
    const options = { key: privateKey, cert: certificate }
    const server = https.createServer(options, app).listen(httpsPort)
    const port = server.address().port
    console.log("Listening at:// port:%s (HTTPS)", port)
} else
    if (process.env.JEST_IGNORE)
        console.log('Certificate was not found (HTTPS)')

// HTTP
if (process.env.JEST_IGNORE) {
    http.createServer(app).listen(httpPort)
    console.log("Listening at:// port:%s (HTTP)", httpPort)
}

// Middlewares
require('./middlewares')(app)

// CORS (Cross-Origin Resource Sharing)
require('./cors')(app)

/* Routes */
require('../api/routes/index')(app)

module.exports = app