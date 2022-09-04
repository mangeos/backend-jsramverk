require('dotenv').config();
const express = require("express");
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require("body-parser");
const port = process.env.PORT || 1338;

const index = require('./routes/index');
const db = require('./routes/db');


//const RootQueryType = require("./graphql/root.js");
//const courses = require("./models/courses.js");

// const hello = require('./routes/hello');
// const db = require('./routes/db');


const httpServer = require("http").createServer(app);




const auth = require("./routes/auth.js");
const users = require("./routes/user.js");
//const users = require("./route/users.js");
//const data = require("./route/data.js");

//const authModel = require("./models/auth.js");


const io = require("socket.io")(httpServer, {
    cors: {
        origin: 'http://localhost:8080',
        'Access-Control-Allow-Origin': 'http://localhost:8080',
        //origin: 'https://www.student.bth.se',
        //'Access-Control-Allow-Origin': 'https://www.student.bth.se',
        methods: ["GET", "POST", "PUT"]
    }
});

io.sockets.on('connection', function(socket) {
    console.log("user connected"); // user conected
    console.log(socket.id); // Nått lång och slumpat
    console.log("1");
    //socket.emit("Hello!","sdsds");
    //socket.on("chat message", function(message) {
        //  io.emit("chat message", message);
        //console.log("from client");
        // console.log(message);
        //   });
        
        
        
        
        socket.on('editor', (data) => {
            console.log(data._id, data.text);
            console.log("send from server", data.text);
            
            socket.leave(data._id);
            socket.join(data._id);
            
            //io.to(data._id).emit("chat", data.text);
            socket.to(data._id).emit("chat", data.text);
            //socket.emit("chat", data.text);
            
            
        });
    });
    
    
    
    
    
    app.use(cors());
    // app.use(express.json());
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    
    
    
    // This is middleware called for all routes.
    // Middleware takes three parameters.
    app.use((req, res, next) => {
        console.log(req.method);
        console.log(req.path);
        next();
    });
    
    
    // don't show the log when it is test
    if (process.env.NODE_ENV !== 'test') {
        // use morgan to log at command line
        app.use(morgan('combined')); // 'combined' outputs the Apache style LOGs
    }
    
    //--------------graphql----------------------------------------------
    const { graphqlHTTP } = require('express-graphql');
    const { GraphQLSchema } = require("graphql");
    
    const RootQueryType = require("./graphql/root.js");
    
    const schema = new GraphQLSchema({
        query: RootQueryType
    });
    
    app.use('/graphql', graphqlHTTP({
        schema: schema,
        graphiql: true, // Visual är satt till true under utveckling
    }));
    
    //----------------------------------------------------------------------
    app.use('/', index);
    
    app.use('/db', db);
    
    app.use("/auth", auth);
    
    app.use("/getallusers", users);
    
    app.get("/hello/:msg", (req, res) => {
        const data = {
            data: {
                msg: req.params.msg
            }
    };

    res.json(data);
});


// Testing routes with method
app.get("/user", (req, res) => {
    res.json({
        data: {
            msg: "Got a GET request"
        }
    });
});

app.post("/user", (req, res) => {
    res.json({
        data: {
            msg: "Got a POST request"
        }
    });
});

app.put("/user", (req, res) => {
    // PUT requests should return 204 No Content
    res.status(204).send();
});

app.delete("/user", (req, res) => {
    // DELETE requests should return 204 No Content
    res.status(204).send();
});


// Add routes for 404 and error handling
// Catch 404 and forward to error handler
// Put this last
app.use((req, res, next) => {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});



// Start up server
const server = httpServer.listen(port, () => console.log(`Example app listening on port ${port}!`));

module.exports = server;
