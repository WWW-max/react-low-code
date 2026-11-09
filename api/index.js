const mockList = require('../mock-backend/mockApi');

function matchPath(pattern, pathname) {
  const patternParts = pattern.split('/').filter(Boolean);
  const pathParts = pathname.split('/').filter(Boolean);
  if (patternParts.length !== pathParts.length) return false;
  return patternParts.every((part, idx) => part.startsWith(':') || part === pathParts[idx]);
}

module.exports = async (req, res) => {
  const method = (req.method || 'GET').toLowerCase();
  const [pathname] = (req.url || '').split('?');

  const matched = mockList.find(
    item => item.method.toLowerCase() === method && matchPath(item.path, pathname)
  );

  if (!matched) {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ errno: 404, msg: 'API Not Found' }));
    return;
  }

  const data = matched.response({
    url: req.url || '',
    query: req.query || {},
  });

  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.end(JSON.stringify(data));
};
