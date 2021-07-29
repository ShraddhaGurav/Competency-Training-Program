var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');

router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    var selectedrows = req.body.selectedrows,
        sessionid = parseInt(req.body.sessionid);
    var query = 'insert into trainee_session values ("';
    selectedrows.forEach(function (element) {
        query += element + '",' + sessionid + '),("';
    }, this);
    query = query.substring(0, query.length - 3);
    connection.query(query, function (err, result) {

        if (!err) {
            res.json({
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