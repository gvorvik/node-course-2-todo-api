//Require Mongoose
var mongoose = require('mongoose');

//Connect to local server
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/TodoApp', {
    useMongoClient: true
});

module.exports = {
    mongoose
};