var path = require("path");

module.exports = {
    entry: "./webpack-entry.js",
    output: {
      path: path.join(__dirname, "src/public/js/"),
      filename: "webpack-bundle.js"
    }
};
