export class ControlTowerExemption {
  public static arnNotLike(): { [key: string]: { [key: string]: string[] } } {
    return {
      ArnNotLike: {
        'aws:PrincipalARN': [
          'arn:aws:iam::*:role/AWSControlTowerExecution',
        ],
      },
    };
  }
}
