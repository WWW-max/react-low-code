module.exports = {
  devServer: {
    port: 3000,
    // 正向代理，处理跨越
    proxy: {
      '/api/*': 'http://localhost:4000',
    },
  },
};
