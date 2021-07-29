var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');


router.get('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    connection.query('select max(session_id) as length from sessions', function (err, rows) {
        if (!err) res.json({ length: rows[0].length });
        else res.json({ length: 'not-defined' });
    });
    connection.end();
});

module.exports = router;
