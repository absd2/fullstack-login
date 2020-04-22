// Client-side script.
const serverPort = 4000; // customizable. must be also changed at 'server/script.js:2'.
const server_url = 'http://localhost:' + serverPort + '/cadastro';

$(document).ready(function() {

    // Autofill street name based on zip-code using an external API.
    $('#cep').focusout(function(e) {
        fetch('https://viacep.com.br/ws/' + $('#cep').val() + '/json/', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            $('#rua').val(data.logradouro);
        }).catch(function(error) { // if can't find zipcode.
            $('#rua').val('');
        });
    });

    var notFilledInputs=0;
    $('.form-control').focusout(function(e) {
        if(!event.target.value) {
            if(!event.target.classList.contains('is-invalid')) {
                event.target.classList.add('is-invalid');
                notFilledInputs++;
            }
        }else{
            if(event.target.classList.contains('is-invalid')) {
                event.target.classList.remove('is-invalid');
                notFilledInputs--;
            }
        }

        if(notFilledInputs==0) {
            $('#submit').prop('disabled', false);
        }else{
            $('#submit').prop('disabled', true);
        }

    });

    // When form is submitted.
    $('form').submit(function(e) {
        // Hide all alerts after new submit.
        $('#login-sucess-alert').css('display', 'none');
        $('#login-fail-alert').css('display', 'none');
        $('#login-registered-alert').css('display', 'none');
        
        $('.spinner-grow').css('display', ''); // shows spinner.

        e.preventDefault();

        var nome = $('#nome').val(); // stores name.
        var cpf = $('#cpf').val(); // stores cpf.
        var pass = $('#password').val(); // stores password.
        var sexo = $('#sexo').val(); // stores gender.
        var cep = $('#cep').val(); // stores zip-code
        var numero = $('#numero').val(); // stores adress number.
        var logradouro = $('#rua').val(); // stores street name.

        // Input treatment.
        cpf.trim();
        cep.trim();
        
        // Stores signup date.
        var date = new Date();
        var horarioCadastro = date.toDateString() + ' at local time ' + date.toLocaleTimeString();
    
        
        // Prepares object that will be posted.
        var cadastro = {
            nome,
            cpf,
            pass,
            sexo,
            cep,
            numero,
            horarioCadastro,
            logradouro
        };

        // Sends object.
        fetch(server_url, {
            method: 'POST',
            body: JSON.stringify(cadastro),
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(response) { // gets the response.
            return response.json();
        }).then(function(data) { // processes response data.
                if(data.status == 200) {
                    // User signed up.
                    $('.spinner-grow').css('display', 'none');
                    $('#login-sucess-alert').css('display', '');
                }else if(data.status == 202) {
                    // Couldn't sign up.
                    $('.spinner-grow').css('display', 'none');
                    $('#login-registered-alert').css('display', '');
                }else if(data.status == 201) {
                    $('.spinner-grow').css('display', 'none');
                    $('#login-fail-alert').css('display', '');
                }
        });
    });
});
