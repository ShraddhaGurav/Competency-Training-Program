var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');

router.get('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    try {
        var query = 'SELECT user_id FROM users where role="trainer"';
        connection
            .query(query, function (err, row, field) {
                if (err) {
                    throw (err);
                }
                if (row.length > 0) {
                    var user_id = [];
                    for (var i = 0; i < row.length; i++) {
                        user_id[i] = row[i].user_id;
                    }
                    res.json({
                   user_id: user_id,
                        count: row.length,
                        success: 1
                    });
                } else {
                    res.json({
                        success: 0
                    });
                }
            });
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = router;
