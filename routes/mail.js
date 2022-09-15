let express = require('express');
let router = express.Router();
// const auth = require('../models/auth');
const sgMail = require('@sendgrid/mail')

let database = require('./../db/database');

router.post("/", async (req, res) => {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)
    const msg = {
        to: req.body.to, // Change to your recipient
        from: 'mange.ostling@protonmail.com', // Change to your verified sender
        subject: req.body.sub,
        html: req.body.text,
    }
    sgMail
        .send(msg)
        .then(() => {
         //   console.log('Email sent')
            res.json('Email sent');
        })
        .catch((error) => {
            console.error(error)
            res.json(error);
        })
   /* const db = await database.getDb("members");

    //get all members from database
    const resultset = await db.collection.find({}).toArray();


    await db.client.close();
    let usernames = [];
    
    for (let index = 0; index < resultset.length; index++) {
        usernames.push(resultset[index].username);
        
    }
    */
})

module.exports = router;
