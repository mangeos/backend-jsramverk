const database = require("../db/database.js");

const courses = {
    getAll: async function getAll(
        res = undefined,
    ) {
        let db;
        
        try {
            db = await database.getDb("members");
            
            let result = await db.collection.find({}).toArray();
            
            if (res === undefined) {
                console.log("sss");
                return result;
            }
            
           // console.log(res);
            return res.json({
                data: result
            });
        } catch (e) {
            return res.json({
                errors: {
                    status: 500,
                    name: "Database Error",
                    description: e.message,
                    path: "/",
                }
            })
        } finally {
            await db.client.close();
        }
    }
};

module.exports = courses;