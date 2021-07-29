var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');

router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    var questiontype = req.body.questiontype;

    switch (questiontype) {
        case 'single':
            var sql = 'SELECT * FROM result WHERE session_id = ' + req.body.sessionid + ' and scenario_id = ' + req.body.scenarioid + ' and trainee_id = "' + req.body.traineeid + '"';
            connection.query(sql, function (err, rows) {
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

        case 'mcq':
            var sql = 'SELECT * FROM result_mcq WHERE session_id = ' + req.body.sessionid + ' and scenario_id = ' + req.body.scenarioid + ' and trainee_id = "' + req.body.traineeid + '"';
            connection.query(sql, function (err, rows) {
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
    }


    connection.end();
});

module.exports = router;