import {
  GuardDutyClient,
  ListDetectorsCommand,
  UpdateDetectorCommand,
  UpdateOrganizationConfigurationCommand,
  type DetectorFeatureConfiguration,
  type OrgFeature,
  type OrgFeatureStatus,
} from '@aws-sdk/client-guardduty';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import {
  CloudFormationCustomResourceEvent,
} from 'aws-lambda';

const guarddutyClient = new GuardDutyClient({ region: process.env.AWS_REGION });

/*
* This function is wrapped by the CDK CustomResourceProvider.getOrCreateProvider logic entrypoint, this is the wrapper:
* https://github.com/aws/aws-cdk/blob/main/packages/@aws-cdk/custom-resource-handlers/lib/core/nodejs-entrypoint-handler/index.ts
* It handles some edge cases around Custom Resources for us. Most notably if this function returns successfully
* (regardless of the { Status: 'SUCCESS' | 'FAILED' } status) the wrapper overrides the response to { Status: 'SUCCESS' }
* A failed can only be generated if this function throws an error. It will then set the Status to 'FAILED' and
* the Reason will be the `error.message`. The `HandlerResponse` type is copied from that file, I couldn't find it exported
*  */
export type HandlerResponse = undefined | {
  Data?: any;
  PhysicalResourceId?: string;
  Reason?: string;
  NoEcho?: boolean;
};

async function getDetectorId(): Promise<string> {
  console.log('Listing detectors...');
  const detectors = await guarddutyClient.send(new ListDetectorsCommand({}));
  console.log('ListDetectors response:', JSON.stringify(detectors.DetectorIds));
  if (!detectors.DetectorIds || detectors.DetectorIds.length === 0) {
    throw new Error('No GuardDuty detector found in the delegated admin account');
  }
  return detectors.DetectorIds[0];
}

export const handler = async (
  event: CloudFormationCustomResourceEvent,
): Promise<HandlerResponse> => {
  console.log('Received event:', JSON.stringify(event, null, 2));
  console.log(`Handler invoked: RequestType=${event.RequestType}, Region=${process.env.AWS_REGION}`);

  try {
    const { physicalResourceId } = event.ResourceProperties;
    const response: HandlerResponse = {
      PhysicalResourceId: physicalResourceId,
    };

    const detectorId = await getDetectorId();
    console.log(`Using detector: ${detectorId}`);

    if (event.RequestType === 'Create' ||
        event.RequestType === 'Update') {

      const autoEnableOrgMembers = event.ResourceProperties.autoEnableOrgMembers;
      const features: { name: string; status: string; autoEnable: string }[] = JSON.parse(event.ResourceProperties.features);

      console.log(`Configuration: autoEnableOrgMembers=${autoEnableOrgMembers}`);
      console.log('Features:', JSON.stringify(features));

      // Update the detector's own feature configuration
      const detectorFeatures = features.map(f => ({
        Name: f.name,
        Status: f.status,
      } as DetectorFeatureConfiguration));
      console.log('Updating detector features:', JSON.stringify(detectorFeatures));

      const updateDetectorResult = await guarddutyClient.send(new UpdateDetectorCommand({
        DetectorId: detectorId,
        Enable: true,
        Features: detectorFeatures,
      }));
      console.log('UpdateDetector response:', JSON.stringify(updateDetectorResult.$metadata));

      // Update organization-level auto-enable configuration
      const orgFeatures = features.map(f => ({
        Name: f.name as OrgFeature,
        AutoEnable: f.autoEnable as OrgFeatureStatus,
      }));
      console.log('Updating organization configuration:', JSON.stringify({
        AutoEnableOrganizationMembers: autoEnableOrgMembers,
        Features: orgFeatures,
      }));

      const updateOrgResult = await guarddutyClient.send(new UpdateOrganizationConfigurationCommand({
        DetectorId: detectorId,
        AutoEnableOrganizationMembers: autoEnableOrgMembers,
        Features: orgFeatures,
      }));
      console.log('UpdateOrganizationConfiguration response:', JSON.stringify(updateOrgResult.$metadata));

    } else if (event.RequestType === 'Delete') {
      const features: { name: string; autoEnable: string }[] = JSON.parse(event.ResourceProperties.features);
      const resetFeatures = features.map(f => ({
        Name: f.name as OrgFeature,
        AutoEnable: 'NONE' as OrgFeatureStatus,
      }));

      console.log('Resetting organization configuration to NONE:', JSON.stringify(resetFeatures));
      const resetResult = await guarddutyClient.send(new UpdateOrganizationConfigurationCommand({
        DetectorId: detectorId,
        AutoEnableOrganizationMembers: 'NONE',
        Features: resetFeatures,
      }));
      console.log('Reset response:', JSON.stringify(resetResult.$metadata));
    }

    console.log('Handler completed successfully');
    return response;
  } catch (error: any) {
    console.error('ERROR:', error.name, error.message);
    console.error('Stack:', error.stack);
    throw error;
  }
};
