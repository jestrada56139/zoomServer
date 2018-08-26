var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var problemSchema = new Schema({
    problem: {
        type: String,
        required: true
    },
    // Id of the User
    author: {
        type: String,
        required: true
    },
    learningStyle: {
        type: String,
        required: true
    },
    progress: {
        type: Boolean,
        required: true
    }
});

var problemForm = mongoose.model('problemForm', problemSchema);
module.exports = problemForm;