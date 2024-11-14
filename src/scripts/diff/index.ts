import { DataLandingZoneProps } from '../../data-landing-zone-types';
import { runCommand } from '../lib/helpers';

export async function all(props: DataLandingZoneProps) {
  await runCommand('cdk', [
    'diff',
    '"**"',
    process.env.CI ? '' : `--profile ${props.localProfile}`,
  ].join(' '));
}

export async function select(props: DataLandingZoneProps, id: string) {
  await runCommand('cdk', [
    'diff',
    '"'+id+'"',
    '--exclusively',
    process.env.CI ? '' : `--profile ${props.localProfile}`,
  ].join(' '));
}