module.exports = {
  devServer: {
    port: 4000, // B端，前端
    // 正向代理，处理跨越
    proxy: {
      '/api/*': 'http://localhost:8000',
    },
  },
  /** 修改webpack配置 */
  webpack: {
    configure(webpackConfig) {
      if (webpackConfig.mode === 'production') {
        // 只在生产环境下抽离公共代码
        if (webpackConfig.optimization == null) {
          webpackConfig.optimization = {};
        }
        webpackConfig.optimization.splitChunks = {
          chunks: 'all',
          cacheGroups: {
            antd: {
              name: 'antd-chunk',
              test: /antd/, // 正则匹配所有的antd文件
              priority: 100, // 权重，值越大，优先抽离
            },
            reactDom: {
              name: 'reactDom-chunk',
              test: /react-dom/,
              priority: 99,
            },
            vendors: {
              name: 'vendors-chunk',
              test: /node_modules/,
              priority: 98,
            },
          },
        };
      }
      return webpackConfig;
    },
  },
};
