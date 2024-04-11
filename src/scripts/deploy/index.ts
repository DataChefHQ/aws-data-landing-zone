import { DataLandingZoneProps } from '../../data-landing-zone';
import { runCommand } from '../lib/helpers';

export async function all(props: DataLandingZoneProps) {
  await runCommand('cdk', [
    'deploy',
    '"**"',
    '--require-approval never',
    '--progress events',
    '--concurrency 10',
    process.env.CI ? '' : `--profile ${props.localProfile}`,
  ].join(' '));
}