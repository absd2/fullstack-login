// Client-side script.
const serverPort = 4000; // customizable. must be also changed at 'server/script.js:2'.
const server_url = 'http://localhost:' + serverPort;

$(document).ready(function() {
    $('form').submit(function(e) {
        // Hide all alerts after new submit.
        $('#login-sucess-alert').css('display', 'none');
        $('#login-fail-alert').css('display', 'none');

        e.preventDefault();

        var cpf = $('#cpf').val(); // stores cpf.
        var pass = $('#password').val(); // stores password.

        $('.spinner-grow').css('display', ''); // shows spinner.
        
        // Prepares object that will be posted.
        var login = {
            cpf,
            pass
        };

        // Sends object.
        fetch(server_url + '/login', {
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
                
                // Hides login area.
                $('#title-area').css('display', 'none');
                $('#form-div').css('display', 'none');

                // Shows logged area and fill up data.
                $('#logged-area').css('display', '');
                $('.form-control').prop('disabled', true);
                $('#nome-after').val(data.nome);
                $('#cpf-after').val(data.cpf);
                $('#sexo-after').val(data.sexo);
                $('#horarioCadastro-after').val(data.horariocad);
                $('#senha-after').val(data.pass);
                
                // Manipulates adress.
                var elementosEndereco = data.endereco.split('/');
                $('#logradouro-after').val(elementosEndereco[0]);
                $('#numero-after').val(elementosEndereco[1]);
                $('#cep-after').val(elementosEndereco[2]);

            }else {
                // User wasn't authenticated.
                $('.spinner-grow').css('display', 'none');
                $('#login-fail-alert').css('display', '');
            }
        });
    });

    $('#cep-after').focusout(function(event){
        fetch('https://viacep.com.br/ws/' + $('#cep-after').val() + '/json/', {
            method: 'GET',
            headers: {
                'content-type': 'application/json'
            }
        }).then(function(response) {
            return response.json();
        }).then(function(data) {
            $('#logradouro-after').val(data.logradouro);
        }).catch(function(error) { // if can't find zipcode.
            $('#logradouro-after').val('');
        });
    });

});

// :::::::::::::::::::::::;;
// :::::::::::::::::::::::;;

//       AFTER-LOGIN!

// :::::::::::::::::::::::;;
// :::::::::::::::::::::::;;

// Stores databases's original values.
var nomeOriginal = '';
var cpfOriginal = '';
var sexoOriginal = '';
var logradouroOriginal = '';
var numeroOriginal = '';
var cepOriginal = '';
var passOriginal = '';

// Stores new values - in case of editing data on the database.
var nomeNovo = '';
var cpfNovo = '';
var sexoNovo = '';
var logradouroNovo = '';
var numeroNovo = '';
var cepNovo= '';
var passNovo = '';


function editData() {
    // Layout differences.
    $('#abortEditingButton').css('display', '');
    $('#saveDataButton').css('display', '');
    $('#backButton').prop('disabled', true); // prevents from going back without saving or aborting changes.
    $('.form-editable').prop('disabled', false); // enables form editing.
    $('#login-fail-success-after').css('display', 'none');
    $('#login-fail-alert-after').css('display', 'none');

    // Stores all original data.
    nomeOriginal = $('#nome-after').val();
    cpfOriginal = $('#cpf-after').val();
    sexoOriginal = $('#sexo-after').val();
    horarioCadastroOriginal = $('#horarioCadastro-after').val();
    logradouroOriginal = $('#logradouro-after').val();
    numeroOriginal = $('#numero-after').val();
    cepOriginal = $('#cep-after').val();
    passOriginal = $('#senha-after').val();
}

function abortEditing() {
    $('#abortEditingButton').css('display', 'none');
    $('#saveDataButton').css('display', 'none');
    $('#backButton').prop('disabled', false);
    $('.form-editable').prop('disabled', true);

    // Fill up the form again, but with original data.
    $('#nome-after').val(nomeOriginal);
    $('#cpf-after').val(cpfOriginal);
    $('#sexo-after').val(sexoOriginal);
    $('#horarioCadastro-after').val(horarioCadastroOriginal);
    $('#logradouro-after').val(logradouroOriginal);
    $('#numero-after').val(numeroOriginal);
    $('#cep-after').val(cepOriginal);
}

function saveData() {
    $('.form-editable').prop('disabled', true);
    $('#abortEditingButton').css('display', 'none');
    $('#saveDataButton').css('display', 'none');
    $('#backButton').prop('disabled', false);

    // Stores new data.
    nomeNovo = $('#nome-after').val();
    cpfNovo = $('#cpf-after').val();
    sexoNovo = $('#sexo-after').val();
    logradouroNovo = $('#logradouro-after').val();
    numeroNovo = $('#numero-after').val();
    cepNovo = $('#cep-after').val();
    passNovo = $('#senha-after').val();

    // Prepares JSON object.
    var newData = {
        nomeNovo,
        cpfNovo,
        sexoNovo,
        logradouroNovo,
        numeroNovo,
        cepNovo,
        passNovo
    }

    // Sends object.
    fetch(server_url + '/edit', {
        method: 'POST',
        body: JSON.stringify(newData),
        headers: {
            'content-type': 'application/json'
        }
    }).then(function(response) {
        return response.json();
    }).then(function(data) {
        if(data.status == 300) {
            // If data was sucessfully edited.
            $('#login-fail-alert-after').css('display', 'none');
            $('#login-success-alert-after').css('display', '');
        }else{
            // If data was NOT sucessfully edited.
            $('#login-fail-success-after').css('display', 'none');
            $('#login-fail-alert-after').css('display', '');
        }
    });
}