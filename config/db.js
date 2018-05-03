const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'eu-cdbr-west-02.cleardb.net',
    user     : 'bb56737d2dcc6d',
    password : '6f96a0a0',
    multipleStatements: true
});
connection.connect((err) => {
    if (err) {
        throw err;
    } else {        
        connection.changeUser({
            database : 'heroku_d5c02d25f68e641'
        }, function(err) {
            if (err) {
            console.log('error in changing database', err);
            return;
            }
        });  
        console.log('database connected');
    }
});

module.exports = connection;