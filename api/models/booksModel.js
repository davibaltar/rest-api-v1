const mongoose = require('mongoose')


const booksSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Enter a title'],
        minLength: 1
    },
    author: {
        type: String,
        required: [true, 'Enter an author'],
        minLength: 1
    }, 
    createdAt: {
        type: Date
    }, 
    updatedAt: {
        type: Date
    }
})

booksSchema.pre('save', function (next) {
    this.updatedAt = new Date()
    if (!this.createdAt) 
        this.createdAt = new Date()
    next()
})

const books = mongoose.model('books', booksSchema)


module.exports = books