
const mongoose = require('mongoose')
const database = 'mongodb://localhost/'


async function dropAllCollections() {
    const collections = Object.keys(mongoose.connection.collections)
    for (const connection of collections) {
        try {
            await mongoose.connection.collections[connection].drop()
        } catch (err) {
            return
        }
    }
}

function testSetup(dbName) {

    beforeAll(async () => {
        await mongoose.connect(database + dbName, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        }).then(con => {
            // console.log('MongoDB connected!');
        }, err => {
            console.log('Error! MongoDB connection: ', err)
        })
    })

    beforeEach(async () => {

    })

    afterEach(async () => {

    })

    afterAll(async () => {
        await dropAllCollections()
        await mongoose.connection.close()
    })
}

module.exports = {
    testSetup
}