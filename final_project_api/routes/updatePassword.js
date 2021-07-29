var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');

router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    connection.query('Select password from users where user_id = "' + req.body.username + '"', function (err, rows) {
        if (!err && rows.length != 0) {
            if (rows[0].password == req.body.currpassword) {
                connection.query('Update users set password = "' + req.body.newpassword + '" where user_id = "' + req.body.username + '"', function (err, result) {
                    if (!err) {
                        res.json({
                            success: 1
                        });
                    } else {
                        res.json({
                            success: 0,
                            err: 'update password db error'
                        });
                    }
                });
                connection.end();
            } else {
                res.json({
                    success: 0,
                    err: ' Current password does not match !! '
                });
            }
        } else {
            res.json({
                success: 0,
                err: 'password fetching db error'
            });
        }
    });
});

module.exports = router;