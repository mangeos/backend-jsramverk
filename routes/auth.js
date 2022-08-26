require('dotenv').config();
const express = require('express');
const router = express.Router();

//const auth = require("../models/auth.js");
const database = require('./../db/database');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async function (req, res) {
  //  console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;
    const secret = process.env.ACCESS_TOKEN_SECRET;

    console.log(secret);

    const db = await database.getDb("members");

    //get all members from database
    const resultset = await db.collection.find({ username: username }).toArray();
    //if no match with username
    if (resultset.length == 0) {
        return res.status(401).json({
            Success: {
                status: 401,
                source: "/login",
                title: "Wrong username or password",
                detail: "Wrong username or password"
            }

        });                     
    }
    
    await db.client.close();


    
    bcrypt.compare(password, resultset[0].password, function (err, data) {
        // res innehåller nu true eller false beroende på om det är rätt lösenord.
        const token = jwt.sign(resultset[0], secret, { expiresIn: '1h' });
        if (err) throw err

        if (data) {
            return res.status(200).json({ token:token,msg: "Login success" })
        } else {
            return res.status(401).json({ msg: "Invalid credencial" })
        }
                   
           //token skickas från frontend och verify verifierar om token är godkänd
          /*  
            jwt.verify(token, secret, function (err, decoded) {
                if (err) {
                    // not a valid token
                }
                console.log(decoded);
                // valid token
            });
            */

            
        
    
    });
})

router.post('/register', async function (req, res) {
    console.log(req.body);
    console.log("apa");

    const saltRounds = 10;

    const email = req.body.username;
    const password = req.body.password;
    //const apiKey = body.api_key;


    //check if user typed in username and password if not send status 401
    if (!email || !password) {
        return res.status(401).json({
            errors: {
                status: 401,
                source: "/register",
                title: "Username or password missing",
                detail: "Username or password missing in request"
            }
        });
    }

    const db = await database.getDb("members");
    const resultset = await db.collection.find({}).toArray();
    await db.client.close();

    //check if username exist
    for (let index = 0; index < resultset.length; index++) {
        if (resultset[index].username == email) {
            console.log(resultset[index].username);
            return res.status(401).json({
                errors: {
                    status: 401,
                    source: "/register",
                    title: "Username Error",
                    detail: "Username already exist"
                }
            });
        } 
    }

    //encrypt the password before saving to database for security reasons
    bcrypt.hash(password, saltRounds, async function (err, hash) {
        console.log(hash);
        
        const db = await database.getDb("members");
        await db.collection.insertOne({ username:email, password: hash});
        
        
        await db.client.close();
        
        //return status 201 that user have been created
        return res.status(201).json({
            Success: {
                status: 201 ,
                source: "/register",
            }
        });
    });
 
})
module.exports = router;