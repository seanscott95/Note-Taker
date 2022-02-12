const fs = require("fs");
const db = require('../db/db.json');
const uuid = require('./helpers/uuid');
const router = require('express').Router();

// GET Route for notes.html page
router.get("/notes", (req, res) => {
    console.info(`New ${req.method} request received for /api/notes`)
    res.json(db)
});

// 
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
            note_id: uuid(),
        }

        fs.readFile("./db/db.json", "utf-8", (err, data) => {
            if (err) {
                console.info(err);
            } else {
                const parsedNotes = JSON.parse(data);
                parsedNotes.push(newNote);

                fs.writeFile("./db/db.json", JSON.stringify(parsedNotes), (err) =>
                    err ? console.error(err) : console.log('Success!')
                )
            }
        })

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

// 
router.delete("/notes/:id", (req, res) => {
    // should receive a query parameter that contains the id of a note to delete. To delete a note, 
    // you'll need to read all notes from the `db.json` file, remove the note with the 
    // given `id` property, and then rewrite the notes to the `db.json` file

    console.info(`New ${req.method} request received for id ${req.params.id} note`);

    const filteredNotes = [];

    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            console.info(err);
        } else {
            const { id } = req.params;

            for (let i = 0; i < db.length; i++) {
                const index = db[i];
                if (id === index.note_id) {
                    filteredNotes = db.filter(note => note.note_id != id);

                    fs.writeFile("./db/db.json", JSON.stringify(filteredNotes), (err) =>
                        err ? console.error(err) : console.log('Success!')
                    );
                    return res.json("Note ${id} deleted succefully!")
                }
            }
            return res.json("Failed to find note with that id.")
        }
    })
});

module.exports = router;