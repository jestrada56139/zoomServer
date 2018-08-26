var express = require('express'),
    bcrypt = require('bcrypt'),
    User = require('../_models/User');
    jwt = require('../services/jwt');

var app = express(); 

app.post('/signup', function (req, res) {
    const saltRounds = 10;
    const hash = bcrypt.hashSync(req.body.password, saltRounds);

    let newUser = new User ({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hash,
        learningStyle: req.body.learningStyle,
        pic: req.body.pic,
        teacherStatus: false
    });
    newUser.save(function(err, user) {
        if (err) throw err;
        jwt.signLoginToken(req.body._id, req.body.email, req.body.teacherStatus, (token) => {
            if(req.body.teacherStatus){
                res.send({valid: 2, token : token, id: req.body._id});
            } else {
                res.status(200).send({ valid: 1, token: token, id: req.body._id});
            }
        });
        console.log('User Saved!');
       // res.sendStatus(200);
    });
});

app.get('/students', function (req, res) {
    User.find(function (err, data) {
        if (err) {
            console.log(err);
        } else {
            res.json(data)
        }
    });

})


module.exports = app;