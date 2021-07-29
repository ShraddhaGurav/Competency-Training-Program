var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');


router.get('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    connection.query('SELECT IFNULL(MAX(question_id), 0) length FROM ( SELECT question_id FROM qa UNION ALL SELECT question_id FROM qamcq ) a', function (err, rows) {
        if (!err) res.json({ length: rows[0].length });
        else res.json({ length: 'not-defined' });
    });
    connection.end();
});

module.exports = router;
