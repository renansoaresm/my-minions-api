'use strict'
const AWS = require('aws-sdk');

AWS.config.update({ region: "sa-east-1" });

exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "sa-east-1" });

    const params = {
        TableName: "Reservations",
        Key : {
            id: "12345",
           
        }
    }

  let responseBody = "" ;
  let statusCode = 0;

    try {
        const data = await documentClient.delete(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 204;

    } catch (err) {
        responseBody = `Não é possível deletar a reserva: ${err}`;
        statusCode = 403;

    }

    const response = { 
        statusCode: statusCode,
        headers: {
            "Content-Type": "application/json"
        },
        body: responseBody
    };

    return response;

}