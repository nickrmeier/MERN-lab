// Require necessary NPM packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Require the user resource routes and controllers
const userController = require('./controllers/users');
// Require the job resource routes and controllers
const jobController = require('./controllers/jobs');

// Require the error handlers
const { handleErrors, handleValidationErrors } = require('./middleware/custom_errors');

// Instantiate express application object
const app = express();



// The `.use` method sets up middleware in Express

// Set up cors middleware and make sure that it
// comes before our routes are used.
app.use(cors());

// Add `express.json` middleware which will
// parse JSON requests into JS objects before
// they reach the route files.
app.use(express.json());

// The urlencoded middleware parses requests which use
// a specific content type (such as when using Axios)
app.use(express.urlencoded({ extended: true }));


// Configure the route middleware
app.use('/api/jobs', jobController);

app.use('/api', userController);

// Define a port for API to run on, if the environment
// variable called `PORT` is not found use port 4000
app.set('port', process.env.PORT || 4000);
// Run server on designated port

app.use(handleValidationErrors);
// The catch all for handling errors
// MUST BE PLACED IMMEDIATELY BEFORE `app.listen`
app.use(handleErrors);



app.listen(app.get('port'), () => {
    console.log('listening on port ' + app.get('port'));
});