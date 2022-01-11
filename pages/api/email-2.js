import { SESClient } from "@aws-sdk/client-ses";
import { SendEmailCommand } from "@aws-sdk/client-ses";

export default async function handler(req, res) {
  const credentials = {
    accessKeyId: process.env.AWS_SDK_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SDK_SECRET_ACCESS_KEY,
    region: process.env.AWS_SDK_REGION,
  };

  const sesClient = new SESClient({
    region: process.env.AWS_SDK_REGION,
    credentials: credentials,
  });

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

  sesClient
    .send(new SendEmailCommand(params))
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
