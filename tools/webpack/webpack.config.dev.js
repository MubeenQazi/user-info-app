module.exports = {
  mode: 'development',
  entry: ['./src/main.tsx'],
  module: {
    rules: require('./webpack.rules'),
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
    publicPath: '/',
  },
  plugins: require('./webpack.plugins'),
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.css'],
    alias: {
      // React Hot Loader Patch
      'react-dom': '@hot-loader/react-dom',
      // Custom Aliases
      ...require('./webpack.aliases'),
    },
  },
  stats: 'errors-warnings',
  devtool: 'cheap-module-source-map',
  devServer: {
    open: true,
    historyApiFallback: true,
    stats: 'errors-warnings',
    hot: true,
    port: 3005,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  performance: {
    hints: false,
  },
};
