const express = require('express');
const path = require('path');
const api = require('./public/assets/routes/index.js');


const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));
//GET Route for the main page
app.get('/index', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// GET Route for the notes page
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('/404', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/404.html'))
);
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
