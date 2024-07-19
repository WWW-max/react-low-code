const Koa = require('koa');
const KoaRouter = require('koa-router');
const mockList = require('./mockApi');

const app = new Koa();
const router = new KoaRouter();

router.get('/api/test', async ctx => {
  ctx.body = 'hello world';
});
const getRoles = (fn, ctx) => {
  return new Promise(resolve => {
    setTimeout(() => {
      const res = fn(ctx);
      resolve(res);
    }, 1000);
  });
};
// 注册mock路由
mockList.forEach(item => {
  const { method, path, response } = item;
  router[method](path, async ctx => {
    const res = await getRoles(response, ctx); // 模拟网络请求的加载状态，1s
    ctx.body = res;
  });
});

app.use(router.routes());
app.use(router.allowedMethods());

app.listen(4000, () => {
  // eslint-disable-next-line no-console
  console.log('server is running at http://localhost:4000');
});
