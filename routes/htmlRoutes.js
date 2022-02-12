const path = require('path');
const router = require('express').Router();

router.get("/notes", (req, res) => {
    console.info(`New ${req.method} request received for /notes`)
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

// GET wildcard ROUTE, serves when the requested resource doesnt exist 
router.get("*", (req, res) => {
    console.info(`New ${req.method} request received for wildcard`)
    res.sendFile(path.join(__dirname, '../public/index.html'))
});

module.exports = router;