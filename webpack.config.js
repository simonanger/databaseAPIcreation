module.exports = {
  entry: __dirname + "/source/app.js",
  output: {
    filename: "bundle.js",
    path: __dirname + "/public"
  },
  devtool: 'source-map'
}
