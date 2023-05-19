const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile, writeToFile } = require('../../../helpers/fsUtils');
  

//GET Route for obtaining all notes
notes.get('/', (req, res) => {  
 readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));

});
// GET Route for a specific note
notes.get('/:id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => {
        const result = JSON.parse(data).filter((note) => note.id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      });
  });
  
  // DELETE Route for a specific node
  notes.delete(':id', (req, res) => {
    const noteId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => {
        // Make a new array of all notes except the one with the ID provided in the URL
        const result = JSON.parse(data).filter((note) => note.id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
      })
});
      // Post Route for adding a note to the list
notes.post('/', (req, res) => {

    const { title, text } = req.body;
    if (req.body) {
       const newNote = {
        title,
        text,
        id: uuidv4(),
       };
       readAndAppend(newNote, './db/db.json');
       res.json(`Your new note was created!`); 
    } else{
      res.error('There was an error in adding your note')
    }
});

module.exports = notes;