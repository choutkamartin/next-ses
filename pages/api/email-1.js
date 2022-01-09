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
      ToAddresses: ["success@simulator.amazonses.com"],
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

  ses
    .sendEmail(params)
    .promise()
    .then(() => {
      res.status(200).json({
        message: "Message sent.",
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: `Error occured: ${error}`,
      });
    });
}
