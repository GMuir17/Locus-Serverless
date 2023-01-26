import type { AWS } from '@serverless/typescript'

import functions from './src/functions/index'

const serverlessConfiguration: AWS = {
    service: 'locus',
    frameworkVersion: '3',
    useDotenv: true,
    plugins: [
        'serverless-offline',
        'serverless-esbuild',
        'serverless-dotenv-plugin',
    ],
    provider: {
        name: 'aws',
        profile: 'locus',
        runtime: 'nodejs14.x',
        region: 'eu-west-2',
        timeout: 180,
        apiGateway: {
            minimumCompressionSize: 1024,
            shouldStartNameWithService: true,
            apiKeys: ['locusApiKey'],
        },
        environment: {
            AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
            NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
        },
    },
    functions,
    package: { individually: true },
    custom: {
        esbuild: {
            bundle: true,
            minify: false,
            sourcemap: true,
            exclude: ['aws-sdk'],
            target: 'node14',
            define: { 'require.resolve': undefined },
            platform: 'node',
            concurrency: 10,
        },
    },
}

module.exports = serverlessConfiguration
