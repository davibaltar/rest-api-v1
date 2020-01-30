const mongoose = require('mongoose')


function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Enter your username'],
        minLength: 3,
    },
    password: {
        type: String,
        required: [true, 'Enter a password'],
        minLength: 3
    },
    email: {
        type: String,
        required: [true, 'Enter a email'],
        minLength: 3,
        validate: [validateEmail, 'Please fill a valid email address']
    },
    urlImg: {
        type: String,
        default: 'https://.../profile.png'
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    about: {
        type: String,
        default: 'About me'
    }
})

const user = mongoose.model('user', userSchema)

module.exports = user