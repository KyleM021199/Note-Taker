const express = require('express');
const path = require('path');
const api = require('./public/assets/routes/index.js');


const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', api);

app.use(express.static('public'));
//GET Route for the main page
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);
// GET Route for the notes page
app.get('/note', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/404.html'))
);
app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
