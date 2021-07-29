var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');

router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    var query = 'SELECT sessions.session_id,sessions.session_name,sum(result.answer_marks) as answer_marks from sessions INNER JOIN result on sessions.session_id=result.session_id where trainee_id="' + req.body.traineeid + '" and sessions.session_id = ' + req.body.sessionid;
    var query_for_mcq = 'SELECT sessions.session_id,sessions.session_name,sum(result_mcq.marks_allotted) as answer_marks_mcq from sessions INNER JOIN result_mcq on sessions.session_id=result_mcq.session_id where trainee_id="' + req.body.traineeid + '" and sessions.session_id = ' + req.body.sessionid;
    connection.query(query, function (err, rows) {
        if (!err) {
            if (rows[0].answer_marks != null) {
                connection.query(query_for_mcq, function (err, rowsresult) {
                    if (!err) {
                        res.json({
                            data: rows,
                            data_mcq: rowsresult,
                            success: 1
                        });
                    } else {
                        res.json({
                            success: 0
                        })
                    }

                });

            } else {
                res.json({
                    success: 2
                });
            }
        } else {
            res.json({
                success: 0,
                err: err
            });
        }
    });
});

module.exports = router;