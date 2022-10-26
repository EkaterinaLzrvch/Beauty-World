const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: isProd ? false : 'source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader'
      }
    ]
  },
  externals: {
    $: 'jquery',
    jQuery: 'jquery',
    'window.jQuery': 'jquery'
  },
};