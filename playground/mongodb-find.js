//This file queries, or finds, notes saved in mongoDB
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');

    // db.collection('Todos').find({
    //         _id: new ObjectID("5a5538fe8665540b880babc3")
    //     }).toArray().then((docs) => {
    //     console.log('To dos');
    //     console.log(JSON.stringify(docs, undefined, 2));
    //     }, (err) => {
    //         console.log('Unable to fetch To Do notes', err);
    // });

//     db.collection('Todos').find().count().then((count) => {
//     console.log(`To dos count: ${count}`);
//     }, (err) => {
//         console.log('Unable to fetch To Do notes', err);
// });

    //Query all documents where name is Greg
    //Print them to screen

    db.collection('Users').find({
        name: 'Greg'
    }).toArray().then((docs) => {
        console.log('Users:');
        console.log(JSON.stringify(docs, undefined, 2));
    }, (err) => {
            return console.log('Unable to fetch Users.', err);
        });

    //Closes connection with MongoDB Server
    // db.close();
});