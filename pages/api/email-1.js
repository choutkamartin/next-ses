const AWS = require("aws-sdk");

export default async function handler(req, res) {
  AWS.config.update({
    accessKeyId: process.env.AWS_SDK_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SDK_SECRET_ACCESS_KEY,
    region: process.env.AWS_SDK_REGION,
  });

  const ses = new AWS.SES({ apiVersion: "2010-12-01" });
  const params = {
    Destination: {
      ToAddresses: [process.env.EMAIL],
    },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: "<div>Test</div>",
        },
        Text: {
          Charset: "UTF-8",
          Data: "Test",
        },
      },
      Subject: {
        Charset: "UTF-8",
        Data: "Test",
      },
    },
    Source: process.env.EMAIL,
  };

  return ses
    .sendEmail(params)
    .promise()
    .then((data) => {
      console.log(data);
      res.json({
        statusCode: 200,
        body: `Message sent.`,
      });
    })
    .catch((error) => {
      console.error(error);
      res.json({
        statusCode: 500,
        body: `Error occured: ${error}`,
      });
    });
}
