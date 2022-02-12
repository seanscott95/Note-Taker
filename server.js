// Imports express package and database json file
const express = require('express');
const db = require('./db/db.json');
const PORT = 3001;


// Initialised app varibale by setting it to the value of express
const app = express();

// Middleware used to set up the express app to handle data parsing 
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serves css and js files from the public directory
app.use(express.static('public'));