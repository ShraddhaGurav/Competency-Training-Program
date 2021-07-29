var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var config = require('./config');


router.post('/', function (req, res, next) {
    var connection = mysql.createConnection(config);

    var marks = req.body.marks;
    var queryMarks = 'answer_marks = case ',
        queryReMarks = 'remark = case ',
        queryWhere = 'where question_id in (';
    marks.forEach(function (element) {
        queryMarks += 'when question_id = '+element.q_id+ ' then '+element.mark+' ';
        queryReMarks += 'when question_id = '+element.q_id+ ' then "'+element.remarks+'" '
        queryWhere += element.q_id+', ';
    }, this);

    queryMarks += 'end, ';
    queryReMarks += 'end ';
    queryWhere = queryWhere.substring(0, queryWhere.length - 2);
    queryWhere += ') AND trainee_id = "'+req.body.traineeid+'"';

    var sql = 'update result set '+queryMarks+queryReMarks+queryWhere;
    connection.query(sql, function (err, result) {
        if (!err) res.json({ success: 1 });
        else res.json({
            success: 0,
            err: err
        });
    });
    connection.end();
});

module.exports = router;
