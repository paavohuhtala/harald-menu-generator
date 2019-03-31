module.exports = {
  entry: {
    harald: './src/harald-lambda.js',
    pohina: './src/pohina-lambda.js'
  },
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
    filename: '[name]/index.js',
    libraryTarget: 'umd'
  }
};