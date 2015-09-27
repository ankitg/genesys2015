// app/models/questionmodel.js
// load the things we need
var mongoose  = require('mongoose');

// define the schema for our user model
var questionSchema = mongoose.Schema({
    questionid 		: String,
    questiontext	: String,
    responses 		: [],
    answer 			: Number,
    isEnabled		: Boolean,
    questionImage	: String,
    responseImages	: [],
});

// create the model for users and expose it to our app
module.exports = mongoose.model('Question', questionSchema);
