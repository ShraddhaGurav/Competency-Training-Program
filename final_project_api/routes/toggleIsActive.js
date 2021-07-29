var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');


router.post('/', function (req, res, next) {
    var id = req.body.id,
        tableName = req.body.tableName,
        currentState = !req.body.currentState,
        currentState1 = !req.body.currentState1;
        fieldToBeUpdated = req.body.fieldToBeUpdated;

    var connection = mysql.createConnection(config);

    switch (tableName) {
        case 'users':
            connection.query('update users set is_active = ' + currentState + ' where user_id = "' + id + '"', function (err, result) {
                if (!err) res.json({ success: true });
                else res.json({ success: false });
            });
            break;
        case 'sessions':
            var sql;
            if (fieldToBeUpdated == "is_active")
                sql = 'update sessions set ' + fieldToBeUpdated + '=' + currentState + ' where session_id = "' + id + '"';
            else
                sql = 'update sessions set ' + fieldToBeUpdated + '=' + currentState1 + ' where session_id = "' + id + '"';
            connection.query(sql, function (err, result) {
                if (!err) res.json({ success: true });
                else res.json({ success: false });
            });
            break;
        default:
            null;
    }
    connection.end();
});

module.exports = router;
