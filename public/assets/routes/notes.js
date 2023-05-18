const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
const { readAndAppend, readFromFile } = require('../../../helpers/fsUtils');
  

//GET Route for obtaining all notes
notes.get('/', (req, res) => {
 readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));

});
// GET Route for a specific note
notes.get('/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        const result = json.filter((note) => note.note_id === noteId);
        return result.length > 0
          ? res.json(result)
          : res.json('No note with that ID');
      });
  });
  
  // DELETE Route for a specific node
  notes.delete('/notes/:note_id', (req, res) => {
    const noteId = req.params.note_id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all tips except the one with the ID provided in the URL
        const result = json.filter((note) => note.note_id !== noteId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${noteId} has been deleted 🗑️`);
      });
  });
// Post Route for adding a note to the list
notes.post('/', (req, res) => {

    const { title, text } = req.body;
    if (req.body) {
       const newNote = {
        title,
        text,
        note_id: uuidv4(),
       };
       readAndAppend(newNote, './db/db.json');
       res.json(`Your new note was created!`); 
    } else{
      res.error('There was an error in adding your note')
    }
});

module.exports = notes;