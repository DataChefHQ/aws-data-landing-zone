
# Setting Up AWS IAM Identity Center External Identity Provider

*AWS IAM Identity Center* (formerly known as AWS Single Sign-On) allows you to centrally manage access to multiple AWS accounts and applications. This guide provides a detailed, step-by-step process to set up IAM Identity Center in your AWS environment.

## Table of Contents

- [Setting Up AWS IAM Identity Center External Identity Provider](#setting-up-aws-iam-identity-center-external-identity-provider)
  - [Table of Contents](#table-of-contents)
  - [Prerequisites](#prerequisites)
  - [Step 1: Sign In to the AWS Management Console](#step-1-sign-in-to-the-aws-management-console)
  - [Step 2: Navigate to AWS IAM Identity Center](#step-2-navigate-to-aws-iam-identity-center)
  - [Step 3: Enable IAM Identity Center](#step-3-enable-iam-identity-center)
  - [Step 4: Choose Your Identity Source](#step-4-choose-your-identity-source)
    - [Connect to an External Identity Provider](#connect-to-an-external-identity-provider)
  - [Step 5: Configure External Identity Provider](#step-5-configure-external-identity-provider)
    - [Some of the information you might need](#some-of-the-information-you-might-need)
    - [Upload the Metadata File](#upload-the-metadata-file)
  - [Step 6: Review And Confirm Your Changes](#step-6-review-and-confirm-your-changes)
  - [Step 7: Make Sure The Automatic Provisioning Is Disabled](#step-7-make-sure-the-automatic-provisioning-is-disabled)
  - [Step 8: Create Trusted Token Issuer](#step-8-create-trusted-token-issuer)
  - [Step 9: IAM Identity Center Settings](#step-9-iam-identity-center-settings)
    - [Key Settings for IAM Identity Center](#key-settings-for-iam-identity-center)
  - [Important notes](#important-notes)

---

## Prerequisites

Before you begin setting up AWS IAM Identity Center, ensure you have the following:

- **AWS Account**: Access to an AWS account with administrative privileges.
- **AWS CLI (Optional)**: Installed and configured if you plan to use command-line tools.
- **Browser**: A modern web browser to access the AWS Management Console.

---

## Step 1: Sign In to the AWS Management Console

1. **Action**: Open your web browser and navigate to the [AWS Management Console](https://aws.amazon.com/console/).
![aws sign in](aws_signin.png)

---

## Step 2: Navigate to AWS IAM Identity Center

- Once logged in, locate the **Find Services** search bar at the top of the console.
- Type **IAM Identity Center** and select it from the dropdown results.
![type iam identity center](type_iam_identity_center.png)

---

## Step 3: Enable IAM Identity Center

- If this is your first time accessing IAM Identity Center, you will be prompted to enable it.
- Click on the **Enable IAM Identity Center** button.
![enable iam identity center](enable_iam_identity_center.png)

---

## Step 4: Choose Your Identity Source

IAM Identity Center allows you to choose where your user identities are managed. You can use the built-in IAM Identity Center directory or connect to an external identity provider (IdP).

### Connect to an External Identity Provider

- Select **External Identity Provider**.
- Follow the prompts to integrate with your chosen IdP (e.g., AWS Managed Microsoft AD, Okta).
![select external identity so](external_identity_select.png)

---

## Step 5: Configure External Identity Provider

Set up your own custom SAML app in your IdP. If for example you are using Google Workspace, you can follow the steps in [this guide](https://support.google.com/a/answer/6087519?hl=en#zippy=%2Cstep-add-the-custom-saml-app) to set up a SAML app.

### Some of the information you might need

- **ACS URL**:
![acs url](image-3.png)

- **Entity ID**:
![entity id](image-4.png)

- **Start URL**:
![start url](image-5.png)

- **Metadata**:
If the provider requires a metadata file, you can download it from the **Metadata** tab.
![metadata](image-6.png)

### Upload the Metadata File

- Once the app has been properly configured, on your IdP, and you have the metadata file, you can upload it in the IAM Identity Center console.
![alt text](image-8.png)

- When you are done, click **Next** to proceed to the next step.
![next](image-7.png)

---

## Step 6: Review And Confirm Your Changes

- Read the information carefully and confirm that you want to proceed.
- Type **ACCEPT** in the text box to confirm your changes and click **Change Identity Source** to proceed.
![accept](image-9.png)

---

## Step 7: Make Sure The Automatic Provisioning Is Disabled

![manual provisioning](image-11.png)

- To disable automatic provisioning, select **Manage provisioning** from the **Actions** dropdown menu.
![manage provisioning](image-12.png)
- In the **Automatic provisioning** section, select **Disable** button.
![disable automatic provisioning](image-13.png)
- Type **DISABLE** in the text box to confirm your changes.
![disable automatic provisioning confirmation](image-14.png)
- Click **Disable automatic provisioning** to proceed.
![disable automatic provisioning proceed](image-15.png)

---

## Step 8: Create Trusted Token Issuer

- Navigate to the **Authentication** section from the settings page by selecting the **Authentication** tab.
![alt text](image-16.png)
- From the **Authentication** section, select **Create trusted token Issuer**.
![create trusted token issuer](image-17.png)
- Enter the trusted token Issuer URL (e.g., ```https://accounts.google.com``` ).
![trusted token issuer url](image-18.png)
- Give the issuer a name (e.g., ```Google``` ).
![trusted token issuer name](image-19.png)
- Make sure to map the identity provider attribute **Email (email)** to the **Email** IAM Identity Center attribute.
![mapping email](image-20.png)
- When you are done, click **Create trusted token issuer** to proceed.
![create trusted token issuer button](image-21.png)

---

## Step 9: IAM Identity Center Settings

- In the IAM Identity Center dashboard, click on **Settings** in the sidebar.
![select settings](select_settings.png)

### Key Settings for IAM Identity Center

**Managing instance**:
![managing instance](image.png)

**Instance arn**:
![instance arn](image-1.png)

**Identity store id**:
![identity store id](image-2.png)

---

## Important notes

- When managing users for external identity provider remember to use the email address as the username.

---
