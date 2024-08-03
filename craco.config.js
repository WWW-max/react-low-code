module.exports = {
  devServer: {
    port: 8000, // B端，前端
    // 正向代理，处理跨越
    proxy: {
      '/api/*': 'http://localhost:4000',
    },
  },
};
