var express = require('express');
var bodyParser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();

//app.use takes and configures middleware
//body-parser takes json data and converts it to an object
//I sent the json that is converted via Postman
app.use(bodyParser.json());

//Method to send todos to server
app.post('/todos', (req, res) => {
    var todo = new Todo({
        text: req.body.text
    });

    //saves model to database
    todo.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });
});

//Gets all existing todos
app.get('/todos', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});

app.listen(3000, () => {
    console.log('Started on port 3000.');
});

module.exports = {
    app
};


