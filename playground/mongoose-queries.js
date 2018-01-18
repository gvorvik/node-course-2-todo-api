const {ObjectID} = require('mongodb');

const {mongoose} = require('./../server/db/mongoose');
const {Todo} = require('./../server/models/todo');
const {user} = require('./../server/models/user');

var id = '5a6007dc2fd6760670437851';

//validates the id
if(!ObjectID.isValid(id)) {
    console.log('The ID is not valid.');
}

//Finds all matching criteria (id)
Todo.find({
    _id: id
}).then((todos) => {
    console.log('Todos', todos);
});


//Finds first matching criteria (id)
Todo.findOne({
    _id: id
}).then((todo) => {
    console.log('Todo', todo);
});


//Finds by id
Todo.findById(id).then((todo) => {
    if(!todo) {
        return console.log('ID Not Found.');
    }
    console.log('Todo By Id', todo);
}).catch((e) => {
    console.log(e);
});


//Challenge - query the user collection

var userId = '5a57d470d8e2383aac5147c9';

//Find user by id
user.findById(userId).then((user) => {
    if(!user) {
        return console.log('No user found');
    }
    console.log('User', user);
}).catch((e) => {
    console.log(e);
});
