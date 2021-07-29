var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var cors = require('cors');

var index = require('./routes/index');
var users = require('./routes/users');
var check = require('./routes/checkCredential');
var addUsers = require('./routes/addUsers');
var addSessions = require('./routes/addSessions');
var addScenario = require('./routes/addScenario');
var showUser = require('./routes/showUsers');
var showSession = require('./routes/showSessions');
var getSessionId = require('./routes/getSessionId');
var checkUser = require('./routes/checkUser');
var getIsActiveState = require('./routes/toggleIsActive');
var viewProfile = require('./routes/viewProfile');
var updatePassword = require('./routes/updatePassword');
var getTrainee = require('./routes/getTrainee');
var getSessions = require('./routes/getSessions');
var addTrainee = require('./routes/addTrainee');
var getQuestionId = require('./routes/getQuestionId');
var getScenarios = require('./routes/getScenarios');
var getScenarioId = require('./routes/getScenarioId');
var showScenarios = require('./routes/showScenarios');
var viewTraining = require('./routes/viewTraining');
var addQuestion = require('./routes/addQuestion');
var quesAnswer = require('./routes/quesAnswer');
var saveAnswer = require('./routes/saveAnswer');
var getSubmittedTrainee = require('./routes/getSubmittedTrainee');
var getResult = require('./routes/getResult');
var submittedTest = require('./routes/submittedTest');
var viewScore = require('./routes/viewScore');
var getDataMcq = require('./routes/getDataMcq');
var updateResultMcq = require('./routes/updateResultMcq');
var saveMarks = require('./routes/saveMarks');
var getReportData = require('./routes/getReportData');
var getSummary = require('./routes/getSummary');
var trainerList = require('./routes/trainerList');
var delUser = require('./routes/delUser');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/addusers', addUsers);
app.use('/addsessions', addSessions);
app.use('/addtrainee', addTrainee);
app.use('/addquestion', addQuestion);
app.use('/addscenario', addScenario);
app.use('/checkCredential', check);
app.use('/checkuser', checkUser);
app.use('/getquestionid', getQuestionId);
app.use('/getscenarioid', getScenarioId);
app.use('/getscenarios', getScenarios);
app.use('/getsessionid', getSessionId);
app.use('/getsessions', getSessions);
app.use('/gettrainee', getTrainee);
app.use('/quesans', quesAnswer);
app.use('/showscenario', showScenarios);
app.use('/showsession', showSession);
app.use('/showuser', showUser);
app.use('/getstate', getIsActiveState);
app.use('/updatepassword', updatePassword);
app.use('/profile', viewProfile);
app.use('/viewtraining', viewTraining);
app.use('/saveanswer', saveAnswer);
app.use('/getsubmittedtrainee', getSubmittedTrainee);
app.use('/getresult', getResult);
app.use('/getdatamcq', getDataMcq);
app.use('/updatescoresmcq', updateResultMcq);
app.use('/submittedtest', submittedTest);
app.use('/viewscore', viewScore);
app.use('/savemarks', saveMarks);
app.use('/getreportdata', getReportData);
app.use('/getsummary', getSummary);
app.use('/trainerList', trainerList);
app.use('/deluser', delUser);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
