// craco.config.js
module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Find the Webpack rule that uses babel-loader
      const oneOfRule = webpackConfig.module.rules.find(rule => rule.oneOf);

      if (oneOfRule) {
        const tsRule = oneOfRule.oneOf.find(rule => 
          String(rule.test) === String(/\.(js|mjs|jsx|ts|tsx)$/) && rule.include
        );

        // Add the react-pdf dist directory to Babel's include path
        if (tsRule) {
          const path = require('path');
          const currentDir = path.resolve(__dirname, 'node_modules');
          tsRule.include = Array.isArray(tsRule.include) ? [...tsRule.include] : [tsRule.include];
          tsRule.include.push(path.join(currentDir, 'react-pdf/dist'));
        }
      }
      return webpackConfig;
    },
  },
};