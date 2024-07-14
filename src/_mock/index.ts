import Mock from 'mockjs';
/** 测试导入mock用法，实际无用 */
Mock.mock('/api/test', 'post', () => {
  return {
    errno: 0,
    data: {
      name: `test data ${Date.now()}`,
    },
  };
});
