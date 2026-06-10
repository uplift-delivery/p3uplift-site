#!/usr/bin/env node
import * as cdk from "aws-cdk-lib";
import { StaticSiteStack } from "../lib/static-site-stack";

const app = new cdk.App();

const domainName = app.node.tryGetContext("domainName");
if (!domainName) {
  throw new Error("Missing required context: domainName. Pass it with -c domainName=example.com");
}

new StaticSiteStack(app, "P3UpliftSiteStack", {
  domainName,
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: "us-east-1",
  },
});
