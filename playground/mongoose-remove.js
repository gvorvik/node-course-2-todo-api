const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {user} = require('./../server/models/user');


//Find all notes and delete
// Todo.remove({}).then((result) => {
//     console.log(result);
// });

//Finds one doc, returns it and deletes it (syntax exactly the same as below)
// Todo.findOneAndRemove();

//Finds one doc by id, returns it and deletes it
Todo.findByIdAndRemove('5a624033f795d5c4b127100d').then((todo) => {
    console.log(todo);
});