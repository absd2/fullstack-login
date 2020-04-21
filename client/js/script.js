// Client-side script.
const serverPort = 4000; // customizable. must be also changed at 'server/script.js:2'.
const server_url = 'http://localhost:' + serverPort + '/login';

$(document).ready(function() {
    $('form').submit(function(e) {
        // Hide all alerts after new submit.
        $('#login-sucess-alert').css('display', 'none');
        $('#login-fail-alert').css('display', 'none');

        e.preventDefault();

        var cpf = $('#cpf').val(); // stores cpf.
        var pass = $('#password').val(); // stores password.

        $('.spinner-grow').css('display', ''); // shows spinner.
    

        // Validates cpf and pass.
        console.log('cpf = ' + cpf + '  /  pass = ' + pass);
        console.log(typeof(cpf) + ' and ' + typeof(pass));
        
        // Prepares object that will be posted.
        var login = {
            cpf,
            pass
        };

        // Sends object.
        fetch(server_url, {
            method: 'POST',
            body: JSON.stringify(login),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(response) { // gets the response.
            return response.json();
        }).then(function(data) { // processes response data.
                if(data.status == 100) {
                    // User was authenthicated.
                    $('.spinner-grow').css('display', 'none');
                    $('#login-sucess-alert').css('display', '');
                }else {
                    // User wasn't authenticated.
                    $('.spinner-grow').css('display', 'none');
                    $('#login-fail-alert').css('display', '');
                }
        });
    });
});