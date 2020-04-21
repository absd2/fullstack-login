// Server-side script - port 4000 by default.
const serverPort = 4000; // customizable. must be also changed on 'client/js/script.js:2'.


// ::::::  SETUP BEGIN  ::::::
// Requirements.
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

// Connection with mySQL database - customizable.
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Gilmour#1973',
    database: 'login'
});
db.connect(function(error) {
    if(error) {
        console.error('Failed to connect to mySQL database.');
        return;
    }
    
    console.log('Connected to DB with ID ' + db.threadId);
});

// Calls express and CORS.
const app = express();
app.use(cors());
app.use(express.json());

// Sets port.
app.listen(serverPort, function() {
    console.log('Listening on port ' + serverPort + '...');
});
// ::::::  END OF SETUP  ::::::




// POST '/login' PATH
app.post('/login', function(req, res) {
    var cpf = req.body.cpf;
    var pass = req.body.pass;

    // Mounts query string.
    var query = 'SELECT * FROM login.users WHERE cpf = \'' + cpf + '\' AND pass = \'' + pass + '\'';

    db.query(query, function(error, results, fields) {
        if(typeof(results[0]) != 'undefined') {
            // Found user.
            res.json({
                'status': '100'
            });
        }else{
            // Didn't found user.
            res.json({
                'status': '101'
            });
        }    
    });
    
    
    
});

