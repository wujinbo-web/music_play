const Koa = require('koa');

let app = new Koa();//创建服务器对象
const { rewriteUrlList, port } = require('./config');

app.listen(port, () => {
  console.log(`服务器启动在${port}端口`);
})

//art-template
const render = require('koa-art-template');
const path = require('path');

render(app,{
  root: path.join(__dirname, 'views'),
  extname: '.html',
  debug: process.env.NODE_ENV !== 'production'
});

//art-template end

//解析请求体数据
app.use(require('koa-bodyparser')())

//引入各个路由对象，并配置中间件
const musicRouter = require('./routers/musicRouter');
const userRouter = require('./routers/userRouter');
const errorHeadler = require('./middlewares/errorHeadler');

//处理异常的中间件
app.use(errorHeadler)

const rewriteUrl = require('./middlewares/rewriteUrl');
//在静态处理之前
app.use(rewriteUrl(rewriteUrlList))

//处理静态资源          resolve相对变绝对
app.use(require('koa-static')(path.resolve('./public')));

//路由
app.use(musicRouter.routes());
app.use(userRouter.routes());

//处理报错
app.use(userRouter.allowedMethods());
