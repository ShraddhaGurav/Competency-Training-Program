var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');

router.get('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    connection.query('Select session_id,session_name,trainer_id,DATE(date_created) AS date_created,session_duration,is_active from sessions', function (err, rows) {
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