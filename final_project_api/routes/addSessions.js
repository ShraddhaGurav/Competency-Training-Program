var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');


router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    var trainerid = req.body.user_id;
    var sessionname = req.body.session_name;
    var sessionduration = req.body.sessionduration;
    connection.query('Insert into sessions values(' + req.body.sessionid + ',"' + req.body.sessionname + '","' + trainerid + '","' + req.body.datecreated + '",' + req.body.sessionduration + ',0,0)', function (err, result) {
        if (!err) res.json({ success: 1 });
        else {
            res.json({ success: 0, err: err });
        }
    });
    connection.end();
});

module.exports = router;
