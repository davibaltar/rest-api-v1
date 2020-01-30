const jwt = require('../auth/jwt')
const userCollection = require('../models/userModel')
const bcrypt = require('bcryptjs')


exports.signup = async (req, res, next) => {
    try {
        const body = req.body

        if (!body.username || !body.password)
            return res.status(400).json({ status: 'fail', message: "Missing username or password", token: null, data: null })

        if (await userCollection.findOne({ username: body.username }))
            return res.status(401).json({ status: 'fail', message: "User already registered", token: null, data: null })

        const user = await userCollection.create({
            username: body.username,
            email: body.email,
            password: await bcrypt.hash(body.password, 10)    // Hashing the password
        })

        const token = jwt.generateToken(user.id)
        user.password = undefined;

        return res.status(201).json({ status: 'success', message: null, token, data: user })
    } catch (err) {
        return res.status(500).json({ status: 'fail', message: err.toString(), token: null, data: null })
    }
}

exports.login = async (req, res, next) => {
    try {
        const body = req.body
        if (!body.username || !body.password)
            return res.status(400).json({ status: 'fail', message: "Missing username or password", token: null, data: null })

        const user = await userCollection.findOne({ username: body.username })
        if (!user || !await bcrypt.compare(body.password, user.password))
            return res.status(401).json({ status: 'fail', message: "Username or Password is wrong", token: null, data: null })

        const token = jwt.generateToken(user.id)
        user.password = undefined

        return res.status(201).json({ status: 'success', message: null, token, data: { user } })
    } catch (err) {
        return res.status(500).json({ status: 'fail', message: err.toString(), token: null, data: null })
    }
}

exports.logout = (req, res, next) => {
    return res.status(200).send({ status: 'success', message: null, token: null, data: null })
}

exports.profile = async (req, res, next) => {
    try {
        const user = await userCollection.findById(req.userId)
        if (!user)
            return res.status(204).send({ status: 'fail', message: "No Content", token: null, data: null })

        user.password = undefined

        return res.status(200).json({ status: 'success', message: null, data: { user } })
    } catch (err) {
        return res.status(500).json({ status: 'fail', message: err.toString(), token: null, data: null })
    }
}