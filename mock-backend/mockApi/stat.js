const Mock = require('mockjs');
const getStatList = require('../mockData/getStatList');

const Random = Mock.Random;

module.exports = [
  // 答卷列表
  {
    path: '/api/stat/:questionId',
    method: 'get',
    response() {
      return {
        errno: 0,
        data: {
          total: 100, // 答卷总数
          list: getStatList(),
        },
      };
    },
  },
  // 获取单个组件的统计数据汇总
  {
    path: '/api/stat/:questionId/:componentId',
    method: 'get',
    response() {
      return {
        errno: 0,
        data: {
          stat: [
            { name: '选项1', count: 20 },
            { name: '选项2', count: 10 },
            { name: '选项3', count: 25 },
          ],
        },
      };
    },
  },
];
