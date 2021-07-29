var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');

router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    var questiontype = req.body.questiontype;

    switch (questiontype) {
        case 'single':
            var sql = 'select qa.question_id,qa.session_id,qa.scenario_id,qa.question_description,qa.question_marks,scenarios.scenario_duration from qa INNER JOIN scenarios ON qa.session_id = scenarios.session_id where qa.session_id = ' + req.body.sessionid + ' and qa.scenario_id = ' + req.body.scenarioid + ' and scenarios.scenario_id=' + req.body.scenarioid + ' and scenarios.session_id=' + req.body.sessionid
            connection.query(sql, function (err, rows) {
                console.log(rows);
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
            var query = ' select qamcq.question_id,qamcq.session_id,qamcq.scenario_id,qamcq.question_description,qamcq.question_marks,qamcq.option_a,qamcq.option_b,qamcq.option_c,qamcq.option_d,scenarios.scenario_duration from qamcq INNER JOIN scenarios ON qamcq.session_id = scenarios.session_id where qamcq.session_id = ' + req.body.sessionid + ' and qamcq.scenario_id = ' + req.body.scenarioid + ' and scenarios.scenario_id=' + req.body.scenarioid + ' and scenarios.session_id=' + req.body.sessionid
            connection.query(query, function (err, rows) {
                console.log(rows);
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