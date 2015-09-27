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
var initializeQuestion = function(id, text, responses, answer, isEnabled) {
 var question = new Question();

 question.questionid = id;
 question.questiontext = text;
 question.responses = responses;
 question.answer = answer;
 question.isEnabled = isEnabled;

 return question;
};

var initializeQuestions = function() {
  var initialQuestions = [];

  initialQuestions.push(initializeQuestion("1", "This is the first question?", ["true","false","maybe","#antoine sucks!"], 3, true));
  initialQuestions.push(initializeQuestion("2", "This is the second question?", ["true","false","maybe","#antoine sucks!"], 3, true));

  return initialQuestions;
};

app.get('/test', function(req, res) {
  console.log("ping");
  res.send('pong');
});

app.post('/login', function(req, res) {
  User.findOne({ 'username' :  req.body.username }, function(err, user) {
      // if there are any errors, return the error before anything else
      if (err) {
        console.log(err);
        res.send(err);
        return;
      }

      // if no user is found
      if (!user) {
        console.log("User not found");
        res.sendStatus(403);
        return;
      }

      // if the user is found but the password is wrong
      if (!user.validPassword(req.body.password)) {
        console.log("Incorrect password");
        res.sendStatus(403);
        return;
      }

      // all is well, return successful user
      res.send(user);
    });
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

// POST /quiz - initiates the quiz using the request object
// GET /quiz-info/{quizId} - returns meta-info for the provided request object
// GET /quiz/{quizId}/question/{questionNumber} - get question info
// POST /quiz/{quizId}/question/{questionNumber} - submit user’s response

// app.post('/quiz', function(req, res){
// //   DAVID WILL SEND THIS:
// //   {
// //     "phoneNumber": 4165551234,
// //     "quizId": 1234
// //   }

// // I WILL RESPOND WITH THIS:
// // {
// //   "totalQuestions": 5,
// //   "friendName": "Jerry",
// //   "gender": "male"
// // }
// });

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

    console.log("user.questions[(req.query.question_number -1)]: " + user.questions[(req.query.question_number -1)]);
    res.send(user.questions[(req.query.question_number -1)]);
  });

});

app.post('/quiz/question', function(req, res){
  console.log(req.body);
  res.sendStatus(200);
});

// .POST.{
//   "quizId": 1234,
//   "phoneNumber": 4165551234,
//   "questionNumber": 2,
//   "response": 2

//   res.sendStatus(200);
// }

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