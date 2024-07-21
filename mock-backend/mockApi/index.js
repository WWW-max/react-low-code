const questionMockList = require('./question');
const userMockList = require('./user');
const mockList = [...questionMockList, ...userMockList];
module.exports = mockList;
