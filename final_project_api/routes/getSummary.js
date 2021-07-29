var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');

router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    var query = 'SELECT result.trainee_id, qa.question_description, result.answer, result.answer_marks, result.remark from result LEFT JOIN qa ON result.question_id = qa.question_id WHERE result.session_id = ' + req.body.sessionid;
    connection.query(query, function (err, rows) {
        if (!err)
            if (rows.length != 0) {
                res.json({
                    data: rows,
                    success: 1
                });
            } else {
                res.json({
                    data: [],
                    success: 2
                });
            }
        else
            res.json({
                success: 0
            });
    });
    connection.end();
});

module.exports = router;