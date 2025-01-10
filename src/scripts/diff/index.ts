import { DataLandingZoneProps } from '../../data-landing-zone-types';
import { runCommand } from '../lib/helpers';
import { warnSuspendedAccountResources } from '../warn-suspended-account-resources';


export async function all(props: DataLandingZoneProps) {
  await runCommand('cdk', [
    'diff',
    '"**"',
    process.env.CI ? '' : `--profile ${props.localProfile}`,
  ].join(' '));

  await warnSuspendedAccountResources(props);
}

export async function select(props: DataLandingZoneProps, id: string) {
  await runCommand('cdk', [
    'diff',
    '"'+id+'"',
    '--exclusively',
    process.env.CI ? '' : `--profile ${props.localProfile}`,
  ].join(' '));

  await warnSuspendedAccountResources(props);
}