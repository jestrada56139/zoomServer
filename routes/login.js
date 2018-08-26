var express = require('express'),
    app = express(),
    bcrypt = require('bcrypt');
    jwt = require('../services/jwt'),
    User = require('../_models/User');

app.post('/login', function(req, res) {
    User.find({ email: req.body.email }, function(err, student) {
        if (student.length === 0 || !bcrypt.compareSync(req.body.password, student[0].password)){
            res.send({ valid: 0});
        } else {
            jwt.signLoginToken(student[0]._id, req.body.email, student[0].teacherStatus, (token) => {
                if(student[0].teacherStatus){
                    res.send({valid: 2, token : token, id: student[0]._id});
                } else {
                    res.send({ valid: 1, token: token, id: student[0]._id});
                }
            });
        }
    });
    console.log('logged in user: ', req.body.email);
});

module.exports = app;
