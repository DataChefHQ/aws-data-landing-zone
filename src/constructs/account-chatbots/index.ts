import { Stack } from 'aws-cdk-lib';
import * as chatbot from 'aws-cdk-lib/aws-chatbot';
import { SlackChannelConfigurationProps } from 'aws-cdk-lib/aws-chatbot/lib/slack-channel-configuration';
import { Construct } from 'constructs';

export interface SlackChannel {
  readonly slackChannelConfigurationName: string;
  readonly slackWorkspaceId: string;
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
