let express = require('express');
let router = express.Router();

const mongoose = require('mongoose');

let database = require('./../db/database')

router.get("/", async (req, res) => {
    const resultSet = await database.findAll();
    console.log(req.body);

    res.json(resultSet);
})

router.put("/", async (req, res) => {
    const ObjectId = mongoose.Types.ObjectId;
    const document = {
        $set:{
        title:req.body.title,
        html:req.body.html
        }
    };
    const filter = { _id:ObjectId(req.body._id)};
    console.log(document);
    console.log(filter);

    const resultSet = await database.update_one(document, filter);
    
    res.json(resultSet);
})

router.post("/", async (req, res) => {
    console.log(req.body);
    let document = {
        title: req.body.title,
        html: req.body.html
    };
   // res.json(document);
    const resultSet = await database.add_one(document);

    if (resultSet.acknowledged) {
        return res.status(201).json({ _id: resultSet.insertedId });
    };
})

router.delete("/", async (req, res) => {
    const resultSet = await database.findAll();

    res.json(resultSet);
})



module.exports = router;
