//Require Mongoose
var mongoose = require('mongoose');

//Connect to local server
mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.exports = {
    mongoose
};