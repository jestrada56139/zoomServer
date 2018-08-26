const jwt = require('jsonwebtoken');
const key = "bGS6lzFqvvSQ8ALbOxatm7/Vk7mLQyzqaS34Q4oR1ew";

const signLoginToken = function (id, email, TeacherStatus, cb) {
    // creates the token
    let isTeacher = false;
    if(TeacherStatus){
      isTeacher = true;
    }
    let token = jwt.sign({
        id: id,
        email: email,
        isTeacher: isTeacher
    }, key, {
        expiresIn: '1h'
    });
    cb(token);
};

const verifyToken = function (param, cb) {
    // verify token
    // true = valid token, false = invalid token
    jwt.verify(param, key, function (err, decoded) {
        if (err) {
            cb(false);
        } else {
            cb(true,decoded);
        }
    });
};

const decodeToken = function (param, cb) {
    // verify token
    // true = valid token, false = invalid token
    jwt.verify(param, key, function (err, decoded) {
        if (err) {
            cb(err);
        } else {
            cb(null, decoded);
        }
    });
};


const middleware = function (req, res, next) {
    //checks the token
    let bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        verifyToken(bearerHeader, function (result,decoded) {
            if (result == false) {
                res.status(200).send({
                    type: false,
                    data: "invalid user session"
                });
            } else if (result == true) {
                req.email = decoded.email;
                next();
            }
        });
    } else {
        res.status(200).send({
            type: false,
            data: "invalid user session"
        });
    }
};

module.exports = {
    signLoginToken: signLoginToken,
    verifyToken: verifyToken,
    decodeToken: decodeToken,
    middleware: middleware
};
