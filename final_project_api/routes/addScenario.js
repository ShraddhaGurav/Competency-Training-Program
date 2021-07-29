var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');


router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    connection.query('Insert into scenarios values("' + req.body.sessionid + '","' + req.body.sessionname + '","' + req.body.scenarioid + '","' + req.body.scenarioname + '",'+req.body.scenrioduration+',"' + req.body.scenariodescription + '")', function (err, result) {
        if (!err) res.json({ success: 1 });
        else {
            res.json({ success: 0, err: err });
        }
    });
    connection.end();
});

module.exports = router;
