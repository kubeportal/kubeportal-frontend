module.exports = {
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    overlay: {
      warnings: false,
      errors: false
    },
    compress: true,
    disableHostCheck: true,
    port: 8086,
    host: '0.0.0.0'
  }
}
