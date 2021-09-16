let express = require('express');
let router = express.Router();
// Add a route
router.get("/", (req, res) => {
    console.log(req.body);
    const data = {
        data: {
            msg: "Got a moo request",
            test: req.body
        }
    };

    res.json(data);
});

router.post("/", (req, res) => {
    console.log(req.body);
    const data = {
        data: {
            msg: "Got a moo request",
            test: req.body.apa
        }
    };

    res.json(data);
});


module.exports = router;
