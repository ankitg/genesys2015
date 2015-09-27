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

// required for passport
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use('/api', passport.authenticate('basic'), ensureAuthenticated);

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

  initialQuestions.push(initializeQuestion("1", "This is the first question?", ["true","false"], -1, false));
  initialQuestions.push(initializeQuestion("1", "This is the second question?", ["true","false"], -1, false));

  return initialQuestions;
};

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
	res.send(req.user.username);
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

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    User.findOne({ 'username' :  req.user.username }, function(err, user) {
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

        next();
    });
  } else {
  	res.sendStatus(403);
  }
}

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
// =============================================================================