// Imports express package and database json file
const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./helpers/uuid');
const db = require('./db/db.json');
const PORT = 3001;

// Initialised app varibale by setting it to the value of express
const app = express();

// Middleware used to set up the express app to handle data parsing 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serves css and js files from the public directory
app.use(express.static('public'));

// GET wildcard ROUTE, serves when the requested resource doesnt exist 
app.get("*", (req, res) => {
    console.info(`New ${req.method} request received`)
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

// GET Route for notes.html page
app.get('/notes', (req, res) => {
    console.info(`New ${req.method} request received`)
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});


app.get('/api/notes', (req, res) => {
    //  read the `db.json` file
    // return all saved notes as JSON.
    console.info(`New ${req.method} request received`)
    res.json(db)
});

app.post('/api/notes', (req, res) => {
    // should receive a new note to save on the request body
    // add it to the `db.json` file
    // and then return the new note to the client
    console.info(`New ${req.method} request received`)
    console.info(req.rawHeaders);
    // Adding request body data to variables
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // Variable for the object we will save
        const newNote = {
            title,
            text,
            note_id: uuid(),
        };

        const response = {
            status: 'success',
            body: newNote,
        };

        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting review');
    }
});

// Listens on port 3001 for connections
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
