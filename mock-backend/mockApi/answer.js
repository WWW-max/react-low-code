module.exports = [
  // 收集（新建）答卷
  {
    path: '/api/answer',
    method: 'post',
    response() {
      return {
        errno: 0,
      };
    },
  },
];
