/**
 * Connect to the database and setup it with some default data.
 */
"use strict";

const mongo = require("mongodb").MongoClient;

//let dsn = "mongodb://localhost:27017/mumin";
let dsn = "mongodb+srv://maoi19:pass@cluster0.g0yj8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

//  const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/mumin";
if (process.env.NODE_ENV === 'test') {
    dsn = "mongodb://localhost:27017/mumin";
}


const fs = require("fs");
const path = require("path");
const docs = JSON.parse(fs.readFileSync(
    path.resolve(__dirname, "setup.json"),
    "utf8"
));



// Do it.
resetCollection(dsn, "crowd", docs)
    .catch(err => console.log(err));



/**
 * Reset a collection by removing existing content and insert a default
 * set of documents.
 *
 * @async
 *
 * @param {string} dsn     DSN to connect to database.
 * @param {string} colName Name of collection.
 * @param {string} doc     Documents to be inserted into collection.
 *
 * @throws Error when database operation fails.
 *
 * @return {Promise<void>} Void
 */
// async function resetCollection(dsn, colName, doc) {
//     const client  = await mongo.connect(dsn);
//     const db = await client.db();
//     const col = await db.collection(colName);
//
//     await col.deleteMany();
//     await col.insertMany(doc);
//
//     await client.close();
// }

async function resetCollection(dsn, colName, doc) {
    const client  = await mongo.connect(dsn, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    const db = await client.db();
    const col = await db.collection(colName);

    await col.deleteMany();
    await col.insertMany(doc);

    await client.close();
}
