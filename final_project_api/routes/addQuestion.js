var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');


router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);
    var questiontype = req.body.questiontype;

    switch (questiontype) {
        case "single": connection.query('Insert into qa values(' + req.body.questionid + ',' + req.body.sessionid + ',' + req.body.scenarioid + ',"' + req.body.questiondescription + '",' + req.body.questionmarks + ')', function (err, result) {
            if (!err) res.json({ success: 1 });
            else {
                res.json({ success: 0, err: err });
            }
        });
            break;

        case "mcq": connection.query('Insert into qamcq values(' + req.body.questionid + ',' + req.body.sessionid + ',' + req.body.scenarioid + ',"' + req.body.questiondescription + '",' + req.body.questionmarks + ',"' + req.body.optiona + '", "' + req.body.optionb + '" , "' + req.body.optionc + '", "' + req.body.optiond + '" ,"' + req.body.correctanswer + '")', function (err, result) {
            if (!err) res.json({ success: 1 });
            else {
                res.json({ success: 0, err: err });
            }
        });
            break;
            connection.end();
    }
});

module.exports = router;
