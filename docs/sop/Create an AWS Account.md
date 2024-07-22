# Create an AWS Account

**Last reviewed:** 27 March 2024

## Steps

### Create Account in the AWS Console

> [!CAUTION]
> Ensure that the [Account Factory Settings](Account%20Factory%20Settings.md) are correct before creating the account.

1. Log in to the Management Account and navigate to Control Tower (CT), ensure you are in the correct region.
1. Click on the `Account Factory` in the left-hand menu. Then on `Create Account`.
1. Fill all the details in. 
   - Make sure that the email address exists and is unique. Use "plus aliasing" if you need to create multiple accounts
     with the same email address.
   - Choose the correct OU, according to the account that you are creating:
      - `Workloads` OU 
        - `Production` account
        - `Develop` account
     
       If you hae not created the OUs yet, you can do so now by following the steps in
       [Create Organization OUs](Create%20Organization%20OUs.md). 
   
![img.png](img.png)
1. Check your email address, you will recieve 2 emails, the one has the invitation link for the SSO user we specified.
![img_2.png](img_2.png)
1. Choose a password.
![img_1.png](img_1.png)
1. Login with the SSO user and set up MFA. Select tje Authenticator app, and click on Next. Click on Show QR code,
enlarge th web page ans use 1Password to capture the screen and read the QR code. Then enter the QR code to finish the 
setup.
![img_3.png](img_3.png)
1. You should now be able to log into the account with the SSO user.
![img_4.png](img_4.png)
1. Make note of the account ID as we will need it for the next steps.

### Add the Account to the SecurityHub Main Account

1. Login to the Audit Account and navigate to SecurityHub.
1. Go the Accounts section under Settings > Configuration and Enable the new account

![img_6.png](img_6.png)

### Add the Account to the CDK Project

1. Add the new account details to the `DataLandingZoneProps` properties being passed to the DataLandingZone component. 
1. Run the bootstrap TS script:
```ts
import { scripts } from 'data-landing-zone';
...
await scripts.bootstrap.all(config);
...
```
