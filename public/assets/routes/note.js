const notes = require('express').Router();
const { v4: uuidv4 } = require('uuid');
 const {readFromFile, readAndAppend } = require('../helpers/fsUtils');

//GET Route for obtaining all notes
notes.get('/', (req, res) => {
 readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));

});
// GET Route for a specific note
// tips.get('/:tip_id', (req, res) => {
//     const tipId = req.params.tip_id;
//     readFromFile('./db/tips.json')
//       .then((data) => JSON.parse(data))
//       .then((json) => {
//         const result = json.filter((tip) => tip.tip_id === tipId);
//         return result.length > 0
//           ? res.json(result)
//           : res.json('No tip with that ID');
//       });
//   });
  
  // DELETE Route for a specific node
//   tips.delete('/:tip_id', (req, res) => {
//     const tipId = req.params.tip_id;
//     readFromFile('./db/tips.json')
//       .then((data) => JSON.parse(data))
//       .then((json) => {
//         // Make a new array of all tips except the one with the ID provided in the URL
//         const result = json.filter((tip) => tip.tip_id !== tipId);
  
//         // Save that array to the filesystem
//         writeToFile('./db/tips.json', result);
  
//         // Respond to the DELETE request
//         res.json(`Item ${tipId} has been deleted 🗑️`);
//       });
//   });
// Post Route for adding a note to the list
notes.post('/', (req, res) => {

    const { title, text } = req.body;
    if (req.body) {
       const newNote = {
        title,
        text,
       };
       readAndAppend(newNote, './db/db.json');
       res.json(`Your new note was created!`); 
    } else{
        res.error('There was an error in adding your note')
    }
});

module.exports = notes;