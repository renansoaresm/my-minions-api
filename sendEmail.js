const AWS = require('aws-sdk');
const ses = new AWS.SES();
AWS.config.region = 'sa-east-1';

const RECEIVER = 'thiago@bgcbrasil.com.br';
const SENDER = 'renansoaresmendes@outlook.com';


const response = {
 "isBase64Encoded": false,
 "headers": { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
 "statusCode": 200,
 "body": "{\"result\": \"Success.\"}"
 };

exports.handler = function (event, context) {
    console.log('Received event:', event);
    sendEmail(event, function (err, data) {
        context.done(err, null);
    });
};
 
function sendEmail (event, done) {
    var params = {
        Destination: {
            ToAddresses: [
                RECEIVER
            ]
        },
        Message: {
            Body: {
                Text: {
                    Data: 'Olá {`$clientName`}, aqui estão os dados da sua reserva:  \n Tipo do minion: {`$minionType`} \n Tamanho do minion:{`$minionSize`} \n Cor do minion: {`$minionColor`} \n Endereço da Entrega: {`clientAddress`} \n Tipo de Pagamento: {`$clientPayment`}', 
                    Charset: 'UTF-8'
                }
            },
            Subject: {
                Data: 'Os dados da sua reserva',
                Charset: 'UTF-8'
            }
        },
        Source: SENDER
    };
    ses.sendEmail(params, done);
}