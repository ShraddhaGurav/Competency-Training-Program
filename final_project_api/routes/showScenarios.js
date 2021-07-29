var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');

router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    connection.query('Select scenarios.session_id,scenarios.session_name,scenarios.scenario_id,scenarios.scenario_name,scenarios.scenario_description,sessions.is_started from scenarios INNER JOIN sessions ON sessions.session_id = scenarios.session_id WHERE sessions.trainer_id = "'+req.body.trainerid+'"', function (err, rows) {
        if (!err) {
            if(rows.length != 0){
                res.json({
                    data: rows,
                    success: 1
                });
            } else {
                res.json({
                    data: rows,
                    success: 2
                });
            }
        }else{
            res.json({
                success:0
            });
        }
    });
    connection.end();
});

module.exports = router;