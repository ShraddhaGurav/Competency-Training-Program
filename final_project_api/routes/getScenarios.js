var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');

router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    connection.query('Select scenario_id,scenario_name from scenarios where session_id='+req.body.sessionid, function (err, rows) {
        if (!err) {
            if(rows.length != 0) {
                res.json({
                    data: rows,
                    success: 1
                });
            } else {
                res.json({
                    success: 2
                });
            }
        }else{
            res.json({
                success:0
            });
        }
    });
    connection.end();
});

module.exports = router;


