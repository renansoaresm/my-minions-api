'use strict'
const AWS = require('aws-sdk');

AWS.config.update({ region: "sa-east-1" });

exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "sa-east-1" });

    const params = {
        TableName: "Reservations"
           
        };

  let responseBody = "" ;
  let statusCode = 0;

    try {
        const data = await documentClient.scan(params).promise();
        responseBody = JSON.stringify(data.Items);
        statusCode = 200;

    } catch (err) {
        responseBody = `Não é possível visualizar a reserva: ${err}`;
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