const Mock = require('mockjs');

const Random = Mock.Random;
module.exports = [
  {
    // 创建问卷
    path: '/api/question',
    method: 'post',
    response() {
      return {
        errno: 0,
        data: {
          errno: 0,
          data: {
            id: Random.id(),
          },
        },
      };
    },
  },
];
