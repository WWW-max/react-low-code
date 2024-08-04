const questionMockList = require('./question');
const userMockList = require('./user');
const statMockList = require('./stat');
const answerMockList = require('./answer');

const mockList = [...questionMockList, ...userMockList, ...statMockList, ...answerMockList];
module.exports = mockList;
