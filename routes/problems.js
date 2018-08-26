var express = require('express'),
    jwt = require('../services/jwt'),
    Problem = require('../_models/Problem'),
    User = require('../_models/User'),
    mongoose = require('mongoose');

    //problemCollection = db.collection("problemforms");



var app = express();

app.post('/newQuestion', function (req, res) {
        User.find({ _id: req.body.author }, function(err, student) {
            if (err) throw err;
            console.log(student);
            console.log('posting question');
            console.log('ID:', req.body.author);
            let newQuestion = new Problem({
                problem: req.body.problem,
                author: req.body.author,
                progress: false,
                learningStyle: student[0].learningStyle
            });
            newQuestion.save((err, data) => {
                if (err) throw err;
                console.log(newQuestion);
                console.log('added new problem');
                res.sendStatus(200);
            });
        })
    });

    // app.get('/pullProblem', function (req, res) {
    //     Problem.find().toArray(function (err, docs) {
    //         if (err){
    //             throw err;
    //             res.sendStatus(500);
    //         } else {
    //             var result = docs.map(function(data) {
    //                 return data ;
    //             })
    //             res.json(result);
    //         }
    //     })
    // })

module.exports = app;