const webpack = require('webpack');
const pkg = require('../package.json');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.stories\.tsx?$/,
        loaders: [
          {
            loader: require.resolve('@storybook/source-loader'),
            options: {
              parser: 'typescript',
            },
          },
        ],
        enforce: 'pre',
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        VERSION: JSON.stringify(pkg.version),
      },
    }),
  ],
};
