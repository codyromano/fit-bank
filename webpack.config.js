var path = require("path");

module.exports = {
  entry: "./webpack-entry.js",
  output: {
    path: path.join(__dirname, "src/public/js/"),
    filename: "webpack-bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
