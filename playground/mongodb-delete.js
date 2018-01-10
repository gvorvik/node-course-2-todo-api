//This file queries, or finds, notes saved in mongoDB
const {MongoClient, ObjectID} = require('mongodb');


MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect to MongoDB server.');
    }
    console.log('Connected to MongoDB server.');


    //deleteMany
    // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
    //     console.log(result);
    // });

    //deleteOne
    // db.collection('Todos').deleteOne({text: 'Eat Lunch'}).then((result) => {
    //     console.log(result);
    // });

    //findOneAndDelete
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result);
    // });




    //Challenge
    //1 Delete Duplicates (delete many)
    //2 Use find one and delete using id

    // db.collection('Users').deleteMany({name: 'Greg'}).then((result) => {
    //     console.log(result);
    // });

    db.collection('Users').findOneAndDelete({_id: new ObjectID('5a553a7d8a28fa2f002167ee')}).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
    });

    //Closes connection with MongoDB Server
    // db.close();
});