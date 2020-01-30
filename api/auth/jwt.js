const fs = require('fs')
const jwt = require('jsonwebtoken')


function generateToken(id) {
    const privateKey = fs.readFileSync('./api/auth/example.private.key', 'utf8')
    const token = jwt.sign({ id }, privateKey, {
        expiresIn: 300,     // 5min 
        algorithm: "RS256"  // SHA-256 hash signature
    })
    return token
}

function verify(req, res, next) {
    let token = req.headers['authorization']
    if (!token)
        return res.status(401).send({ status: 'fail', message: 'No token provided.', data: null })

    if (!token.split('Bearer ')[1])
        return res.status(401).send({ status: 'fail', message: "Include 'Bearer' before the token.", data: null })

    token = token.split('Bearer ')[1]

    const publicKey = fs.readFileSync('./api/auth/example.public.key', 'utf8');
    jwt.verify(token, publicKey, { algorithm: ["RS256"] }, function (err, decoded) {
        if (err)
            return res.status(401).send({ status: 'fail', message: 'Invalid token.', data: null })

        req.userId = decoded.id
        next()
    })
}


module.exports = {
    generateToken,
    verify
}