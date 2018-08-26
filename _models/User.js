const mongoose = require('mongoose');

let UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: false,
        sparse: true
    },
    firstName: {
        type: String,
        required: true,
        sparse: true
    },
    lastName: {
        type: String,
        required: true,
        sparse: true
    },
    email: {
        type: String,
        required: true,
        sparse: true
    },
    password: {
        type: String,
        required: true,
        sparse: true
    },
    learningStyle: {
        type: String,
        required: true,
        sparse: true
    },
    pic: {
        type: String,
        required: false,
        sparse: true
    },
    teacherStatus: {
        type: Boolean,
        required: true,
        sparse: true
    }
});



var userForm = mongoose.model('User', UserSchema);
module.exports = userForm;
