var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');

router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    var query = 'SELECT qa.question_id,qa.question_description,qa.question_marks,result.answer from qa INNER JOIN result WHERE qa.question_id= result.question_id and qa.scenario_id=' + req.body.scenarioid + ' and qa.session_id=' + req.body.sessionid + ' and result.trainee_id="' + req.body.traineeid + '"';
    connection.query(query, function (err, rows) {
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
    connection.end();
});

module.exports = router;