const path = require("path");

module.exports = {
  entry: "./src/script.js",
  output: {
    filename: "combined.js",
    path: path.resolve(__dirname, "static"),
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js"],
  },
};
