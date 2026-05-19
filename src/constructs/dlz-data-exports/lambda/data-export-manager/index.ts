import {
  BCMDataExportsClient,
  CreateExportCommand,
  DeleteExportCommand,
  ResourceNotFoundException,
  UpdateExportCommand,
  ValidationException,
} from '@aws-sdk/client-bcm-data-exports';
/* eslint-disable-next-line import/no-extraneous-dependencies */
import { CloudFormationCustomResourceEvent } from 'aws-lambda';

const client = new BCMDataExportsClient({ region: 'us-east-1' });

interface ExportInput {
  Name: string;
  Description: string;
  DataQuery: { QueryStatement: string; TableConfigurations: any };
  DestinationConfigurations: any;
  RefreshCadence: { Frequency: string };
}

export type HandlerResponse = { PhysicalResourceId: string; Data?: { ExportArn?: string } };

async function createExport(input: ExportInput): Promise<string> {
  const result = await client.send(new CreateExportCommand({ Export: input as any }));
  if (!result.ExportArn) throw new Error('CreateExport returned no ExportArn');
  return result.ExportArn;
}

async function deleteExportSafe(arn: string): Promise<void> {
  // Rollback DELETE after a failed CREATE: CFN passes the logical-id placeholder
  // instead of a real ARN. Skip the API call so BCM doesn't reject it.
  if (!arn.startsWith('arn:')) {
    console.log(`Skipping DeleteExport — PhysicalResourceId '${arn}' is not a BCM ARN (likely a failed-CREATE rollback).`);
    return;
  }
  try {
    await client.send(new DeleteExportCommand({ ExportArn: arn }));
  } catch (err) {
    if (err instanceof ResourceNotFoundException) {
      console.log('Export already gone; treating delete as no-op.');
      return;
    }
    if (err instanceof ValidationException) {
      console.log(`DeleteExport ValidationException — treating as no-op. ${err.message}`);
      return;
    }
    throw err;
  }
}

async function updateOrReplace(arn: string, input: ExportInput): Promise<string> {
  try {
    await client.send(new UpdateExportCommand({ ExportArn: arn, Export: input as any }));
    return arn;
  } catch (err) {
    if (err instanceof ResourceNotFoundException) {
      console.log('UpdateExport: export not found; creating fresh.');
      return createExport(input);
    }
    if (err instanceof ValidationException) {
      console.log(`UpdateExport rejected (${err.message}); falling back to delete + create.`);
      await deleteExportSafe(arn);
      return createExport(input);
    }
    throw err;
  }
}

function buildInput(props: Record<string, any>): ExportInput {
  return {
    Name: props.Name,
    Description: props.Description,
    DataQuery: {
      QueryStatement: props.QueryStatement,
      TableConfigurations: JSON.parse(props.TableConfigurations),
    },
    DestinationConfigurations: JSON.parse(props.DestinationConfigurations),
    RefreshCadence: { Frequency: props.Frequency },
  };
}

export const handler = async (event: CloudFormationCustomResourceEvent): Promise<HandlerResponse> => {
  console.log('Event:', JSON.stringify(event, null, 2));

  const props = event.ResourceProperties;

  if (event.RequestType === 'Create') {
    const arn = await createExport(buildInput(props));
    return { PhysicalResourceId: arn, Data: { ExportArn: arn } };
  }

  if (event.RequestType === 'Update') {
    const oldArn = event.PhysicalResourceId;
    const oldName = event.OldResourceProperties.Name;
    if (oldName !== props.Name) {
      await deleteExportSafe(oldArn);
      const arn = await createExport(buildInput(props));
      return { PhysicalResourceId: arn, Data: { ExportArn: arn } };
    }
    const arn = await updateOrReplace(oldArn, buildInput(props));
    return { PhysicalResourceId: arn, Data: { ExportArn: arn } };
  }

  // Delete
  const arn = event.PhysicalResourceId;
  await deleteExportSafe(arn);
  return { PhysicalResourceId: arn };
};
