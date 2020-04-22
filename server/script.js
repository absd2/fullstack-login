// Server-side script - port 4000 by default.
const serverPort = 4000; // customizable. must be also changed on 'client/js/script.js:2'.

console.log('Server settings:');

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
        console.error('   Failed to connect to mySQL database.');
        return;
    }

    console.log('   Connected to mySQL database with ID ' + db.threadId + '.');
});


// Calls express and CORS.
const app = express();
app.use(cors());
app.use(express.json());

// Sets port.
app.listen(serverPort, function() {
    console.log('   Listening on port ' + serverPort + '...');
});
// ::::::  END OF SETUP  ::::::


// POST '/login' PATH
app.post('/login', function(req, res) {
    console.log('');
    console.log('Received POST request at \'/login\' path.');
    var cpf = req.body.cpf;
    var pass = req.body.pass;

    // Mounts query string.
    var query = 'SELECT * FROM login.users WHERE cpf = \'' + cpf + '\' AND pass = \'' + pass + '\'';

    db.query(query, function(error, results, fields) {
        if(typeof(results[0]) != 'undefined') {
            // Found user.
            res.json({
                'status': '100',
                'nome': results[0].nome,
                'cpf': results[0].cpf,
                'sexo': results[0].sexo,
                'horariocad': results[0].horarioCadastro,
                'endereco': results[0].endereco,
                'pass': results[0].pass
            });
        }else{
            // Didn't found user.
            res.json({
                'status': '101'
            });
        }    
    });
    console.log('Request responded.');
    console.log('');
});

// POST '/cadastro' PATH
app.post('/cadastro', function(req, res) {
    console.log('');
    console.log('Received POST request on \'/cadastro\' path.');
    
    // Retrieves all data sent by client.
    var cpf = req.body.cpf;
    var pass = req.body.pass;
    var sexo = req.body.sexo;
    var cep = req.body.cep;
    var numero = req.body.numero;
    var horarioCadastro = req.body.horarioCadastro;
    var nome = req.body.nome;
    var logradouro = req.body.logradouro;

    var endereco = logradouro + '/' + numero + '/' + cep;

    // Verifies if user is already signed up.
    var selectQuery = 'SELECT * FROM login.users WHERE cpf = \'' + cpf + '\'';
    db.query(selectQuery, function(error, results, fields) {
        if(typeof(results[0]) != 'undefined') {
            // User already on database.
            res.json({
                'status': '202'
            });
        }
        
        else{ // didn't found user.

            // Mounts INSERT INTO query.
            var insertQuery = 'INSERT INTO login.users(id, cpf, pass, nome, horarioCadastro, sexo, endereco) VALUES (DEFAULT, \'' + cpf + '\', \'' + pass + '\', \'' +  nome + '\', \'' + horarioCadastro + '\', \'' + sexo + '\', \'' + endereco + '\')';

            db.query(insertQuery, function(errors, results, fields) {
                if(typeof(results) != 'undefined') {
                    // Sucessfully added to DB.
                    res.json({
                        'status': '200'
                    });
                }else{
                    // Couldn't be added to DB.
                    res.json({
                        'status': '201'
                    });
                }
            });
        }    
    });
    console.log('Request responded.');
    console.log('');
});


// POST '/edit' PATH
app.post('/edit', function(req, res) {
    console.log('');
    console.log('Received POST request on \'/edit\' path.');

    var nome = req.body.nomeNovo;
    var cpf = req.body.cpfNovo;
    var sexo = req.body.sexoNovo;
    var logradouro = req.body.logradouroNovo;
    var numero = req.body.numeroNovo;
    var cep = req.body.cepNovo;
    var pass = req.body.passNovo;

    var endereco = logradouro + '/' + numero + '/' + cep;

    var updateQuery = 'UPDATE login.users SET cpf = \'' + cpf + '\', sexo = \'' + sexo + '\', endereco = \'' + endereco + '\', pass = \'' + pass + '\', nome = \'' + nome + '\' WHERE cpf = \'' + cpf + '\'';

    db.query(updateQuery, function(errors, results, fields) {
        if(typeof(results)!='undefined') {
            // Data updated.
            res.json({
                'status': '300'
            });
        }else{
            // Data not updated.
            res.json({
                'status': '301'
            });
        }
    });

    console.log('Request responded.');
    console.log('');
});