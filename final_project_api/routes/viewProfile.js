var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');

router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    let user = req.body.username;
    user = user.substring(1,user.length-1);
    connection.query('Select user_id,emp_id,CONCAT(first_name," ",last_name) AS full_name,email_id,role from users where user_id = "' + user + '"', function (err, rows) {
        if (!err && rows.length != 0) {
            res.json({
                user_id: rows[0].user_id,
                emp_id: rows[0].emp_id,
                full_name: rows[0].full_name,
                email_id: rows[0].email_id,
                role: rows[0].role,
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