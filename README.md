# Next.js and AWS SES (v2 + v3)
A showcase of how two different versions of AWS SDK vary with Vercel.

## The problem
The application consists of two API endpoints. The first endpoint uses the [v2 SDK](https://www.npmjs.com/package/aws-sdk), while the second endpoint uses the [v3 SDK](https://www.npmjs.com/package/@aws-sdk/client-ses). Both examples use environment variables that don't conflict with Vercel AWS variables. On localhost, both SDKs work well. They send an email. What's interesting is the behaviour when using these two kits on Vercel. While the first SDK succeeds and sends the email. The second one doesn't and  throws itself this error message:

```
Error occured: AccessDenied: User `arn:aws:sts::867210282167:assumed-role/cloudwatch_logs_events_putter/5HW69rHjvWBIaHTxG9cOTBQI-23f50e60d4541359d4fe4483f966b678b68f355' is not authorized to perform `ses:SendEmail' on resource `arn:aws:ses:eu-central-1:867210282167:identity/************'
```

The ARN of the resource doesn't match with mine or with any user I specified in IAM. Therefore, I assume 867210282167 is the ARN of the user that Vercel uses to run lambda functions such as mine.
