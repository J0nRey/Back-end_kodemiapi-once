const mongoose = require('mongoose')

const usersSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 20
    },
    email: {
        type: String,
        match: [/.+@.+\..+/, 'Formato invalido'], //loquesea@loquesea.loquesea
        maxlength: 100,
        require: true
    },
    password: {
        type: String,
        minlength: 1,
        require: true
    },
    role: {
        type: [String],
        enum: ['admin', 'user'],
        minlength: 1,
        require: true
    }
})

const model = mongoose.model('users', usersSchema)

module.exports = model