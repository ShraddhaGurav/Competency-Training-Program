var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');

router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    var query = 'SELECT DISTINCT(trainee_id) FROM result where session_id = '+req.body.sessionid+' AND scenario_id = '+req.body.scenarioid;
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