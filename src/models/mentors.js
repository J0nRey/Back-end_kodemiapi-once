const mongoose = require('mongoose')

const mentorSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 2,
        maxLength: 100,
        required: true
    },
    lastName: {
        type: String,
        minLength: 2,
        maxLength: 100,
        required: true
    },
    age: {
        type: Number,
        min: [18, "Muy joven"],
        max: 150,
        required: true
    },
    modulo: {
        type: String,
        minLength: 2,
        maxLength: 100,
        require: true
    }
})


const modelMentors = mongoose.model('mentors', mentorSchema )

module.exports = modelMentors