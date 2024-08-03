const questionMockList = require('./question');
const userMockList = require('./user');
const statMockList = require('./stat');

const mockList = [...questionMockList, ...userMockList, ...statMockList];
module.exports = mockList;
