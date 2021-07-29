var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');


router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    var action = req.body.action;
    switch (action) {
        case 'getsessionid':
            connection.query('select max(scenario_id) as max from scenarios where session_id = ' + req.body.sessionid, function (err, rows) {
                if (!err) {
                    if (rows.length != 0) {
                        res.json({ success: 1, length: rows[0].max });
                    } else {
                        res.json({ success: 1, length: 0 });
                    }
                }
                else res.json({ length: 'not-defined' });
            });
            break;

        case 'getrelatedsession':
            connection.query('select session_id, session_name from sessions where trainer_id = "' + req.body.trainerid + '"', function (err, rows) {
                if (!err) {
                    if (rows.length != 0) {
                        res.json({
                            success: 1,
                            data: rows
                        });
                    } else {
                        res.json({ success: 2 });
                    }
                }
                else res.json({ success: 0, err: err });
            });
            break;
        default:
            null
    }
    connection.end();
});

module.exports = router;
