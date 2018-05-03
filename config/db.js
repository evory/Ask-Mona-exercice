const mysql = require('mysql');

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'br200991',
    multipleStatements: true
});
connection.connect((err) => {
    if (err) {
        throw err;
    } else {        
        connection.changeUser({
            database : 'askmonadb'
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