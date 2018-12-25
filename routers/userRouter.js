//1.引入koa-router
const Router = require('koa-router');
const userController = require('../controllers/userController');

//2.创建路由对象
let router = new Router();

//3.配置路由规则
router.get('/user/register',(ctx,next)=>{
  ctx.render('register');
})
.get('/user/login',(ctx,next)=>{
  ctx.render('login');
})
.post('/user/check-username', userController.checkUsername)
.post('/user/do-register', userController.doRister)

//导出给app进行配置中间件
module.exports = router;
