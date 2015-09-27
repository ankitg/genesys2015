// server.js
// set up ======================================================================
var express		 = require('express'),
	bodyParser	 = require('body-parser'),
	mongoose 	   = require('mongoose'),
	passport 	   = require('passport'),
	port     	   = process.env.PORT || 9003,
	app			     = new express(),
  _            = require('lodash');

var configDB = require('./config/database.js');

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to the database
require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(bodyParser.urlencoded({ extended: false })); // get information from POST body
app.use(bodyParser.json());

// CORS
var CORS = function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
};
app.use(CORS);

// required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use('/api', CORS, passport.authenticate('basic'), ensureAuthenticated);

// routes ======================================================================
var User      = require('./models/usermodel'),
    Question = require('./models/questionmodel');


// initializing the questions
var initializeQuestion = function(id, text, responses, answer, isEnabled, questionImage, responseImages) {
 var question = new Question();

 question.questionid = id;
 question.questiontext = text;
 question.responses = responses;
 question.answer = answer;
 question.isEnabled = isEnabled;
 question.questionImage = questionImage;
 question.responseImages = responseImages;

 return question;
};

var initializeQuestions = function() {
  var initialQuestions = [];

  initialQuestions.push(initializeQuestion("1", "If life were a video game, what kind would it be?", ["Action","RPG","Adventure","Party"], 4, true, "http://s3-ak.buzzfeed.com/static/2014-11/21/11/tmp/webdr03/bc788ed15d3794b6112bd3a366e1d0ea-0.jpg", ["http://s3-ak.buzzfeed.com/static/2014-11/20/14/enhanced/webdr10/enhanced-buzz-23496-1416513204-23.jpg","http://s3-ak.buzzfeed.com/static/2014-11/20/14/enhanced/webdr06/enhanced-buzz-21586-1416513224-15.jpg","http://s3-ak.buzzfeed.com/static/2014-11/20/14/enhanced/webdr04/enhanced-buzz-7567-1416513232-15.jpg","http://s3-ak.buzzfeed.com/static/2014-11/20/14/enhanced/webdr04/enhanced-buzz-7655-1416513240-4.jpg"]));
  initialQuestions.push(initializeQuestion("2", "Your favourite type of music is?", ["Pop","HipHop","Metal","Country"], 1, true, "http://s3-ak.buzzfeed.com/static/2014-11/20/14/tmp/webdr08/3abf09a782fcf8e7a528557c2c05fed8-15.jpg", ["http://s3-ak.buzzfeed.com/static/2014-11/20/14/enhanced/webdr07/enhanced-buzz-15081-1416513262-17.jpg","http://s3-ak.buzzfeed.com/static/2014-11/20/14/enhanced/webdr01/enhanced-buzz-19442-1416513270-11.jpg","http://s3-ak.buzzfeed.com/static/2014-11/20/14/enhanced/webdr05/enhanced-buzz-18576-1416513287-8.jpg","http://s3-ak.buzzfeed.com/static/2014-11/20/14/enhanced/webdr03/enhanced-buzz-7924-1416513294-12.jpg"]));
  initialQuestions.push(initializeQuestion("3", "If you starred in a movie, you would be?", ["The stoic badass","The bumbling best friend","The witty scene stealer","The sexy stranger"], 1, true, "http://s3-ak.buzzfeed.com/static/2014-11/20/15/tmp/webdr03/198a29a968bda9e8ef891338c4a53363-14.jpg", ["http://s3-ak.buzzfeed.com/static/2014-11/20/14/enhanced/webdr09/enhanced-buzz-22359-1416513324-14.jpg","http://s3-ak.buzzfeed.com/static/2014-11/20/14/enhanced/webdr09/enhanced-buzz-22359-1416513333-15.jpg","http://s3-ak.buzzfeed.com/static/2014-11/20/14/enhanced/webdr09/enhanced-buzz-22498-1416513342-0.jpg","http://s3-ak.buzzfeed.com/static/2014-11/20/14/enhanced/webdr11/enhanced-buzz-15758-1416513351-43.jpg"]));

  return initialQuestions;
};

app.get('/test', function(req, res) {
  console.log("ping");
  res.send('pong');
});

app.get('/signup', function(req, res) {
    // get the user id
    User.find({},{'userid':1}).sort({'userid':-1}).limit(1).exec(function (err, user_with_max_id) {

      // create the user
      var newUser = new User();

      // set the user id
      if(user_with_max_id.length === 1)
      {
        newUser.userid = user_with_max_id[0].userid + 1;
      }　else {
        newUser.userid = 1000;
      }

      // set the user's local credentials
      newUser.username        = req.query.username;
      newUser.password        = newUser.generateHash(req.query.password); // use the generateHash function in our user model
      newUser.questions       = initializeQuestions();

  	  // save the user
      newUser.save(function(err) {
          if (err) {
          	console.log(err);
              throw err;
          }
          res.send(newUser);
      });

    });
});

app.post('/api/me', function(req, res) {
  User.findOne({'username':req.user.username}, function(err, user){
    res.send(user);
  });
});

app.post('/api/addoreditaresponse', function(req, res) {
    User.findOne({ 'username' :  req.user.username }, function(err, user) {
        // all is well, add / edit the question
        var indexOf = _.findIndex(user.questions, { id : req.body.question.questionid });
        if( indexOf === -1) {
            // Question doesn't exist, adding question.
            user.questions.push(req.body.question);
        } else {
            // Question exist, updating adding question.
            user.questions[indexOf] = req.body.question;
        }

        // save the user
        user.save(function(err) {
            if (err) {
                console.log(err);
                throw err;
            }
            res.send(user);
        });
    });
});


// /quiz routes for the Genesys dial in experience.

app.post('/quiz', function(req, res){
  console.log("req.body.quiz_number is " + req.body.quiz_number);
  User.findOne({'userid':req.body.quiz_number}, function (err, user){
    res.send({
      "totalQuestions":user.questions.length,
      "friendName":user.username,
      "gender":"male"
    });
  });
});

app.get('/quiz/question', function(req, res){

  console.log("req.query.quiz_number: " + req.query.quiz_number);
  console.log("(req.query.question_number -1): " + (req.query.question_number -1));

  User.findOne({'userid':req.query.quiz_number}, function(err, user){
    if(!user) {
      console.log("User with id " + req.query.quiz_number + " was not found.");
      res.sendStatus(400);
    }

    if((req.query.question_number -1) > user.questions.length) {
      console.log("Question at index " + (req.query.question_number -1) + " is greater than available index of questions: " + user.questions.length);
      res.sendStatus(400);
    }

    var temp = {};
    _.assign(temp, user.questions[(req.query.question_number -1)]);
    temp.options_count = temp.responses.count;
    temp.answer_text = temp.responses[temp.answer];
    temp.answer += 1;
    console.log("Response: " + temp);
    res.send(temp);
  });

});

app.post('/quiz/question', function(req, res){
  console.log(req.body);
  res.sendStatus(200);
});


function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
  	res.sendStatus(403);
  }
}

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
// =============================================================================