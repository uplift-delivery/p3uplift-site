# eleventy-sample
Test 11ty project

# Initial Setup
1. Install the AWS CLI
Download and install from https://aws.amazon.com/cli/ — then verify:
aws --version

Or on a Mac, run `brew install aws` (Install [Homebrew](https://brew.sh/))

1. Create an IAM user with programmatic access
    1. In the AWS Console, go to IAM > Users > Create user
    1. Attach the AdministratorAccess policy (you can scope this down later)
    1. Create an access key (choose "Command Line Interface" as the use case)
    1. Save the Access Key ID and Secret Access Key

1. Configure the AWS CLI
    aws configure
    It will prompt for:
    - Access Key ID — from step 2
    - Secret Access Key — from step 2
    - Default region — us-east-1 (the stack is hardcoded to this since ACM certs for CloudFront must be in us-east-1)
    - Output format — json

1. Bootstrap CDK

    This is a one-time setup that creates the staging resources CDK needs in your account:
    ```
    cd infra
    npx cdk bootstrap -c domainName=yourdomain.com
    ```

# How to deploy:
  1. Build the site
  CDK deploys the _site/ folder, so make sure it's built first:
```
  cd ..
  npm run build

  cd infra
  npx cdk deploy -c domainName=yourdomain.com
```
  After deploy, the deploy will pause waiting for certificate validation. You'll need to:

  1. Go to ACM in the AWS Console (us-east-1) and find the pending certificate
  2. Copy the CNAME name and CNAME value it shows for DNS validation
  3. Add those CNAME records at your DNS provider
  4. Wait for validation to complete (usually a few minutes), then the deploy finishes

  Then set up your domain DNS:
  - Apex domain (yourdomain.com) — create an A record (or ALIAS/ANAME if your provider supports it) pointing to the
  CloudFront domain name from the deploy output (e.g. d1234abcd.cloudfront.net)
  - www subdomain — create a CNAME record for www pointing to the same CloudFront domain name