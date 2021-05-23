import { APIGatewayProxyHandler } from "aws-lambda";

import { documentClient } from '../utils/dynamodbClient';

export const handle: APIGatewayProxyHandler = async (event) => {
  const { id } = event.pathParameters;

  const response = await documentClient.query({
    TableName: 'user_certificates',
    KeyConditionExpression: "id = :id",
    ExpressionAttributeValues: {
      ":id": id
    }
  }).promise();

  const userCertificate = await response.Items[0];

  if (userCertificate) {
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Certificado valido',
        name: userCertificate.name,
        url: `https://serverlesscertificate.s3.us-east-2.amazonaws.com/${id}.pdf`
      })
    }
  }

  return {
    statusCode: 400,
    body: JSON.stringify({
      message: 'Certificado invalido!',
    })
  }
}
