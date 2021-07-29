var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');

router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    var query = 'SELECT * FROM users as u WHERE u.user_id NOT IN(select ts.trainee_id from trainee_session as ts Where ts.session_id = ' + req.body.sessionid + ') AND u.role = "trainee"';
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