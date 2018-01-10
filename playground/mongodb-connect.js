// identical to const MongoClient = require('mongodb').MongoClient; and
// const MongoClientID = require('mongodb').ObjectID; using object destructuring!
const {MongoClient, ObjectID} = require('mongodb');

var obj = new ObjectID();
console.log(obj);


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');

    // db.collection('Todos').insertOne({
    //     text: 'Something To Do',
    //     completed: false
    // }, (err, result) => {
    //     if(err) {
    //         return console.log('Unable to insert To Do.', err);
    //     }

    //     console.log(JSON.stringify(result.ops, undefined, 2));

    // });

    //Insert new doc into Users collection
    //Properties: name, age, location
    // db.collection('Users').insertOne({
    //     name: 'Greg',
    //     age: 27,
    //     location: 'Arden Hills'
    // }, (err, result) => {
    //     if(err) {
    //        return console.log('Unable to insert user.', err);
    //     }

    //     console.log(result.ops[0]._id.getTimestamp());
    // });

    //Closes connection with MongoDB Server
    db.close();
});