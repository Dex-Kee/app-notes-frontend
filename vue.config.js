module.exports = {
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
    host: "127.0.0.1",
    // port: 0,
    proxy: 'http://127.0.0.1:8800'
  }
}
