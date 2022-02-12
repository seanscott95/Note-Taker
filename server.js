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
    console.info(`New ${req.method} request received`)
    res.json(db)
});

app.post('/api/notes', (req, res) => {
    console.info(`New ${req.method} request received`)
    console.info(req.rawHeaders);
    // Adding request body data to variables
    const { title, text } = req.body;

    // If all the required properties are present
    if (title && text) {
        // New variable for the object to be saved
        const newNote = {
            title,
            text,
            note_id: uuid(),
        }

        fs.readFile("/db/db.json", "utf-8", (err, data) => {
            if (err) {
                console.info(err);
            } else {
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(newNote);

                fs.writeFile("/db/db.json", JSON.stringify(parsedNotes), (err) =>
                    err ? console.error(err) : console.log('Success!')
                )
            }
        })

        const response = {
            status: 'success',
            body: newNote,
        }

        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting note');
    }
});

app.delete("/api/notes/:id", (req, res) => {
    // should receive a query parameter that contains the id of a note to delete. To delete a note, 
    // you'll need to read all notes from the `db.json` file, remove the note with the 
    // given `id` property, and then rewrite the notes to the `db.json` file
    console.info(`New ${req.method} request received for id ${req.params.id} note`);

    const filteredNotes = [];
    
});

// Listens on port 3001 for connections
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
