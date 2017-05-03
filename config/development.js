const server = { host: 'rp3.redpelicans.com', port: 8585 };
const serverUrl = `http://${server.host}:${server.port}`;
module.exports = {
  // devtool: 'eval-source-map',
  devtool: 'cheap-module-eval-source-map',
  server,
  devServer: {
    contentBase: './public',
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: 'errors-only',
    host: '0.0.0.0',
    port: 3001,
    proxy: {
      '/api': {
        target: serverUrl,
        secure: false,
      }
    },
  },
}
