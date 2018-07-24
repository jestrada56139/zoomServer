var express = require('express');
var port = process.env.PORT || 8080;
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

mongoose.connect('mongodb://jonathanem:Evariste1@ds147011.mlab.com:47011/zoom',  { useNewUrlParser: true }, function(err, db){
    if (err) {
        console.log('Error Connecting with mLabs', err);
        process.exit(1);
        throw err
    } else {
        problemCollection = db.collection("problemforms");
        console.log('Connected to mLabs')
    }
});

//SCHEMAS
var problemSchema = require('./_models/problemSchema');

//MIDDLE WARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

//POSTING A PROBLEM
app.post('/postProblem', function (req,res) {
    var newProblem = new problemSchema(req.body);
    newProblem.save(function (err, product) {
        if (err) throw err;
        console.log('Problem Saved!');
        res.status(200).send({
            type: true,
            data: 'Successfully Added New Problem'
        })
    })
});

//GETTING THE PROBLEMS
app.get('/pullProblem', function (req, res) {
    problemCollection.find().toArray(function (err, docs) {
        if (err){
            throw err;
            res.sendStatus(500);
        } else {
            var result = docs.map(function(data) {
                return data ;
            })
            res.json(result);
        }
    })
})


app.listen(port, function () {
    console.log('listening on port: ', port);
})