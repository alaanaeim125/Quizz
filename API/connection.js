var mongoose = require('mongoose');

class Connection {
    constructor() {
        // var mongoURL = 'mongodb://localhost:27017/quizzes';
        var mongoURL = "mongodb+srv://alaanaeim125:ALAAalaa125@cluster0-xyvb3.mongodb.net/quizzes?retryWrites=true&w=majority";
        mongoose.connect(mongoURL, {
            useNewUrlParser: true,
            useCreateIndex: false,
            useFindAndModify: false,
            useUnifiedTopology: true
        });

        var db = mongoose.connection;

        db.on('connected', function() {
            console.log('Connection Successfully : ' + mongoURL);
        })

        db.on('error', function(err) {
            console.log('Error Occured In Connecting To ' + mongoURL + '\n Error Is : ' + err);
        })

        db.on('disconnected', function() {
            console.log('Discoonect Occured In Connecting To ' + mongoURL);
        })

    }
}

var connection = new Connection();
module.exports = Connection;