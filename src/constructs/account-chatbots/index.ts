import { Stack } from 'aws-cdk-lib';
import * as chatbot from 'aws-cdk-lib/aws-chatbot';
import { SlackChannelConfigurationProps } from 'aws-cdk-lib/aws-chatbot/lib/slack-channel-configuration';
import { Construct } from 'constructs';

export interface SlackChannel {
  /**
   * The name of Slack channel configuration
   */
  readonly slackChannelConfigurationName: string;

  /**
   * The ID of the Slack workspace authorized with AWS Chatbot.
   *
   * To get the workspace ID, you must perform the initial authorization flow with Slack in the AWS Chatbot console.
   * Then you can copy and paste the workspace ID from the console.
   * For more details, see steps 1-4 in Setting Up AWS Chatbot with Slack in the AWS Chatbot User Guide.
   * @see https://docs.aws.amazon.com/chatbot/latest/adminguide/setting-up.html#Setup_intro
   */
  readonly slackWorkspaceId: string;

  /**
   * The ID of the Slack channel.
   *
   * To get the ID, open Slack, right click on the channel name in the left pane, then choose Copy Link.
   * The channel ID is the 9-character string at the end of the URL. For example, ABCBBLZZZ.
   */
  readonly slackChannelId: string;
}

export class AccountChatbots {
  public static slackChatBots: Record<string, chatbot.SlackChannelConfiguration> = {};

  public static existsSlackChannel(scope: Construct, chatbotProps: SlackChannel): boolean {
    const account = Stack.of(scope).account;
    const chatBotId = AccountChatbots.slackBotId(account, chatbotProps);
    return !!AccountChatbots.slackChatBots[chatBotId];
  }

  public static addSlackChannel(scope: Construct, id: string, chatbotProps: SlackChannelConfigurationProps) {
    const account = Stack.of(scope).account;
    const chatBotId = AccountChatbots.slackBotId(account, chatbotProps);

    if (AccountChatbots.slackChatBots[chatBotId]) {throw new Error(`Chatbot already exists for account ${account} with id ${chatBotId}`);}

    AccountChatbots.slackChatBots[chatBotId] = new chatbot.SlackChannelConfiguration(scope, id, chatbotProps);
    return AccountChatbots.slackChatBots[chatBotId];
  }

  public static findSlackChannel(scope: Construct, chatbotProps: SlackChannel) {
    const account = Stack.of(scope).account;
    const chatBotId = AccountChatbots.slackBotId(account, chatbotProps);

    if (!AccountChatbots.slackChatBots[chatBotId]) {throw new Error(`No chatbots found for account ${account} with id ${chatBotId}`);}

    return AccountChatbots.slackChatBots[chatBotId];
  }

  private static slackBotId(account: string, chatbotProps: SlackChannel): string {
    return [
      account,
      chatbotProps.slackWorkspaceId,
      chatbotProps.slackChannelId,
      chatbotProps.slackChannelConfigurationName,
    ].join('/');
  }

}
