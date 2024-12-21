const webpack = require('webpack');
const path = require('path');

module.exports = function override(config) {
  const fallback = config.resolve.fallback || {};
  Object.assign(fallback, {
    "crypto": require.resolve("crypto-browserify"),
    "stream": require.resolve("stream-browserify"),
    "assert": require.resolve("assert"),
    "url": require.resolve("url")
  });

  config.resolve.fallback = fallback;
  config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(process.env)
    })
  ]);

  // Ignore source map warnings
  config.ignoreWarnings = [/Failed to parse source map/];

  // Add babel plugin for private property
  config.module.rules.push({
    test: /\.(js|jsx|ts|tsx)$/,
    use: {
      loader: 'babel-loader',
      options: {
        plugins: ['@babel/plugin-transform-private-property-in-object']
      }
    }
  });

  return config;
};
