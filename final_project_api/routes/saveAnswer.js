var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');


router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    var questiontype = req.body.questiontype;
    var qaset = req.body.qaset;
    var query = '';

    qaset.forEach(function (element) {
        query += ',(' + element.q_id + ',' + req.body.sessionid + ',' + req.body.scenarioid + ',"' + element.answer + '","' + req.body.traineeid + '")'
    }, this);

    query = query.substring(1, query.length);
    var sql = 'INSERT into result (question_id,session_id,scenario_id,answer,trainee_id) values ';
    var sql_mcq = 'INSERT into result_mcq (question_id,session_id,scenario_id,option_answered,trainee_id) values ';

    switch (questiontype) {
        case 'single':
            sql += query;
            connection.query(sql, function (err, result) {
                if (!err) res.json({ success: 1 });
                else res.json({
                    success: 0,
                    err: err
                });
            });
            break;

        case 'mcq':
            sql_mcq += query;
            connection.query(sql_mcq, function (err, result) {
                if (!err) res.json({ success: 1 });
                else res.json({
                    success: 0,
                    err: err
                });
            });
            break;
    }

    connection.end();
});

module.exports = router;
