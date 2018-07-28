var express = require('express');
var port = process.env.PORT || 8080;
var app = express();
var bodyParser = require('body-parser');
var cors = require('cors');
var mongoose = require('mongoose');

// TWILIO INFO
const accountSid = 'ACaf0ec871b3c59a3447b45830a4c16d6e';
const authToken = '20f9561685a7f3b67c16fa0fd5cc08fc';
const client = require('twilio')(accountSid, authToken);

mongoose.connect('mongodb://jonathanem:Evariste1@ds147011.mlab.com:47011/zoom',  { useNewUrlParser: true }, function(err, db){
    if (err) {
        console.log('Error Connecting with mLabs', err);
        process.exit(1);
        throw err;
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
        });
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
});

// SENDING TWILIO TEXT
app.post('/sendText', function (req, res) {
        client.messages
            .create({
                to: '+13233926989',
                from: '+18339883151',
                body: 'Your Meet with Dave Ben is on : \n July 29, 2018 \n Skype \n @6pm-8pm',
            })
            .then(message => {
                console.log(message.sid)
                res.status(200).send({
                    type: true,
                    data: 'Form Information Submitted to Database!'
                })
            })
            .catch((err) => {
                if (err) throw err;
            });
            res.status(200).send({
                type: true,
                data: 'Successfully Added New Problem'
            });
});


app.listen(port, function () {
    console.log('listening on port: ', port);
})