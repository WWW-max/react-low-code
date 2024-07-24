const Mock = require('mockjs');
const getQuestionList = require('../mockData/getQuestionList');

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
          id: Random.id(),
        },
      };
    },
  },
  {
    // 获取问卷
    path: '/api/question',
    method: 'get',
    response(ctx) {
      const { url = '', query = {} } = ctx;
      const isDeleted = url.indexOf('isDeleted=true') >= 0;
      const isStar = url.indexOf('isStar=true') >= 0;
      const pageSize = parseInt(query.pageSize) || 0;
      return {
        errno: 0,
        data: {
          list: getQuestionList({ len: pageSize, isDeleted, isStar }),
          total: 100, // 总记录数，用于分页
        },
      };
    },
  },
  {
    // 更新单个问卷
    path: '/api/question/:id',
    method: 'patch',
    response() {
      return {
        errno: 0,
      };
    },
  },
  {
    // 复制问卷
    path: '/api/question/duplicate/:id',
    method: 'post',
    response() {
      return {
        errno: 0,
        data: {
          id: Random.id(),
        },
      };
    },
  },
];
