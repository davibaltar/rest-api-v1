const mongoose = require('mongoose')
const database = process.env.DATABASE || 'mongodb://localhost/test'


mongoose.connect(database, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
}).then(con => {
    // console.log('MongoDB connected!');
}, err => {
    console.log('Error! MongoDB connection: ', err)
})


module.exports = {
    mongoose
}