let express = require('express');
let router = express.Router();
const auth = require('../models/auth');

const mongoose = require('mongoose');

let database = require('./../db/database');
/*
router.get("/", (req, res, next) => auth.checkToken(req, res, next), async (req, res) => {
    const resultSet = await database.findAll();
    console.log(req.headers['loggedinuser']);
    //console.log(req.headers['x-access-token']);
    res.json(resultSet);
})
*/
router.get("/", (req, res, next) => auth.checkToken(req, res, next), async (req, res) => {
    const resultSet = await database.findAll();
    console.log(req.body);
    console.log(resultSet);
    
    let sample = [];
    for (let index = 0; index < resultSet.length; index++) {
        if (resultSet[index].allowed_user.includes(req.headers['loggedinuser']) ) {
            sample.push(resultSet[index])
        }
    }
    res.json(sample);
})

router.put("/", (req, res, next) => auth.checkToken(req, res, next), async (req, res, next) => {
    const ObjectId = mongoose.Types.ObjectId;
    const document = {
        $set:{
        title:req.body.title,
        html:req.body.html,
        allowed_user: req.body.allowed_users
        }
    };
    const filter = { _id:ObjectId(req.body._id)};
    console.log(document);
    console.log(filter);

    const resultSet = await database.update_one(document, filter);
    
    res.json(resultSet);
})

router.post("/", (req, res, next) => auth.checkToken(req, res, next), async (req, res, next) => {
    console.log(req.body);
    let document = {
        title: req.body.title,
        html: req.body.html,
        allowed_user: req.body.allowed_users
    };
   // res.json(document);
    const resultSet = await database.add_one(document);

    if (resultSet.acknowledged) {
        return res.status(201).json({ _id: resultSet.insertedId });
    };
})

router.delete("/", (req, res, next) => auth.checkToken(req, res, next), async (req, res, next) => {
    const resultSet = await database.findAll();

    res.json(resultSet);
})



module.exports = router;
