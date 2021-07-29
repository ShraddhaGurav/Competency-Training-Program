var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');


router.post('/', function(req, res, next) {
    var connection = mysql.createConnection(config);
	connection.query('Insert into users values("'+req.body.userid+'","'+req.body.password+'","'+req.body.empid+'","'+req.body.firstname+'","'+req.body.lastname+'","'+req.body.email+'","'+req.body.role+'","'+req.body.createddate+'",1)', function (err, result) {
		if (!err) res.json({success: true});
        else res.json({success: false, err: err});
	});
    connection.end();
});

module.exports = router;
