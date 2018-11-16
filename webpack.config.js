module.exports = {
  entry: ['./src/lambda.js'],
  target: 'node',
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },  
  output: {
    path: `${process.cwd()}/bin`,
    filename: 'index.js',
    libraryTarget: 'umd'
  }
};