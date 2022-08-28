require('dotenv').config();
const jwt = require('jsonwebtoken');

const jwtSecret = process.env.ACCESS_TOKEN_SECRET;

const auth = {
    checkToken: function (req, res, next) {
        let token = req.headers['x-access-token'];
      //  console.log(req.headers['loggedInUser']);
        
        if (token) {
            jwt.verify(token, jwtSecret, function (err, decoded) {
                if (err) {
                    return res.status(500).json({
                        errors: {
                            status: 500,
                            source: req.path,
                            title: "Failed authentication",
                            detail: err.message
                        }
                    });
                }
              //  console.log(decoded.username);
                if (decoded.username) {
                    return next()
                }
             //   req.user = {};
               // req.user.email = decoded.email;

                return next();
            });
        } else {
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: req.path,
                    title: "No token",
                    detail: "No token provided in request headers"
                }
            });
        }
    }
};

module.exports = auth;