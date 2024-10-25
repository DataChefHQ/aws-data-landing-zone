# Default notifications in Slack

To facilitate communication regarding the **Data Landing Zone** there are default "channels" that can send notifications to be delivered to the application's team. The "channels" are configured to use **email** or **Slack notification**. For Slack messages these are sent to an **SNS topic** that is delivered to a **ChatBot** and then it gets sent to **Slack Channels**. These channels are created and configured by the user first. The notfication settings are then configured in the **DLZ** using default notification settings at the organization level, or can be set and overridden at the account level.

## To use email notifications

If you want to use email notifications, you need to create a configuration in the **DLZ** that creates these "channels" for teams so that they can get notified by just sending a message to an **SNS topic**. This will then be delivered to the email subscriptions for the **SNS topic**. To setup email notfication using AWS guide use this link: [setting up email notifications](https://docs.aws.amazon.com/sns/latest/dg/sns-email-notifications.html). Its important to note that the email address must be verified before it can be used in the **DLZ**.

## To use Slack notifications

For the Data Landing Zone, each account will need to be configured with a Slack channel. For an AWS account to be able to send notifications to Slack, it must be approved in the Slack workspace. You must manually connect Slack and the aws account(s) before deploying the DLZ.

To follow along using AWS guide use this link: [setting up Slack](https://docs.aws.amazon.com/chatbot/latest/adminguide/Slack-setup.html)

### 1. Navigate to the AWS Chatbot Console

- In the AWS Management Console, search for AWS Chatbot and select it.
- Choose Slack as your chat platform. This will start the process of connecting AWS Chatbot to your Slack workspace.

### 2. Initiate Slack Authorization

- In the AWS Chatbot console, click Configure client under the Slack option. This will redirect you to the Slack authorization page.

### 3. Log In to Your Slack Workspace

- If you are not already logged in to Slack, you’ll be prompted to log in with your Slack credentials.
- Ensure that you log into the Slack workspace where you want to receive AWS Chatbot notifications.

### 4. Request Permissions for the AWS Chatbot App

- After logging in, Slack will display a permissions request page for the AWS Chatbot app.
- This page lists the permissions AWS Chatbot needs to interact with Slack, such as reading and posting messages in specified channels.

### 5. Review Permissions

- Review the list of permissions AWS Chatbot is requesting. These permissions generally include:
  - **Sending Messages**: Allows AWS Chatbot to post messages in specific channels.
  - **Reading Channels**: AWS Chatbot can access channel information to know where to send messages.
- **Explanation**: These permissions are necessary to allow AWS Chatbot to send notifications from AWS services to the specified Slack channels.

### 6. Approve the App

- Click **Allow** to grant the requested permissions. This action approves the AWS Chatbot app for your Slack workspace and completes the connection between Slack and AWS Chatbot.

### 7. Return to AWS Chatbot Console

- After clicking **Allow**, you’ll be redirected back to the AWS Chatbot console in AWS.
- You should see a confirmation message indicating that Slack has been successfully connected.

### 8. Verify the Installation in Slack

- Open Slack and navigate to the **Apps** section on the left sidebar.
- Locate **AWS Chatbot** in the list of installed apps to verify that the app was installed successfully.

### 9. Grant Additional Channel Permissions (if needed)

- By default, AWS Chatbot will only have access to the channel specified during the initial setup. To add it to other channels, you’ll need to invite AWS Chatbot manually by typing /invite @AWS Chatbot in the desired channel.

### 10. Complete Setup in AWS Chatbot Console

- Return to the AWS Chatbot console to finalize configurations, such as selecting specific channels for different types of notifications or setting up IAM roles as needed.

Notes

- Slack Admin Role: Only Slack workspace administrators can approve app installations.
- Custom Permissions: If your organization requires specific permissions, you may customize permissions in the Slack admin panel.

After following these steps, the AWS Chatbot app will be fully approved in Slack, and you’ll be able to configure and start receiving AWS notifications directly in Slack channels.
