import Mock from 'mockjs';
const Random = Mock.Random;
module.exports = [
  {
    // 登录
    path: '/api/user/login',
    method: 'post',
    response() {
      return {
        errno: 0,
        data: {
          name: Random.cname(),
          token: Random.string(32),
        },
      };
    },
  },
  {
    // 注册
    path: '/api/user/register',
    method: 'post',
    response() {
      return {
        errno: 0,
      };
    },
  },
  {
    // 获取用户信息
    path: '/api/user/info',
    method: 'get',
    response() {
      return {
        errno: 0,
        data: {
          name: Random.cname(),
        },
      };
    },
  },
];
