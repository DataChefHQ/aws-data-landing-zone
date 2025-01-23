import { DataLandingZoneProps } from '../../data-landing-zone-types';
import { runCommand } from '../lib/helpers';

export async function synth(props: DataLandingZoneProps) {
  await runCommand('cdk', [
    'synth',
    process.env.CI ? '' : `--profile ${props.localProfile}`,
  ].join(' '));
}
