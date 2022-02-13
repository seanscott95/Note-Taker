// Imports express package and sets up what PORT to use
const express = require('express');
const PORT = process.env.PORT || 3001;

//// Imports our modular routers
const apiRoutes = require('./routes/apiRoutes');
const htmlRoutes = require('./routes/htmlRoutes');

// Initialised app varibale by setting it to the value of express
const app = express();

// Middleware used to set up the express app to handle data parsing 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serves css and js files from the public directory
app.use(express.static('public'));

app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// Listens on port 3001 for connections
app.listen(PORT, () =>
    console.log(`App listening at http://localhost:${PORT} 🚀`)
);
