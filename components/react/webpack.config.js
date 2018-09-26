const webpack = require('webpack');
const path = require('path');

module.exports = env => {
  return ({
    entry: './src/hello-world.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'hello-world.js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV),
      }),
    ],
  });
};
