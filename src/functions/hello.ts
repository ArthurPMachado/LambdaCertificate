export const handle = (event) => {
  return {
    statusCode: 201,
    body: {
      message: 'Hello Serverless World'
    },
    headers: {
      'Content-Type': 'application/json'
    }
  }
}
