import { Construct } from 'constructs';
import {
  DlzStack,
  DlzStackProps,
  IamIdentityCenter,
} from '../../../constructs/index';
import { DataLandingZoneProps } from '../../../data-landing-zone-types';

export class ManagementGlobalIamIdentityCenterStack extends DlzStack {
  constructor(scope: Construct, stackProps: DlzStackProps, private props: DataLandingZoneProps) {
    super(scope, stackProps);

    new IamIdentityCenter(this, this.props.organization, this.props.iamIdentityCenter!);
  }
}