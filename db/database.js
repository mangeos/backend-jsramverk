const mongo = require("mongodb").MongoClient;
const config = require("./config.json");
const collectionName = "crowd";

const database = {
    getDb: async function getDb () {

        let dsn = "mongodb+srv://maoi19:pass@cluster0.g0yj8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
       
       //  const dsn =  process.env.DBWEBB_DSN || "mongodb://localhost:27017/mumin";
        if (process.env.NODE_ENV === 'test') {
            dsn = "mongodb://localhost:27017/mumin";
        }

        const client  = await mongo.connect(dsn, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
     
        const db = await client.db();
    
        const collection = await db.collection(collectionName);
        //console.log(collection);
        return {
            collection: collection,
            client: client,
        };
    },
    findAll: async function findAll() {
        const db = await database.getDb();
        const resultSet = await db.collection.find({}).toArray();

        await db.client.close();

        return resultSet;
    },
    remove: async function remove() {
        const db = await database.getDb();
        const resultSet = await db.collection.find({}).toArray();

        await db.client.close();

        return resultSet;
    },
    add_one: async function add_one(data) {
        const db = await database.getDb();
        const resultSet = await db.collection.insertOne(data);

        await db.client.close();

        return resultSet;
    }, 
    add_multi: async function add_multi() {
        const db = await database.getDb();
        const resultSet = await db.collection.find({}).toArray();

        await db.client.close();

        return resultSet;
    },
    update_one: async function update_one(data, filter) {

        console.log(filter);

        console.log(data);

        const db = await database.getDb();

        
        const resultSet = await db.collection.updateOne(filter, data, { "upsert": true });

        await db.client.close();

        return resultSet;
    }
};

module.exports = database;
