var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');

router.get('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    connection.query('Select user_id,emp_id,CONCAT(first_name," ",last_name) AS full_name,email_id,role,date_created,is_active from users', function (err, rows) {
        if (!err && rows.length != 0) {
            res.json({
                data: rows,
                success: 1
            });
        }else{
            res.json({
                success:0
            });
        }
    });
    connection.end();
});

module.exports = router;