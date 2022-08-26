let express = require('express');
let router = express.Router();
const auth = require('../models/auth');

let database = require('./../db/database');

router.get("/", (req, res, next) => auth.checkToken(req, res, next), async (req, res) => {
    const db = await database.getDb("members");

    //get all members from database
    const resultset = await db.collection.find({}).toArray();


    await db.client.close();
    let usernames = [];
    
    for (let index = 0; index < resultset.length; index++) {
        usernames.push(resultset[index].username);
        
    }
    res.json(usernames);
})

module.exports = router;
