var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var problemSchema = new Schema({
    problem: {
        type: String,
        required: true
    }
});

var problemForm = mongoose.model('problemForm', problemSchema);
module.exports = problemForm;