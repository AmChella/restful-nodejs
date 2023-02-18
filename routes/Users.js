const express = require("express");
const users = express.Router();
const Mongo = require("../adapter/mongo");
const { emit } = require("nodemon");
const Util = require("../Util/Util");
const ResponseGenerator = require("../Util/ResponseGenerator");

users.post("/signin", (req, res) => {
    try {
        const {email} = req.body;
        const database = new Mongo();
        database.readByColumn('users', 'data', {'email': email}).then(data => {
            let statusCode = 200;
            let jwtToken = null;
            let message = "Successfully logged in";
            let error = null;
            if (data.length <= 0) {
                statusCode = 500;
                message = "Login failed";
                error = "no user found";
            }
            else {
                jwtToken = Util.createToken(email);
            }
            res.status(statusCode).json({message: message, error: error, token: jwtToken});
        }).catch(e => {
            throw e;
        });
    }
    catch(error) {
        res.status(500).json(ResponseGenerator.constructErrorResponse(error));
    }
})

module.exports = users;