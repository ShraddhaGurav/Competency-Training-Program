var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');

/* GET home page. */
router.post('/', function(req, res, next) {
    var connection = mysql.createConnection(config);
	connection.query('SELECT * from users where user_id = "'+req.body.userid+'" and password = "'+req.body.password+'" and is_active = 1', function (err, rows) {
		if (!err && rows.length != 0) {
      res.json({
        user_id: rows[0].user_id,
        role: rows[0].role,
        success: 1
      })
    } else {
      res.json({success: 0});
    }
	});
    connection.end();
});

module.exports = router;
