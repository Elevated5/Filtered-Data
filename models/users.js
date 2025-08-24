const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    discord_username: {
        type: String,
        required: [true, 'Discord username must be provided']
    },
    fullname: {
        type: String,
        required: [true, 'Full name must be provided']
    },
    speciality: {
        type: String,
        required: [true, 'Speciality must be provided']
    },
    country: {
        type: String,
        required: [true, 'Country must be provided']
    },
    certificate_level: {
        type: String,
        required: [true, 'Certificate level must be provided']
    },
    code: {
        type: String,
        required: [true, 'Verification code must be provided'],
        unique: true
    }
})

module.exports = mongoose.model('User', userSchema)