const mongoose = require('mongoose')


// const DB_USER = 'jonathan'
// const DB_PASSWORD = 'kodemia123'
// const DB_HOST = 'kodemia-once.gxa7e.mongodb.net'
// const DB_NAME = 'kodemia'

const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env

const url = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`


function connect () {
    return mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
}

module.exports = connect