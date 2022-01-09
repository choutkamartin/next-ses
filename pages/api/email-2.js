import { SESClient } from "@aws-sdk/client-ses";
import { SendEmailCommand } from "@aws-sdk/client-ses";

export default async function handler(req, res) {
  const credentials = {
    accessKeyId: process.env.AWS_SDK_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SDK_SECRET_ACCESS_KEY,
    region: process.env.AWS_SDK_REGION,
  };

  const sesClient = new SESClient(credentials);

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

  sesClient
    .send(new SendEmailCommand(params))
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
