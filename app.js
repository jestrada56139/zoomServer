var bodyParser = require('body-parser'),
    mongoose = require('mongoose');
    express = require('express');
    port = process.env.PORT || 3000;

var app = express();

//MIDDLE WARE
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });

// MLAB CREDENTIALS......
// mongoose.connect('mongodb://jonathanem:Evariste1@ds147011.mlab.com:47011/zoom',  { useNewUrlParser: true }, function(err, db){
//     if (err) {
//         console.log('Error Connecting with mLabs', err);
//         process.exit(1);
//         throw err;
//     } else {
//         problemCollection = db.collection("problemforms");
//         console.log('Connected to mLabs')
//     }
// });

mongoose.connect('mongodb://localhost:27017/zoom', {useNewUrlParser: true}, function(err, db){
    if (err) {
        console.log('err connecting with test db');
        process.exit(1);
        throw err;
    } else {
        problemCollection = db.collection('problemforms');
        console.log('connected with test db');
    }
});


//Routes

const signupRoute = require('./routes/signUp');
const loginRoute = require('./routes/login');
const problemRoute = require('./routes/problems');

app.use('/api', signupRoute);
app.use('/api', loginRoute);
app.use('/api', problemRoute);

app.get('/api/pullProblem', function (req, res) {
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

// starting server
app.listen(port, function () {
    console.log('listening on port: ', port);
})