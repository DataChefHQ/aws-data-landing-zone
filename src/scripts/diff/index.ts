import { DataLandingZoneProps } from '../../data-landing-zone';
import { runCommand } from '../lib/helpers';

export async function all(props: DataLandingZoneProps) {
  await runCommand('cdk', [
    'diff',
    '"**"',
    process.env.CI ? '' : `--profile ${props.localProfile}`,
  ].join(' '));
}