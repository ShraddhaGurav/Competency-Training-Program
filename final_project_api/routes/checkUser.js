var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');


router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    var action = req.body.action;
    var page = req.body.page;
    var query = '';
    switch (action) {
        case 'checkuser':
            connection.query(query, function (err, rows) {
                if (!err) {
                    if (rows.length != 0) res.json({ success: 1 });
                    else res.json({ success: 0 });
                }
            });
            break;
        case 'checkuid':
            connection.query('select user_id from users where user_id = "' + req.body.userid + '"', function (err, rows) {
                if (!err) {
                    if (rows.length != 0) res.json({ success: 1 });
                    else res.json({ success: 0 });
                }
            });
            break;
        default:
            null
    }
    connection.end();
});

module.exports = router;
