'use strict'
const AWS = require('aws-sdk');

AWS.config.update({ region: "sa-east-1" });

exports.handler = async (event, context) => {
    const ddb = new AWS.DynamoDB({ apiVersion: "2012-10-08" });
    const documentClient = new AWS.DynamoDB.DocumentClient({ region: "sa-east-1" });

    const params = {
        TableName: "Reservations",
        Item: {
            id: id,
            clientAddress: clientAddress,
            clientName: clientName,
            clientPayment: clientPayment,
            minionColor: minionColor,
            minionSize: minionSize,
            minionType: minionType
        }
    }

  let responseBody = "" ;
  let statusCode = 0;
  const {id, clientAddress, clientName, clientPayment, minionColor, minionSize, minionType} = JSON.parse(event.body);

    try {
        const data = await documentClient.put(params).promise();
        responseBody = JSON.stringify(data);
        statusCode = 201;

    } catch (err) {
        responseBody = `Não é possível reservar o produto: ${err}`;
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