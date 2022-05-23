import { Stack, StackProps, SecretValue } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as pl from 'aws-cdk-lib/pipelines';

export class PipelinePlayStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const pipeline = new pl.CodePipeline(this, 'Pipeline', {
      synth: new pl.ShellStep('Synth', {
        // Use a connection created using the AWS console to authenticate to GitHub
        // Other sources are available.
        input: pl.CodePipelineSource.gitHub('biffgaut/test-app', 'release', {
          // This is optional
          authentication: SecretValue.secretsManager('github-pipeline-token'),
        }),
        commands: [
          'npm ci',
          'npm run build',
          'npx cdk synth',
        ],
      }),
    });
  }
}
