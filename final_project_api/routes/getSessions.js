var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');

router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    var from = req.body.from;
    switch (from) {
        case 'admin':
            connection.query('Select session_id,session_name from sessions', function (err, rows) {
                if (!err && rows.length != 0) {
                    res.json({
                        data: rows,
                        success: 1
                    });
                } else {
                    res.json({
                        success: 0
                    });
                }
            });
            break;
        case 'trainer':
            connection.query('Select session_id,session_name from sessions where trainer_id = "' + req.body.trainerid + '"', function (err, rows) {
                if (!err && rows.length != 0) {
                    res.json({
                        data: rows,
                        success: 1
                    });
                } else {
                    res.json({
                        success: 0
                    });
                }
            });
            break;
        case 'trainee':
            connection.query('select session_id, session_name,session_duration from sessions WHERE session_id in (SELECT session_id from trainee_session WHERE trainee_id = "' + req.body.traineeid + '") AND is_started = 1', function (err, rows) {
                if (!err) {
                    if (rows.length != 0) {
                        res.json({
                            data: rows,
                            success: 1
                        });
                    } else {
                        res.json({
                            data: [],
                            success: 1
                        });
                    }
                } else {
                    res.json({
                        success: 0
                    });
                }
            });
            break;
        default:
            null
    }
    connection.end();
});

module.exports = router;