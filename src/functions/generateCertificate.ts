import { documentClient } from '../utils/dynamodbClient';

interface ICreateCertificate {
  id: string;
  name: string;
  grade: string;
}

export const handle = async (event) => {

  const { id, name, grade } = JSON.parse(event.body) as ICreateCertificate;

  const params = {
    TableName: 'user_certificates',
    Item: {
      id,
      name,
      grade
    }
  }

  await documentClient.put(params).promise();

  return {
    statusCode: 201,
    body: JSON.stringify({
      message: 'Certificate created!'
    }),
    headers: {
      'Content-Type': 'application/json',
    }
  }
}
