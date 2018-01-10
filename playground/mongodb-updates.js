//This file queries, or finds, notes saved in mongoDB
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');

    //findOneAndUpdate
    // db.collection('Todos').findOneAndUpdate({text: 'Eat Lunch'}, {$set: {completed: true}}, {returnOriginal: false}).then((result) => {
    //     console.log(result);
    // });


    //Challenge


    db.collection('Users').findOneAndUpdate({
        _id: new ObjectID('5a5540294c81171fb0fc7b63')
    }, {
        $set: {
            name: 'Greg'
        },
        $inc: {
            age: 1
        }
    }, {
        returnOriginal: false
    }).then((result) => {
        console.log(result);
    });


    //Closes connection with MongoDB Server
    // db.close();
});