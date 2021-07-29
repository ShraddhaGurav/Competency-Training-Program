var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');


router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);

    var marks_allocated = req.body.marks_allocated;
    var question = req.body.question_id;
    var sessionid = req.body.sessionid;
    var traineeid = req.body.traineeid;

    connection.query('Update result_mcq set marks_allotted = ' + req.body.marks_allocated + ' where question_id = ' + req.body.question_id + ' and session_id = ' + req.body.sessionid + ' and trainee_id = "' + req.body.traineeid + '"', function (err, result) {
        if (!err) {
            res.json({
                success: 1
            });
        } else {
            res.json({
                success: 0
            })
        }

    });

    connection.end();

});

module.exports = router;