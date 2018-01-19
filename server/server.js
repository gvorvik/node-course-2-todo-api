const express = require('express');
const bodyParser = require('body-parser');
const {ObjectID} = require('mongodb');
const _ = require('lodash');

var {mongoose} = require('./db/mongoose');
var {Todo} = require('./models/todo');
var {User} = require('./models/user');

var app = express();
const port = process.env.PORT || 3000;

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
app.get('/todos:id', (req, res) => {
    Todo.find().then((todos) => {
        res.send({todos});
    }, (e) => {
        res.status(400).send(e);
    });
});


//GET /todos/id(dynamic)
app.get('/todos/:id', (req, res) => {
    var id = req.params.id;
    
    //validate id using isvalid
        //if not valid not execution respond with 404
    
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }


    //Query the database using findbyid
        //success case 
            //if todo, send it back
            //if no todo, send back 404 with empty body
        //error case - send nothing and 400
    Todo.findById(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send()
    });
});



app.delete('/todos/:id', (req, res) => {
    //Get the ID
    var id = req.params.id;
    //Validate the ID
        //return 404 if not valid
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    //Remove todo by id
        //error sends back 400 and empty body
    //if success
        //404 if no doc exists
        //200 if doc exists
    Todo.findByIdAndRemove(id).then((todo) => {
        if(!todo) {
            return res.status(404).send();
        }

        res.status(200).send({todo});
    }).catch((e) => {
        res.status(400).send();
    });
});

//method to update existing todos
app.patch('/todos/:id', (req, res) => {
    var id = req.params.id;
    //.pick identifies which parameters we want to be able to update (e.g. text)
    var body = _.pick(req.body, ['text', 'completed']);
    
    if(!ObjectID.isValid(id)) {
        return res.status(404).send();
    }

    //if body.completed is a boolean and is true, 
    if (_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    } else {
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(id, {$set: body}, {new: true}).then((todo) => {
        if (!todo) {
            return res.status(404).send();
        }
        res.send({todo});
    }).catch((e) => {
        res.status(400).send(e);
    });
});



app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});

module.exports = {
    app
};


