var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');

router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    var query = 'SELECT sessions.session_id, sessions.session_name, sessions.date_created, scenarios.scenario_id, scenarios.scenario_name, sessions.is_active, sessions.is_started from sessions INNER JOIN scenarios ON scenarios.session_id = sessions.session_id WHERE sessions.is_active != 0 and sessions.trainer_id = "' + req.body.trainerid + '"';
    connection.query(query, function (err, rows) {
        if (!err && rows.length != 0) {
            res.json({
                data: rows,
                success: 1
            });
        }else{
            res.json({
                success:0,
                err: err
            });
        }
    });
    connection.end();
});

module.exports = router;