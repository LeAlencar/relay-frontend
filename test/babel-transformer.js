/* eslint-disable @typescript-eslint/no-var-requires */
const { createTransformer } = require('babel-jest').default

const config = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        }
      }
    ],
    '@babel/preset-typescript'
  ]
}

module.exports = createTransformer(config)
