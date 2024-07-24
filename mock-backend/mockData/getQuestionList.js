const { Random } = require('mockjs');

module.exports = function getQuestionList(opt = {}) {
  const { len = 10, isDeleted = false, isStar = false } = opt;
  const list = [];
  for (let i = 0; i < len; i++) {
    list.push({
      _id: Random.id().toString(),
      title: Random.ctitle(5, 10),
      isPublished: Random.boolean(),
      isStar,
      answerCount: Random.natural(50, 100),
      createdAt: Random.datetime(),
      isDeleted, // 假删除
    });
  }
  return list;
};
