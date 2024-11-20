import { Construct } from 'constructs';
import { DlzLakeFormationAccessControl, DlzLakeFormationSetup } from './lake-formation';
import { DlzLakeFormationProps } from './lake-formation/interfaces';


const DEFAULTS: Partial<DlzLakeFormationProps> = {
  hybridMode: false,
  crossAccountVersion: 4,
};

export class DlzLakeFormation {
  // TODO: finish these 2 @rehanvdm
  public static roleFromPermissionSet(_permissionSetName: string) { }
  public static roleForAccount(_accountName: string) { }
  private props: DlzLakeFormationProps;

  constructor(private scope: Construct, private id: string, userProps: DlzLakeFormationProps) {
    this.props = { ...DEFAULTS, ...userProps };

    const { admins, crossAccountVersion, hybridMode, tags, permissions } = this.props;
    const setup = new DlzLakeFormationSetup(
      this.scope,
      `${this.id}-setup`,
      { admins, crossAccountVersion, hybridMode },
    );
    const accessControl = new DlzLakeFormationAccessControl(
      this.scope,
      `${this.id}-access-control`,
      { tags, permissions },
    );
    accessControl.node.addDependency(setup.dataLakeSettings);
  }
}
