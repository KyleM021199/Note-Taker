const express = require('express');
//Imported routers
const notesRouter = require('./note.js');

const app = express();

app.use('/note', notesRouter);

module.exports = app;