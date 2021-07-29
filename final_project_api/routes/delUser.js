var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');


router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    connection.query('delete from users where emp_id = ' + req.body.emp_id + '', function (err, rows) {
        console.log(rows);
        if (!err) res.json({ success: 1 });
        else res.json({ success: 0 });
    });
    connection.end();
});

module.exports = router;