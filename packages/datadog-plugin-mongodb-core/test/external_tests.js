'use strict'

const execSync = require('child_process').execSync

const testConfigs = [
  {
    integration: 'mongodb-core',
    repo: 'https://github.com/mongodb-js/mongodb-core',
    framework: 'custom',
    execTests (tracerSetupPath, options) {
      execSync(`npm run env -- mongodb-test-runner -s -t 60000 '${tracerSetupPath}' test/tests`, options)
    },
    env: {
      'MONGODB_VERSION': '4.0.x'
    }
  }
]

module.exports = testConfigs