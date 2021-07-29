var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');


router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    connection.query(' SELECT qamcq.question_id,qamcq.session_id,qamcq.question_marks,qamcq.correctanswer,result_mcq.option_answered from qamcq INNER JOIN result_mcq WHERE qamcq.question_id= result_mcq.question_id and result_mcq.trainee_id="' + req.body.traineeid + '"', function (err, rows) {
        console.log(rows);
        if (!err && rows.length != 0) {
            res.json({
                data: rows,
                success: 1
            });
        } else {
            res.json({
                success: 0
            })
        }

    });

    connection.end();

});

module.exports = router;