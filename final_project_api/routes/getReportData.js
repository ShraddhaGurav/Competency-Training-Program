var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');


router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    var action = req.body.action;
    switch (action) {
        case 'trainer-overall':
            var sql = 'SELECT r1.scenario_id,r1.answer_marks,r2.trainee_id from result r1 INNER JOIN result r2 on r1.result_id = r2.result_id WHERE r1.session_id=' + req.body.sessionid + ' AND r1.scenario_id in (select scenario_id from scenarios where session_id = ' + req.body.sessionid + ')';
            var sql_mcq = 'SELECT r1.scenario_id,r1.marks_allotted,r2.trainee_id from result_mcq r1 INNER JOIN result_mcq r2 on r1.result_id = r2.result_id WHERE r1.session_id=' + req.body.sessionid + ' AND r1.scenario_id in (select scenario_id from scenarios where session_id = ' + req.body.sessionid + ')';
            connection.query(sql, function (err, rows) {
                if (!err) {
                    connection.query(sql_mcq, function (err, rowsresult) {
                        if (!err && rowsresult.length != 0) {
                            res.json({ success: 1, data: rows, data_mcq: rowsresult })
                        } else {
                            res.json({ success: 2, data: [], data_mcq: [] })
                        }
                    })
                }
                else res.json({ success: 0 });
            });
            break;

        case 'trainer-individual':
            var sql = 'select answer_marks, trainee_id from result WHERE session_id = ' + req.body.sessionid + ' and scenario_id = ' + req.body.scenarioid;
            var sql_mcq = 'select marks_allotted, trainee_id from result_mcq WHERE session_id = ' + req.body.sessionid + ' and scenario_id = ' + req.body.scenarioid;
            connection.query(sql, function (err, rows) {
                if (!err) {
                    connection.query(sql_mcq, function (err, rowsresult) {
                        if (!err && rowsresult.length != 0) {
                            res.json({ success: 1, data: rows, data_mcq: rowsresult });
                        } else {
                            res.json({ success: 2, data: [], data_mcq: rowsresult });
                        }
                    })
                }
                else res.json({ success: 0 });
            });
            break;

        case 'trainee-individual':
            var sql = 'SELECT result.answer_marks, sessions.session_name from result LEFT JOIN sessions on result.session_id = sessions.session_id WHERE result.trainee_id = "' + req.body.trainee + '"';
            var sql_mcq = 'SELECT result_mcq.marks_allotted, sessions.session_name from result_mcq LEFT JOIN sessions on result_mcq.session_id = sessions.session_id WHERE result_mcq.trainee_id = "' + req.body.trainee + '"'
            connection.query(sql, function (err, rows) {
                if (!err) {
                    connection.query(sql_mcq, function (err, rowsresult) {
                        if (!err && rowsresult.length != 0) {
                            res.json({ success: 1, data: rows, data_mcq: rowsresult });
                        } else {
                            res.json({ success: 2, data: [], data_mcq: rowsresult })
                        }
                    })
                }
                else res.json({ success: 0 });
            });
            break;
        default:
            null
    }
});

module.exports = router;
