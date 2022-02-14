// Node modules
const fs = require("fs");
const router = require('express').Router();

// ID helper function 
const uuid = require('../helpers/uuid');

// GET Route for /notes, reads the notes
router.get("/notes", (req, res) => {
    console.info(`New ${req.method} request received for /api/notes`)
    // Reads notes file
    fs.readFile("./db/db.json", (err, data) => {
        if (err) {
            console.info(err);
        } else {
            res.json(JSON.parse(data));
        }
    })
});

// POST Route for /notes, adds a new note
router.post('/notes', (req, res) => {
    console.info(`New ${req.method} request received for /api/notes`)
    // Adding request body data to variables
    const { title, text } = req.body;
    
    // If all the required properties are present
    if (title && text) {
        // New variable for the object to be saved
        const newNote = {
            title,
            text,
            id: uuid(),
        }

        // Reads notes file
        fs.readFile("./db/db.json", "utf-8", (err, data) => {
            if (err) {
                console.info(err);
            } else {
                const parsedNotes = JSON.parse(data);
                // Adds new note to the notes file
                parsedNotes.push(newNote);

                // Creates a new file with the new notes added to the old ones
                fs.writeFile("./db/db.json", JSON.stringify(parsedNotes), (err) =>
                    err ? console.error(err) : console.log('Success!')
                )
            }
        })

        // New variable to return status success with the new note as the body
        const response = {
            status: 'success',
            body: newNote,
        }
        console.info(response);
        res.status(201).json(response);
    } else {
        res.status(500).json('Error in posting note');
    }
});

// DELETE Route for /notes/:id page, deletes a note
router.delete("/notes/:id", (req, res) => {
    console.info(`New ${req.method} request received for id ${req.params.id} note`);

    // New variable with an empyt object to be used later
    let filteredNotes = [];
    // Destructuring the object in req.params to a new variable id
    const { id } = req.params;
    
    // Reads notes file
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        const dataParsed = JSON.parse(data);
        if (err) {
            console.info(err);
        } else {
            // Cycles through the notes file
            for (let i = 0; i < dataParsed.length; i++) {
                // Asks if the required notes id to delete matches any id in the file
                if (id === dataParsed[i].id) {
                    
                    // Removes that note if it matches the id
                    filteredNotes = dataParsed.filter(note => {
                        return note.id != id
                        });

                    // Creates a new file with the new notes added to the old ones
                    fs.writeFile("./db/db.json", JSON.stringify(filteredNotes), (err) =>
                        err ? console.error(err) : console.log('Success!')
                    );
                    return res.json(`Note ${id} deleted succefully!`)
                }
            }
            return res.json("Failed to find note with that id.")
        }
    })
});

module.exports = router;