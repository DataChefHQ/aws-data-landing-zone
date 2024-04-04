import {DlzTag} from "./constructs/organization-policies/tag-policy";
import {DataLandingZoneProps} from "./data-landing-zone";

export class Defaults {
  /** *
   * List of services that are denied in the organization
   */
  public static denyServiceList() {
    return [
      "eks:*",
      "ec2:*",
    ]
  }

  /** *
   * Mandatory tags for the organization
   */
  public static mandatoryTags(): DlzTag[] {
    return [{
      name: 'Owner',
    }, {
      name: 'Project',
    }, {
      name: 'Environment',
    }]
  }
}

export class PropsOrDefaults {
  public static getDenyServiceList(props: DataLandingZoneProps) {
    return props.denyServiceList || Defaults.denyServiceList();
  }

  public static getOrganizationTags(props: DataLandingZoneProps) {
    return  [
      ...Defaults.mandatoryTags(),
      ...(props.additionalMandatoryTags ? props.additionalMandatoryTags : [])
    ]
  }
}